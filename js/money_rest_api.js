
//**************************************************************************************************
//
// Сервис moneyRestAPI ( тип сервиса: factory )
//
// Загрузка записей из БД за определённый период времени
// moneyRestAPI.dataLoad(period_b,period_e)
//     Параметры:
//         period_b - дата начала периода
//         period_e - дата окончания периода
//     Ответ:
//         JSON
//
// Добавление новой записи с текущей датой
// moneyRestAPI.dataInsert()
//     Параметры:
//         нет
//     Ответ:
//         JSON с ID добавленной записи
//
// Обновление примечания записи с указанным ID
// moneyRestAPI.dataUpdate(Money_ID, Money_Note)
//     Параметры:
//         Money_ID - ID записи
//         Money_Note - Примечание записи
//     Ответ:
//         нет
//
// Удаление записи с указанным ID
// moneyRestAPI.dataDelete(Money_ID)
//     Параметры:
//         Money_ID - ID записи
//     Ответ:
//         нет
//
//**************************************************************************************************

var AppModule = angular.module("App", []);

//**************************************************************************************************

AppModule.controller('Controller', ['$scope', 'moneyRestAPI', function ($scope, moneyRestAPI) {

    $scope.responseAPI = "Здесь будет ответ moneyRestAPI";

    $scope.moneyLoad = function(period_b,period_e) {
        moneyRestAPI.dataLoad(period_b,period_e).then(function (response) {
            $scope.responseAPI = response.data;
        }, function (error) {
            $scope.status = 'Unable to load data: ' + error.message;
        });
    }

    $scope.moneyInsert = function() {
        moneyRestAPI.dataInsert().then(function (response) {
            $scope.responseAPI = response.data;
        }, function (error) {
            $scope.status = 'Unable to insert data: ' + error.message;
        });
    }

    $scope.moneyUpdate = function(Money_ID, Money_Note) {
        moneyRestAPI.dataUpdate(Money_ID, Money_Note).then(function (response) {
            $scope.responseAPI = response.data;
        }, function (error) {
            $scope.status = 'Unable to update data: ' + error.message;
        });
    }

    $scope.moneyDelete = function(Money_ID) {
        moneyRestAPI.dataDelete(Money_ID).then(function (response) {
            $scope.responseAPI = response.data;
        }, function (error) {
            $scope.status = 'Unable to delete: ' + error.message;
        });
    }

}]);

//**************************************************************************************************

AppModule.factory('moneyRestAPI', ['$http', function ($http) {

    var factory = {};

    factory.dataLoad = function(period_b,period_e) {
        var txtRequest = "money";
        txtRequest += "?queryType=dataLoad";
        txtRequest += "&period_b=" + period_b;
        txtRequest += "&period_e=" + period_e;
        return $http.get(txtRequest);
    };

    factory.dataInsert = function() {
        var txtRequest = "money";
        var txtParams = "queryType=dataInsert";
        txtParams += "&Money_Date=" + dateToString( new Date );
        return $http({
            method: "POST",
            url: txtRequest,
            data: txtParams,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    };

    factory.dataUpdate = function(Money_ID, Money_Note) {
        var txtRequest = "money";
        var txtParams = "queryType=dataUpdate";
        txtParams += "&Money_Note=" + txtToSQL( Money_Note );
        txtParams += "&ID=" + Money_ID;
        return $http({
            method: "POST",
            url: txtRequest,
            data: txtParams,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    };

    factory.dataDelete = function(Money_ID) {
        var txtRequest = "money";
        txtRequest += "?queryType=dataDelete";
        txtRequest += "&ID=" + Money_ID;
        return $http.get(txtRequest);
    };

    return factory;

}]);

//**************************************************************************************************
