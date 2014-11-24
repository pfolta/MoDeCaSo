<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/data/user_roles.class.php
 * Created:			2014-11-12
 * Last modified:	2014-11-12
 * Author:			Peter Folta <mail@peterfolta.net>
 */

namespace data;

class user_roles
{

    const UNAUTHENTICATED = 1;
    const MODERATOR = 2;
    const ADMINISTRATOR = 3;

    public static $values = array(
        1   => "UNAUTHENTICATED",
        2   => "MODERATOR",
        3   => "ADMINISTRATOR"
    );

}