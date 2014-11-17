/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/edit_user.js
 * Created:			2014-11-17
 * Last modified:	2014-11-17
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "edit_user_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "username",
        function($scope, $rootScope, $http, session_service, username)
        {
            $scope.username = username;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_user = function(username)
            {
                $scope.user = null;

                $http({
                    method:     "get",
                    url:        "/server/administration/user_management/get_user/" + username,
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.user = response.data.user;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading user.";

                        shake_element($("#edit_user_flash"));
                    }
                );
            };

            $scope.load_user($scope.username);
        }
    ]
);