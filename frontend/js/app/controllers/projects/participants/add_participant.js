/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/participants/add_participant.js
 * Created:         2015-01-13
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "add_participant_controller",
    [
        "$rootScope",
        "$scope",
        "$http",
        "session_service",
        "project_key",
        function($rootScope, $scope, $http, session_service, project_key)
        {
            $scope.project_key = project_key;

            $scope.flash = {
                show:       false,
                type:       null,
                message:    null
            };

            $scope.first_name   = "";
            $scope.last_name    = "";
            $scope.email        = "";

            $scope.add_participant = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#add_participant_submit_button").prop("disabled", true);
                $("#add_participant_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/participants/add_participant",
                    data:       {
                        first_name:     $scope.first_name,
                        last_name:      $scope.last_name,
                        email:          $scope.email
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#add_participant_submit_button").prop("disabled", false);
                        $("#add_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The participant has been successfully added.";

                        /*
                         * Clear input fields
                         */
                        $scope.first_name   = "";
                        $scope.last_name    = "";
                        $scope.email        = "";

                        /*
                         * Set focus on first text field
                         */
                        $("#add_participant_first_name").focus();

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#add_participant_submit_button").prop("disabled", false);
                        $("#add_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The participant could not be added.";

                        shake_element($("#add_participant_flash"));
                    }
                );
            }
        }
    ]
);