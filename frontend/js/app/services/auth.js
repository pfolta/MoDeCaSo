/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2014-11-12
 * Author:			Peter Folta <mail@peterfolta.net>
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
                            session_service.set("username", data.username);
                            session_service.set("first_name", data.first_name);
                            session_service.set("last_name", data.last_name);
                            session_service.set("role", data.role);
                        }

                        return data.msg;
                    }
                },

                logout: function()
                {
                    return $http({
                        method:     "get",
                        url:        "/server/auth/logout",
                        headers:    {
                            "X-API-Key":    session_service.get("api_key")
                        }
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        var data = response.data;

                        if (!data.error && data.msg == "logout_successful") {
                            session_service.unset("api_key");
                            session_service.unset("username");
                            session_service.unset("first_name");
                            session_service.unset("last_name");
                            session_service.unset("role");
                        }

                        return data.msg;
                    }
                },

                change_password: function(old_password, new_password)
                {
                    return $http({
                        method:     "post",
                        url:        "/server/auth/change_password",
                        headers:    {
                            "X-API-Key":    sessionService.get("api_key")
                        },
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

                    if (role != null) {
                        if (role >= required_role) {
                            return true;
                        }
                    }

                    if (required_role == 1) {
                        return true;
                    }

                    return false;
                }
            }
        }
    ]
);