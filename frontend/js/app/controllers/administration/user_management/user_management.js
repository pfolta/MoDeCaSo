/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/administration/user_management/user_management.js
 * Created:			2014-10-23
 * Last modified:	2014-11-16
 * Author:			Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "user_management_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        function($scope, $rootScope, $http, session_service)
        {
            $scope.filter = null;
            $scope.order_predicate = "id";
            $scope.order_reverse = false;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.load_users = function()
            {
                $scope.users = null;

                $http({
                    method:     "get",
                    url:        "/server/administration/user_management/get_user_list",
                    headers:    {
                        "X-API-Key":    session_service.get("api_key")
                    }
                }).then(
                    function(response)
                    {
                        $scope.users = response.data.users;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading users.";

                        shake_element($("#user_management_flash"));
                    }
                );
            };

            $scope.$on(
                "load_users",
                function(event, args)
                {
                    $scope.load_users();
                }
            );

            $rootScope.$broadcast("load_users");
        }
    ]
);