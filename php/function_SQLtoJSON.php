<?php
//**************************************************************************************************
// SQLtoJSON
//**************************************************************************************************
//
//    include 'php/function_SQLtoArray.php';
//
//    $txtSQL = "SELECT * FROM myTable";
//
//    SQLtoJSON( $txtSQL );
//
//**************************************************************************************************

function SQLtoJSON( $txtSQL ) {

    $qqqSQL = SQLexec( $txtSQL );
    $cntSQL = $qqqSQL->num_rows;

    // ������� ������� ������� � ������
    $json = array();
    for ( $i=0; $i<$cntSQL; $i++ ) {
        $json[$i] = $qqqSQL->fetch_assoc();
    }

    // ��������������� ������� � JSON
    echo json_encode( $json );

}

//**************************************************************************************************
?>