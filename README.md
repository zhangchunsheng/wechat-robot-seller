# wechat-robot-seller [![PHP CI](https://github.com/zhangchunsheng/wechat-robot-seller/workflows/PHP%20CI/badge.svg)](https://github.com/zhangchunsheng/wechat-robot-seller/actions?query=workflow%3A%22PHP+CI%22)

### 背景
疫情期间基于淘宝客的接口写了一个网站烙馍省钱https://tb-m.luomor.com/ ，而推广对于程序员来说很难实施，现在有很多基于社区的推广微信群，因此想做一个带货机器人，之前接触过wechaty，只是之前基于web协议，昨天试了一下微信不让在web页面登录了
<br />通过一番学习之后，看到了新的ipad协议，有C#版本的但是很久没有人维护了，看到wechaty的puppet-padplus，基于RPC实现的版本，将ipad协议封装到了server端，还是很方便的

<!--more-->

### 功能

- 商品搜索

通过监听用户输入的关键字，回复此关键字的检索地址

### 实现逻辑
wechaty具体有如下模块：<br />FriendShip：主要处理好友请求<br />Message：处理消息模块<br />Contact：好友管理<br />当wechaty实例监听到某一事件触发时，会去执行对应的消息监听逻辑。<br />这样看来，其实主要的操作逻辑在于消息模块，也就是message事件触发时，处理消息内容，根据用户消息内容，返回关键字检索URL地址。

### 依赖
wechaty：wechaty核心库<br />wechaty-puppet-padplus：wechaty的ipad协议实现

### 实现过程
```javascript
if(msgText.trim() !== "") {
    var room;
    var url = "https://tb-m.luomor.com/#/searchlist/" + msgText;
    //https://docs.chatie.io/api/message
    const urlLink = new UrlLink({
        description: '烙馍省钱[' + msgText + ']',
        thumbnailUrl: 'https://img.alicdn.com/imgextra/i4/790237325/O1CN01hY4aU523ytm2F4HxA_!!790237325.jpg?t=1586059949000',
        title: '烙馍省钱',
        url: url,
    });
    for(let roomId of CouponRooms) {
        room = await bot.Room.load(roomId);
        room.say(urlLink);
    }
}

```

### 本地运行

1.克隆项目
```shell
git clone ghttps://github.com/zhangchunsheng/wechat-robot-seller.git
cd wechat-robot-seller/v1
```

2.安装依赖
```shell
npm install
```

3.启动项目
```shell
node bot.js
```

4.PHP
```shell script
cd wechat-robot-seller/php
composer install
php src/bot.php
```

```
sudo docker build -t wechat-robot-seller .
sudo docker run wechat-robot-seller

https://wechaty.js.org/docs/puppet-services/compatibility/
```

### 致谢
感谢Wechaty团队提供微信机器人SDK，让开发者可以专注于业务代码。<br />感谢句子互动提供的pad协议版token，看到很多基于dll的实现，太费时就没有研究了

[![Powered by PHP-Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green)](https://github.com/wechaty/wechaty)
[![Powered by PHP-Wechaty](https://img.shields.io/badge/Powered%20By-PHP--Wechaty-green)](https://github.com/wechaty/php-wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
