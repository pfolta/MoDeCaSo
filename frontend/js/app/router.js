/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/router.js
 * Created:			2014-10-18
 * Last modified:	2014-11-11
 * Author:			Peter Folta <mail@peterfolta.net>
 */

webapp.config([
    "$urlRouterProvider",
    "$stateProvider",
    "$locationProvider",
    function($urlRouterProvider, $stateProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/frontend/dashboard");

        $stateProvider
        .state(
            "/help",
            {
                url: "/frontend/help",
                title: "Help",
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
                url: "/frontend/login",
                title: "Log In",
                views: {
                    "mainView": {
                        controller:     "loginCtrl",
                        templateUrl:    "/frontend/tpl/login.tpl"
                    }
                }
            }
        )
        .state(
            "/logout",
            {
                url: "/frontend/logout",
                title: "Log Out",
                onEnter: [
                    "authService",
                    "$state",
                    function(authService, $state)
                    {
                        authService.logout().then(function(result)
                        {
                            if (result == "logout_successful") {
                                $state.go("/login");
                            }
                        });
                    }
                ]
            }
        )
        .state(
            "/dashboard",
            {
                url: "/frontend/dashboard",
                title: "Dashboard",
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
                url: "/frontend/administration/user-management",
                title: "User Management",
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
        )
        .state(
            "/administration/user-management/add-user",
            {
                url: "/add-user",
                parent: "/administration/user-management",
                title: "Add User",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                templateUrl:    "/frontend/tpl/administration/user-management/add-user.tpl",
                                backdrop:       "static"
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/administration/user-management");
                            }
                        );
                    }
                ]
            }
        );
    }
]);