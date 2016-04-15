/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/main.js
 * Created:         2014-10-18
 * Author:          Peter Folta <mail@peterfolta.net>
 */

var show_unload_prompt = false;

function main()
{
    if (is_mobile()) {
        $("#unsupported_browser").css("display", "block");

        return;
    }

    $("body").removeClass("noscroll");

    angular.element(document).ready(function() {
        angular.bootstrap(document, ["webapp"]);
    });
}

function unload()
{
    if (show_unload_prompt) {
        var message = "You changed your model but did not click \"Save\". All changes will be lost if you leave the page without saving.";
        var evt = window.event;

        if (evt) {
            evt.returnValue = message;
        }

        return message;
    }
}

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
);

var webapp = angular.module(
    "webapp",
    [
        "services",
        "controllers",
        "filters",
        "ui.router",
        "ui.bootstrap",
        "ui.sortable",
        "angularFileUpload",
        "ngAnimate",
        "angular-loading-bar"
    ]
);

webapp.config([
    "$httpProvider",
    function($httpProvider)
    {
        $httpProvider.interceptors.push("http_interceptor_service");
    }
]);

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
                        var url = document.URL;

                        session_service.set("goto", url);
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