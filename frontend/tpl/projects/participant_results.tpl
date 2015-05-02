<div class="page">
    <h1>Participant Results for {{ participant.first_name }} {{ participant.last_name }} ({{ project_key }})</h1>

    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left">
            <a class="btn btn-default" href="/frontend/projects/results/{{ project_key }}"><span class="glyphicon glyphicon-arrow-left"></span> Back to Project Results</a>
        </div>
    </div>

    <div class="experiment-container">
        <div class="workspace" style="left: 0px !important;">
            <div class="category-wrapper">
                <div class="category" ng-repeat="category in categories">
                    <div class="category-header">
                        {{ category.text }}
                    </div>
                    <div class="sortable sortable-target">
                        <div class="card" ng-repeat="card in category.cards">
                            <div class="btn-group btn-group-sm card-controls" style="visibility: visible;">
                                <button ng-class="get_tooltip_class(card.tooltip);" class="btn btn-info" tooltip="{{ card.tooltip }}" tooltip-append-to-body="true"><span class="glyphicon glyphicon-question-sign"></span></button>
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