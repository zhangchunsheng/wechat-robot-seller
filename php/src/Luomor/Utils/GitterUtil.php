<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 9:28 PM
 */
namespace Luomor\Utils;

use IO\Github\Wechaty\PuppetHostie\Exceptions\PuppetHostieException;
use IO\Github\Wechaty\Util\Logger;

class GitterUtil {

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