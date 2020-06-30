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
    let text = await Parser.getMsgText(bot, msg);
    const roomTopic = msg.room().payload.topic;
    const roomId = getRoomID(roomTopic);
    if (text == null) {
        text = msg.text();
    }
    if (roomId != null) {
        const url = 'https://api.gitter.im/v1/rooms/' + roomId + '/chatMessages';
        text = msg.from().name() + ":" + text;
        console.log(url);
        const content = JSON.stringify({
            text: text
        });
        request.post(
            {
                url: url,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + GitterToken
                },
                body: content
            },
            function (error, response, body) {
                console.log(error);
            }
        );

    }
}

exports.testMsg = async function () {
    const content = JSON.stringify({
        text: "test"
    });
    request.post(
        {
            url: "https://api.gitter.im/v1/rooms/5ef843e4d73408ce4fe81add/chatMessages",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + GitterToken
            },
            body: content
        },
        function (error, response, body) {
            console.log(error);
        }
    );
}

