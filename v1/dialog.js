exports.greeting = "你好，我是烙馍省钱的微信机器人。输入help可以查看如何与我交流。";

exports.getReply = function (msg) {
  msg = msg.toLowerCase();
  
  switch(msg) {
    case "help":
    case "h":
      return "命令格式：#keyword 其他内容\n#join 申请理由。      申请加入烙馍省钱迎新群，机器人会将你拉入一个讨论群。\n#about 或 #a        关于这个微信机器人的介绍.\n#joincoupon 申请理由。    申请加入烙馍省钱群。";
    case "#about":
    case "#a":
      return "烙馍网微信机器人，一个探索型项目，尝试基于微信机器人，与更多的开源爱好者沟通，并提高吸纳新成员的效率。项目地址：  https://github.com/zhangchunsheng/wechat-robot-seller";
    default:
      return "输入help可以查看如何与我交流。";
  }
}
