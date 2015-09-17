/* global angular */
(function () {
    'use strict';


    var app = angular.module('myApp.specialities', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider
            .when('/specialities', {
                templateUrl: 'views/specialities/specialities.html',
                controller: 'SpecialitiesController',
                controllerAs: 'SpecialitiesCtrl'
            })
            .when('/specialities/add', {
                templateUrl: 'views/specialities/speciality_add.html',
                controller: 'SpecialitiesAddController',
                controllerAs: 'SpecialitiesAddCtrl'
            })
            .when('/specialities/edit', {
                templateUrl: 'views/specialities/speciality_edit.html',
                controller: 'SpecialitiesEditController',
                controllerAs: 'SpecialitiesEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('SpecialitiesController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'specialities'}, function (data) {
            var specialities = {};
            angular.forEach(data, function (speciality) {
                specialities[speciality.id] = speciality;
            });
            controller.specialities = specialities;
        });
    });

    app.controller('SpecialitiesAddController', function ($scope, $location) {
        $scope.reset = function () {
            $location.path('/specialities');
        }
    });

    app.controller('SpecialitiesEditController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'specialities'}, function (data) {
            var specialities = {};
            angular.forEach(data, function (speciality) {
                if ($location.search().id === speciality.id.toString()) {
                    specialities[speciality.id] = speciality;
                }
            });
            controller.specialities = specialities;
        });
        $scope.reset = function () {
            $location.path('/specialities');
            $location.search('id', null);
        }
    });
}());
