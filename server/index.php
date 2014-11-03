<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/index.php
 * Created:			2014-11-03
 * Last modified:	2014-11-03
 * Author:			Peter Folta <mail@peterfolta.net>
 */

require "main/app.class.php";
require "main/config.class.php";
require "main/database.class.php";
require "main/errorhandling.class.php";

use main\app;

/*
 * Create a new web application and run it
 */
$webapp = new app();
$webapp->run();