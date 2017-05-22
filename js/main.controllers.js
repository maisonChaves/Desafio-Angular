(function () {

    "use strict";

    app.controller('MainController', ['$scope', '$filter', 'starWarsService', 'gotService', '$mdStepper', function ($scope, $filter, starWarsService, gotService, $mdStepper) {
        getMovies();
        getSerie();

        $scope.answer = {};

        $scope.range = function (n) {
            if (n) {
                return new Array(parseInt(n));
            }
        };

        $scope.back = function () {
            var steppers = $mdStepper('stepper');
            steppers.back();
        };

        $scope.next = function () {
            var steppers = $mdStepper('stepper');
            steppers.next();
        };

        function getMovies() {
            starWarsService.getMovies()
                .then(function (response) {
                    $scope.movies = response.data.Search;
                    $scope.movies = $filter('filterTitle')($scope.movies, 'Robot Chicken');
                    $scope.movies = $filter('filterType')($scope.movies, 'game');
                }, function (error) {
                    $scope.status = 'Unable to load movies data: ' + error.message;
                });
        }

        function getSerie() {
            gotService.getSerie()
                .then(function (response) {
                    $scope.serie = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load serie data: ' + error.message;
                });
        }

        $scope.getSeason = function (season) {
            gotService.getSeason(season + 1)
                .then(function (response) {
                    $scope.season = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load season ' + season + ' data: ' + error.message;
                });
        };
    }]);

}());