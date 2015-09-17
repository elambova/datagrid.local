/* global angular */

(function () {
    'use strict';

    var app = angular.module('myApp.subjects', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider
            .when('/subjects', {
                templateUrl: 'views/subjects/subjects.html',
                controller: 'SubjectsController',
                controllerAs: 'SubjectsCtrl'
            })
            .when('/subjects/add', {
                templateUrl: 'views/subjects/subject_add.html',
                controller: 'SubjectsAddController',
                controllerAs: 'SubjectsAddCtrl'
            })
            .when('/subjects/edit', {
                templateUrl: 'views/subjects/subject_edit.html',
                controller: 'SubjectsEditController',
                controllerAs: 'SubjectsEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('SubjectsController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'subjects'}, function (data) {
            var subjects = {};
            angular.forEach(data, function (subject) {
                subjects[subject.id] = subject;
            });
            controller.subjects = subjects;
        });
    });

    app.controller('SubjectsAddController', function ($scope, $location) {
        $scope.reset = function () {
            $location.path('/subjects');
        };
    });

    app.controller('SubjectsEditController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'subjects'}, function(data){
            var subjects = {};
            angular.forEach(data, function (subject) {
                if($location.search().id === subject.id.toString()){
                    subjects[subject.id] = subject;
                }
            });
            controller.subjects = subjects;
        })
        $scope.reset = function () {
            $location.path('/subjects');
        };
    });

}());