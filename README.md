# ng-observe
--------------------------
### Installation

```sh
$ bower install ng-observe --save
```

Add this tags to you index.html file:

```sh
<script src="path-to-bower_components/angular/angular.js"></script>
<script src="path-to-bower_components/ng-observe/ng-obseve.js"></script>
```

And add this package as dependency to you main AngularJs module:

```sh
angular.module('YouModule', [... 'ngObserve']);
```

Now you can use Obseve factory in you AngularJs app.

### Example
app.js
```sh
var app = angular.module('ExampleApp', ['ngObserve']);

app.factory('dataService', function(Observe) {
  var data = new Observe('test');
  return data;
});

app.controller('MainCtrl', function($scope, dataService) {
  $scope.message = '';
  $scope.onSubmit = function() {
    dataService.next($scope.message);
    $scope.message = '';
  };
});

app.controller('OtherCtrl', function($scope, dataService) {
  var sbscr = dataService.subscribe(function(data) {
    $scope.data = data;
  });
  $scope.$on('$destroy', function() {
    sbscr.cancel();
  });
});
```
index.html
```sh
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Example ng-observe</title>
  </head>
  <body ng-app="ExampleApp">
  
    <div ng-controller="MainCtrl">
      <form ng-submit="onSubmit()">
        <input type="text" ng-model="message" required>
        <button type="submit">submit</button>
      </form>
    </div>
    
    <div ng-controller="OtherCtrl">
      {{data}}
    </div>
    
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/ng-observe/ng-observe.js"></script>
    <script src="app.js"></script>
  </body>
</html>

```
