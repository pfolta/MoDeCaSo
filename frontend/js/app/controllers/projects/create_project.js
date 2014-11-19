/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/create_project.js
 * Created:			2014-11-19
 * Last modified:	2014-11-19
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
        }
    ]
);