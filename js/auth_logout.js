
//**************************************************************************************************

AppModule.controller("authLogoutController", function ( $scope, $http ) {

    // authButtonCaption
    $scope.authButtonCaption = "Выйти";

    // authIsDisabled
    $scope.authIsDisabled = false;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Выходим...
    ////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.authButtonClick = function () {

        $scope.authButtonCaption = "Выходим...";
        $scope.authIsDisabled = true;

        var txtRequest = "auth_logout";
        $http.get(txtRequest).then(function(response) {
            $scope.user.User_Login = "";
            $scope.selectArticle('landing_page');
        });
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////

});

//**************************************************************************************************
