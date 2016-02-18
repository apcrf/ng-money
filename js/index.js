
//**************************************************************************************************

var AppModule = angular.module("App", []);

//**************************************************************************************************

AppModule.controller("Controller", function ( $scope, $http ) {

    // Приложение
    $scope.app = {};
    $scope.app.name = "ng-money";
    $scope.app.about = "облачный учёт денег";

    // Имя выбранной Article
    $scope.selectedArticle = "empty_page";

    // Авторизовавшийся пользователь
    $scope.user = {};
    $scope.user.User_Login = "";

    // Период
    $scope.period = {};
    $scope.period.Selector = "0";
    $scope.period.Year = new Date().getFullYear();
    $scope.period.Selectors = [
        { "ID":"0",   "Text":"Последние 30 дней", "Group":"Период" },
        { "ID":"300", "Text":"От: и до:",         "Group":"Период" },
        { "ID":"500", "Text":"Весь год",          "Group":"Период" },
        { "ID":"1",   "Text":"Январь",   "Group":"Месяцы" },
        { "ID":"2",   "Text":"Февраль",  "Group":"Месяцы" },
        { "ID":"3",   "Text":"Март",     "Group":"Месяцы" },
        { "ID":"4",   "Text":"Апрель",   "Group":"Месяцы" },
        { "ID":"5",   "Text":"Май",      "Group":"Месяцы" },
        { "ID":"6",   "Text":"Июнь",     "Group":"Месяцы" },
        { "ID":"7",   "Text":"Июль",     "Group":"Месяцы" },
        { "ID":"8",   "Text":"Август",   "Group":"Месяцы" },
        { "ID":"9",   "Text":"Сентябрь", "Group":"Месяцы" },
        { "ID":"10",  "Text":"Октябрь",  "Group":"Месяцы" },
        { "ID":"11",  "Text":"Ноябрь",   "Group":"Месяцы" },
        { "ID":"12",  "Text":"Декабрь",  "Group":"Месяцы" },
        { "ID":"101", "Text":"I квартал",   "Group":"Кварталы" },
        { "ID":"102", "Text":"II квартал",  "Group":"Кварталы" },
        { "ID":"103", "Text":"III квартал", "Group":"Кварталы" },
        { "ID":"104", "Text":"IV квартал",  "Group":"Кварталы" },
        { "ID":"201", "Text":"1-е полугодие", "Group":"Полугодия" },
        { "ID":"202", "Text":"2-е полугодие", "Group":"Полугодия" }
    ];
    $scope.period.b = "";
    $scope.period.e = "";
    $scope.period.b_obj = {};
    $scope.period.e_obj = {};

    // Проверка существования сессии
    var txtRequest = "index_load";
    $http.get(txtRequest).then(function(response) {

        switch ( response.data.Status ) {
            case "Session exists." :
                $scope.user.User_Login = response.data.User_Login;
                $scope.selectedArticle = "money";
                break;
            case "Session not exists." :
            default :
                $scope.user.User_Login = "";
                $scope.selectedArticle = "landing_page";
                break;
        }

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Выбор Article
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.selectArticle = function ( nameArticle ) {

        // Переход к началу страницы при смене Article
        scroll(0,0);

        // Загрузка выбранной Article
        $scope.selectedArticle = nameArticle;

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Переход на страницу auth_login из $http
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.httpLogin = function () {

        $scope.user.User_Login = "";
        $scope.selectArticle( "auth_login" );

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Вычисление дат начала и конца периода
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.periodRec = function () {
        switch ( $scope.period.Selector ) {
            case "0" :
                var today = new Date();
                var pb = new Date( today.setDate( today.getDate() - 29 ) );
                var pe = new Date();
                $scope.period.b = dateToString( pb );
                $scope.period.e = dateToString( pe );
                break;
            case "300" :
                $scope.period.b = dateToString( $scope.period.b_obj );
                $scope.period.e = dateToString( $scope.period.e_obj );
                break;
            case "500" :
                var sY = $scope.period.Year.toString();
                var y = ("0000"+sY).substring(sY.length);
                $scope.period.b = y + "-" + "01" + "-" + "01";
                $scope.period.e = y + "-" + "12" + "-" + "31";
                break;
            case "1" :
            case "2" :
            case "3" :
            case "4" :
            case "5" :
            case "6" :
            case "7" :
            case "8" :
            case "9" :
            case "10" :
            case "11" :
            case "12" :
                var sY = $scope.period.Year.toString();
                var sM = $scope.period.Selector; // месяц 1-12
                var y = ("0000"+sY).substring(sY.length);
                var m = ("00"+sM).substring(sM.length);
                $scope.period.b = y + "-" + m + "-" + "01";
                $scope.period.e = y + "-" + m + "-" + monthLong( $scope.period.Year, $scope.period.Selector-1 );
                break;
            case "101" :
            case "102" :
            case "103" :
            case "104" :
                var sY = $scope.period.Year.toString();
                var sQ = $scope.period.Selector - 100; // квартал 1-4
                var y = ("0000"+sY).substring(sY.length);
                var m = [ ["01","03"], ["04","06"], ["07","09"], ["10","12"] ]; // месяцы в кварталах
                $scope.period.b = y + "-" + m[sQ-1][0] + "-" + "01";
                $scope.period.e = y + "-" + m[sQ-1][1] + "-" + monthLong( $scope.period.Year, m[sQ-1][1]-1 );
                break;
            case "201" :
            case "202" :
                var sY = $scope.period.Year.toString();
                var sH = $scope.period.Selector - 200; // полугодие 1-2
                var y = ("0000"+sY).substring(sY.length);
                var m = [ ["01","06"], ["07","12"] ]; // месяцы в полугодиях
                $scope.period.b = y + "-" + m[sH-1][0] + "-" + "01";
                $scope.period.e = y + "-" + m[sH-1][1] + "-" + monthLong( $scope.period.Year, m[sH-1][1]-1 );
                break;
            default :
                $scope.period.b = "";
                $scope.period.e = "";
                break;
        }

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Инициализация
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.periodRec();

    $scope.period.b_obj = new Date( dateToString( new Date ) );
    $scope.period.e_obj = new Date( dateToString( new Date ) );

    ////////////////////////////////////////////////////////////////////////////////////////////////

});

//**************************************************************************************************
