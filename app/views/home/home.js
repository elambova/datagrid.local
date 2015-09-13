/* global angular */

(function () {
    'use strict';
    angular.module('myApp.home', ['ngRoute'])

            .config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
                    $routeProvider
                            .when('/', {
                                templateUrl: 'views/home/home.html',
                                controller: 'HomeController',
                                controllerAs: 'HomeCtrl'
                            });
                    $resourceProvider.defaults.stripTrailingSlashes = false;
                }])

            .controller('HomeController', function (UrlResource) {
                    var controller = this;
                    UrlResource.query({pageUrl: 'students'}, function (data) {
                        controller.students = data;
                    });
                    UrlResource.query({pageUrl: 'courses'}, function (data) {
                        var courses = {};
                        angular.forEach(data, function (course) {
                            courses[course.id] = course;
                        });
                        controller.courses = courses;
                    });
                    UrlResource.query({pageUrl: 'specialities'}, function (data) {
                        var specialies = {};
                        angular.forEach(data, function (speciality) {
                            specialies[speciality.id] = speciality;
                        });
                        controller.specialies = specialies;
                    });
                    UrlResource.query({pageUrl: 'subjects'}, function (data) {
                        controller.subjects = data;
                    });
                });
}());