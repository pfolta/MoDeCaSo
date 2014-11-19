<form role="form" name="create_project_form" ng-submit="create_project()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="create_project_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Create Project
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="create_project_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Please fill out this form to create a new card sorting project.
        </p>
        <div class="form-group" id="create_project_title_group" style="padding-top: 20px;">
            <label for="create_project_title" class="col-sm-3 control-label">Project Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-th-large"></span></span>
                <input type="text" ng-model="project.title" ng-change="generate_key()" id="create_project_title" placeholder="Project Title" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="create_project_key_group">
            <label for="create_project_key" class="col-sm-3 control-label">Project Key</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-tag"></span></span>
                <input type="text" ng-model="project.key" ng-change="key_modified = true;" id="create_project_key" placeholder="Project Key" maxlength="10" ng-maxlength="10" required tabindex="2" class="form-control">
                <span class="input-group-btn">
                    <button class="btn btn-info" type="button" popover="A project key identifies each project and must be unique. The project key cannot be changed." popover-title="What's a project key?" popover-placement="right" popover-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
                </span>
            </div>
        </div>
        <div class="form-group" id="create_project_lead_group">
            <label for="create_project_lead" class="col-sm-3 control-label">Project Lead</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" id="create_project_lead" class="form-control" readonly ng-controller="main_controller" value="{{ real_name() }} (You)">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="create_project_submit_button" type="submit" ng-disabled="create_project_form.$invalid" class="btn btn-primary" tabindex="6"><span class="glyphicon glyphicon-plus-sign"></span> Create Project</button>
        <button id="create_project_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="7">Cancel</button>
    </div>
</form>