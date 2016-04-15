/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/delete_user.js
 * Created:			2014-11-24
 * Last modified:	2015-01-17
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "delete_project_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "key",
        function($scope, $rootScope, $http, session_service, key)
        {
            $scope.key = key;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.delete_project = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#delete_project_submit_button").prop("disabled", true);
                $("#delete_project_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/delete_project",
                    data:       {
                        key:            $scope.key
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_project_submit_button").prop("disabled", false);
                        $("#delete_project_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The project with the key <strong>" + $scope.key + "</strong> has been successfully deleted.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#delete_project_submit_button").prop("disabled", true);
                        $("#delete_project_cancel_button").html("Close");

                        $rootScope.$broadcast("load_projects");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_project_submit_button").prop("disabled", false);
                        $("#delete_project_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The project could not be deleted.";

                        shake_element($("#delete_project_flash"));
                    }
                );
            }
        }
    ]
);