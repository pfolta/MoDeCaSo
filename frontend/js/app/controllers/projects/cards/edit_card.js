/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/cards/edit_card.js
 * Created:			2014-12-17
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "edit_card_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "project_key",
        "card_id",
        function($scope, $rootScope, $http, session_service, project_key, card_id)
        {
            $scope.project_key  = project_key;
            $scope.card_id      = card_id;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_card = function(card_id)
            {
                $scope.card = null;

                $http({
                    method:     "get",
                    url:        "/server/projects/" + $scope.project_key + "/cards/get_card/" + card_id
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.card = response.data.card;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading card.";

                        shake_element($("#edit_card_flash"));
                    }
                );
            };

            $scope.edit_card = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#edit_card_submit_button").prop("disabled", true);
                $("#edit_card_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/cards/edit_card",
                    data:       {
                        card_id:    $scope.card.id,
                        text:       $scope.card.text,
                        tooltip:    $scope.card.tooltip
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_card_submit_button").prop("disabled", false);
                        $("#edit_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The card has been successfully updated.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#edit_card_submit_button").prop("disabled", true);
                        $("#edit_card_cancel_button").html("Close");

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#edit_card_submit_button").prop("disabled", false);
                        $("#edit_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The card could not be updated.";

                        shake_element($("#edit_card_flash"));
                    }
                );
            };

            $scope.load_card($scope.card_id);
        }
    ]
);