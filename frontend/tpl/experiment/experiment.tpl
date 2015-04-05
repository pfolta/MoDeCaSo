<div class="page">
    <h1>Card Sorting Experiment</h1>

    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left">
            <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-save"></span> Save</button>
            <button type="button" class="btn btn-success" ng-disabled="unsorted_cards.length != 0;"><span class="glyphicon glyphicon-log-out"></span> Save and Submit</button>
            <button type="button" class="btn btn-default" ng-click="start_over();"><span class="glyphicon glyphicon-refresh"></span> Start Over</button>
        </div>
        <div class="pull-left" style="margin-left: 15px;">
            <button type="button" class="btn btn-primary" ng-click="add_category();"><span class="glyphicon glyphicon-plus-sign"></span> Add Category</button>
        </div>
        <div class="pull-right">
            <button type="button" class="btn btn-danger" ng-click="do_not_participate();"><span class="glyphicon glyphicon-ban-circle"></span> Do Not Participate</button>
        </div>
    </div>

    <div class="experiment-container">
        <div class="card-container-col sortable" ui-sortable="sortable_options" ng-model="unsorted_cards">
            <div class="card grab" ng-repeat="card in unsorted_cards">
                <div class="btn-group btn-group-sm card-controls">
                    <button ng-disabled="!card.tooltip" class="btn btn-info" popover="{{ card.tooltip }}" popover-title="{{ card.text }}" popover-placement="top" popover-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
                </div>
                <div class="card-text">
                    {{ card.text }}
                </div>
            </div>
        </div>
        <div class="workspace">
            <div class="workspace-blank" ng-show="categories.length == 0;">
                Start here
            </div>
            <div class="category-wrapper" ng-show="categories.length > 0;" style="width: {{ categories.length * 241 }}px;">
                <div class="category" ng-repeat="category in categories">
                    <div class="category-header">
                        <div class="btn-group btn-group-sm category-controls">
                            <button type="button" class="btn btn-warning" ng-click="edit_category(category.text);" tooltip="Edit Category" tooltip-append-to-body="true"><span class="glyphicon glyphicon-edit"></span></button>
                            <button type="button" class="btn btn-danger" ng-click="remove_category(category.text);" tooltip="Remove Category" tooltip-append-to-body="true"><span class="glyphicon glyphicon-trash"></span></button>
                        </div>
                        {{ category.text }}
                    </div>
                    <div ui-sortable="sortable_options" class="sortable sortable-target" ng-model="category.cards">
                        <div class="card grab" ng-repeat="card in category.cards">
                            <div class="btn-group btn-group-sm card-controls">
                                <button ng-disabled="!card.tooltip" class="btn btn-info" popover="{{ card.tooltip }}" popover-title="{{ card.text }}" popover-placement="top" popover-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
                            </div>
                            <div class="card-text">
                                {{ card.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>