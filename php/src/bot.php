<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 4:53 PM
 */
use IO\Github\Wechaty\Puppet\FileBox\FileBox;
use IO\Github\Wechaty\User\ContactSelf;
use IO\Github\Wechaty\User\MiniProgram;
use IO\Github\Wechaty\User\UrlLink;

define("ROOT", dirname(__DIR__));

require(ROOT . "/src/init.inc.php");

$token = getenv("WECHATY_PUPPET_HOSTIE_TOKEN");
$endPoint = getenv("WECHATY_PUPPET_HOSTIE_ENDPOINT");
$wechaty = \IO\Github\Wechaty\Wechaty::getInstance($token, $endPoint);
$wechaty->onScan(function($qrcode, $status, $data) {
    if($status == 3) {
        echo "SCAN_STATUS_CONFIRMED\n";
    } else {
        $qr = \IO\Github\Wechaty\Util\QrcodeUtils::getQr($qrcode);
        echo "$qr\n\nOnline Image: https://wechaty.github.io/qrcode/$qrcode\n";
    }
})->onLogin(function(ContactSelf $user) {
    echo "login user id " . $user->getId() . "\n";
    echo "login user name " . $user->getPayload()->name . "\n";
})->onMessage(function(\IO\Github\Wechaty\User\Message $message) use ($wechaty) {
    if ($message->age() > 60) {
        return;
    }
    if ($message->getPayload()) {
        if ($message->room() != null && $message->getPayload()->type !== \IO\Github\Wechaty\Puppet\Schemas\MessagePayload::MESSAGETYPE_UNKNOWN) {
            $room = $message->room();
            echo $room->getTopic() . ":" . $room->getId();
            \Luomor\Utils\GitterUtil::sendMsgToGitter($wechaty, $message);
            \Luomor\Utils\CommandUtil::doRoomCommand($wechaty, $message);
        } else if ($message->getPayload()->type !== \IO\Github\Wechaty\Puppet\Schemas\MessagePayload::MESSAGETYPE_UNKNOWN) {
            \Luomor\Utils\CommandUtil::doUserCommand($wechaty, $message);
        }
        // DBUtils::saveMsg($message);
    }
})->onHeartBeat(function($data) use ($wechaty) {
    echo $data . "\n";
})->start();