<?php

/*
 * MoDeCaSo - A Web Application for Modified Delphi Card Sorting Experiments
 * Copyright (C) 2014-2015 Peter Folta. All rights reserved.
 *
 * Project:			MoDeCaSo
 * Version:			1.0.0
 *
 * File:			/server/main/database.class.php
 * Created:			2014-11-03
 * Last modified:	2015-03-20
 * Author:          Peter Folta <mail@peterfolta.net>
 */

namespace main;

use Exception;
use mysqli;

class database
{

    private static $instance = null;

    private $connection = null;

    private $hostname;
    private $username;
    private $password;
    private $database;

    private $query;

    public static function get_instance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
    }

    private function __clone()
    {
    }

    public function connect($hostname, $username, $password, $database)
    {
        if ($this->is_connected()) {
            throw new Exception("Already connected to a database. Disconnect first.");
        }

        $this->hostname = $hostname;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        /*
         * Establish mysqli connection link
         */
        $this->connection = @new mysqli(
            $this->hostname,
            $this->username,
            $this->password,
            $this->database
        );

        /*
         * Check if connect was successful
         */
        if ($this->connection->connect_errno != 0) {
            throw new Exception("Database connect failed.");
        }
    }

    /**
     * is_connected ( )
     *
     * Returns true if a database connection is open, false otherwise
     *
     * @return bool
     */
    public function is_connected()
    {
        return !($this->connection == null);
    }

    /**
     * disconnect ( )
     *
     * Closes an existing database connection
     *
     * @throws Exception if not connected to a database
     */
    public function disconnect()
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $this->connection->close();
        $this->connection = null;
    }

    /**
     * set_charset ( )
     *
     * Specifies the character translation for communications with the database server
     *
     * @param $charset      string  Character Set
     * @throws Exception    if not connected to a database
     */
    public function set_charset($charset)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $this->connection->set_charset($charset);
    }

    /**
     * destruct ( )
     *
     * Safely closes a database connection if it exists
     *
     * @throws Exception
     */
    public function __destruct()
    {
        if ($this->is_connected()) {
            $this->disconnect();
        }
    }

    /**
     * error ( )
     *
     * Returns error message if previous database query caused an error, false otherwise
     *
     * @return mixed
     */
    public function error()
    {
        if ($this->connection->errno != 0) {
            return $this->connection->error;
        }

        return false;
    }

    /**
     * has_error ( )
     *
     * Returns true if previous database query caused an error, false otherwise
     *
     * @return bool
     */
    public function has_error()
    {
        if ($this->error()) {
            return true;
        }

        return false;
    }

    public function query($sql)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        return $this->query = $this->connection->query($sql);
    }

    public function select($table, $cols = null, $where = null, $groupby = null, $having = null, $orderby = null, $limit = null)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $sql = "SELECT ";

        if (!is_null($cols)) {
            $sql .= $cols;
        } else {
            $sql .= "*";
        }

        $sql .= " FROM ".$table;

        if (!is_null($where)) {
            $sql .= " WHERE ".$where;
        }

        if (!is_null($groupby)) {
            $sql .= " GROUP BY ".$groupby;

            if (!is_null($having)) {
                $sql .= " HAVING ".$having;
            }
        }

        if (!is_null($orderby)) {
            $sql .= " ORDER BY ".$orderby;
        }

        if (!is_null($limit)) {
            $sql .= " LIMIT ".$limit;
        }

        return $this->query($sql);
    }

    public function insert($table, $data)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $cols = "";
        $values = "";

        $i = 0;
        foreach ($data as $data_key => $data_value) {
            if ($i > 0) {
                $cols   .= ", ";
                $values .= ", ";
            }

            $cols .= "`".$data_key."`";

            if (is_string(($data_value))) {
                $values .= "'".$data_value."'";
            } else if (is_null($data_value)) {
                $values .= "NULL";
            } else {
                $values .= $data_value;
            }

            $i++;
        }

        $sql = "INSERT INTO ".$table." (".$cols.") VALUES (".$values.")";

        return $this->query($sql);
    }

    public function update($table, $where, $data)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $sql = "UPDATE ".$table." SET ";

        $i = 0;
        foreach ($data as $data_key => $data_value) {
            if ($i > 0) {
                $sql .= ", ";
            }

            $sql .= "`".$data_key."` = ";

            if (is_string(($data_value))) {
                $sql .= "'" . $data_value . "'";
            } else if (is_null($data_value)) {
                $sql .= "NULL";
            } else {
                $sql .= $data_value;
            }

            $i++;
        }

        $sql .= " WHERE ".$where;

        return $this->query($sql);
    }

    public function delete($table, $where)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        $sql = "DELETE FROM ".$table." WHERE ".$where;
        return $this->query($sql);
    }

    public function truncate($table)
    {
        if ($this->connection == null) {
            throw new Exception("Not connected to a database.");
        }

        $sql = "TRUNCATE TABLE ".$table;
        return $this->query($sql);
    }

    public function result()
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        if (is_object($this->query)) {
            return $this->query->fetch_all(MYSQLI_ASSOC);
        }

        throw new Exception("No query was executed.");
    }

    public function row_count()
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        if (is_object($this->query)) {
            return $this->query->num_rows;
        }

        throw new Exception("No query was executed.");
    }

    public function affected_rows()
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        if (is_object($this->query)) {
            return $this->query->affected_rows;
        }

        throw new Exception("No query was executed.");
    }

    public function clean($string)
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        return $this->connection->escape_string($string);
    }

    public function get_insert_id()
    {
        if (!$this->is_connected()) {
            throw new Exception("Not connected to a database.");
        }

        return $this->connection->insert_id;
    }

}