const Dialog = require('./dialog');
const Parser = require('./msg-parser');
const DBUtils = require('./db-utils');
const RoomID = require('./roomid.json');
const WorkergroupLeader = require('./workgroup_leader.json');
const Leaders = require('./leaders.json');
const CouponRooms = require('./coupon_rooms.json');
const ArRooms = require('./ar_rooms.json');
const { Wechaty,UrlLink,MiniProgram } = require('wechaty');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

exports.acceptUserFromDb = async function (bot, userName, type) {
    console.log(type);
    DBUtils.getUser(userName, async function (user) {
        if (user) {
            var contact = await bot.Contact.load(user.wechat_id);
            if (contact.friend()) {
                var roomId = RoomID[user.work_group];
                console.log(roomId);
                var room = await bot.Room.load(roomId);
                var wechatUser = await bot.Contact.load(user.wechat_id);
                if(room) {
                    var text = "欢迎新朋友：" + user.nick_name + "\n" + user.nick_name + "的自我介绍：" + user.introduce;
                    room.add(wechatUser);
                    room.say(text);
                    DBUtils.updateUserStatus(user.wechat_id, '已加入');
                    if(type === "正式") {
                        var formalRoomId = RoomID["正式个人成员群"];
                        var formalRoom = await bot.Room.load(formalRoomId);
                        formalRoom.add(wechatUser);
                        formalRoom.say(text);
                        DBUtils.updateUserPosition(user.wechat_id, '正式成员');
                    }
                }
            }
        }
    });
}

exports.acceptUser = async function (bot, userName, type) {
    //this.acceptUserFromDb(bot, userName, type);
}

exports.doUserCommand = async function (bot, msg) {
    var msgText = await Parser.getMsgText(bot, msg);
    msgText = msgText.trim();
    var room;
    var fromName;
    if (msgText.slice(0, 6) === '#join ') {
        msgText = msgText.slice(6);
        var roomId = RoomID['烙馍省钱体验群'];
        room = await bot.Room.load(roomId);
        if (room) {
            await room.add(msg.talker());
            await room.say("欢迎新朋友：" + msg.talker().name());
            await room.say(msg.talker().name() + "的自我介绍：" + msgText);
        } else {
            console.log("没有找到房间");
        }
    } else if(msgText.slice(0, 12) === '#joincoupon ') {
        msgText = msgText.slice(12);
        var roomIndex = 0;
        roomId = CouponRooms[roomIndex];
        room = await bot.Room.load(roomId);
        if (room) {
            await room.add(msg.talker());
            await room.say("欢迎新朋友：" + msg.talker().name());
            await room.say(msg.talker().name() + "的自我介绍：" + msgText);
        } else {
            console.log("没有找到房间");
        }
    } else if(msgText.slice(0,9) === '#joinar') {
        room = await bot.Room.load('烙馍AR');
        if(room) {
            await room.add(msg.talker());
        }
    } else if(msgText === '#merge') {
        fromName = await msg.talker().name();
        if (fromName === "烙馍网") {
            var room0 = await bot.Room.load(CouponRooms[0]);
            var room0list= await room0.memberAll();
            var room0userlist = [];
            var timeCount = 0;
            for(let room0user of room0list) {
                room0userlist.push(room0user.id);
            }
            for(let roomId of CouponRooms) {
                room = await bot.Room.load(roomId);
                console.log(roomId);
                var list = await room.memberAll();
                for(let user of list) {
                    if (room0userlist.indexOf(user.id) === -1) {
                        sleep(3000 * timeCount).then(() => {
                            user.say("合并现场观众到一个大群，已经加入的同学请忽略");
                            room0.add(user);
                        });
                        timeCount = timeCount + 1;
                    }
                }
            }
        }
    } else {
        fromName = await msg.talker().name();
        if (fromName !== "烙馍网" && fromName !== "微信团队") {
            var reply = Dialog.getReply(msgText);
            msg.say(reply);
        }
    }
}

