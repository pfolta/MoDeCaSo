/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/delete_user.js
 * Created:			2014-11-12
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "delete_user_controller",
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

            $scope.delete_user = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#delete_user_submit_button").prop("disabled", true);
                $("#delete_user_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/administration/user_management/delete_user",
                    data:       {
                        username:   $scope.username
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_user_submit_button").prop("disabled", false);
                        $("#delete_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The account with the username <strong>" + $scope.username + "</strong> has been successfully deleted.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#delete_user_submit_button").prop("disabled", true);
                        $("#delete_user_cancel_button").html("Close");

                        $("#delete_user_cancel_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_users");
                            }
                        );
                        $("#delete_user_close_button").on(
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
                        $("#delete_user_submit_button").prop("disabled", false);
                        $("#delete_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The user account could not be deleted.";

                        shake_element($("#delete_user_flash"));
                    }
                );
            }
        }
    ]
);