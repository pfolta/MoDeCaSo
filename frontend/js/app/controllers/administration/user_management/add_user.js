/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/add_user.js
 * Created:			2014-11-17
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "add_user_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        function($scope, $rootScope, $http, session_service)
        {
            $scope.flash = {
                show:       false,
                type:       null,
                message:    null
            };

            $scope.user = {
                username:   null,
                first_name: null,
                last_name:  null,
                email:      null,
                role:       2,
                status:     1
            };

            $scope.username_modified = false;

            $scope.generate_username = function()
            {
                if (!$scope.username_modified && $scope.user.first_name != undefined && $scope.user.last_name != undefined) {
                    $scope.user.username = $scope.user.first_name.toLowerCase().replace(/[^a-z]/g, "").substr(0, 1) + $scope.user.last_name.toLowerCase().replace(/[^a-z]/g, "");
                }
            };

            $scope.add_user = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#add_user_submit_button").prop("disabled", true);
                $("#add_user_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/administration/user_management/add_user",
                    data:       {
                        username:   $scope.user.username,
                        first_name: $scope.user.first_name,
                        last_name:  $scope.user.last_name,
                        email:      $scope.user.email,
                        role:       $scope.user.role,
                        status:     $scope.user.status
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#add_user_submit_button").prop("disabled", false);
                        $("#add_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The account has been successfully added.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#add_user_submit_button").prop("disabled", true);
                        $("#add_user_cancel_button").html("Close");

                        $("#add_user_cancel_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_users");
                            }
                        );
                        $("#add_user_close_button").on(
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
                        $("#add_user_submit_button").prop("disabled", false);
                        $("#add_user_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The user account could not be added.";

                        shake_element($("#add_user_flash"));
                    }
                );
            }
        }
    ]
);