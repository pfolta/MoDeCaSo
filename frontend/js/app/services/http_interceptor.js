/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:            /frontend/js/app/services/http_interceptor.js
 * Created:			2015-01-13
 * Last modified:	2015-04-06
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

services.factory(
    "http_interceptor_service",
    [
        "session_service",
        function(session_service)
        {
            return {
                request: function(config)
                {
                    if (session_service.get("api_key")) {
                        config.headers['X-API-Key'] = session_service.get("api_key");
                    }

                    config.headers['X-Client-Application'] = "MoDeCaSo Web Frontend";

                    return config;
                },

                responseError: function(response)
                {
                    if (response.status == 401 && response.config.url != "/server/auth/login") {
                        session_service.clear();

                        session_service.set("login_message", "session_timeout");

                        window.location.reload();
                        return;
                    }

                    toaster.danger("Network Error", "Request couldn't be completed.", false);

                    return response;
                }
            }
        }
    ]
);