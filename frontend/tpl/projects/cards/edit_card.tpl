<form role="form" name="edit_card_form" ng-submit="edit_card()" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="edit_card_close_button" type="button" class="close" ng-click="$close()" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Edit Card
        </h3>
    </div>
    <div class="modal-body">
        <div class="alert" id="edit_card_flash" ng-show="flash.show" ng-class="flash.type" ng-bind-html="html_save(flash.message)" role="alert">
        </div>
        <p>
            Change the details of an existing card.
        </p>
        <div class="form-group" id="edit_card_text_group" style="padding-top: 20px;">
            <label for="edit_card_text" class="col-sm-3 control-label">Text</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-credit-card"></span></span>
                <input type="text" ng-model="card.text" id="edit_card_text" placeholder="Text" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
        <div class="form-group" id="edit_card_tooltip_group">
            <label for="edit_card_tooltip" class="col-sm-3 control-label">Tooltip</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-tag"></span></span>
                <input type="text" ng-model="card.tooltip" id="edit_card_tooltip" placeholder="Tooltip" tabindex="2" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button id="edit_card_submit_button" type="submit" ng-disabled="edit_card_form.$invalid" class="btn btn-warning" tabindex="3"><span class="glyphicon glyphicon-edit"></span> Edit Card</button>
        <button id="edit_card_cancel_button" type="button" class="btn btn-default" ng-click="$close()" tabindex="4">Cancel</button>
    </div>
</form>