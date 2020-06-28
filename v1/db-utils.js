const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'coupon',
  password: 'coupon',
  database: 'taobao-coupon'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to Coupon DB");
});

global.db = db;

exports.getUser = function (nickName, func) {
  if (nickName.slice(0, 1) === "@") {
    nickName = nickName.slice(1);
  }
  let query = "select * from users where `nick_name`='" + nickName + "'";
  console.log(query);
  db.query(query, (err, result) => {
    if (!err) {
      func(result[0]);
    } else {
      func(null);
    }
  });
}

exports.updateUserStatus = function (wechatId, userStatus, func) {
  let query = "update `users` set `status`='" + userStatus + "' where `wechat_id`='" + wechatId + "'";
  db.query(query, (err, result) => {
    if (func) { func(); }
  });
}

exports.updateUserPosition = function (wechatId, position, func) {
  let query = "update `users` set `position`='" + position + "' where `wechat_id`='" + wechatId + "'";
  db.query(query, (err, result) => {
    if (func) { func(); }
  });
}


exports.saveWechatFriend = async function (user) {
  var wechatId = user.id;
  var nickName = await user.name();
  console.log(wechatId + "," + nickName);
  db.query("SET NAMES utf8mb4", (err, result) => {
    db.query("select * from wechat_friends where wechat_id='" + wechatId + "'", (err1, result) => {
      if(result.length === 0) {
        db.query("insert into `wechat_friends` (wechat_id,nick_name) values ('" + wechatId + "','" + nickName + "')", (err2, result2) => {
          if (err2) {
            console.log(err2);
          }
        });
      }
    });
  });
}

const MessageType = ["Unknown", "Attachment", "Audio", "Contact", "Emoticon", "Image", "Text", "Video", "Url"];

exports.saveMsg = async function (msg) {
  var fields = "`type`,";
  var values = "'" + MessageType[msg.type()-1] + "',";
  var room = await msg.room();
  if (room) {
    var roomId = room.id;
    var roomTopic = await room.topic();
    fields = fields + "`room_id`,`room_topic`,";
    roomTopic = roomTopic.replace(/\'/g, "\\\'");
    values = values + "'" + roomId + "','" + roomTopic + "',";
  }
  var from = await msg.from();
  if (from) {
    var fromUserId = from.id;
    var fromUserName = await from.name();
    fields = fields + "`from_user_id`,`from_user_name`,";
    values = values + "'" + fromUserId + "','" + fromUserName + "',";
  }
  var mentionList = await msg.mention();
  if (mentionList) {
    var mentionIdList = "";
    var mentionNameList = "";
    mentionList.forEach(async function (item, index) {
      mentionIdList = mentionIdList + item.id + ",";
      mentionNameList = mentionNameList + await item.name() + ",";
    });
    fields = fields + "`mention_id_list`,`mention_name_list`,";
    values = values + "'" + mentionIdList + "','" + mentionNameList + "',";
  }
  text = await msg.text();
  text = text.replace(/\'/g,"\\\'");
  fields = fields + "`text`,`create_at`";
  values = values + "'" + text + "',CURRENT_TIMESTAMP";
  sql = "INSERT INTO `messages` (" + fields + ") VALUES (" + values + ")";
  db.query("SET NAMES utf8mb4", (err, result) => {
    db.query(sql);
  });
}
