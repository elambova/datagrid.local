/* global angular */

(function () {
    'use strict';
    var app = angular.module('myApp.assessments', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
            $routeProvider
                    .when('/assessments', {
                        templateUrl: 'views/assessments/assessments.html',
                        controller: 'AssessmentsController',
                        controllerAs: 'AssessmentsCtrl'
                    })
                    .when('/assessments/add', {
                        templateUrl: 'views/assessments/assessment_add.html',
                        controller: 'AssessmentsAddController',
                        controllerAs: 'AssessmentsAddCtrl'
                    })
                    .when('/assessments/edit', {
                        templateUrl: 'views/assessments/assessment_edit.html',
                        controller: 'AssessmentsEditController',
                        controllerAs: 'AssessmentsEditCtrl'
                    });
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);

    app.controller('AssessmentsController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'students'}, function (data) {
            var students = {};
            angular.forEach(data, function (student) {
                students[student.id] = student;
            });
            controller.students = students;
        });
        UrlResource.query({pageUrl: 'specialities'}, function (data) {
            var specialities = {};
            angular.forEach(data, function (speciality) {
                specialities[speciality.id] = speciality;
            });
            controller.specialities = specialities;
        });
        UrlResource.query({pageUrl: 'assessments'}, function (data) {
            controller.assessments = data;
        });
        UrlResource.query({pageUrl: 'subjects'}, function (data) {
            var subjects = {};
            angular.forEach(data, function (subject) {
                subjects[subject.id] = subject;
            });
            controller.subjects = subjects;
        });
    });
    
    app.controller('AssessmentsAddController', function (UrlResource, $scope) {
        var controller = this;
        UrlResource.query({pageUrl: 'subjects'}, function (data) {
            var subjects = {};
            angular.forEach(data, function (subject) {
                subjects[subject.id] = subject;
            });
            controller.subjects = subjects;
        });
        UrlResource.query({pageUrl: 'students'}, function (data) {
            var students = {};
            angular.forEach(data, function (student) {
                students[student.id] = student;
            });
            controller.students = students;
        });
        $scope.reset = function(){
            window.history.back();
        }
    });
    
    app.controller('AssessmentsEditController', function (UrlResource, $scope) {
        var controller = this;
        UrlResource.query({pageUrl: 'subjects'}, function (data) {
            var subjects = {};
            angular.forEach(data, function (subject) {
                subjects[subject.id] = subject;
            });
            controller.subjects = subjects;
        });
        UrlResource.query({pageUrl: 'students'}, function (data) {
            var students = {};
            angular.forEach(data, function (student) {
                students[student.id] = student;
            });
            controller.students = students;
        });
        $scope.reset = function(){
            window.history.back();
        }
    });
}());