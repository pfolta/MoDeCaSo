/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/main.js
 * Created:			2014-10-18
 * Last modified:	2014-11-12
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

var services = angular.module(
    "services",
    [
    ]
);

var controllers = angular.module(
    "controllers",
    [
    ]
);

var filters = angular.module(
    "filters",
    [
    ]
)

var webapp = angular.module(
    "webapp",
    [
        "services",
        "controllers",
        "filters",
        "ui.router",
        "ui.bootstrap",
        "ngAnimate",
        "angular-loading-bar"
    ]
);

webapp.run([
    "$rootScope",
    "auth_service",
    "session_service",
    "$state",
    "cfpLoadingBar",
    "$sce",
    function($rootScope, auth_service, session_service, $state, cfpLoadingBar, $sce)
    {
        $rootScope.html_save = function(text)
        {
            return $sce.trustAsHtml(text);
        };

        $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams)
            {
                if (!auth_service.is_authenticated(toState.role)) {
                    event.preventDefault();

                    if (session_service.get("role") == undefined) {
                        $state.go("/login");
                    } else {
                        $state.go("/dashboard");
                    }
                } else {
                    cfpLoadingBar.start();
                }
            }
        );

        $rootScope.$on(
            "$stateChangeSuccess",
            function(event, toState, toParams, fromState, fromParams)
            {
                window.document.title = "MoDeCaSo - " + toState.title;

                if (toState.name == "/login") {
                    $("body").toggleClass("background", true);
                } else {
                    $("body").toggleClass("background", false);
                }

                cfpLoadingBar.complete();
            }
        );
    }
]);