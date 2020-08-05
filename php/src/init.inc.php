<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 9:46 PM
 */

// DEBUG should create dir use command sudo mkdir /var/log/wechaty && sudo chmod 777 /var/log/wechaty
define("DEBUG", 1);

function autoload($clazz) {
    $file = str_replace('\\', '/', $clazz);
    if(is_file(ROOT . "/src/$file.php")) {
        require ROOT . "/src/$file.php";
    }
}

spl_autoload_register("autoload");

require ROOT . '/vendor/autoload.php';

// change dir
// \IO\Github\Wechaty\Util\Logger::$_LOGGER_DIR = "/tmp/";