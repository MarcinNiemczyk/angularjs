var app = angular.module("myApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/employees", {
            templateUrl: "views/home.html"
        })
        .when("/employees/add", {
            templateUrl: "views/directory.html",
            controller: "MainController"
        })
        .otherwise({
            redirectTo: "/home"
        });
}]);

app.controller("MainController", ["$scope", "$http", function($scope, $http ){

    console.log($scope);

    let db = "http://127.0.0.1:3000/employees";

    $scope.seniorityLevels = ["junior", "mid", "senior"];

    $scope.seniorityColors = {
        "junior": "green",
        "mid": "aqua",
        "senior": "purple"
    }


    $scope.addEmployee = function() {
        let payload = {
            id: null,
            name: $scope.newemployee.name.toLowerCase(),
            salary: parseInt($scope.newemployee.salary),
            value: parseInt($scope.newemployee.value),
            seniority: $scope.newemployee.seniority,
            active: true
        };

        $http.post(db, angular.toJson(payload)).success(function(data) {
            $scope.employees.push(payload);
            console.log(data);
            $scope.newemployee.name = "";
            $scope.newemployee.salary = "";
            $scope.newemployee.value = "";
        });
    }

    $scope.removeEmployee = function(employee) {
        var removedEmployee = $scope.employees.indexOf(employee);
        $scope.employees.splice(removedEmployee, 1);
    }

    $http.get(db).success(function(data) {
        $scope.employees = data;
    })
}]);