/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/router.js
 * Created:			2014-10-18
 * Last modified:	2015-03-31
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
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
                role: "UNAUTHENTICATED",
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
                role: "UNAUTHENTICATED",
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
                role: "MODERATOR",
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
                role: "MODERATOR",
                title: "Dashboard",
                views: {
                    "mainView": {
                        controller:     "dashboard_controller",
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
            "/administration/server_maintenance_service",
            {
                url: "/frontend/administration/server_maintenance_service",
                role: "ADMINISTRATOR",
                title: "Server Maintenance Service",
                views: {
                    "mainView": {
                        controller:     "server_maintenance_service_controller",
                        templateUrl:    "/frontend/tpl/administration/server_maintenance_service.tpl"
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
                role: "ADMINISTRATOR",
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
                role: "ADMINISTRATOR",
                parent: "/administration/user_management",
                title: "Add User",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "add_user_controller",
                                templateUrl:    "/frontend/tpl/administration/user_management/add_user.tpl",
                                backdrop:       "static",
                                keyboard:       false
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
                url: "/delete_user/:username",
                role: "ADMINISTRATOR",
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
                                        return $stateParams.username;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/administration/user_management/delete_user.tpl",
                                backdrop:       "static",
                                keyboard:       false
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
            "/administration/user_management/edit_user",
            {
                url: "/edit_user/:username",
                role: "ADMINISTRATOR",
                parent: "/administration/user_management",
                title: "Edit User",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "edit_user_controller",
                                resolve:        {
                                    username:   function()
                                    {
                                        return $stateParams.username;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/administration/user_management/edit_user.tpl",
                                backdrop:       "static",
                                keyboard:       false
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
            "/projects/overview",
            {
                url: "/frontend/projects",
                role: "MODERATOR",
                title: "Project Overview",
                views: {
                    "mainView": {
                        controller:     "project_overview_controller",
                        templateUrl:    "/frontend/tpl/projects/overview.tpl"
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
            "/projects/create_project",
            {
                url: "/create_project",
                role: "MODERATOR",
                parent: "/projects/overview",
                title: "Create Project",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "create_project_controller",
                                templateUrl:    "/frontend/tpl/projects/create_project.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/overview");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/delete_project",
            {
                url: "/delete_project/:key",
                role: "MODERATOR",
                parent: "/projects/overview",
                title: "Delete Project",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_project_controller",
                                resolve:        {
                                    key:   function()
                                    {
                                        return $stateParams.key;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/delete_project.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/overview");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project",
            {
                url: "/frontend/projects/:key",
                role: "MODERATOR",
                title: "Project Details",
                views: {
                    "mainView": {
                        controller:     "project_controller",
                        resolve:        {
                            key: [
                                "$stateParams",
                                function($stateParams)
                                {
                                    return $stateParams.key;
                                }
                            ]
                        },
                        templateUrl:    "/frontend/tpl/projects/project.tpl"
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
            "/projects/project/add_card",
            {
                url: "/add_card",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Add Card",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "add_card_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");

                                            return url_parts[url_parts.length-2];
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/cards/add_card.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/delete_card",
            {
                url: "/delete_card/:card_id",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Delete Card",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_card_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-3];

                                            return project_key;
                                        }
                                    ],
                                    card_id:   function()
                                    {
                                        return $stateParams.card_id;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/cards/delete_card.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/edit_card",
            {
                url: "/edit_card/:card_id",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Edit Card",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "edit_card_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-3];

                                            return project_key;
                                        }
                                    ],
                                    card_id:   function()
                                    {
                                        return $stateParams.card_id;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/cards/edit_card.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/delete_all_cards",
            {
                url: "/delete_all_cards",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Delete All Cards",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_all_cards_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-2];

                                            return project_key;
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/cards/delete_all_cards.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/import_cards",
            {
                url: "/import_cards",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Import Cards",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "import_cards_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");

                                            return url_parts[url_parts.length-2];
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/cards/import_cards.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/add_participant",
            {
                url: "/add_participant",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Add Participant",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "add_participant_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");

                                            return url_parts[url_parts.length-2];
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/participants/add_participant.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/delete_participant",
            {
                url: "/delete_participant/:participant_id",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Delete Participant",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_participant_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-3];

                                            return project_key;
                                        }
                                    ],
                                    participant_id: function()
                                    {
                                        return $stateParams.participant_id;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/participants/delete_participant.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/edit_participant",
            {
                url: "/edit_participant/:participant_id",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Edit Participant",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "edit_participant_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-3];

                                            return project_key;
                                        }
                                    ],
                                    participant_id: function()
                                    {
                                        return $stateParams.participant_id;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/participants/edit_participant.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/delete_all_participants",
            {
                url: "/delete_all_participants",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Delete All Participants",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "delete_all_participants_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-2];

                                            return project_key;
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/participants/delete_all_participants.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/import_participants",
            {
                url: "/import_participants",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Import Participants",
                onEnter: [
                    "$state",
                    "$modal",
                    function($state, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "import_participants_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");

                                            return url_parts[url_parts.length-2];
                                        }
                                    ]
                                },
                                templateUrl:    "/frontend/tpl/projects/participants/import_participants.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/projects/project/edit_message",
            {
                url: "/edit_message/:type",
                role: "MODERATOR",
                parent: "/projects/project",
                title: "Edit Message",
                onEnter: [
                    "$state",
                    "$stateParams",
                    "$modal",
                    function($state, $stateParams, $modal)
                    {
                        $modal.open(
                            {
                                controller:     "edit_message_controller",
                                resolve:        {
                                    project_key: [
                                        "$stateParams",
                                        function($stateParams)
                                        {
                                            var url_parts = document.URL.split("/");
                                            var project_key = url_parts[url_parts.length-3];

                                            return project_key;
                                        }
                                    ],
                                    type:   function()
                                    {
                                        return $stateParams.type;
                                    }
                                },
                                templateUrl:    "/frontend/tpl/projects/edit_message.tpl",
                                backdrop:       "static",
                                keyboard:       false
                            }
                        ).result.then(
                            function(result)
                            {
                                $state.go("/projects/project");
                            }
                        );
                    }
                ]
            }
        )
        .state(
            "/experiment",
            {
                url: "/frontend/experiment/:project_key/:uuid",
                role: "UNAUTHENTICATED",
                title: "Experiment",
                views: {
                    "mainView": {
                        controller:     "experiment_controller",
                        resolve:        {
                            project_key: [
                                "$stateParams",
                                function($stateParams)
                                {
                                    return $stateParams.project_key;
                                }
                            ],
                            uuid: [
                                "$stateParams",
                                function($stateParams)
                                {
                                    return $stateParams.uuid;
                                }
                            ]
                        },
                        templateUrl:    "/frontend/tpl/experiment/experiment.tpl"
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