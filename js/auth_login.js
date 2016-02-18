
//**************************************************************************************************

AppModule.controller("authLoginController", function ( $scope, $http ) {

    // Login & Password
    $scope.auth = {};
    $scope.auth.User_Login = "";
    $scope.auth.User_Pass = "";

    // authMessage
    $scope.authMessage = "";

    // authButtonCaption
    $scope.authButtonCaption = "Войти";

    // authIsDisabled
    $scope.authIsDisabled = false;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Входим...
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.authButtonClick = function () {

        if ( $scope.auth.User_Login.trim() == "" ) {
            $scope.authMessage = "Логин не может быть пустым.";
            return;
        }

        if ( $scope.auth.User_Pass.trim() == "" ) {
            $scope.authMessage = "Пароль не может быть пустым.";
            return;
        }

        $scope.authButtonCaption = "Входим...";
        $scope.authIsDisabled = true;

        var txtRequest = "auth_login";
        txtRequest += "?User_Login=" + $scope.auth.User_Login.trim();
        txtRequest += "&User_Pass=" + $scope.auth.User_Pass.trim();
        $http.get(txtRequest).then(function(response) {

            switch ( response.data ) {
                case "Authentication success." :
                    $scope.user.User_Login = $scope.auth.User_Login.trim();
                    $scope.selectArticle('home_page');
                    break;
                case "Authentication failed." :
                    $scope.authButtonCaption = "Войти";
                    $scope.authIsDisabled = false;
                    $scope.authMessage = "Неправильные логин и/или пароль.";
                    break;
                default :
                    $scope.authButtonCaption = "Войти";
                    $scope.authIsDisabled = false;
                    $scope.authMessage = "Ошибка входа.";
                    break;
            }

        });
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////

});

//**************************************************************************************************
