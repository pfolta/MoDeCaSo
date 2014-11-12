/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/router.js
 * Created:			2014-10-18
 * Last modified:	2014-11-12
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
                role: 2,
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
                role: 1,
                title: "Log In",
                views: {
                    "mainView": {
                        controller:     "login_controller",
                        templateUrl:    "/frontend/tpl/login.tpl"
                    }
                }
            }
        )
        .state(
            "/logout",
            {
                url: "/frontend/logout",
                role: 2,
                title: "Log Out",
                onEnter: [
                    "auth_service",
                    "$state",
                    function(auth_service, $state)
                    {
                        auth_service.logout().then(function(result)
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
                role: 2,
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
            "/administration/user_management",
            {
                url: "/frontend/administration/user_management",
                role: 3,
                title: "User Management",
                views: {
                    "mainView": {
                        controller:     "user_management_controller",
                        templateUrl:    "/frontend/tpl/administration/user_management/user_management.tpl"
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
            "/administration/user_management/add_user",
            {
                url: "/add_user",
                role: 3,
                parent: "/administration/user_management",
                title: "Add User",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                templateUrl:    "/frontend/tpl/administration/user_management/add_user.tpl",
                                backdrop:       "static"
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/administration/user_management");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/administration/user_management/delete_user",
            {
                url: "/delete_user/:user_id",
                role: 3,
                parent: "/administration/user_management",
                title: "Delete User",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_user_controller",
                                resolve:        {
                                    username:   function()
                                    {
                                        return $stateParams.user_id;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/administration/user_management/delete_user.tpl",
                                backdrop:       "static"
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/administration/user_management");
                            }
                        );
                    }
                ]
            }
        );
    }
]);