<?php
/**
 * Created by PhpStorm.
 * User: Jarvis
 * Date: 2015/10/2
 * Time: 17:46
 */
require  'pass.php' ;
$DB_link = @mysql_connect(DB_HOST, DB_USER,DB_PASS);
if(!$DB_link){echo "Database Refused";exit;}
@mysql_query("set names utf8");
@mysql_select_db(DB_NAME);
$data=mysql_query('UPDATE `'.$_GET['site'].'` SET `click`=`click`+1 WHERE `name`="'.$_GET['name'].'"');