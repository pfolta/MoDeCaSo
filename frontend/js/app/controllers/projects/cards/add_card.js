/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/projects/cards/add_card.js
 * Created:			2014-12-10
 * Last modified:	2015-01-13
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "add_card_controller",
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

            $scope.text     = "";
            $scope.tooltip  = "";

            $scope.add_card = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#add_card_submit_button").prop("disabled", true);
                $("#add_card_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.project_key + "/cards/add_card",
                    data:       {
                        text:       $scope.text,
                        tooltip:    $scope.tooltip
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#add_card_submit_button").prop("disabled", false);
                        $("#add_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The card has been successfully added.";

                        /*
                         * Clear input fields
                         */
                        $scope.text = "";
                        $scope.tooltip = "";

                        /*
                         * Set focus on first text field
                         */
                        $("#add_card_text").focus();

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#add_card_submit_button").prop("disabled", false);
                        $("#add_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The card could not be added.";

                        shake_element($("#add_card_flash"));
                    }
                );
            }
        }
    ]
);