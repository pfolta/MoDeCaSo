<form role="form" name="add_category_form" novalidate class="form-horizontal">
    <div class="modal-header">
        <button id="add_category_close_button" type="button" class="close" ng-click="$close(false)" tooltip="Close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h3 class="modal-title">
            Add Category
        </h3>
    </div>
    <div class="modal-body">
        <p>
            Please fill out this form to add a new category.
        </p>
        <div class="form-group" id="add_category_text_group" style="padding-top: 20px;">
            <label for="add_category_text" class="col-sm-3 control-label">Category</label>
            <div class="input-group col-sm-9" style="padding-right: 15px;">
                <span class="input-group-addon"><span class="glyphicon glyphicon-stats flip-both"></span></span>
                <input type="text" ng-model="add_category_text" placeholder="Category" required autofocus tabindex="1" class="form-control">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" ng-disabled="add_category_form.$invalid" ng-click="$close(add_category_text);" class="btn btn-primary" tabindex="2"><span class="glyphicon glyphicon-plus-sign"></span> Add Category</button>
        <button type="button" class="btn btn-default" ng-click="$close(false)" tabindex="3">Cancel</button>
    </div>
</form>