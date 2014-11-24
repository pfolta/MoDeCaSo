/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/create_project.js
 * Created:			2014-11-19
 * Last modified:	2014-11-24
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "create_project_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        function($scope, $rootScope, $http, session_service)
        {
            $scope.flash = {
                show:       false,
                type:       null,
                message:    null
            };

            $scope.project = {
                title:      null,
                key:        null
            };

            $scope.key_modified = false;

            $scope.generate_key = function()
            {
                if (!$scope.key_modified) {
                    if ($scope.project.title != undefined) {
                        $scope.project.key = $scope.project.title.toUpperCase().replace(/[^A-Z0-9]/g, "").substr(0, 10);
                    } else {
                        $scope.project.key = null;
                    }
                }
            };

            $scope.create_project = function()
            {
                /*
                 * Disable form elements to prevent duplicate requests
                 */
                $("#create_project_submit_button").prop("disabled", true);
                $("#create_project_cancel_button").prop("disabled", true);

                $http({
                    method:     "post",
                    url:        "/server/projects/create_project",
                    data:       {
                        title:      $scope.project.title,
                        key:        $scope.project.key
                    },
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then();
            }
        }
    ]
);