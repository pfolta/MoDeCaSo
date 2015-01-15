/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2015-01-15
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

services.factory(
    "auth_service",
    [
        "$http",
        "session_service",
        function($http, session_service)
        {
            return {
                login: function(username, password)
                {
                    return $http({
                        method:     "post",
                        url:        "/server/auth/login",
                        data:       {
                            username:   username,
                            password:   password
                        }
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        var data = response.data;

                        if (!data.error && data.msg == "login_successful") {
                            session_service.set("api_key", data.api_key);
                            session_service.set("api_key_granted", data.api_key_granted);
                            session_service.set("api_key_expiry", data.api_key_expiry);
                            session_service.set("username", data.username);
                            session_service.set("first_name", data.first_name);
                            session_service.set("last_name", data.last_name);
                            session_service.set("role", data.role);
                            session_service.set("password_last_changed", data.password_last_changed);
                            session_service.set("last_login", data.last_login);
                            session_service.set("last_login_from_ip", data.last_login_from_ip);
                            session_service.set("last_login_from_hostname", data.last_login_from_hostname);
                            session_service.set("last_login_from_application", data.last_login_from_application);
                        }

                        return data.msg;
                    }
                },

                logout: function()
                {
                    return $http({
                        method:     "get",
                        url:        "/server/auth/logout"
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        var data = response.data;

                        if (!data.error && data.msg == "logout_successful") {
                            session_service.clear();

                            session_service.set("login_message", "logged_out");
                        }

                        return data.msg;
                    }
                },

                change_password: function(old_password, new_password)
                {
                    return $http({
                        method:     "post",
                        url:        "/server/auth/change_password",
                        data:       {
                            old_password:   old_password,
                            new_password:   new_password
                        }
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        return response.data.msg;
                    }
                },

                is_authenticated: function(required_role)
                {
                    var role = session_service.get("role");

                    if (role == null) {
                        role = "UNAUTHENTICATED";
                    }

                    switch (role) {
                        case "UNAUTHENTICATED":
                            switch (required_role) {
                                case "UNAUTHENTICATED":
                                    return true;
                                case "MODERATOR":
                                    return false;
                                case "ADMINISTRATOR":
                                    return false;
                            }
                        case "MODERATOR":
                            switch (required_role) {
                                case "UNAUTHENTICATED":
                                    return true;
                                case "MODERATOR":
                                    return true;
                                case "ADMINISTRATOR":
                                    return false;
                            }
                        case "ADMINISTRATOR":
                            switch (required_role) {
                                case "UNAUTHENTICATED":
                                    return true;
                                case "MODERATOR":
                                    return true;
                                case "ADMINISTRATOR":
                                    return true;
                            }
                    }
                }
            }
        }
    ]
);