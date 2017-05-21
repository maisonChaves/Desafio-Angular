"use strict";

app.controller('MainController', ['$scope', 'starWarsService', 'gotService', function ($scope, starWarsService, gotService) {
    getMovies();
    getSerie();

    $scope.max = 4;

    $scope.range = function (n) {
        if (n) {
            return new Array(parseInt(n));
        }
    };

    $scope.back = function () {
        var index = ($scope.tabIndex == 0) ? $scope.max : $scope.tabIndex - 1;
        $scope.tabIndex = index;
    };

    $scope.next = function () {
        var index = ($scope.tabIndex == $scope.max) ? 0 : $scope.tabIndex + 1;
        $scope.tabIndex = index;
    };

    function getMovies() {
        starWarsService.getMovies()
            .then(function (response) {
                $scope.movies = response.data.Search;
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
    }
}]);