(function () {

    "use strict";

    app.filter('filterTitle', function () {
        return function (collection, fragment) {

            if (!fragment) {
                return collection;
            }

            return collection.filter(function (item) {
                console.log(item);
                return item.Title.indexOf(fragment) == -1;
            });
        };
    });

    app.filter('filterType', function () {
        return function (collection, fragment) {

            if (!fragment) {
                return collection;
            }

            return collection.filter(function (item) {
                console.log(item);
                return item.Type.indexOf(fragment) == -1;
            });
        };
    });

}());