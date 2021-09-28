const { Wechaty } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const { ScanStatus } = require('wechaty-puppet');
const QrcodeTerminal = require('qrcode-terminal');
const Parser = require('./msg-parser');
const GitterUtils = require('./gitter-utils');
const CommandUtils = require('./command-utils');
const Dialog = require('./dialog');
const DBUtils = require('./db-utils');
const RoomID = require('./roomid.json');

const bot = new Wechaty({
    puppet: 'wechaty-puppet-wechat'
});

function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting) {
        QrcodeTerminal.generate(qrcode, {
            small: true
        })
    }
}

function onLogin(user) {
    console.log(`${user} login`);
}

function onLogout(user) {
    console.log(`${user} logout`);
}

GitterUtils.testMsg();

async function onMessage(msg) {
    if (msg.age() > 60) {
        return;
    }
    if (msg.payload) {
        if (msg.room() != null && msg.payload.type !== bot.Message.Type.Unknown) {
            var room = await msg.room();
            console.log(await room.topic() + ":" + room.id);
            GitterUtils.sendMsgToGitter(bot, msg);
            CommandUtils.doRoomCommand(bot, msg);
        } else if (msg.payload.type !== bot.Message.Type.Unknown) {
            CommandUtils.doUserCommand(bot, msg);
        }
        // DBUtils.saveMsg(msg);
    }
}

async function onFriendship(friendship) {
    if (friendship.type() === bot.Friendship.Type.Receive) {
        await friendship.accept();
    } else if (friendship.type() === bot.Friendship.Type.Confirm) {
        var contact = await friendship.contact();
        await contact.sync();
        contact.say(Dialog.greeting);
        console.log("add new friend to db");
        // DBUtils.saveWechatFriend(contact);
    }
}

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
bot.on('friendship', onFriendship);

bot.start()
    .then(() => console.log('Starter Bot Started.'))
    .catch(e => console.error(e));
