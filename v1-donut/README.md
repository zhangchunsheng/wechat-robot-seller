# wechat-robot-seller

这是一个烙馍网的微信机器人项目，基于[wechaty](http://github.com/chatie/wechaty)开源项目开发。

# 环境变量

* WECHATY_PUPPET_PADPLUS_TOKEN: Wechaty iPad协议所需的token
* SERVER_ADDRESS: Web Server对外提供的HTTP地址
* GITTER_TOKEN: 为同步消息到Gitter，所需账号的access token
* WEB_FILES_PATH: 微信文件，将要存在服务器上的路径，通常为/var/www/html

# 加入项目的讨论组

[![Join the chat at https://gitter.im/luomor/taobao-coupon](https://badges.gitter.im/luomor/taobao-coupon.svg)](https://gitter.im/luomor/taobao-coupon?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# 欢迎加这个机器人为好友

![](luomor.jpeg)

```
"@chatie/eslint-config": "^0.8.1",
"@chatie/git-scripts": "^0.6.1",
"@chatie/tsconfig": "^0.10.1",
"check-node-version": "^4.0.3",
"connect": "^3.7.0",
"cross-env": "^7.0.2",
"is-pr": "^1.1.0",
"marked": "^1.1.0",
"nodemon": "^2.0.3",
"wechaty-puppet-mock": "^0.22.31",
"wechaty-puppet-padplus": "^0.7.21",
"wechaty-puppet-puppeteer": "^0.23.1",
"wechaty-puppet-wechat4u": "^0.16.3",
```

```
11:35:04 ERR PuppetHostie start() rejection: no endpoint
Error: no endpoint
    at PuppetHostie.<anonymous> (/home/test/git/wechat-robot-seller/v1/node_modules/_wechaty-puppet-hostie@0.8.4@wechaty-puppet-hostie/dist/src/client/puppet-hostie.js:68:27)
    at Generator.next (<anonymous>)
    at fulfilled (/home/test/git/wechat-robot-seller/v1/node_modules/_wechaty-puppet-hostie@0.8.4@wechaty-puppet-hostie/dist/src/client/puppet-hostie.js:5:58)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
11:35:04 ERR Wechaty start() exception: no endpoint
Error: no endpoint
    at PuppetHostie.<anonymous> (/home/test/git/wechat-robot-seller/v1/node_modules/_wechaty-puppet-hostie@0.8.4@wechaty-puppet-hostie/dist/src/client/puppet-hostie.js:68:27)
    at Generator.next (<anonymous>)
    at fulfilled (/home/test/git/wechat-robot-seller/v1/node_modules/_wechaty-puppet-hostie@0.8.4@wechaty-puppet-hostie/dist/src/client/puppet-hostie.js:5:58)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
```

```
peerDependencies WARNING wechaty@0.41.45 › wechaty-puppet-hostie@^0.9.1 requires a peer of wechaty-puppet@^0.32.2 but wechaty-puppet@0.27.1 was installed
peerDependencies WARNING wechaty-puppet-hostie@^0.10.8 requires a peer of wechaty-puppet@^0.32.2 but wechaty-puppet@0.27.1 was installed
peerDependencies WARNING wechaty-puppet-hostie@0.10.8 › ws@^7.3.1 requires a peer of bufferutil@^4.0.1 but none was installed
peerDependencies WARNING wechaty-puppet-hostie@0.10.8 › ws@^7.3.1 requires a peer of utf-8-validate@^5.0.2 but none was installed
deprecate request@^2.88.0 request has been deprecated, see https://github.com/request/request/issues/3142
deprecate request@2.88.2 › har-validator@~5.1.3 this library is no longer supported
deprecate kue@0.11.6 › stylus@0.54.8 › css-parse@2.0.0 › css@2.2.4 › source-map-resolve@0.5.3 › resolve-url@^0.2.1 https://github.com/lydell/resolve-url#deprecated
deprecate kue@0.11.6 › pug@2.0.4 › pug-code-gen@2.0.2 › constantinople@3.1.2 › babel-types@6.26.0 › babel-runtime@6.26.0 › core-js@^2.4.0 core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
Recently updated (since 2020-12-21): 2 packages (detail see file /home/test/git/wechat-robot-seller/v1/node_modules/.recently_updates.txt)
```

https://wechaty.js.org/docs/puppet-services/

```
12:16:28 VERB Wechaty initPuppetEventBridge() puppet.on(heartbeat) (listenerCount:0) registering...
12:16:28 VERB Wechaty initPuppetEventBridge() puppet.on(ready) (listenerCount:0) registering...
12:16:28 VERB Wechaty initPuppetEventBridge() puppet.on(reset) (listenerCount:0) registering...
12:16:28 VERB Wechaty wechatifyUserModules(Puppet#0<PuppetHostie>(taobao-coupon-seller))
12:16:28 VERB PuppetHostie start()
12:16:28 VERB StateSwitch <PuppetHostie> on(pending) <- (false)
12:16:28 VERB PuppetHostie startGrpcClient()
12:16:28 VERB PuppetHostie discoverHostieIp(67ac832ecc2d5fcda97c7e63595060cb)
12:16:28 WARN No endpoint when starting grpc client, 10 retry left. Reconnecting in 10 seconds...
null
12:16:38 VERB PuppetHostie discoverHostieIp(67ac832ecc2d5fcda97c7e63595060cb)
12:16:39 WARN No endpoint when starting grpc client, 9 retry left. Reconnecting in 10 seconds...
```

How to became a Wechaty Puppet Service Provider

https://github.com/wechaty/puppet-services/discussions/11

```
peerDependencies WARNING wechaty-puppet-hostie@^0.10.8 requires a peer of wechaty-puppet@^0.32.2 but wechaty-puppet@0.33.6 was installed
peerDependencies WARNING wechaty-puppet-hostie@0.10.8 › ws@^7.3.1 requires a peer of bufferutil@^4.0.1 but none was installed
peerDependencies WARNING wechaty-puppet-hostie@0.10.8 › ws@^7.3.1 requires a peer of utf-8-validate@^5.0.2 but none was installed
deprecate request@^2.88.0 request has been deprecated, see https://github.com/request/request/issues/3142
deprecate request@2.88.2 › har-validator@~5.1.3 this library is no longer supported
deprecate kue@0.11.6 › stylus@0.54.8 › css-parse@2.0.0 › css@2.2.4 › source-map-resolve@0.5.3 › resolve-url@^0.2.1 https://github.com/lydell/resolve-url#deprecated
deprecate kue@0.11.6 › pug@2.0.4 › pug-code-gen@2.0.2 › constantinople@3.1.2 › babel-types@6.26.0 › babel-runtime@6.26.0 › core-js@^2.4.0 core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
```
