
//**************************************************************************************************

AppModule.controller("authRegisterController", function ( $scope, $http ) {

    // Login & Password
    $scope.auth = {};
    $scope.auth.User_Login = "";
    $scope.auth.User_Pass_1 = "";
    $scope.auth.User_Pass_2 = "";

    // authMessage
    $scope.authMessage = "";

    // authButtonCaption
    $scope.authButtonCaption = "Зарегистрироваться";

    // authIsDisabled
    $scope.authIsDisabled = false;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Регистрируемся...
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.authButtonClick = function () {

        if ( $scope.auth.User_Login.trim() == "" ) {
            $scope.authMessage = "Логин не может быть пустым.";
            return;
        }

        var pattern = /^[0-9a-zA-Zа-яёА-ЯЁ\-\_\!\?\(\)]+$/;
        if ( !pattern.test( $scope.auth.User_Login.trim() ) ) {
            $scope.authMessage = "Логин содержит недопустимые символы.";
            return;
        }

        if ( $scope.auth.User_Pass_1.trim() == "" || $scope.auth.User_Pass_2.trim() == "" ) {
            $scope.authMessage = "Пароль не может быть пустым.";
            return;
        }

        var pattern = /^[0-9a-zA-Zа-яёА-ЯЁ\-\_\!\?\(\)]+$/;
        if ( !pattern.test( $scope.auth.User_Pass_1.trim() ) ) {
            $scope.authMessage = "Пароль содержит недопустимые символы.";
            return;
        }

        if ( $scope.auth.User_Pass_1.trim() !=  $scope.auth.User_Pass_2.trim() ) {
            $scope.authMessage = "Пароли не совпадают.";
            return;
        }

        $scope.authButtonCaption = "Регистрируемся...";
        $scope.authIsDisabled = true;

        var txtRequest = "auth_register";
        txtRequest += "?User_Login=" + $scope.auth.User_Login.trim();
        txtRequest += "&User_Pass=" + $scope.auth.User_Pass_1.trim();
        $http.get(txtRequest).then(function(response) {

            switch ( response.data ) {
                case "Registration success." :
                    $scope.user.User_Login = $scope.auth.User_Login.trim();
                    $scope.selectArticle('home_page');
                    break;
                case "Login already exists." :
                    $scope.authButtonCaption = "Зарегистрироваться";
                    $scope.authIsDisabled = false;
                    $scope.authMessage = "Такой логин уже существует.";
                    break;
                default :
                    $scope.authButtonCaption = "Зарегистрироваться";
                    $scope.authIsDisabled = false;
                    $scope.authMessage = "Ошибка регистрации.";
                    break;
            }

        });
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////

});

//**************************************************************************************************
