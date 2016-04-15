<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:         MoDeCaSo
 * Version:         1.0.0
 *
 * File:            /server/data/user_roles.class.php
 * Created:         2014-11-12
 * Last modified:	2014-11-24
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace data;

class user_roles
{

    const UNAUTHENTICATED = 0;
    const MODERATOR = 1;
    const ADMINISTRATOR = 2;

    public static $values = array(
        0   => "UNAUTHENTICATED",
        1   => "MODERATOR",
        2   => "ADMINISTRATOR"
    );

}