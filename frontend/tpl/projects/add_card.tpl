<form role="form" name="add_card_form" ng-submit="add_card()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="add_card_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Add Card
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="add_card_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Please fill out this form to add a new card to this project.
        </p>
        <div class="form-group" id="add_card_card_group" style="padding-top: 20px;">
            <label for="add_card_card" class="col-sm-3 control-label">Card</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-th-large"></span></span>
                <input type="text" ng-model="card" id="add_card_card" placeholder="Card" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="add_card_submit_button" type="submit" ng-disabled="add_card_form.$invalid" class="btn btn-primary" tabindex="2"><span class="glyphicon glyphicon-plus-sign"></span> Add Card</button>
        <button id="add_card_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="3">Cancel</button>
    </div>
</form>