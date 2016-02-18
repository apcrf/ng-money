<?php
//**************************************************************************************************
//
// GET  /statistics?queryType=dataTotal&period_b=2015-01-01&period_e=2017-01-01
// GET  /statistics?queryType=dataDebetKreditTotal&period_b=2015-01-01&period_e=2017-01-01
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

$_User_ID = $_SESSION['User_ID'];

if (isset($_GET['period_b'])) { $_period_b = txtToSQL($_GET['period_b']); }
else { exit('Variable "period_b" is not defined.'); }

if (isset($_GET['period_e'])) { $_period_e = txtToSQL($_GET['period_e']); }
else { exit('Variable "period_e" is not defined.'); }

//**************************************************************************************************

switch ( $_REQUEST['queryType'] ) {
    case "dataTotal" : dataTotal(); break;
    case "dataDebetKreditTotal" : dataDebetKreditTotal(); break;
    default : exit('Unknown "queryType".'); break;
}

//**************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////
//**************************************************************************************************

function dataTotal() {

    global $_User_ID, $_period_b, $_period_e;

    $txtSQL = <<<HERE
        SELECT
            SUM( IF( Money_Date < '$_period_b', Money_Debet - Money_Kredit, 0 ) ) AS Money_Rest,
            SUM( IF( Money_Date >= '$_period_b', Money_Debet, 0 ) ) AS Money_Debet,
            SUM( IF( Money_Date >= '$_period_b', Money_Kredit, 0 ) ) AS Money_Kredit,
            SUM( Money_Debet - Money_Kredit ) AS Money_Total
        FROM ng_money
        WHERE Money_User_ID = $_User_ID
          AND Money_Date <= '$_period_e'
HERE;

    SQLtoJSON( $txtSQL );

}

//****************************************************************************************************

function dataDebetKreditTotal() {

    global $_User_ID, $_period_b, $_period_e;

    $txtSQL = <<<HERE
        SELECT Money_ID, Money_Date, Money_Debet, Money_Kredit, Money_Category, Money_Note
        FROM ng_money
        WHERE Money_User_ID = $_User_ID
          AND Money_Date >= '$_period_b'
          AND Money_Date <= '$_period_e'

        UNION ALL

        SELECT 0 AS Money_ID,
            '' AS Money_Date,
            SUM(Money_Debet) AS Money_Debet,
            SUM(Money_Kredit) AS Money_Kredit,
            'Остаток на начало' AS Money_Category,
            '' AS Money_Note
        FROM ng_money
        WHERE Money_User_ID = $_User_ID
          AND Money_Date < '$_period_b'

        ORDER BY Money_Date DESC, Money_ID DESC
HERE;

    SQLtoJSON( $txtSQL );

}

//****************************************************************************************************
?>