async function sendMsg(bot, msgText, msg) {
    if(msgText.trim() === "mini") {
        const miniProgram = new MiniProgram({
            appid: process.env.WECHAT_MINI_PROGRAM_APPID, // optional, appid, get talker wechat (mp.weixin.qq.com)
            description: "烙馍倾听", // optional, mini program title
            pagePath: "pages/index/index.html", // optional, mini program page path
            thumbUrl: "https://wx1.sinaimg.cn/mw690/46b94231ly1gh0xjf8rkhj21js0jf0xb.jpg", // optional, default picture, convert to thumbnail
            title: "烙馍FM",  // optional, mini program title
            username: process.env.WECHAT_MINI_PROGRAM_USERNAME
        });
        msg.say(miniProgram);
    } else if(msgText.trim() !== "") {
        let room;
        const currentRoom = await msg.room().id;
        const fromName = await msg.talker().name();
        const url = "https://tb-m.luomor.com/#/searchlist/" + encodeURIComponent(msgText) + "?source=robot";
        //https://docs.chatie.io/api/message
        const urlLink = new UrlLink({
            description: '烙馍省钱[' + msgText + ']',
            thumbnailUrl: 'https://img.alicdn.com/imgextra/i4/790237325/O1CN01hY4aU523ytm2F4HxA_!!790237325.jpg?t=1586059949000',
            title: '烙馍省钱',
            url: url,
        });
        if(currentRoom) {
            if(Leaders.indexOf(fromName) >= 0) {
                let hasSend = false;
                for(let roomId of CouponRooms) {
                    if(currentRoom === roomId) {
                        hasSend = true;
                    }
                    room = await bot.Room.load(roomId);
                    room.say(urlLink);
                }
                if(!hasSend) {
                    msg.say(urlLink);
                }
            } else {
                msg.say(urlLink);
            }
        }
    }
}

exports.doRoomCommand = async function (bot, msg) {
    var msgText = await Parser.getMsgText(bot, msg);
    var roomTopic = await msg.room().topic();
    var fromName = await msg.talker().name();
    if(WorkergroupLeader[roomTopic]) {
        if(WorkergroupLeader[roomTopic] === fromName || fromName === '烙馍网') {
            if (msgText.slice(0, 4) === "@烙馍网") {
                msgText = msgText.slice(5);
                if (msgText.slice(0, 2) === "接纳" || msgText.slice(0, 2) === "同意") {
                    this.acceptUser(bot, msgText.slice(2), "预备");
                } else if (msgText.slice(0, 2) === "正式") {
                    this.acceptUser(bot, msgText.slice(2), "正式");
                }
            }
        }
    }
    if(roomTopic.slice(0, 4) === "烙馍省钱") {
        var room;
        if(roomTopic === "烙馍省钱测试群") {
            console.log(fromName + ":" + msgText);
        }
        if(Leaders.indexOf(fromName) >= 0) {
            if (msgText.slice(0, 4) === "@烙馍网") {
                msgText = msgText.slice(5);
                if(msgText.slice(0, 2) === "群发") {
                    const list = await bot.Contact.findAll();
                    list.forEach(async function (item, index) {
                        sleep(2000 * index).then(() => {
                            item.say(msgText.slice(2));
                        });
                    });
                } else if(msgText.slice(0, 6) === "coupon") {
                    for(let roomId of CouponRooms) {
                        room = await bot.Room.load(roomId);
                        room.say(msgText.slice(7));
                    }
                } else if(msgText.slice(0, 2) === "ar") {
                    for(let roomId of ArRooms) {
                        room = await bot.Room.load(roomId);
                        room.say(msgText.slice(2));
                    }
                } else {
                    sendMsg(bot, msgText, msg);
                }
            }
        } else {
            //msg get word, say search coupon url
            if (msgText.slice(0, 4) === "@烙馍网") {
                msgText = msgText.slice(5);
                sendMsg(bot, msgText, msg);
            }
        }
    }
}
