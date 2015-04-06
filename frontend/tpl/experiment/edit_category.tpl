<form role="form" name="edit_category_form" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="add_category_close_button" type="button" class="close" ng-click="$close(false)" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Edit Category
        </h3>
    </div>
    <div class="modal-body">
        <p>
            Change the details of an existing category.
        </p>
        <div class="form-group" id="edit_category_text_group" style="padding-top: 20px;">
            <label for="edit_category_text" class="col-sm-3 control-label">Category</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-stats flip-both"></span></span>
                <input type="text" id="edit_category_text" ng-model="edit_category_text" placeholder="Category" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" ng-disabled="edit_category_form.$invalid" ng-click="$close(edit_category_text);" class="btn btn-warning" tabindex="2"><span class="glyphicon glyphicon-edit"></span> Edit Category</button>
        <button type="button" class="btn btn-default" ng-click="$close(false)" tabindex="3">Cancel</button>
    </div>
</form>