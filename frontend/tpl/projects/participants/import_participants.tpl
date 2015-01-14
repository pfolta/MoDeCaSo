<form role="form" name="import_participants_form" ng-submit="import_participants()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="import_participants_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Import Participants
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="import_participants_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Please select a file containing MoDeCaSo participants to import and add the participants to this project.
        </p>
        <div class="form-group" id="import_participants_text_group" style="padding-top: 20px;">
            <label for="import_participants_text" class="col-sm-3 control-label">File to import</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-floppy-open"></span></span>
                <input type="file" ng-file-select ng-model="file" accept=".txt" id="import_participants_file" placeholder="File to import" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">Progress</label>
            <div class="col-sm-7" style="padding: 7px 0 0 0;">
                <progressbar value="progressbar.progress" type="{{ progressbar.type }}"></progressbar>
            </div>
            <label class="col-sm-2 control-label" id="import_participants_progressbar_label">{{ progressbar.progress }} %</label>
        </div>
    </div>
    <div class="modal-footer">
        <button id="import_participants_submit_button" type="submit" ng-disabled="import_participants_form.$invalid" class="btn btn-primary" tabindex="2"><span class="glyphicon glyphicon-floppy-open"></span> Import Participants</button>
        <button id="import_participants_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="3">Cancel</button>
    </div>
</form>