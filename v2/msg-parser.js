const parseString = require('xml2js').parseString;
const Server_Address = process.env.SERVER_ADDRESS;
const Web_Files_Path = process.env.WEB_FILES_PATH;

exports.getJson = function (xml) {
    var json = null;
    parseString(xml, function (err, result) {
        json = result;
    });
    return json;
}

exports.saveMessageFiles = async function (bot, msg) {
    var msgType = msg.payload.type;
    if (msgType === bot.Message.Type.Image) {
        const file = await msg.toFileBox();
        const name = Web_Files_Path + file.name;
        console.log('Save file to: ' + name);
        file.toFile(name);
        return Server_Address + file.name;
    } else {
        return null;
    }
}

exports.getMsgText = async function (bot, msg) {
    var msgText = msg.text();
    var imgUrl;
    if (msg.payload.type === bot.Message.Type.Image) {
        imgUrl = await this.saveMessageFiles(bot, msg).catch(error => console.log(error.message));
        msgText = "![image](" + imgUrl + ")";
    }
    var json;
    if (msg.payload.type === bot.Message.Type.Emoticon) {
        json = this.getJson(msg.text());
        imgUrl = json.msg.emoji[0]["$"].cdnurl;
        msgText = "![image](" + imgUrl + ")";
    }
    if (msg.payload.type === bot.Message.Type.Url) {
        json = this.getJson(msg.text());
        var title = json.msg.appmsg[0].title[0];
        var url = json.msg.appmsg[0].url[0];
        msgText = "[" + title + "](" + url + ")";
    }
    return msgText;
}
