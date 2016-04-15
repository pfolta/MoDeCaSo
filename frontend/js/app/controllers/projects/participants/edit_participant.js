/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/participants/edit_participant.js
 * Created:         2015-01-13
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "edit_participant_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "project_key",
        "participant_id",
        function($scope, $rootScope, $http, session_service, project_key, participant_id)
        {
            $scope.project_key      = project_key;
            $scope.participant_id   = participant_id;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_participant = function(participant_id)
            {
                $scope.participant = null;

                $http({
                    method:     "get",
                    url:        "/server/projects/" + $scope.project_key + "/participants/get_participant/" + participant_id
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.participant = response.data.participant;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading participant.";

                        shake_element($("#edit_participant_flash"));
                    }
                );
            };

            $scope.edit_participant = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#edit_participant_submit_button").prop("disabled", true);
                $("#edit_participant_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/participants/edit_participant",
                    data:       {
                        participant_id:     $scope.participant.id,
                        first_name:         $scope.participant.first_name,
                        last_name:          $scope.participant.last_name,
                        email:              $scope.participant.email
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_participant_submit_button").prop("disabled", false);
                        $("#edit_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The participant has been successfully updated.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#edit_participant_submit_button").prop("disabled", true);
                        $("#edit_participant_cancel_button").html("Close");

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_participant_submit_button").prop("disabled", false);
                        $("#edit_participant_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The participant could not be updated.";

                        shake_element($("#edit_participant_flash"));
                    }
                );
            };

            $scope.load_participant($scope.participant_id);
        }
    ]
);