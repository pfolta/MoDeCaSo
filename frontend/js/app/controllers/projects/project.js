/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/project.js
 * Created:			2014-12-03
 * Last modified:	2015-01-14
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

            $scope.sortable_options = {
                "appendTo":         "div.page",
                "axis":             "y",
                "cursorAt":         {
                    "left":             0,
                    "top":              0
                },
                "scroll":           false,
                "stop":             function(e, ui)
                {
                    $scope.participants_order_changed = true;
                }
            };

            $scope.participants_order_changed = false;

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

            $scope.save_order = function()
            {
                var order = new Array($scope.participants.length);

                for (var i = 0; i < $scope.participants.length; i++) {
                    order[i] = $scope.participants[i].id;
                }

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.key + "/participants/set_order",
                    data:       {
                        order:      order
                    }
                }).then(
                    function(response)
                    {
                        $scope.participants_order_changed = false;

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error saving new order of participants.";

                        shake_element($("#project_flash"));
                    }
                );
            };

            $scope.load_project = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/projects/get_project/" + $scope.key
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