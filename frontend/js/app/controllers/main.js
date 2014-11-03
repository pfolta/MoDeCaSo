/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/main.js
 * Created:			2014-10-19
 * Last modified:	2014-10-27
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "mainCtrl",
    [
        "$scope",
        "sessionService",
        "$sce",
        "$modal",
        function($scope, sessionService, $sce, $modal)
        {
            $scope.main = {
                loggedin:   sessionService.get("loggedin"),
                user:       {
                    username:   sessionService.get("username")
                }
            };

            $scope.change_password_flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.change_password = function()
            {
                var username = $scope.main.user.username;
                var old_password = $scope.change_password.old_password;
                var new_password = $scope.change_password.new_password;
                var confirm_new_password = $scope.change_password.confirm_new_password;

                /*
                 * Remove potential error class to input groups
                 */
                $("#change_password_old_password_group").toggleClass("has-error", false);
                $("#change_password_new_password_group").toggleClass("has-error", false);
                $("#change_password_confirm_new_password_group").toggleClass("has-error", false);

                if (new_password == confirm_new_password) {
                    if (old_password == "dev") {
                        $scope.change_password_flash.type = "alert-success";
                        $scope.change_password_flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>Well done!</strong> Your password has been successfully changed.";

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
                    } else {
                        $scope.change_password_flash.type = "alert-danger";
                        $scope.change_password_flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The password you entered is invalid. Please try again.";

                        /*
                         * Shake login form
                         */
                        shake_element($("#change_password_flash"));
                        shake_element($("#change_password_old_password_group"));

                        /*
                         * Add error class to input groups
                         */
                        $("#change_password_old_password_group").toggleClass("has-error", true);
                    }
                } else {
                    $scope.change_password_flash.type = "alert-danger";
                    $scope.change_password_flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The passwords you entered did not match.";

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

                $scope.change_password_flash.show = true;
            }

            $scope.html_save = function(text)
            {
                return $sce.trustAsHtml(text);
            };

            $scope.show_change_password_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/change-password.tpl",
                        backdrop:       "static"
                    }
                );
            }

            $scope.show_about_dialog = function()
            {
                $modal.open(
                    {
                        templateUrl:    "/frontend/tpl/about.tpl",
                        backdrop:       "static",
                        size:           "lg"
                    }
                );
            }
        }
    ]
);