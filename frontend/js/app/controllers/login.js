/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/login.js
 * Created:			2014-10-19
 * Last modified:	2014-11-12
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "login_controller",
    [
        "$rootScope",
        "$scope",
        "$sce",
        "$state",
        "auth_service",
        "cfpLoadingBar",
        function($rootScope, $scope, $sce, $state, auth_service, cfpLoadingBar)
        {
            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.login = function()
            {
                cfpLoadingBar.start();

                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#login_username_group :input").prop("disabled", true);
                $("#login_password_group :input").prop("disabled", true);
                $("#login_submit_button").prop("disabled", true);

                auth_service.login($scope.login.username, $scope.login.password).then(function(result)
                {
                    if (result == "login_successful") {
                        $state.go("/dashboard");
                    } else {
                        /*
                         * Enable form elements
                         */
                        $("#login_username_group :input").prop("disabled", false);
                        $("#login_password_group :input").prop("disabled", false);
                        $("#login_submit_button").prop("disabled", false);

                        /*
                         * Set error message
                         */
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> ";

                        if (result == "invalid_credentials") {
                            $scope.flash.message += " Invalid username or password.<br><span class='glyphicon glyphicon-placeholder'></span> Please try again.";
                        } else if (result == "account_disabled") {
                            $scope.flash.message += " Your user account has been disabled.<br><span class='glyphicon glyphicon-placeholder'></span> Please see your system administrator.";
                        }

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