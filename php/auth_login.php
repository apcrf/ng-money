<?php
//**************************************************************************************************
// Аутентификация пользователя
//**************************************************************************************************

session_start();

// В этом скрипте не нужно проверять существование сессии

include '../config.php';
include 'function_SQLexec.php';
include 'function_txtToSQL.php';

//**************************************************************************************************

if ( !isset( $_GET['User_Login'] ) ) {
    exit( 'Login is not specified.' );
}

if ( !isset( $_GET['User_Pass'] ) ) {
    exit( 'Password is not specified.' );
}

//**************************************************************************************************

$_GET_User_Login = txtToSQL( $_GET['User_Login'] );
$_GET_User_Pass = txtToSQL( $_GET['User_Pass'] );

$txtSQL = <<<HERE
    SELECT *
        FROM ng_users
        WHERE User_Login LIKE '$_GET_User_Login'
          AND User_Pass LIKE '$_GET_User_Pass'
HERE;

$qqqSQL = SQLexec( $txtSQL );
$cntSQL = $qqqSQL->num_rows;

if ( $cntSQL == 0 ) {
    exit( 'Authentication failed.' );
}

// ID Пользователя
$rowSQL = $qqqSQL->fetch_assoc();

// Сессия Пользователя
$_SESSION['User_ID'] = $rowSQL['User_ID'];
$_SESSION['User_Login'] = $rowSQL['User_Login'];
exit( 'Authentication success.' );

//**************************************************************************************************
?>