/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/controllers/dashboard.js
 * Created:         2015-01-15
 * Last modified:	2015-01-15
 * Author:          Peter Folta <mail@peterfolta.net>
 */

controllers.controller(
    "dashboard_controller",
    [
        "$scope",
        "$rootScope",
        "session_service",
        function($scope, $rootScope, session_service)
        {
            $scope.session_information_collapse = true;

            $scope.logged_in_since              = session_service.get("api_key_granted");
            $scope.last_login                   = session_service.get("last_login");
            $scope.last_login_from_ip           = session_service.get("last_login_from_ip");
            $scope.last_login_from_hostname     = session_service.get("last_login_from_hostname");
            $scope.last_login_from_application  = session_service.get("last_login_from_application");
        }
    ]
);