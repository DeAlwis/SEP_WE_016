'use strict';

/**
 * @ngdoc overview
 * @name armsAngularApp
 * @description
 * # armsAngularApp
 *
 * Main module of the application.
 */
angular
    .module('armsAngularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'datatables',
        'datatables.bootstrap',
        'ui.select2'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/master/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                activeTab: 'login'
            })
            .when('/manage-users/create-u-role', {
                templateUrl: 'views/role/usertype.html',
                controller: 'UsertypeCtrl',
                controllerAs: 'usertype',
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/appointments/appointment', {
                templateUrl: 'views/appointments/appointment.html',
                controller: 'AppointmentCtrl',
                controllerAs: 'appointment',
                bindToController: 'true'

            })
			.when(' /faculty/main', {
				templateUrl: 'views/faculty/main.html',
				controller: 'FacultyMainCtrl',
				controllerAs: 'facultyController',
			})
            .otherwise({
                redirectTo: '/'
            });
    }]).run(function($rootScope) {        
        $rootScope.user = {
            id: 3,
            userName:'student01',
            role:'lecture'
        };
        $rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
            switch (currentRoute.templateUrl) {
                case 'views/login.html':
                    $rootScope.bodyClass = 'login-page';
                    break;
                default:
                    if($rootScope.role == 'Admin'){
                       $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini'; 
                    }
                    else {
                        $rootScope.bodyClass = 'hold-transition skin-blue sidebar-mini layout-top-nav'; 
                    }
                    break;
            }
            
        });
    }).constant('CONFIG', {
        'APP_NAME': 'Acadamic Resource Management',
        'APP_VERSION': '0.0.1',
        'GOOGLE_ANALYTICS_ID': '',
        'BASE_URL': 'http://localhost:8002/',
        'SYSTEM_LANGUAGE': ''
    })
    .constant("moment", moment);

