(function () {

    'use strict';

    angular.module('challengeApp').controller('MainController', MainController);

    MainController.$inject = ['$filter', 'starWarsService', 'gotService', '$mdStepper'];

    /**
     * @namespace MainController
     * @desc Main Controller of Challenge App
     * @memberOf ChallengeApp
     */
    function MainController($filter, starWarsService, gotService, $mdStepper) {

        var main = this;

        getMovies();
        getSerie();

        main.answer = {};
        main.back = back;
        main.getSeason = getSeason;
        main.next = next;
        main.range = range;

        /**
         * @name back
         * @desc go back on stepper
         * @memberOf ChallengeApp.MainController
         */
        function back() {
            var steppers = $mdStepper('stepper');
            steppers.back();
        }

        /**
         * @name getMovies
         * @desc get star wars movies
         * @memberOf ChallengeApp.MainController
         */
        function getMovies() {
            starWarsService.getMovies()
                .then(function (response) {
                    main.movies = response.data.Search;
                    main.movies = $filter('filterTitle')(main.movies, 'Robot Chicken');
                    main.movies = $filter('filterType')(main.movies, 'game');
                }, function (error) {
                    main.status = 'Unable to load movies data: ' + error.message;
                });
        }

        /**
         * @name getSeason
         * @desc get episodes from GOT seasons
         * @param {int} season season of GOT
         * @memberOf ChallengeApp.MainController
         */
        function getSeason(season) {
            gotService.getSeason(season + 1)
                .then(function (response) {
                    main.season = response.data;
                }, function (error) {
                    main.status = 'Unable to load season ' + season + ' data: ' + error.message;
                });
        }

        /**
         * @name getSerie
         * @desc get info about GOT serie
         * @memberOf ChallengeApp.MainController
         */
        function getSerie() {
            gotService.getSerie()
                .then(function (response) {
                    main.serie = response.data;
                }, function (error) {
                    main.status = 'Unable to load serie data: ' + error.message;
                });
        }

        /**
         * @name range
         * @desc Returns a new Array with size equal to n
         * @param {String} n size to n
         * @returns {Array} Array with size n
         * @memberOf ChallengeApp.MainController
         */
        function range(n) {
            if (n) {
                return new Array(parseInt(n));
            }
        }

        /**
         * @name next
         * @desc go next on stepper
         * @memberOf ChallengeApp.MainController
         */
        function next() {
            var steppers = $mdStepper('stepper');
            steppers.next();
        }

    }

}());