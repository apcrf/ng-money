
//****************************************************************************************************
// Преобразование даты-объекта в строку DD.MM.YYYY
//****************************************************************************************************
//
// "01.01.1970"
// dmyDate = dateToDMY( new Date );
//
// DMY Date from MySQL
// dmyDate = dateToDMY( new Date( sqlDate ) );
//
//****************************************************************************************************

function dateToDMY( dt ) {

    if ( dt === null ) { return "01.01.1970"; }
    if ( typeof dt === "undefined" ) { return "01.01.1970"; }

    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();

    if ( m < 10 ) { m = "0" + m; }
    if ( d < 10 ) { d = "0" + d; }

    return  d + "." + m + "." + y;

}

//****************************************************************************************************