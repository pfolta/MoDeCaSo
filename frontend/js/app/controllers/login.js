/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/login.js
 * Created:			2014-10-19
 * Last modified:	2014-11-02
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "loginCtrl",
    [
        "$rootScope",
        "$scope",
        "$sce",
        "$state",
        "authService",
        "cfpLoadingBar",
        function($rootScope, $scope, $sce, $state, authService, cfpLoadingBar)
        {
            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.login = function()
            {
                cfpLoadingBar.start();

                authService.login($scope.login.username, $scope.login.password).then(function(result)
                {
                    if (result) {
                        $state.go($rootScope.redirectTo);
                    } else {
                        /*
                         * Set error message
                         */
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Invalid username or password."

                        /*
                         * Shake login form
                         */
                        shake_element($("#login_form").children(2));

                        /*
                         * Add error class to panel
                         */
                        $("#login_form").children(2).removeClass("panel-primary").addClass("panel-danger");

                        /*
                         * Add error class to input groups
                         */
                        $("#login_username_group").toggleClass("has-error", true);
                        $("#login_password_group").toggleClass("has-error", true);
                    }
                });

                cfpLoadingBar.complete();
            }
        }
    ]
);