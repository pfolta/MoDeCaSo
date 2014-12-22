<?php

/*
 * UPB-BTHESIS
 * Copyright (C) 2004-2014 Peter Folta. All rights reserved.
 *
 * Project:			UPB-BTHESIS
 * Version:			0.0.1
 *
 * File:			/server/tools/file.class.php
 * Created:			2014-12-22
 * Last modified:	2014-12-22
 * Author:			Peter Folta <pfolta@mail.uni-paderborn.de>
 */

namespace tools;

use \Slim\Slim;

class file
{

    private $app;

    private $filename;
    private $mimetype;

    private $file_contents;

    /**
     * __construct ( )
     *
     * Creates a new file object for file downloads
     *
     * @param Slim $slim                Slim instance
     */
    public function __construct(Slim $slim = null)
    {
        if (!is_null($slim)) {
            $this->app = $slim;
        } else {
            $this->app = Slim::getInstance();
        }
    }

    /**
     * set_filename ( )
     *
     * Sets filename proposed to client
     *
     * @param string $filename          filename
     */
    public function set_filename($filename)
    {
        $this->filename = $filename;
    }

    /**
     * set_mimetype ( )
     *
     * Sets mimetype for file download
     *
     * @param string $mimetype          Mimetype
     */
    public function set_mimetype($mimetype)
    {
        $this->mimetype = $mimetype;
    }

    /**
     * set_file_contents ( )
     *
     * Sets body of file download
     *
     * @param object $file_contents     File contents
     */
    public function set_file_contents($file_contents)
    {
        $this->file_contents = $file_contents;
    }

    /**
     * serve ( )
     *
     * Serves file download to client
     *
     * @throws \Slim\Exception\Stop
     */
    public function serve()
    {
        $this->app->response()->status(200);
        $this->app->response()->header("Content-Type", $this->mimetype);
        $this->app->response()->header("Content-Disposition", "attachment; filename=\"".$this->filename."\"");
        $this->app->response()->header("Last-Modified", date("r"));
        $this->app->response()->header("Cache-Control", "cache, must-revalidate");

        $this->app->response()->body($this->file_contents);

        $this->app->stop();
    }

}