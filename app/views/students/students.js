/* global angular */

(function () {
    'use strict';

    var app = angular.module('myApp.students', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $routeProvider
            .when('/students', {
                templateUrl: 'views/students/students.html',
                controller: 'StudentsController',
                controllerAs: 'StudentsCtrl'
            })
            .when('/students/add', {
                templateUrl: 'views/students/student_add.html',
                controller: 'StudentsAddController',
                controllerAs: 'StudentsAddCtrl'
            })
            .when('/students/edit?:id', {
                templateUrl: 'views/students/student_edit.html',
                controller: 'StudentsEditController',
                controllerAs: 'StudentsEditCtrl'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

    app.controller('StudentsController', function (UrlResource) {
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
    });

    app.controller('StudentsAddController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'courses'}, function (data) {
            var courses = {};
            angular.forEach(data, function (course) {
                courses[course.id] = course;
            });
            controller.courses = courses;
        });
        UrlResource.query({pageUrl: 'specialities'}, function (data) {
            var specialities = {};
            angular.forEach(data, function (speciality) {
                specialities[speciality.id] = speciality;
            });
            controller.specialities = specialities;
        });

        $scope.reset = function () {
            $location.path('/students');
        };
    });

    app.controller('StudentsEditController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'students'}, function (data) {
            var students = {};

            angular.forEach(data, function (student) {
                var studentId = student.id;
                if ($location.search().id === studentId.toString()) {
                    students[student.id] = student;
                    var courseId = student.courseId;
                    var specialityId = student.specialityId;

                    UrlResource.query({pageUrl: 'courses'}, function (data) {
                        var courses = {};
                        angular.forEach(data, function (course) {
                            if (courseId === course.id) {
                                courses[student.courseId] = course;
                            }
                        });
                        controller.courses = courses;
                    });

                    UrlResource.query({pageUrl: 'specialities'}, function (data) {
                        var specialities = {};
                        angular.forEach(data, function (speciality) {
                            if (specialityId === speciality.id) {
                                specialities[student.specialityId] = speciality;
                            }
                        });
                        controller.specialities = specialities;
                    });

                }
            });
            controller.students = students;
        });
        $scope.reset = function () {
            $location.path('/students');
            $location.search('id', null);
        };

    });
}());
