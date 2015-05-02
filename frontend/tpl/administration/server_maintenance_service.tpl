<div class="page">
    <h1>
        Server Maintenance Service
    </h1>

    <div class="form-group" style="padding-bottom: 50px; ">
        <div class="pull-left">
            <h4>
                This is result of the last service run:
            </h4>
        </div>
        <div class="pull-right">
            <button class="btn btn-default" type="button" ng-click="run()"><span class="glyphicon glyphicon-refresh"></span> Refresh</button>
        </div>
    </div>

    <textarea class="form-control" ng-model="output" rows="20" readonly style="font-family: monospace;"></textarea>
</div>