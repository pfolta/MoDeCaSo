/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/controllers/projects/project.js
 * Created:			2014-12-03
 * Last modified:	2015-03-02
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

controllers.controller(
    "project_controller",
    [
        "$scope",
        "$rootScope",
        "$http",
        "session_service",
        "key",
        function($scope, $rootScope, $http, session_service, key)
        {
            $scope.key = key;

            $scope.messages_collapse        = true;
            $scope.participants_collapse    = true;
            $scope.cards_collapse           = true;

            $scope.flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.status_flash = {
                "show":     false,
                "type":     null,
                "message":  null
            };

            $scope.settings_dirty = false;

            $scope.save_settings = function()
            {
                var completion  = $scope.settings_completion_days * 86400 + $scope.settings_completion_hrs * 3600 + $scope.settings_completion_mins * 60;
                var reminder    = $scope.settings_reminder_days * 86400 + $scope.settings_reminder_hrs * 3600 + $scope.settings_reminder_mins * 60;

                $http({
                    method:     "post",
                    url:        "/server/projects/edit_project/" + $scope.key,
                    data:       {
                        completion:     completion,
                        reminder:       reminder
                    }
                }).then(
                    function(response)
                    {
                        $scope.settings_dirty = false;

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error saving project's settings.";

                        shake_element($("#project_flash"));
                    }
                );
            };

            $scope.get_participant_status_label_class = function (status)
            {
                switch (status) {
                    case "ADDED":
                        return "label-default";
                    case "NOTIFIED":
                        return "label-primary";
                    case "COMPLETED":
                        return "label-success";
                    case "REMINDED":
                        return "label-warning";
                    case "TIMEOUT":
                    case "CANCELED":
                        return "label-danger";
                }
            };

            var fix_helper = function(e, ui) {
                ui.children().each(function() {
                    $(this).width($(this).width());
                });

                ui.css("-moz-box-shadow", "3px 3px 5px #cccccc");
                ui.css("-webkit-box-shadow", "3px 3px 5px #cccccc");
                ui.css("box-shadow", "3px 3px 5px #cccccc");

                return ui;
            };

            $scope.sortable_options = {
                "cursor":                   "url('/frontend/cur/closedhand.cur'), move",
                "forcePlaceholderSize":     true,
                "helper":                   fix_helper,
                "opacity":                  0.8,
                "placeholder":              "table-sortable-highlight",
                "scroll":                   false,
                "stop":                     function(e, ui)
                {
                    ui.item.css("-moz-box-shadow", "0px 0px 0px #cccccc");
                    ui.item.css("-webkit-box-shadow", "0px 0px 0px #cccccc");
                    ui.item.css("box-shadow", "0px 0px 0px #cccccc");

                    for (var i = 0; i < $scope.participants.length; i++) {
                        $scope.participants[i].order = i+1;
                    }

                    $scope.participants_order_changed = true;
                }
            };

            $scope.participants_order_changed = false;

            $scope.card_view = 1;
            $scope.card_zoom = 1.0;
            $scope.card_zoom_percent = $scope.card_zoom * 100;

            $scope.adjust_card_zoom = function(delta)
            {
                var zoom = parseFloat($scope.card_zoom) + delta;

                zoom = Math.min(zoom, $("#card_zoom").prop("max"));
                zoom = Math.max(zoom, $("#card_zoom").prop("min"));

                $scope.card_zoom = zoom;
            };

            $scope.$watch(
                function()
                {
                    return $scope.card_zoom;
                },

                function(value)
                {
                    $scope.card_zoom_percent = Math.round(value * 100);

                    $(".card").css("-moz-transform", "scale(" + value + ")");
                    $(".card").css("-o-transform", "scale(" + value + ")");
                    $(".card").css("-webkit-transform", "scale(" + value + ")");
                    $(".card").css("transform", "scale(" + value + ")");
                    $(".card-container").css("height", (value * 176) + "px");
                    $(".card-container").css("width", (value * 226) + "px");
                }
            );

            $scope.participants_save_order = function()
            {
                var order = new Array($scope.participants.length);

                for (var i = 0; i < $scope.participants.length; i++) {
                    order[i] = $scope.participants[i].id;
                }

                $http({
                    method:     "post",
                    url:        "/server/projects/" + $scope.key + "/participants/set_order",
                    data:       {
                        order:      order
                    }
                }).then(
                    function(response)
                    {
                        $scope.participants_order_changed = false;

                        $rootScope.$broadcast("load_project");
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error saving new order of participants.";

                        shake_element($("#project_flash"));
                    }
                );
            };

            $scope.load_project = function()
            {
                $http({
                    method:     "get",
                    url:        "/server/projects/get_project/" + $scope.key
                }).then(
                    function(response)
                    {
                        $scope.flash.show = false;

                        $scope.project                  = response.data.project;
                        $scope.messages                 = response.data.messages;
                        $scope.participants             = response.data.participants;
                        $scope.cards                    = response.data.cards;

                        $scope.settings_completion_days = Math.floor($scope.project.completion / 86400);
                        $scope.settings_completion_hrs  = Math.floor(($scope.project.completion - $scope.settings_completion_days * 86400) / 3600);
                        $scope.settings_completion_mins = Math.floor(($scope.project.completion - $scope.settings_completion_days * 86400 - $scope.settings_completion_hrs * 3600) / 60);

                        $scope.settings_reminder_days   = Math.floor($scope.project.reminder / 86400);
                        $scope.settings_reminder_hrs    = Math.floor(($scope.project.reminder - $scope.settings_reminder_days * 86400) / 3600);
                        $scope.settings_reminder_mins   = Math.floor(($scope.project.reminder - $scope.settings_reminder_days * 86400 - $scope.settings_reminder_hrs * 3600) / 60);

                        switch ($scope.project.status) {
                            case "CREATED":
                                $scope.status_flash = {
                                    "show":     true,
                                    "type":     "alert-info",
                                    "message":  "<span class='glyphicon glyphicon-info-sign'></span> <strong>" + get_success_title() + "</strong> The project has been successfully created but needs several more steps before it is ready to run.<br><span class='glyphicon glyphicon-placeholder'></span> Complete this assisstent and make sure you add at least <strong>1 participant</strong> and <strong>1 card</strong> to complete this project's setup."
                                };
                                break;
                            case "READY":
                                $scope.status_flash = {
                                    "show":     true,
                                    "type":     "alert-success",
                                    "message":  "<span class='glyphicon glyphicon-ok-sign'></span> <strong>" + get_success_title() + "</strong> The project's configuration is completed and this project is ready to run.<br><span class='glyphicon glyphicon-placeholder'></span> To start the project, click on <strong>Run Project</strong>."
                                };
                                break;
                            case "RUNNING":
                                $scope.status_flash = {
                                    "show":     true,
                                    "type":     "alert-warning",
                                    "message":  "<span class='glyphicon glyphicon-warning-sign'></span> <strong>Warning!</strong> This project is currently running.<br><span class='glyphicon glyphicon-placeholder'></span> You cannot make any changes to the project's configuration while it is running."
                                };
                                break;
                            case "FINISHED":
                                $scope.status_flash = {
                                    "show":     true,
                                    "type":     "alert-info",
                                    "message":  "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>Warning!</strong> This project is finished.<br><span class='glyphicon glyphicon-placeholder'></span> You can no longer change this project's configuration as this project is already finished, i.e. the experiment is completed. You can view the project's results on the <strong>Result Page</strong>."
                                };
                                break;
                        }

                        $scope.participants_order_changed = false;
                    },
                    function(response)
                    {
                        $scope.flash.show = true;
                        $scope.flash.type = "alert-danger";
                        $scope.flash.message = "<span class='glyphicon glyphicon-exclamation-sign'></span> <strong>" + get_error_title() + "</strong> Error loading project.";

                        shake_element($("#project_flash"));
                    }
                );
            };

            $scope.$on(
                "load_project",
                function(event, args)
                {
                    $scope.load_project();
                }
            );

            $rootScope.$broadcast("load_project");
        }
    ]
);