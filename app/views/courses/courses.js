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
            controller.courses = data;
        });
    });
    app.controller('CoursesAddController', function($scope){
       $scope.reset = function(){
           window.history.back();
       };
    });
    app.controller('CoursesEditController', function($scope){
       $scope.reset = function(){
           window.history.back();
       };
    });
}());