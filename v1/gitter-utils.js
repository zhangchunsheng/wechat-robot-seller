const request = require('request');
const Parser = require('./msg-parser');

const GitterToken = process.env.GITTER_TOKEN;

function getRoomID(topic) {
    switch (topic) {
        case "烙馍网.烙馍省钱":
            return "5ef843e4d73408ce4fe81add";
        default:
            return null;
    }
}

exports.sendMsgToGitter = async function (bot, msg) {
    var text = await Parser.getMsgText(bot, msg);
    var room_topic = msg.room().payload.topic;
    var room_id = getRoomID(room_topic);
    if (text == null) {
        text = msg.text();
    }
    if (room_id != null) {
        request.post(
            {
                url: 'https://api.gitter.im/v1/rooms/' + room_id + '/chatMessages',
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
