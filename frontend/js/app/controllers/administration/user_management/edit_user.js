/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/edit_user.js
 * Created:			2014-11-17
 * Last modified:	2014-11-17
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "edit_user_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "username",
        function($scope, $rootScope, $http, session_service, username)
        {
            $scope.username = username;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_user = function(username)
            {
                $scope.user = null;

                $http({
                    method:     "get",
                    url:        "/server/administration/user_management/get_user/" + username,
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.user = response.data.user;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading user.";

                        shake_element($("#edit_user_flash"));
                    }
                );
            };

            $scope.edit_user = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#edit_user_submit_button").prop("disabled", true);
                $("#edit_user_cancel_button").prop("disabled", true);

                if ($scope.user.password) {
                    if ($scope.user.password != $scope.user.confirm_password) {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The passwords you entered did not match.<br><span class='glyphicon glyphicon-placeholder'></span> Please try again.";
                    }

                    shake_element($("#edit_user_flash"));

                    $("#edit_user_submit_button").prop("disabled", false);
                    $("#edit_user_cancel_button").prop("disabled", false);

                    return;
                }

                $http({
                    method:     "post",
                    url:        "/server/administration/user_management/edit_user",
                    data:       {
                        username:   $scope.user.username,
                        password:   $scope.user.password,
                        first_name: $scope.user.first_name,
                        last_name:  $scope.user.last_name,
                        email:      $scope.user.email,
                        role:       $scope.user.role,
                        status:     1
                    },
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_user_submit_button").prop("disabled", false);
                        $("#edit_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The account has been successfully updated.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#edit_user_submit_button").prop("disabled", true);
                        $("#edit_user_cancel_button").html("Close");

                        $("#edit_user_cancel_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_users");
                            }
                        );
                        $("#edit_user_close_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_users");
                            }
                        );
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_user_submit_button").prop("disabled", false);
                        $("#edit_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The user account could not be updated.";

                        shake_element($("#edit_user_flash"));
                    }
                );
            };

            $scope.load_user($scope.username);
        }
    ]
);