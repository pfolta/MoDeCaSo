/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/login.js
 * Created:			2014-10-19
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "login_controller",
    [
        "$rootScope",
        "$scope",
        "$sce",
        "$state",
        "auth_service",
        "session_service",
        "cfpLoadingBar",
        function($rootScope, $scope, $sce, $state, auth_service, session_service, cfpLoadingBar)
        {
            if (session_service.get("login_message")) {
                switch (session_service.get("login_message")) {
                    case "session_timeout":
                        $scope.flash = {
                            "show":     true,
                            "type":     "alert-warning",
                            "message":  "<span class='glyphicon glyphicon-warning-sign'></span> <strong>Your session has expired!</strong><br><span class='glyphicon glyphicon-placeholder'></span> Your session has expired due to inactivity. Please log in again."
                        };

                        break;
                    case "logged_out":
                        $scope.flash = {
                            "show":     true,
                            "type":     "alert-info",
                            "message":  "<span class='glyphicon glyphicon-info-sign'></span> <strong>You have successfully logged out!</strong><br><span class='glyphicon glyphicon-placeholder'></span> Thank you for using MoDeCaSo."
                        };

                        break;
                }

                session_service.unset("login_message");
            } else {
                $scope.flash = {
                    "show":     true,
                    "type":     "alert-info",
                    "message":  "<span class='glyphicon glyphicon-info-sign'></span> <strong>Welcome to MoDeCaSo!</strong><br><span class='glyphicon glyphicon-placeholder'></span> You need to log in to use this system."
                };
            }

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
                        $rootScope.$broadcast("load_projects");

                        var goto = session_service.get("goto");
                        session_service.unset("goto");

                        if (goto) {
                            window.location.href = goto;
                        } else {
                            $state.go("/dashboard");
                        }
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
                            $scope.flash.message += "Invalid username or password.<br><span class='glyphicon glyphicon-placeholder'></span> Please try again.";
                        } else if (result == "account_disabled") {
                            $scope.flash.message += "Your user account has been disabled.<br><span class='glyphicon glyphicon-placeholder'></span> Please see your system administrator.";
                        } else {
                            $scope.flash.message += "Server Error while trying to log in.<br><span class='glyphicon glyphicon-placeholder'></span> The request could not be completed.";
                        }

                        /*
                         * Shake login form
                         */
                        shake_element($("#login_form").children(2));

                        /*
                         * Add error class to panel
                         *
                         * $("#login_form").children(2).removeClass("panel-primary").addClass("panel-danger");
                         */

                        /*
                         * Add error class to input groups
                         */
                        $("#login_username_group").toggleClass("has-error", true);
                        $("#login_password_group").toggleClass("has-error", true);
                    }
                });

                cfpLoadingBar.complete();
            };
        }
    ]
);