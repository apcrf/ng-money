
//**************************************************************************************************

AppModule.controller("statisticsController", function ( $scope, $http ) {

    $scope.stat = {};

    // Отчёт (таблица)
    $scope.stat.Report = [];

    // Селектор Отчёта
    $scope.stat.Selector = "0";
    $scope.stat.Selectors = [
        { "ID":"0", "Text":"Итого", "Group":"Итоги" },
        { "ID":"1", "Text":"Доход, Расход, Остаток", "Group":"Итоги" }
    ];
    $scope.stat.HTML = "";

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Загрузка отчёта
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataLoad = function () {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        switch ( $scope.stat.Selector ) {
            case "0" :
                $scope.stat.HTML = "stat_total";
                $scope.dataTotal();
                break;
            case "1" :
                $scope.stat.HTML = "stat_debet_kredit_total";
                $scope.dataDebetKreditTotal();
                break;
        }

        $scope.periodRec();


        wait.release();

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Итого
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataTotal = function () {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        $scope.periodRec();

        var txtRequest = "statistics";
        txtRequest += "?queryType=dataTotal";
        txtRequest += "&period_b=" + $scope.period.b;
        txtRequest += "&period_e=" + $scope.period.e;
        $http.get(txtRequest).then(function(response) {
            wait.release();
            switch ( true ) {
                case typeof response.data == "object" :
                    $scope.stat.Report = response.data;
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
    // Доход, Расход, Остаток
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.dataDebetKreditTotal = function () {

        var wait = new classWait();
        wait.txtMessage = "Пожалуйста, подождите...";
        wait.show();

        $scope.periodRec();

        var txtRequest = "statistics";
        txtRequest += "?queryType=dataDebetKreditTotal";
        txtRequest += "&period_b=" + $scope.period.b;
        txtRequest += "&period_e=" + $scope.period.e;
        $http.get(txtRequest).then(function(response) {
            wait.release();
            switch ( true ) {
                case typeof response.data == "object" :
                    $scope.stat.Report = response.data;
                    var Money_Total = 0;
                    for ( var i=$scope.stat.Report.length-1; i>=0; i-- ) {
                        o = $scope.stat.Report[i];
                        o.Money_Date = dateToDMY( new Date( o.Money_Date ) );
                        Money_Total += o.Money_Debet - o.Money_Kredit;
                        o.Money_Total = ( Money_Total ).toFixed(2);
                        if ( o.Money_Debet == "0.00" )  { o.Money_Debet = ""; }
                        if ( o.Money_Kredit == "0.00" ) { o.Money_Kredit = ""; }
                        // Для записи "Остаток на начало"
                        if ( i == $scope.stat.Report.length-1 ) {
                            o.Money_Date = "";
                            o.Money_Debet = "";
                            o.Money_Kredit = "";
                        }
                    }
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
