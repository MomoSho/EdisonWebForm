dependencies = [];

var app = angular.module('formApp', dependencies);
app.controller('FormController', ['$scope', '$filter', function($scope, $filter) {
    $scope.data = {};

    $scope.update = function(user) {
        var result = $filter('filter')(data, {email: user.email}, true);

        if(result.length === 0)
            $scope.data.push(user);
        else {
            var i = data.indexOf(user, 0);
            data[i] = user;
        }
    };
    $scope.reset = function(form) {
        if(form) {
            form.$setPristine();
            form.$setunTouched();
        }
        //$scope.user = {};
    };
}]);