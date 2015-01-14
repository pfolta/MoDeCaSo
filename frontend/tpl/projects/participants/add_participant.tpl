<form role="form" name="add_participant_form" ng-submit="add_participant()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="add_participant_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Add Participant
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="add_participant_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Please fill out this form to add a new participant to this project.
        </p>
        <p>
            You can add multiple participants at once in a batch fashion as this input dialog will stay open after you added a participant. When you are finished adding participants, simply click on <strong>Cancel</strong> to close the dialog.
        </p>
        <p>
            The character <strong>|</strong> (pipe) is not allowed.
        </p>
        <div class="form-group" id="add_participant_first_name_group" style="padding-top: 20px;">
            <label for="add_participant_first_name" class="col-sm-3 control-label">First Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="first_name" id="add_participant_first_name" placeholder="First Name" ng-pattern="/^[^|]*$/" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_participant_last_name_group">
            <label for="add_participant_last_name" class="col-sm-3 control-label">Last Name</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <input type="text" ng-model="last_name" id="add_participant_last_name" placeholder="Last Name" ng-pattern="/^[^|]*$/" required tabindex="2" class="form-control">
            </div>
        </div>
        <div class="form-group" id="add_participant_email_group">
            <label for="add_participant_email" class="col-sm-3 control-label">Email Address</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                <input type="email" ng-model="email" id="add_participant_email" placeholder="Email Address" ng-pattern="/^[^|]*$/" required tabindex="3" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="add_participant_submit_button" type="submit" ng-disabled="add_participant_form.$invalid" class="btn btn-primary" tabindex="4"><span class="glyphicon glyphicon-plus-sign"></span> Add Participant</button>
        <button id="add_participant_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="5">Cancel</button>
    </div>
</form>