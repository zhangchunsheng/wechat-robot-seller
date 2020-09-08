<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 9:28 PM
 */
namespace Luomor\Utils;

use IO\Github\Wechaty\PuppetHostie\Exceptions\PuppetHostieException;
use IO\Github\Wechaty\User\Message;
use IO\Github\Wechaty\Util\Logger;
use Luomor\MsgParser;

class GitterUtil {

    static function getRoomID($topic) {
        $topic = substr($topic, 0, 4);
        switch ($topic) {
            case "烙馍省钱":
                return "5ef843e4d73408ce4fe81add";//■
            default:
                return null;
        }
    }

    static function sendMsgToGitter($bot, Message $msg) {
        $text = MsgParser::getMsgText($bot, $msg);
        $roomTopic = $msg->room()->getPayload()->topic;
        $roomId = self::getRoomID($roomTopic);
        if ($text == null) {
            $text = $msg->text();
        }
        if ($roomId != null) {
            $url = 'https://api.gitter.im/v1/rooms/' . $roomId . '/chatMessages';
            $text = $msg->from()->name() . ":" . $text;
            echo $url . "\n";
            $content = json_encode(array(
                "text" => $text
            ));
            $gitterToken = getenv("GITTER_TOKEN");
            $client = new \GuzzleHttp\Client([
                'timeout' => 5,
                'headers' => [
                    "Content-Type" => "application/json",
                    "Accept" => "application/json",
                    "Authorization" => "Bearer " . $gitterToken,
                ],
                //'cookies' => "",
                //'debug' => true,
            ]);
            $response = $client->request('POST', $url, [
                'body' => $content
            ]);

        }
    }

    static function testMsg() {
        $gitterToken = getenv("GITTER_TOKEN");
        $content = json_encode(array(
            "text" => "test"
        ));
        $url = "https://api.gitter.im/v1/rooms/5ef843e4d73408ce4fe81add/chatMessages";
        $client = new \GuzzleHttp\Client([
            'timeout' => 5,
            'headers' => [
                "Content-Type" => "application/json",
                "Accept" => "application/json",
                "Authorization" => "Bearer " . $gitterToken,
            ],
            //'cookies' => "",
            //'debug' => true,
        ]);

        $response = $client->request('POST', $url, [
            'body' => $content
        ]);

        print_r($response->getBody());
    }
}