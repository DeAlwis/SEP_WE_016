'use strict';
/**
 * @ngdoc service
 * @name armsAngularApp.appointments/AuthenticationService
 * @description
 * # appointments/AuthenticationService
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .service('AuthenticationService', function($q, $http, API_ENDPOINT) {

        /***********************************/
        /****  Authentication routes  ******/
        /**********   CONFIG   *************/
        /***********************************/
        var USER_AUTHENTICATE_API = API_ENDPOINT.url + '/api/authentication/authenticate-user';
        var LOCAL_TOKEN_KEY = 'arms_token_key';
        var isAuthenticated = false;
        var authToken;


        var login = function(user) {
            return $q(function(resolve, reject) {
                $http.post(USER_AUTHENTICATE_API, user).then(function(result) {
                    if (result.data.success) {
                        console.log(result.data.token);
                        storeUserCredentials(result.data.token);
                        resolve(result.data.success);
                    } else {
                        reject(result.data.success);
                    }
                });
            });
        };



        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        // Set the token as header for your requests!
        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            $http.defaults.headers.common.Authorization = authToken;
        }

        function getUserCredentials(){
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            var segments = token.split('.');
            var content = Base64URLDecode(segments[1]);
            return content;
        }



        // destroy the token
        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        var logout = function() {
            destroyUserCredentials();
        };

        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthenticated: function() {return isAuthenticated;},
            getUserCredentials:getUserCredentials
        };



        // utility function for decrypting jwt token
        function Base64URLDecode(base64UrlEncodedValue) {

            var result1;
            var result2;
            var newValue = base64UrlEncodedValue.replace("-", "+").replace("_", "/");

            try {
                result1 = window.atob(newValue);
                result2 = decodeURIComponent(escape(window.atob(newValue)));
                if (result1 != result2) {
                    _gaq.push(['_trackEvent', 'error_prevented', 'unicode decode']);
                    analytics.track('Token Decode', {
                        plan: 'Enterprise'
                    });
                }

            } catch (e) {
                throw "Base64URL decode of JWT segment failed";
            }

            return JSON.parse(result2);
        }



    })

    .factory('AuthenticationInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    });
