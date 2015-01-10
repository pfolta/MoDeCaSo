<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/data/user_statuses.class.php
 * Created:			2014-11-24
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace data;

class user_statuses
{

    const INACTIVE = 0;
    const ACTIVE = 1;

    public static $values = array(
        0   => "INACTIVE",
        1   => "ACTIVE"
    );

}