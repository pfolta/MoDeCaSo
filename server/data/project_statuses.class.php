<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/data/project_statuses.class.php
 * Created:			2014-11-24
 * Last modified:	2014-11-24
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace data;

class project_statuses
{

    const CREATED = 0;
    const READY = 1;
    const RUNNING = 2;
    const FINISHED = 3;

    public static $values = array(
        0   => "CREATED",
        1   => "READY",
        2   => "RUNNING",
        3   => "FINISHED"
    );

}