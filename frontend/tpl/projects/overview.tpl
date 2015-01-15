<div class="page">
    <h1>
        Project Overview
    </h1>
    <div class="alert" id="project_overview_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
    </div>
    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left" style="width: 80%;">
            <a ui-sref="/projects/create_project" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Create Project</a>
            <a ng-click="load_projects();" class="btn btn-default"><span class="glyphicon glyphicon-refresh"></span> Reload</a>
        </div>
        <div class="pull-right" style="width: 20%;">
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
                <input type="text" ng-model="filter" placeholder="Filter" class="form-control">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" ng-click="filter=null" ng-disabled="!filter"><span aria-hidden="true">&times;</span><span class="sr-only">Clear</span></button>
                </span>
            </div>
        </div>
    </div>
    <div class="table-responsive" style="clear: both;">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th style="width: 20%;">
                        Title
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'title'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'title'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 19%;">
                        Key
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'key'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'key'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 20%;">
                        Lead
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'lead'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'lead'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 20%;">
                        Created
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'created'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'created'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 10%;">
                        Status
                        <div class="btn-group btn-group-xs pull-right">
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = true;"><span class="glyphicon glyphicon-chevron-up"></span></button>
                            <button type="button" class="btn btn-default" ng-click="order_predicate = 'status'; order_reverse = false;"><span class="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                    </th>
                    <th style="width: 11%;">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="project in filtered = (projects | filter:filter | orderBy:order_predicate:order_reverse)">
                    <td>
                        <strong>{{ project.title }}</strong>
                    </td>
                    <td>
                        {{ project.key }}
                    </td>
                    <td>
                        {{ project.lead }}
                    </td>
                    <td>
                        {{ project.created | timestamp }}
                    </td>
                    <td>
                        <span class="label text-uppercase" ng-class="get_label_class(project.status);">{{ project.status }}</span>
                    </td>
                    <td class="text-center">
                        <div class="btn-group btn-group-sm">
                            <a href="/frontend/projects/{{ project.key }}" class="btn btn-warning" tooltip="Configure Project" tooltip-append-to-body="true"><span class="glyphicon glyphicon-cog"></span></a>
                            <a href="/frontend/projects/delete_project/{{ project.key }}" class="btn btn-danger" tooltip="Delete Project" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></a>
                            <a disabled="!project.status == 'FINISHED'" href="/frontend/projects/{{ project.key }}" class="btn btn-success" tooltip="View Results" tooltip-append-to-body="true"><span class="glyphicon glyphicon-eye-open"></span></a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="text-right">
            {{ filtered.length }} {{ filtered.length == 1 ? "Project" : "Projects" }}
        </p>
    </div>
</div>