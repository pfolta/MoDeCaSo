/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/main.js
 * Created:			2014-10-19
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "main_controller",
    [
        "$rootScope",
        "$scope",
        "$http",
        "$modal",
        "auth_service",
        "session_service",
        "cfpLoadingBar",
        function($rootScope, $scope, $http, $modal, auth_service, session_service, cfpLoadingBar)
        {
            $scope.username = function()
            {
                return session_service.get("username");
            };

            $scope.real_name = function()
            {
                return session_service.get("first_name") + " " + session_service.get("last_name");
            };

            $scope.api_key = function()
            {
                return session_service.get("api_key");
            };

            $scope.is_authenticated = function(required_role)
            {
                return auth_service.is_authenticated(required_role);
            };

            $scope.change_password_flash = {
                show:     false,
                type:     null,
                message:  null
            };

            $scope.change_password = function()
            {
                var old_password = $scope.change_password.old_password;
                var new_password = $scope.change_password.new_password;
                var confirm_new_password = $scope.change_password.confirm_new_password;

                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#change_password_old_password_group :input").prop("disabled", true);
                $("#change_password_new_password_group :input").prop("disabled", true);
                $("#change_password_confirm_new_password_group :input").prop("disabled", true);
                $("#change_password_submit_button").prop("disabled", true);
                $("#change_password_cancel_button").prop("disabled", true);

                /*
                 * Remove potential error class to input groups
                 */
                $("#change_password_old_password_group").toggleClass("has-error", false);
                $("#change_password_new_password_group").toggleClass("has-error", false);
                $("#change_password_confirm_new_password_group").toggleClass("has-error", false);

                if (new_password == confirm_new_password) {
                    cfpLoadingBar.start();

                    auth_service.change_password(old_password, new_password).then(function(result)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#change_password_old_password_group :input").prop("disabled", false);
                        $("#change_password_new_password_group :input").prop("disabled", false);
                        $("#change_password_confirm_new_password_group :input").prop("disabled", false);
                        $("#change_password_submit_button").prop("disabled", false);
                        $("#change_password_cancel_button").prop("disabled", false);

                        cfpLoadingBar.complete();

                        if (result == "incorrect_old_password") {
                            $scope.change_password_flash.show = true;
                            $scope.change_password_flash.type = "alert-danger";
                            $scope.change_password_flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The password you entered is incorrect.<br><span class='glyphicon glyphicon-placeholder'></span> Please try again.";

                            /*
                             * Shake login form
                             */
                            shake_element($("#change_password_flash"));
                            shake_element($("#change_password_old_password_group"));

                            /*
                             * Add error class to input groups
                             */
                            $("#change_password_old_password_group").toggleClass("has-error", true);
                        } else if(result == "password_change_successful") {
                            $scope.change_password_flash.show = true;
                            $scope.change_password_flash.type = "alert-success";
                            $scope.change_password_flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> Your password has been successfully changed.";

                            /*
                             * Disable input forms
                             */
                            $("#change_password_old_password_group :input").prop("disabled", true);
                            $("#change_password_new_password_group :input").prop("disabled", true);
                            $("#change_password_confirm_new_password_group :input").prop("disabled", true);

                            /*
                             * Disable submit button and change Cancel button to show "Close" instead
                             */
                            $("#change_password_submit_button").prop("disabled", true);
                            $("#change_password_cancel_button").html("Close");
                        }
                    });
                } else {
                    /*
                     * Enable form elements
                     */
                    $("#change_password_old_password_group :input").prop("disabled", false);
                    $("#change_password_new_password_group :input").prop("disabled", false);
                    $("#change_password_confirm_new_password_group :input").prop("disabled", false);
                    $("#change_password_submit_button").prop("disabled", false);
                    $("#change_password_cancel_button").prop("disabled", false);

                    $scope.change_password_flash.show = true;
                    $scope.change_password_flash.type = "alert-danger";
                    $scope.change_password_flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The passwords you entered did not match.<br><span class='glyphicon glyphicon-placeholder'></span> Please try again.";

                    /*
                     * Shake login form
                     */
                    shake_element($("#change_password_flash"));
                    shake_element($("#change_password_new_password_group"));
                    shake_element($("#change_password_confirm_new_password_group"));

                    /*
                     * Add error class to input groups
                     */
                    $("#change_password_new_password_group").toggleClass("has-error", true);
                    $("#change_password_confirm_new_password_group").toggleClass("has-error", true);
                }
            };

            $scope.show_change_password_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/change-password.tpl",
                        backdrop:       "static"
                    }
                );
            };

            $scope.show_about_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/about.tpl",
                        backdrop:       "static",
                        size:           "lg"
                    }
                );
            };

            $scope.load_projects = function()
            {
                if (auth_service.is_authenticated("MODERATOR")) {
                    $http({
                        method:     "get",
                        url:        "/server/projects/get_project_list"
                    }).then(
                        function(response)
                        {
                            $scope.projects = response.data.projects;
                        }
                    );
                }
            };

            $scope.$on(
                "load_projects",
                function(event, args)
                {
                    $scope.load_projects();
                }
            );

            $rootScope.$broadcast("load_projects");
        }
    ]
);