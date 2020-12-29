import { Wechaty } from 'wechaty'
import { ScanStatus } from 'wechaty-puppet'
import QrcodeTerminal from 'qrcode-terminal';

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