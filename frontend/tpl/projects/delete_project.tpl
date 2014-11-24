<form role="form" name="delete_project_form" ng-submit="delete_project()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="delete_project_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title text-danger">
            Delete a project
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="delete_project_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Are you sure you want to delete the project with the key <strong>{{ key }}</strong>?<br>
            This will also remove all cards and participants data associated with this project.
        </p>
    </div>
    <div class="modal-footer">
        <button id="delete_project_submit_button" type="submit" class="btn btn-danger" tabindex="1"><span class="glyphicon glyphicon-trash"></span> Delete Project</button>
        <button id="delete_project_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="2">Cancel</button>
    </div>
</form>