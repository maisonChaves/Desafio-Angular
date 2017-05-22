(function () {
    'use strict';

    app.service('starWarsService', ['$http', function ($http) {
        var self = this;

        self.urlBase = 'http://www.omdbapi.com/?s=%22Star%20Wars:%20Episode%22';

        self.getMovies = function () {
            return $http.get(self.urlBase);
        };
    }]);

    app.service('gotService', ['$http', function ($http) {
        var self = this;

        self.urlBase = 'http://www.omdbapi.com/?t=Game%20of%20Thrones';

        self.getSerie = function () {
            return $http.get(self.urlBase);
        };

        self.getSeason = function (season) {
            return $http.get(self.urlBase + '&Season=' + season);
        };
    }]);

}());