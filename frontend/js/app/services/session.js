/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /frontend/js/app/services/session.js
 * Created:         2014-10-20
 * Author:          Peter Folta <mail@peterfolta.net>
 */

services.factory(
    "session_service",
    [
        function()
        {
            return {
                /**
                 * set ( )
                 *
                 * Sets a (key, value) pair to the local session storage
                 *
                 * @param key   The key of the variable
                 * @param value The value of the variable
                 * @returns {*}
                 */
                set: function(key, value)
                {
                    return sessionStorage.setItem(key, value);
                },

                /**
                 * get ( )
                 *
                 * Returns the value of a (key, value) pair stored in the local session storage
                 *
                 * @param key   The key used for lookup
                 * @returns {*}
                 */
                get: function(key)
                {
                    return sessionStorage.getItem(key);
                },

                /**
                 * unset ( )
                 *
                 * Removes a (key, value) pair from the local session storage
                 *
                 * @param key   The key used for lookup
                 * @returns {*}
                 */
                unset: function(key)
                {
                    return sessionStorage.removeItem(key);
                },

                /**
                 * clear ( )
                 *
                 * Removes all (key, value) pairs from the local session storage
                 *
                 * @returns {*}
                 */
                clear: function()
                {
                    return sessionStorage.clear();
                }
            }
        }
    ]
);