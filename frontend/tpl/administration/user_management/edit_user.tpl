<form role="form" name="edit_user_form" ng-submit="edit_user()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="edit_user_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Edit an account
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="edit_user_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Change details for user <strong>{{ user.first_name }} {{ user.last_name }} ({{ username }})</strong>.<br>
            Please not that the username cannot be changed.
        </p>
        <div class="form-group" id="edit_user_first_name_group" style="padding-top: 20px;">
            <label for="edit_user_first_name" class="col-sm-3 control-label">First Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="user.first_name" ng-change="generate_username()" id="edit_user_first_name" placeholder="First Name" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_user_last_name_group">
            <label for="edit_user_last_name" class="col-sm-3 control-label">Last Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="user.last_name" ng-change="generate_username()" id="edit_user_last_name" placeholder="Last Name" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_user_email_group">
            <label for="edit_user_email" class="col-sm-3 control-label">Email address</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                <input type="text" ng-model="user.email" id="edit_user_email" placeholder="Email address" required tabindex="3" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_user_role_group">
            <label for="edit_user_role" class="col-sm-3 control-label">Role</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <select class="form-control" id="edit_user_role" ng-model="user.role" required tabindex="4">
                    <option value="3">Administrator</option>
                    <option value="2">Moderator</option>
                </select>
            </div>
        </div>
        <div class="form-group" id="edit_user_status_group">
            <label for="edit_user_status" class="col-sm-3 control-label">Status</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <div class="btn-group">
                    <label class="btn btn-success text-uppercase" ng-model="radioModel" btn-radio="'active'">Active</label>
                    <label class="btn btn-default text-uppercase" ng-model="radioModel" btn-radio="'inactive'">Inactive</label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="edit_user_submit_button" type="submit" ng-disabled="edit_user_form.$invalid" class="btn btn-warning" tabindex="5"><span class="glyphicon glyphicon-edit"></span> Edit User</button>
        <button id="edit_user_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="6">Cancel</button>
    </div>
</form>