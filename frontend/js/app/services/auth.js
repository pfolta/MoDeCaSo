/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:            /frontend/js/app/services/auth.js
 * Created:			2014-10-20
 * Last modified:	2014-11-11
 * Author:			Peter Folta <mail@peterfolta.net>
 */

services.factory(
    "authService",
    [
        "$http",
        "sessionService",
        function($http, sessionService)
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
                            sessionService.set("api_key", data.api_key);
                            sessionService.set("username", data.username);
                            sessionService.set("first_name", data.first_name);
                            sessionService.set("last_name", data.last_name);
                            sessionService.set("role", data.role);
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
                            "X-API-Key": sessionService.get("api_key")
                        }
                    }).then(handle_response, handle_response);

                    function handle_response(response)
                    {
                        var data = response.data;

                        if (!data.error && data.msg == "logout_successful") {
                            sessionService.unset("api_key");
                            sessionService.unset("username");
                            sessionService.unset("first_name");
                            sessionService.unset("last_name");
                            sessionService.unset("role");
                        }

                        return data.msg;
                    }
                },

                is_authenticated: function(request_permission)
                {
                    if (sessionService.get("api_key")) {
                        return true;
                    }

                    if (request_permission == "/login") {
                        return true;
                    }

                    return false;
                }
            }
        }
    ]
);