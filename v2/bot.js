const { Wechaty } = require('wechaty');
const { ScanStatus } = require('wechaty-puppet');
const QrcodeTerminal = require('qrcode-terminal');
const Parser = require('./msg-parser');
const GitterUtils = require('./gitter-utils');
const CommandUtils = require('./command-utils');
const Dialog = require('./dialog');
const DBUtils = require('./db-utils');
const RoomID = require('./roomid.json');

const bot = new Wechaty({
    puppet: 'wechaty-puppet-hostie'
});

bot
.on('scan', (qrcode, status) => {
    if (status === ScanStatus.Waiting) {
        QrcodeTerminal.generate(qrcode, {
            small: true
        })
    }
})
.on('login', async user => {
    console.log(`user: ${JSON.stringify(user)}`)
})
.on('message', async message => {
    console.log(`message: ${JSON.stringify(message)}`)
})
.start()