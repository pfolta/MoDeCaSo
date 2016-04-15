/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/edit_message.js
 * Created:         2015-01-17
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "edit_message_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "project_key",
        "type",
        function($scope, $rootScope, $http, session_service, project_key, type)
        {
            $scope.project_key  = project_key;
            $scope.type         = type;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_message = function()
            {
                $scope.message = null;
                
                $http({
                    method:     "get",
                    url:        "/server/projects/" + $scope.project_key + "/messages/get_message/" + $scope.type
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.message = response.data.message;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading message.";

                        shake_element($("#edit_message_flash"));
                    }
                );
            };

            $scope.edit_message = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#edit_message_submit_button").prop("disabled", true);
                $("#edit_message_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/messages/edit_message",
                    data:       {
                        type:       $scope.message.type,
                        message:    $scope.message.message
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_message_submit_button").prop("disabled", false);
                        $("#edit_message_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The message has been successfully updated.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#edit_message_submit_button").prop("disabled", true);
                        $("#edit_message_cancel_button").html("Close");

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_message_submit_button").prop("disabled", false);
                        $("#edit_message_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The message could not be updated.";

                        shake_element($("#edit_message_flash"));
                    }
                );
            };

            $scope.load_message();
        }
    ]
);