
//****************************************************************************************************
//
// Форматирование десятичного числа
//
//****************************************************************************************************
// d = decimalFormat( d );
//****************************************************************************************************

function decimalFormat( d, decimalPlaces ) {

    // decimalPlaces по умолчанию
    decimalPlaces = decimalPlaces || 2;

    if ( d === null ) { return ""; }
    if ( typeof d === "undefined" ) { return ""; }

    // Replace: , -> .
    if ( d.indexOf(",") > -1 ) {
        d = d.replace( ",", "." );
    }

    // Remove doubles .
    while ( true ) {
        var dotIndex2 = d.indexOf( ".", d.indexOf(".")+1 );
        if ( dotIndex2 == -1 ) { break; }
        d = d.substr(0,dotIndex2) + d.substr(dotIndex2+1)
    }

    // Remove all characters except "0123456789-."
    var regExp = /[^0-9\-\.]/gi;
    if ( regExp.test(d) ) {
        d = d.replace( regExp, "" );
    }

    // Remove doubles -
    while ( true ) {
        var minusIndex2 = d.indexOf( "-", d.indexOf("-")+1 );
        if ( minusIndex2 == -1 ) { break; }
        d = d.substr(0,minusIndex2) + d.substr(minusIndex2+1)
    }

    // Remove not first -
    if ( d.indexOf("-") > 0 ) { d = d.replace( "-", "" ); }

    // Add Decimal Places
    if ( d.length > 0 ) {
        var dotIndex = d.indexOf(".");
        if ( dotIndex == -1 ) { d += "."; }
        for ( var i=0; i<decimalPlaces; i++ ) { d += "0"; }
    }

    // Remove extraDecPlaces
    var dotIndex = d.indexOf(".");
    if ( dotIndex > -1 ) {
        var extraDecPlaces = d.length - (dotIndex + 1 + decimalPlaces);
        if ( extraDecPlaces > 0 ) d = d.substr( 0, d.length-extraDecPlaces );
    }

    // Add leading zero
    if ( d.indexOf( "." ) == 0 ) { d = "0" + d; }
    if ( d.indexOf( "-." ) == 0 ) { d = "-0" + d.substr(1); }

    // 0 -> empty
    if ( d == "0.00" || d == "-0.00" ) { d = ""; }

    return d;

}

//****************************************************************************************************
