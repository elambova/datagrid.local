(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    var app = angular.module('myApp', [
        'ngRoute',
        'ngResource',
        'myApp.users',
        'myApp.home',
        'myApp.students',
        'myApp.courses',
        'myApp.disciplines',
        'myApp.specialties',
        'myApp.assessments',
        'myApp.version'
    ]);
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
    app.factory('UrlResource', function ($resource) {
        return $resource('http://api.datagrid.local:9000/v1/:pageUrl', {pageUrl: 'url'});
    });


    $('.navbar-nav li').click(function () {
        $('.navbar-nav li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
    });
}());