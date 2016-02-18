<?php
//**************************************************************************************************
//
// GET  /money?queryType=dataLoad&period_b=2015-01-01&period_e=2017-01-01
// POST /money?queryType=dataInsert&Money_Date=2015-02-03&Money_Category=dataInsert
// POST /money?queryType=dataUpdate&ID=31&Money_Category=dataUpdate
// GET  /money?queryType=dataDelete&ID=23
//
//**************************************************************************************************

session_start();

if ( !isset( $_SESSION['User_ID'] ) or $_SESSION['User_ID'] == 0 ) {
    exit( 'Session not exists.' );
}

//**************************************************************************************************

include '../config.php';
include 'function_SQLexec.php';
include 'function_SQLtoJSON.php';
include 'function_txtToSQL.php';

//**************************************************************************************************

switch ( $_REQUEST['queryType'] ) {
    case "dataLoad" :   dataLoad();   break;
    case "dataInsert" : dataInsert(); break;
    case "dataUpdate" : dataUpdate(); break;
    case "dataDelete" : dataDelete(); break;
    default : exit('Unknown "queryType".'); break;
}

//**************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////
//**************************************************************************************************

function dataLoad() {

    $_User_ID = $_SESSION['User_ID'];

    if (isset($_GET['period_b'])) { $_period_b = txtToSQL($_GET['period_b']); }
    else { exit('Variable "period_b" is not defined.'); }

    if (isset($_GET['period_e'])) { $_period_e = txtToSQL($_GET['period_e']); }
    else { exit('Variable "period_e" is not defined.'); }

    //----------------------------------------------------------------------------------------------

    $txtSQL = <<<HERE
        SELECT *
        FROM ng_money
        WHERE Money_User_ID = $_User_ID
          AND Money_Date >= '$_period_b'
          AND Money_Date <= '$_period_e'
         ORDER BY Money_Date DESC, Money_ID DESC
HERE;

    SQLtoJSON( $txtSQL );

}

//****************************************************************************************************

function dataInsert() {

    $_User_ID = $_SESSION['User_ID'];

    $txtSQL = "";
    foreach ( $_POST as $key => $value ) {
        // Эти параметры - не поле БД
        if ( $key == 'queryType' ) continue;
        // В этих полях изменения запрещены
        if ( $key == 'Money_User_ID' ) continue;
        if ( $key == 'Money_ID' ) continue;
        // Поля и их значения
        $txtSQL = $txtSQL . $key . " = '" . txtToSQL( $value ) . "', ";
    }
    $txtSQL .= "Money_User_ID = " . $_User_ID;

    //----------------------------------------------------------------------------------------------

    $txtSQL = <<<HERE
        INSERT
        INTO ng_money
        SET $txtSQL;
HERE;

    $insert_id = SQLexec( $txtSQL );

    // LAST_INSERT_ID
    echo '{"LAST_INSERT_ID":"' . $insert_id . '"}';

}

//****************************************************************************************************

function dataUpdate() {

    $_User_ID = $_SESSION['User_ID'];

    if (isset($_POST['ID'])) { $_ID = txtToSQL($_POST['ID']); }
    else { exit('Variable "ID" is not defined.'); }

    $txtSQL = "";
    foreach ( $_POST as $key => $value ) {
        // Эти параметры - не поле БД
        if ( $key == 'queryType' ) continue;
        // В этих полях изменения запрещены
        if ( $key == 'Money_User_ID' ) continue;
        if ( $key == 'Money_ID' ) continue;
        if ( $key == 'ID' ) continue;
        // Поля и их значения
        $txtSQL = $txtSQL . $key . " = '" . txtToSQL( $value ) . "', ";
    }
    $txtSQL = substr( $txtSQL, 0, -2 );

    //----------------------------------------------------------------------------------------------

    $txtSQL = <<<HERE
        UPDATE
        ng_money
        SET $txtSQL
        WHERE Money_User_ID = $_User_ID
          AND Money_ID = $_ID
HERE;

    SQLexec($txtSQL);

}

//**************************************************************************************************

function dataDelete() {

    $_User_ID = $_SESSION['User_ID'];

    if (isset($_GET['ID'])) { $_ID = txtToSQL($_GET['ID']); }
    else { exit('Variable "ID" is not defined.'); }

    //----------------------------------------------------------------------------------------------

    $txtSQL = <<<HERE
        DELETE
        FROM ng_money
        WHERE Money_User_ID = $_User_ID
          AND Money_ID = $_ID
HERE;

    SQLexec($txtSQL);

}

//**************************************************************************************************
?>