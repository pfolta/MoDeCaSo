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
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
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