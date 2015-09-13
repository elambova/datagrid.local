/* global angular */

(function () {
    'use strict';

    var app = angular.module('myApp.disciplines', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider
            .when('/disciplines', {
                templateUrl: 'views/disciplines/disciplines.html',
                controller: 'DisciplinesController',
                controllerAs: 'DisciplinesCtrl'
            })
            .when('/disciplines/add', {
                templateUrl: 'views/disciplines/discipline_add.html',
                controller: 'DisciplinesAddController',
                controllerAs: 'DisciplinesAddCtrl'
            })
            .when('/disciplines/edit', {
                templateUrl: 'views/disciplines/discipline_edit.html',
                controller: 'DisciplinesEditController',
                controllerAs: 'DisciplinesEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('DisciplinesController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'subjects'}, function (data) {
            controller.disciplines = data;
        });
    });

}());