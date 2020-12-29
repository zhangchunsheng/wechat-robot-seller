const { Wechaty } = require('wechaty');
const QRCode = require('qrcode-terminal');
const Parser = require('./msg-parser');
const GitterUtils = require('./gitter-utils');
const CommandUtils = require('./command-utils');
const Dialog = require('./dialog');
const DBUtils = require('./db-utils');
const RoomID = require('./roomid.json');

const bot = new Wechaty({
    name: "taobao-coupon-seller",
    puppet: 'wechaty-puppet-hostie'
});

function onScan(qrcode, status) {
    QRCode.generate(qrcode, { small: true });
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('');
    console.log(status);
    console.log(qrcodeImageUrl);
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

const kue = require('kue');
const queue = kue.createQueue();
queue.process("UserApply", 1, async function (job, done) {
    var work_group = job.data.work_group;
    var room_id = RoomID[work_group];
    var room = await bot.Room.load(room_id);
    var text;
    if (room) {
        room.sync();
        text = "有新人申请加入：" + job.data.nick_name + "\n" + "申请加入的小组：" + job.data.work_group + "\n" + "申请理由与自我介绍：" + job.data.introduce + "\n";
        text = text + "组长可以@机器人，并发布命令：“接纳@" + job.data.nick_name + "” 或 “同意@" + job.data.nick_name + "” ，机器人将会把他拉入本群。\n";
        text = text + "如果组长@机器人，并发布命令：“正式@" + job.data.nick_name + "”，机器人将会同时把他拉入本群与烙馍网正式成员群。";
        await room.say(text);
    }
    if (job.data.referee1 && job.data.referee2) {
        room_id = RoomID["成员发展工作组"];
        room = await bot.Room.load(room_id);
        text = "有新人申请加入：" + job.data.nick_name + "\n" +
            "申请加入的小组：" + job.data.work_group + "\n" +
            "申请理由与自我介绍：" + job.data.introduce + "\n" +
            "推荐人：" + job.data.referee1 + " 和 " + job.data.referee2;
        if (room) {
            await room.say(text);
        }
    }
    done();
});

queue.process("AddFriend", 1, async function (job, done) {
    var wechat_id = job.data;
    console.log(wechat_id);
    var contact = bot.Contact.load(wechat_id);
    await bot.Friendship.add(contact, "test add friend");
    done();
});

queue.process("AllFriend", 1, async function (job, done) {
    const list = await bot.Contact.findAll();
    list.forEach(function (item, index) {
        // DBUtils.saveWechatFriend(item);
    });
    done();
});
