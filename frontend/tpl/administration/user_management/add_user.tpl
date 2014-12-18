<form role="form" name="add_user_form" ng-submit="add_user()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="add_user_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Add an account
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="add_user_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Please fill out this form to create a new user account.
        </p>
        <div class="form-group" id="add_user_firstName_group" style="padding-top: 20px;">
            <label for="add_user_firstName" class="col-sm-3 control-label">First Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="user.first_name" ng-change="generate_username()" id="add_user_firstName" placeholder="First Name" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_lastName_group">
            <label for="add_user_lastName" class="col-sm-3 control-label">Last Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="user.last_name" ng-change="generate_username()" id="add_user_lastName" placeholder="Last Name" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_username_group">
            <label for="add_user_username" class="col-sm-3 control-label">Username</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="user.username" ng-change="username_modified = true;" id="add_user_username" placeholder="Username" required tabindex="3" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_email_group">
            <label for="add_user_email" class="col-sm-3 control-label">Email address</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                <input type="email" ng-model="user.email" id="add_user_email" placeholder="Email address" required tabindex="4" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_user_role_group">
            <label for="add_user_role" class="col-sm-3 control-label">Role</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <select class="form-control" id="add_user_role" ng-model="user.role" required tabindex="5">
                    <option value="2">Administrator</option>
                    <option value="1">Moderator</option>
                </select>
            </div>
        </div>
        <div class="form-group" id="add_user_status_group">
            <label for="add_user_status" class="col-sm-3 control-label">Status</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <div class="btn-group">
                    <label class="btn btn-success text-uppercase" ng-model="user.status" btn-radio="1"><span class="label">ON</span></label>
                    <label class="btn btn-default text-uppercase" ng-model="user.status" btn-radio="0"><span class="label" style="color: #000000;">OFF</span></label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="add_user_submit_button" type="submit" ng-disabled="add_user_form.$invalid" class="btn btn-primary" tabindex="6"><span class="glyphicon glyphicon-plus-sign"></span> Add User</button>
        <button id="add_user_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="7">Cancel</button>
    </div>
</form>