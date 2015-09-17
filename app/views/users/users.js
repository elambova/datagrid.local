/* global angular */

(function () {
    'use strict';

    var app = angular.module('myApp.users', ['ngRoute']);

    app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $routeProvider
            .when('/users', {
                templateUrl: 'views/users/users.html',
                controller: 'UsersController',
                controllerAs: 'UsersCtrl'
            })
            .when('/users/add', {
                templateUrl: 'views/users/user_add.html',
                controller: 'UsersAddController',
                controllerAs: 'UsersAddCtrl'
            })
            .when('/users/edit', {
                templateUrl: 'views/users/user_edit.html',
                controller: 'UsersEditController',
                controllerAs: 'UsersEditCtrl'
            });
    }]);

    app.controller('UsersController', function (UrlResource) {
        var controller = this;
        UrlResource.query({pageUrl: 'users'}, function (data) {
            var users = {};
            angular.forEach(data, function (user) {
                users[user.id] = user;
            });
            controller.users = users;
        });
        UrlResource.query({pageUrl: 'roles'}, function (data) {
            var roles = {};
            angular.forEach(data, function (role) {
                roles[role.id] = role;
            });
            controller.roles = roles;
        });
    });

    app.controller('UsersAddController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'roles'}, function (data) {
            var roles = {};
            angular.forEach(data, function (role) {
                roles[role.id] = role;
            });
            controller.roles = roles;
        });

        $scope.add = function () {
            var data = {
                username: $('.add-form input[name="userName"]').val(),
                firstName: $('.add-form input[name="firstName"]').val(),
                lastName: $('.add-form input[name="lastName"]').val(),
                email: $('.add-form input[name="email"]').val(),
                password: $('.add-form input[name="password"]').val(),
                roleId: $('.add-form option').val()
            };
            UrlResource.$save({pageUrl: 'users'}, data);
        };
        $scope.reset = function () {
            $location.path('/users');
        }
    });

    app.controller('UsersEditController', function (UrlResource, $scope, $location) {
        var controller = this;
        UrlResource.query({pageUrl: 'users'}, function (data) {
            var users = {};
            angular.forEach(data, function (user) {
                if ($location.search().id === user.id.toString()) {
                    users[user.id] = user;

                    UrlResource.query({pageUrl: 'roles'}, function (data) {
                        var roles = {};
                        angular.forEach(data, function (role) {
                            if (user.roleId === role.id) {
                                roles[role.id] = role;
                            }
                        });
                        controller.roles = roles;
                    });
                }
            });
            controller.users = users;
        });
        $scope.reset = function () {
            $location.path('/users');
            $location.search('id', null);
        }
    });
}());