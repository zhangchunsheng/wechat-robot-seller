exports.greeting = "你好，我是烙馍省钱的微信机器人。输入help可以查看如何与我交流。";

exports.getReply = function (msg) {
  msg = msg.toLowerCase();
  
  switch(msg) {
    case "help":
    case "h":
      return "命令格式：#keyword 其他内容\n#join 申请理由。      申请加入烙馍省钱迎新群，机器人会将你拉入一个讨论群。\n#joinar 申请加入烙馍网AR。\n#projects 或 #p         列出目前烙馍网的开源项目。\n#about 或 #a        关于这个微信机器人的介绍.\n#joincoupon 申请理由。    申请加入烙馍省钱群。";
    case "#joinar":
      return "访问 https://ar.luomor.com/ 提交申请";
    case "#projects":
    case "#p":
      return "1. LCoin：基于区块链的开源项目激励平台\n2. 开放黑客松：Open Hackathon Platform\n3. 烙馍网官网：基于Github Pages的烙馍网官方网站\n4. Wechat-Robot：烙馍网微信机器人\n#project 序号 或 #p 序号 或 #序号，了解更多";
    case "#project 1":
    case "#p 1":
    case "#1":
      return "LCoin，基于区块链（超级账本）技术，服务开源项目，实现快捷方便的开源贡献积分平台，并提供兑换机制，激励更多的开源贡献。项目地址：  https://github.com/luomor/lcoin";
    case "#project 2":
    case "#p 2":
    case "#2":
      return "开放黑客松，基于云计算平台，组织者能够托管具有最需要功能的离线/在线黑客马拉松; 活动参与者可以使用支持HTML5的Web浏览器登录黑客松活动，提供他选择的开发环境并与队友协作。项目地址：  https://github.com/luomor/open-hackathon";
    case "#project 3":
    case "#p 3":
    case "#3":
      return "烙馍网官网，以博客和新闻为主的静态网站。项目地址：  https://github.com/luomor/luomor.com";
    case "#project 4":
    case "#p 4":
    case "#4":
      return "烙馍网微信机器人，一个探索型项目，尝试基于微信机器人，与更多的开源爱好者沟通，并提高吸纳新成员的效率。项目地址：  https://github.com/zhangchunsheng/wechat-robot-seller";
    case "#about":
    case "#a":
      return "烙馍网微信机器人，一个探索型项目，尝试基于微信机器人，与更多的开源爱好者沟通，并提高吸纳新成员的效率。项目地址：  https://github.com/zhangchunsheng/wechat-robot-seller";
    default:
      return "输入help可以查看如何与我交流。";
  }
}
