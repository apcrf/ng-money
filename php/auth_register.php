<?php
//**************************************************************************************************
// Регистрация пользователя
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

if ( empty($_GET_User_Login) ) {
    exit( 'Login can not be empty.' );
}

//**************************************************************************************************

$txtSQL = <<<HERE
    SELECT *
        FROM ng_users
        WHERE User_Login LIKE '$_GET_User_Login'
HERE;

$qqqSQL = SQLexec($txtSQL);
$cntSQL = $qqqSQL->num_rows;

if ( $cntSQL > 0 ) {
    exit( 'Login already exists.' );
}

//**************************************************************************************************

// Добавление Пользователя
$txtSQL = <<<HERE
    INSERT INTO ng_users (
        User_Login, User_Pass
    ) VALUES (
   '$_GET_User_Login', '$_GET_User_Pass'
    )
HERE;

$insert_id = SQLexec( $txtSQL );

// Сессия нового Пользователя
$_SESSION['User_ID'] = $insert_id;
$_SESSION['User_Login'] = $_GET_User_Login;
exit( 'Registration success.' );

//**************************************************************************************************
?>