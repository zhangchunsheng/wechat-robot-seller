<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 10:52 PM
 */
namespace Luomor;

use IO\Github\Wechaty\Puppet\Schemas\MessagePayload;
use IO\Github\Wechaty\User\Message;

class MsgParser {
    static function getJson($xml) {
        //Convert the XML string into an SimpleXMLElement object.
        $xmlObject = simplexml_load_string($xml);

        //Encode the SimpleXMLElement object into a JSON string.
        $jsonString = json_encode($xmlObject);

        //Convert it back into an associative array for
        //the purposes of testing.
        $jsonArray = json_decode($jsonString, true);

        return $jsonArray;
    }

    static function saveMessageFiles($bot, Message $msg) {
        $msgType = $msg->getPayload()->type;
        if ($msgType === MessagePayload::MESSAGETYPE_IMAGE) {
            $file = $msg->toFileBox();
            $webFilesPath = getenv("WEB_FILES_PATH");
            $serverAddress = getenv("SERVER_ADDRESS");
            $name = $webFilesPath . $file->name;
            echo 'Save file to: ' . $name;
            //$file->toFile($name);
            return $serverAddress . $file->name;
        } else {
            return null;
        }
    }

    static function getMsgText($bot, Message $msg) {
        $msgText = $msg->text();
        $imgUrl = "";
        if ($msg->getPayload()->type === MessagePayload::MESSAGETYPE_IMAGE) {
            $imgUrl = self::saveMessageFiles($bot, $msg);
            $msgText = "![image](" . $imgUrl . ")";
        }
        $json = "";
        if ($msg->getPayload()->type === MessagePayload::MESSAGETYPE_EMOTICON) {
            $json = self::getJson($msg->text());
            $imgUrl = $json["msg"]["emoji"][0]["$"]["cdnurl"];
            $msgText = "![image](" . $imgUrl . ")";
        }
        if ($msg->getPayload()->type === MessagePayload::MESSAGETYPE_URL) {
            $json = self::getJson($msg->text());
            $title = $json["msg"]["appmsg"][0]["title"][0];
            $url = $json["msg"]["appmsg"][0]["url"][0];
            $msgText = "[" . $title . "](" . $url . ")";
        }
        return $msgText;
    }
}