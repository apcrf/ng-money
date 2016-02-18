<?php
//**************************************************************************************************
// Query to the database
//**************************************************************************************************
//
//    include 'php/function_SQLexec.php';
//
//    $qqqSQL = SQLexec( $txtSQL );
//    $cntSQL = $qqqSQL->num_rows;
//    $rowSQL = $qqqSQL->fetch_assoc();
//    $insert_id = $sql->insert_id;
//
//    $qqqSQL->close();
//    $sql->close();
//
//**************************************************************************************************

function SQLexec( $txtSQL ) {

    if ( isset($_SERVER['SERVER_SOFTWARE']) && strpos($_SERVER['SERVER_SOFTWARE'],'Google App Engine') !== false ) {
        // Cloud SQL
        $sql = new mysqli(
            null,
            SQL_USER,
            SQL_PASS,
            SQL_DATABASE,
            null,
            SQL_INSTANCE
        );
    }
    else {
        // Local MySQL
        $sql = new mysqli(
            SQL_INSTANCE,
            SQL_USER,
            SQL_PASS,
            SQL_DATABASE
        );
    }

    if ( mysqli_connect_error() ) {
        exit( 'Failed to connect to MySQL: ' . mysqli_connect_error() );
    }

    // Посылаем запрос серверу
    $qqqSQL = $sql->query( $txtSQL );

    if ( !$qqqSQL ) {
        exit( 'Failed to query MySQL: ' . $sql->error );
    }

    // Возвращаем результат
    if ( substr( trim( $txtSQL ), 0, 6 ) == 'INSERT' ) {
        return $sql->insert_id;
    }
    else {
        return $qqqSQL;
    }

}

//**************************************************************************************************
?>