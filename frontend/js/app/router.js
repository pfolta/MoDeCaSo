/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/router.js
 * Created:			2014-10-18
 * Last modified:	2014-10-19
 * Author:			Peter Folta <mail@peterfolta.net>
 */

webapp.config([
    "$urlRouterProvider",
    "$stateProvider",
    function($urlRouterProvider, $stateProvider)
    {
        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state(
                "login",
                {
                    url:            "/login",
                    templateUrl:    "/frontend/tpl/login.tpl",
                    controller:     "loginCtrl"
                }
            )
            .state(
                "dashboard",
                {
                    url:            "/dashboard",
                    templateUrl:    "/frontend/tpl/dashboard.tpl"
                }
            )
            .state(
                "administration/user-management",
                {
                    url:            "/administration/user-management",
                    templateUrl:    "/frontend/tpl/administration/user-management.tpl"
                }
            );
    }
]);