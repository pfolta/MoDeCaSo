/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/participants/delete_participant.js
 * Created:         2015-01-13
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "delete_participant_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "project_key",
        "participant_id",
        function($scope, $rootScope, $http, session_service, project_key, participant_id)
        {
            $scope.project_key = project_key;
            $scope.participant_id = participant_id;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.delete_participant = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#delete_participant_submit_button").prop("disabled", true);
                $("#delete_participant_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/participants/delete_participant",
                    data:       {
                        participant_id:            $scope.participant_id
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_participant_submit_button").prop("disabled", false);
                        $("#delete_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The participant has been successfully deleted.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#delete_participant_submit_button").prop("disabled", true);
                        $("#delete_participant_cancel_button").html("Close");

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_participant_submit_button").prop("disabled", false);
                        $("#delete_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The participant could not be deleted.";

                        shake_element($("#delete_participant_flash"));
                    }
                );
            }
        }
    ]
);