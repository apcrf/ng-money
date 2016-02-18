
//****************************************************************************************************
// txtToSQL
//****************************************************************************************************
//
//    var txtVar = "  d'Artanjan ";
//    txtSQL += txtToSQL( txtVar, 50 );
//
//****************************************************************************************************

function txtToSQL( txtVar, txtLen ) {

     // Длина по умолчанию
     txtLen = txtLen || 0;

     // Преобразование типа
     if ( txtVar == null ) txtVar = "";
     txtVar = txtVar.toString();

     // Ряд символов над цифрами
     // Не требуется кодирование для символов: `~!@-

     txtVar = txtVar.replace( /%/g, "%25" ); // На 1м месте!!!
     txtVar = txtVar.replace( /#/g, "%23" );
     txtVar = txtVar.replace( "$", "%24" );
     // "%" см. выше
     txtVar = txtVar.replace( "^", "%5e" );
     txtVar = txtVar.replace( /&/g, "%26" );
     txtVar = txtVar.replace( "*", "%2a" );
     txtVar = txtVar.replace( "(", "%28" );
     txtVar = txtVar.replace( ")", "%29" );
     txtVar = txtVar.replace( "_", "%5f" );
     txtVar = txtVar.replace( /\+/g, "%2B" );
     txtVar = txtVar.replace( "=", "%3d" );

     // Перенос строки
     txtVar = txtVar.replace( /\r\n|\r|\n/g, "%0A" );

     // Не требуется кодирование для символов: [ ] { } | : ; " ' < > , . / ?

     // Замена апострофа - будет выполнена в PHP
     //txtVar = txtVar.replace( /'/g, "''" );

     // Замена обратного слеша - будет выполнена в PHP
     //txtVar = txtVar.replace( "\\", "%5c" );

     // Удаляются пробелы в начале и в конце строки
     txtVar = txtVar.replace( /(^\s+|\s+$)/g, "" );

     // Кодирует символы, которые не нужно кодировать, например: janusik_s%40mail.ru ??????????
     // Encode URL
     //txtVar = encodeURIComponent( txtVar );

     // Ограничение длины строки
     if ( txtLen > 0 ) {
         txtVar = txtVar.substr( 0, txtLen );
     }

     return txtVar;

}

//****************************************************************************************************
