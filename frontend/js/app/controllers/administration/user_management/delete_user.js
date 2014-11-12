/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/delete_user.js
 * Created:			2014-11-12
 * Last modified:	2014-11-12
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "delete_user_controller",
    [
        "$scope",
        "$http",
        "session_service",
        "username",
        function($scope, $http, session_service, username)
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
                    },
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(handle_response, handle_response);

                function handle_response(response)
                {
                    /*
                     * Enable form elements
                     */
                    $("#delete_user_submit_button").prop("disabled", false);
                    $("#delete_user_cancel_button").prop("disabled", false);

                    var msg = response.data.msg;

                    if (msg == "invalid_username") {
                        /*
                         * Set error message
                         */
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The user account could not be deleted.<br><span class='glyphicon glyphicon-placeholder'></span> An account with the username <strong>" + $scope.username + "</strong> does not exist.";

                        shake_element($("#delete_user_flash"));
                    } else if(msg == "user_deleted") {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>Well done!</strong> The account with the username <strong>" + $scope.username + "</strong> has been successfully deleted.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#delete_user_submit_button").prop("disabled", true);
                        $("#delete_user_cancel_button").html("Close");
                    }
                }
            }
        }
    ]
);