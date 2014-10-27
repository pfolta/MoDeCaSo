/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/main.js
 * Created:			2014-10-18
 * Last modified:	2014-10-26
 * Author:			Peter Folta <mail@peterfolta.net>
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
    "authService",
    "$state",
    "cfpLoadingBar",
    function($rootScope, authService, $state, cfpLoadingBar)
    {
        $rootScope.$on(
            "$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams)
            {
                if (!authService.is_authenticated(toState.url)) {
                    event.preventDefault();

                    $state.go("/login");
                } else {
                    cfpLoadingBar.start();
                }
            }
        );

        $rootScope.$on(
            "$stateChangeSuccess",
            function(event, toState, toParams, fromState, fromParams)
            {
                cfpLoadingBar.complete();
            }
        );
    }
]);