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

    app.controller('AssessmentsAddController', function (UrlResource, $scope, $location) {
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
        $scope.reset = function () {
            $location.path('/assessment');
        }
    });

    app.controller('AssessmentsEditController', function (UrlResource, $scope, $location) {
        var controller = this;

        UrlResource.query({pageUrl: 'assessments'}, function (data) {
            var assessments = {};
            angular.forEach(data, function (assessment) {
                assessments[assessment.id] = assessment;
                var assessmentId = assessment.id;
                if ($location.search().id === assessmentId.toString()) {
                    var studentId = assessment.studentId;
                    var subjectId = assessment.subjectId
                    var workloadLectures = assessment.workloadLectures;
                    var workloadExercises = assessment.workloadExercises;
                    var assessmentSubject = assessment.assessment;

                    UrlResource.query({pageUrl: 'students'}, function (data) {
                        var students = {};
                        angular.forEach(data, function (student) {
                            if (studentId === student.id) {
                                students[student.studentId] = student;
                            }
                        });
                        controller.students = students;
                    });

                    UrlResource.query({pageUrl: 'subjects'}, function (data) {
                        var subjects = {};
                        angular.forEach(data, function (subject) {
                            if (subjectId === subject.id) {
                                subjects[subject.subjectId] = subject;
                                subject.workloadLectures = workloadLectures;
                                subject.workloadExercises = workloadExercises;
                                subject.assessment = assessmentSubject;
                            }
                        });
                        controller.subjects = subjects;
                    });
                }
            });
            controller.assessments = assessments;
        });
        $scope.reset = function () {
            $location.path("/assessments");
            $location.search('id', null);
        }
    });
}());