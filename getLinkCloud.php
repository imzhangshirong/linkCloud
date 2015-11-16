<?php
/**
 * Created by PhpStorm.
 * User: Jarvis
 * Date: 2015/10/2
 * Time: 16:53
 */
require  'pass.php' ;
$DB_link = @mysql_connect(DB_HOST, DB_USER,DB_PASS);
if(!$DB_link){echo "Database Refused";exit;}
@mysql_query("set names utf8");
@mysql_select_db(DB_NAME);
$data=@mysql_query('SELECT * FROM `'.$_GET['site'].'`');
$temp='[';
$datam=array();
while ( $row  =  mysql_fetch_array($data)) {
	$datam[]=$row;
	$temp.='{"name":"'.$row[1].'","click":"'.$row[2].'"},';
}

$temp=substr ( $temp,  0 , - 1 );
$temp.=']';
echo $temp;
?>

