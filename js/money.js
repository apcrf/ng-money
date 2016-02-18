
//**************************************************************************************************

AppModule.controller("moneyController", function ( $scope, $http ) {

    // Деньги (таблица)
    $scope.money = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Загрузка списка
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataLoad = function () {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        $scope.periodRec();

        var txtRequest = "money";
        txtRequest += "?queryType=dataLoad";
        txtRequest += "&period_b=" + $scope.period.b;
        txtRequest += "&period_e=" + $scope.period.e;
        $http.get(txtRequest).then(function(response) {
            wait.release();
            switch ( true ) {
                case typeof response.data == "object" :
                    $scope.money = response.data;
                    $scope.money.forEach( function (item, i, arr) {
                        item.Money_Date_obj = new Date( item.Money_Date );
                        if ( item.Money_Debet == "0.00" )  { item.Money_Debet = ""; }
                        if ( item.Money_Kredit == "0.00" ) { item.Money_Kredit = ""; }
                    });
                    break;
                case response.data == "Session not exists." :
                    $scope.httpLogin();
                    break;
                default :
                    alert( response.data );
                    break;
            }
        });

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Добавление записи
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataInsert = function () {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        var Money_Date = dateToString( new Date );

        var txtRequest = "money";
        var txtParams = "queryType=dataInsert";
        txtParams += "&Money_Date=" + Money_Date;
        $http({
            method: "POST",
            url: txtRequest,
            data: txtParams,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response) {
            wait.release();
            switch ( true ) {
                case typeof response.data == "object" :
                    $scope.money.unshift({});
                    $scope.money[0].Money_ID = response.data.LAST_INSERT_ID;
                    $scope.money[0].Money_Date = Money_Date;
                    $scope.money[0].Money_Date_obj = new Date( Money_Date );
                    break;
                case response.data == "Session not exists." :
                    $scope.httpLogin();
                    break;
                default :
                    alert(response.data);
                    break;
            }
        });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Редактирование записи
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataUpdateKeypress = function ( event ) {
        if ( event.keyCode == 13 ) {
            event.target.blur();
        }
    }

    $scope.dataUpdateBlur = function ( index ) {
        if ( $scope.moneyForm.$dirty ) {
            $scope.dataUpdate( index );
        }
    }

    $scope.dataUpdate = function ( index ) {

        var txtRequest = "money";
        var txtParams = "queryType=dataUpdate";
        var v = dateToString( $scope.money[index].Money_Date_obj );
        $scope.money[index].Money_Date = v;
        $scope.money[index].Money_Date_obj = new Date( v );
        txtParams += "&Money_Date=" + v;
        var v = decimalFormat( $scope.money[index].Money_Debet );
        $scope.money[index].Money_Debet = v;
        txtParams += "&Money_Debet=" + ( v ? v : 0 );
        var v = decimalFormat( $scope.money[index].Money_Kredit );
        $scope.money[index].Money_Kredit = v;
        txtParams += "&Money_Kredit=" + ( v ? v : 0 );
        txtParams += "&Money_Category=" + txtToSQL( $scope.money[index].Money_Category );
        txtParams += "&Money_Note=" + txtToSQL( $scope.money[index].Money_Note );
        txtParams += "&ID=" + txtToSQL( $scope.money[index].Money_ID );
        $http({
            method: "POST",
            url: txtRequest,
            data: txtParams,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response) {
            switch ( true ) {
                case response.data == "" :
                    // Update successfully
                    $scope.moneyForm.$setPristine();
                    break;
                case response.data == "Session not exists." :
                    $scope.httpLogin();
                    break;
                default :
                    alert(response.data);
                    break;
            }
        });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Удаление записи
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataDelete = function ( index ) {

        o = new classBox();
        o.txtTitle = "Удаление";
        o.srcImage = "images/class_box_quest.png";
        o.txtMessage = "Удалить запись?";
        o.txtButtons[0] = "Нет";
        o.txtButtons[1] = "Да";
        o.show();
        o.btnClose.onclick = function( box ) { return function () { box.release(); } } ( o );
        o.divButtons[0].onclick = function( box ) { return function () { box.release(); } } ( o );
        o.divButtons[1].onclick = function( box, index ) { return function () { $scope.dataDeleting( index ); box.release(); } } ( o, index );

    }

    $scope.dataDeleting = function ( index ) {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        var txtRequest = "money";
        txtRequest += "?queryType=dataDelete";
        txtRequest += "&ID=" + $scope.money[index].Money_ID;
        $http.get(txtRequest).then(function(response) {
            wait.release();
            switch ( true ) {
                case response.data == "" :
                    // Deleted successfully
                    $scope.money.splice( index, 1 );
                    break;
                case response.data == "Session not exists." :
                    $scope.httpLogin();
                    break;
                default :
                    alert( response.data );
                    break;
            }
        });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Инициализация
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataLoad();

    ////////////////////////////////////////////////////////////////////////////////////////////////

});

//**************************************************************************************************
