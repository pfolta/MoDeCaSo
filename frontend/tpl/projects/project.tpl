<div class="page">
    <h1>
        Project
    </h1>
    <div class="alert" id="project_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert"></div>
    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left" style="width: 80%;">
            <a class="btn btn-success" disabled><span class="glyphicon glyphicon-play"></span> Run Project</a>
        </div>
        <div class="pull-right">
            <a ui-sref="/projects" class="btn btn-default"><span class="glyphicon glyphicon-list"></span> View All Projects</a>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Participants</h3>
        </div>
        <div class="panel-body">
            <ul>
                <li ng-repeat="participant in participants">{{ participant.first_name }} {{ participant.last_name }} ({{ participant.email }})</li>
            </ul>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Cards</h3>
        </div>
        <div class="panel-body">
            <ul>
                <li ng-repeat="card in cards">{{ card.value }}</li>
            </ul>
        </div>
    </div>
</div>