/* global angular */
(function () {
    'use strict';


    var app = angular.module('myApp.specialties', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider.when('/specialties', {
            templateUrl: 'views/specialties/specialties.html',
            controller: 'SpecialtiesController',
            controllerAs: 'SpecialtiesCtrl'
        })
            .when('/specialties/add', {
                templateUrl: 'views/specialties/speciality_add.html',
                controller: 'SpecialtiesAddController',
                controllerAs: 'SpecialtiesAddCtrl'
            })
            .when('/specialties/edit', {
                templateUrl: 'views/specialties/speciality_edit.html',
                controller: 'SpecialtiesEditController',
                controllerAs: 'SpecialtiesEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('SpecialtiesController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'specialities'}, function (data) {
            controller.specialies = data;
        });
    });

    app.controller('SpecialtiesAddController', function ($scope, $location) {
        $scope.reset = function () {
            $location.path('/specialties');
        }
    });

    app.controller('SpecialtiesEditController', function ($scope, $location) {
        $scope.reset = function () {
            $location.path('/specialties');
        }
    });
}());
