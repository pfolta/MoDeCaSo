/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/router.js
 * Created:			2014-10-18
 * Last modified:	2014-10-25
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
            "/help",
            {
                url: "/help",
                views: {
                    "mainView": {
                        templateUrl:    "/frontend/tpl/help/help.tpl"
                    },
                    "headerView": {
                        templateUrl:    "/frontend/tpl/header.tpl"
                    },
                    "footerView": {
                        templateUrl:    "/frontend/tpl/footer.tpl"
                    }
                }
            }
        )
        .state(
            "/login",
            {
                url: "/login",
                views: {
                    "mainView": {
                        controller:     "loginCtrl",
                        templateUrl:    "/frontend/tpl/login.tpl"
                    }
                }
            }
        )
        .state(
            "/dashboard",
            {
                url: "/dashboard",
                views: {
                    "mainView": {
                        templateUrl:    "/frontend/tpl/dashboard.tpl"
                    },
                    "headerView": {
                        templateUrl:    "/frontend/tpl/header.tpl"
                    },
                    "footerView": {
                        templateUrl:    "/frontend/tpl/footer.tpl"
                    }
                }
            }
        )
        .state(
            "/administration/user-management",
            {
                url: "/administration/user-management",
                views: {
                    "mainView": {
                        controller:     "userManagementCtrl",
                        templateUrl:    "/frontend/tpl/administration/user-management.tpl"
                    },
                    "headerView": {
                        templateUrl:    "/frontend/tpl/header.tpl"
                    },
                    "footerView": {
                        templateUrl:    "/frontend/tpl/footer.tpl"
                    }
                }
            }
        );
    }
]);