(function () {

    'use strict';

    /**
     * @namespace filterTitle
     * @desc filter list by title
     * @memberOf ChallengeApp
     */
    angular.module('challengeApp').filter('filterTitle', function () {
        return function (collection, fragment) {

            if (!fragment) {
                return collection;
            }

            return collection.filter(function (item) {
                return item.Title.indexOf(fragment) === -1;
            });
        };
    });

    /**
     * @namespace filterType
     * @desc filter list by type
     * @memberOf ChallengeApp
     */
    angular.module('challengeApp').filter('filterType', function () {
        return function (collection, fragment) {

            if (!fragment) {
                return collection;
            }

            return collection.filter(function (item) {
                return item.Type.indexOf(fragment) === -1;
            });
        };
    });

}());