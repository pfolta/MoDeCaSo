/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/project.js
 * Created:			2014-12-03
 * Last modified:	2014-12-03
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

            $scope.load_project = function()
            {
                $scope.project = [];

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

                        shake_element($("#project_overview_flash"));
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