/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/controllers/administration/user_management/user_management.js
 * Created:         2014-10-23
 * Author:          Peter Folta <mail@peterfolta.net>
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

            $scope.get_label_class = function (status)
            {
                switch (status) {
                    case "INACTIVE":
                        return "label-default";
                    case "ACTIVE":
                        return "label-success";
                }
            };

            $scope.load_users = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/administration/user_management/get_user_list"
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

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