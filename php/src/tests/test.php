<?php
/**
 * Created by PhpStorm.
 * User: peterzhang
 * Date: 2020/8/5
 * Time: 9:45 PM
 */
define("ROOT", dirname(dirname(__DIR__)));

require(ROOT . "/src/init.inc.php");

\Luomor\Utils\GitterUtil::testMsg();