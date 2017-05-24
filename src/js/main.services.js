(function () {

    'use strict';

    angular.module('challengeApp').service('starWarsService', starWarsService);

    starWarsService.$inject = ['$http'];

    /**
     * @namespace starWarsService
     * @desc star wars movies service
     * @memberOf ChallengeApp
     */
    function starWarsService($http) {
        var self = this;

        var urlBase = 'http://www.omdbapi.com/?apikey=bd9be61b&s=%22Star%20Wars:%20Episode%22';

        self.getMovies = getMovies;

        /**
         * @name getMovies
         * @desc Returns a list of star wars movies
         * @returns {Promise} Promise of movie list
         * @memberOf ChallengeApp.starWarsService
         */
        function getMovies() {
            return $http.get(urlBase);
        }
    }

    angular.module('challengeApp').service('gotService', gotService);

    gotService.$inject = ['$http'];

    /**
     * @namespace gotService
     * @desc GOT serie service
     * @memberOf ChallengeApp
     */
    function gotService($http) {
        var self = this;

        var urlBase = 'http://www.omdbapi.com/?apikey=bd9be61b&t=Game%20of%20Thrones';

        self.getSeason = getSeason;
        self.getSerie = getSerie;

        /**
         * @name getSeason
         * @desc Returns a promise of a season data
         * @param {int} season season number
         * @returns {Promise} Promise of season data
         * @memberOf ChallengeApp.gotService
         */
        function getSeason(season) {
            return $http.get(urlBase + '&Season=' + season);
        }

        /**
         * @name getSerie
         * @desc Returns a promise of GOT serie data
         * @returns {Promise} promise of GOT serie data
         * @memberOf ChallengeApp.gotService
         */
        function getSerie() {
            return $http.get(urlBase);
        }
    }

}());