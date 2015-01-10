/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/project.js
 * Created:			2014-12-03
 * Last modified:	2015-01-02
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "project_controller",
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

            $scope.card_zoom = 1.0;

            $scope.card_zoom_percent = $scope.card_zoom * 100;

            $scope.$watch(
                function()
                {
                    return $scope.card_zoom;
                },
                function(value)
                {
                    $scope.card_zoom_percent = Math.round(value * 100);

                    $(".card").css("-moz-transform", "scale(" + value + ")");
                    $(".card").css("-o-transform", "scale(" + value + ")");
                    $(".card").css("-webkit-transform", "scale(" + value + ")");
                    $(".card").css("transform", "scale(" + value + ")");
                    $(".card-container").css("height", (value * 176) + "px");
                    $(".card-container").css("width", (value * 226) + "px");
                }
            );

            $scope.load_project = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/projects/get_project/" + $scope.key,
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.project = response.data.project;
                        $scope.participants = response.data.participants;
                        $scope.cards = response.data.cards;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading project.";

                        shake_element($("#project_flash"));
                    }
                );
            };

            $scope.$on(
                "load_project",
                function(event, args)
                {
                    $scope.load_project();
                }
            );

            $rootScope.$broadcast("load_project");
        }
    ]
);