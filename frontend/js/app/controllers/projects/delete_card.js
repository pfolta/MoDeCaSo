/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/delete_card.js
 * Created:			2014-12-17
 * Last modified:	2014-12-17
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "delete_card_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "card_id",
        function($scope, $rootScope, $http, session_service, card_id)
        {
            $scope.card_id = card_id;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.delete_card = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#delete_card_submit_button").prop("disabled", true);
                $("#delete_card_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/cards/delete_card",
                    data:       {
                        card_id:            $scope.card_id
                    },
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_card_submit_button").prop("disabled", false);
                        $("#delete_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-success";
                        $scope.flash.message = "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The card has been successfully deleted.";

                        /*
                         * Disable submit button and change Cancel button to show "Close" instead
                         */
                        $("#delete_card_submit_button").prop("disabled", true);
                        $("#delete_card_cancel_button").html("Close");

                        $("#delete_card_cancel_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_project");
                            }
                        );
                        $("#delete_card_close_button").on(
                            "click",
                            function()
                            {
                                $rootScope.$broadcast("load_project");
                            }
                        );
                    },
                    function(response)
                    {
                        /*
                         * Enable form elements
                         */
                        $("#delete_card_submit_button").prop("disabled", false);
                        $("#delete_card_cancel_button").prop("disabled", false);

                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> The card could not be deleted.";

                        shake_element($("#delete_card_flash"));
                    }
                );
            }
        }
    ]
);