const request = require('request');
const Parser = require('./msg-parser');

const GitterToken = process.env.GITTER_TOKEN;

function getRoomID(topic) {
    switch (topic) {
        case "烙馍省钱":
            return "5ef843e4d73408ce4fe81add";
        default:
            return null;
    }
}

exports.sendMsgToGitter = async function (bot, msg) {
    var text = await Parser.getMsgText(bot, msg);
    var roomTopic = msg.room().payload.topic;
    var roomId = getRoomID(roomTopic);
    if (text == null) {
        text = msg.text();
    }
    if (roomId != null) {
        var url = 'https://api.gitter.im/v1/rooms/' + roomId + '/chatMessages';
        console.log(url);
        request.post(
            {
                url: url,
                headers: {
                    "Accept": "application/json",
                    "Authorization": GitterToken
                },
                form: {
                    text: msg.from().name() + ":" + text
                }
            },
            function (error, response, body) {
                console.log(body);
            }
        );

    }
}
