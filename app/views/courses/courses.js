/* global angular */

(function () {
    'use strict';

    var app = angular.module('myApp.courses', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider
            .when('/courses', {
                templateUrl: 'views/courses/courses.html',
                controller: 'CourseController',
                controllerAs: 'CourseCtrl'
            })
            .when('/courses/add', {
                templateUrl: 'views/courses/course_add.html',
                controller: 'CoursesAddController',
                controllerAs: 'CoursesAddCtrl'
            })
            .when('/courses/edit', {
                templateUrl: 'views/courses/course_edit.html',
                controller: 'CoursesEditController',
                controllerAs: 'CoursesEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('CourseController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'courses'}, function (data) {
            var courses = {};
            angular.forEach(data, function (course) {
                courses[course.id] = course;
            });
            controller.courses = courses;
        });
    });
    app.controller('CoursesAddController', function (UrlResource, $scope, $location) {
        $scope.reset = function () {
            $location.path('/courses');
        };
    });
    app.controller('CoursesEditController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'courses'}, function (data) {
            var courses = {};
            angular.forEach(data, function (course) {
                if ($location.search().id === course.id.toString()) {
                    courses[course.id] = course;
                }
            });
            controller.courses = courses;
        });
        $scope.reset = function () {
            $location.path("/courses");
        };
    });
}());