/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/angular/router.js
 * Created:			2014-10-18
 * Last modified:	2014-10-18
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
                    templateUrl:    "/frontend/tpl/login.tpl"
                }
            )
            .state(
                "dashboard",
                {
                    url:            "/dashboard",
                    templateUrl:    "/frontend/tpl/dashboard.tpl"
                }
            );
    }
]);