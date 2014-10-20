<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" ui-sref="/dashboard">
                APPLICATION_TITLE
            </a>
        </div>
        <div class="navbar-left">
            <ul class="nav navbar-nav">
                <li ui-sref-active="active"><a ui-sref="/dashboard"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-th-large"></span> Projects <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#/projects">Project Overview</a></li>
                        <li class="divider"></li>
                        <li><a href="#/projects/1">Project 1</a></li>
                        <li><a href="#/projects/2">Project 2</a></li>
                        <li><a href="#/projects/3">Project 3</a></li>
                    </ul>
                </li>
                <li ui-sref-active="active" class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-wrench"></span> Administration <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a>Global Settings</a></li>
                        <li><a ui-sref="/administration/user-management">User management</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="navbar-right">
            <ul class="nav navbar-nav">
                <li ui-sref-active="active" class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-question-sign"></span> Help <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a ui-sref="/help"><span class="glyphicon glyphicon-question-sign"></span> Help</a></li>
                        <li class="divider"></li>
                        <li><a href="#/about"><span class="glyphicon glyphicon-info-sign"></span> About</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span> Signed in as <strong>Username</strong> <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#"><span class="glyphicon glyphicon-lock"></span> Change Password</a></li>
                        <li class="divider"></li>
                        <li><a ui-sref="/logout"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>