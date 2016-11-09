/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * author:- Amila
 */

angular.module('armsAngularApp')
    .factory('facultyService', ['$http', 'CONFIG', function ($http, CONFIG) {
        /*
         * get the base url 
         */
        var baseUrl = CONFIG.BASE_URL;
        var facultyService = {};

        /*
         * inseryng a new faculty
         * @faculty = instance passe by Faculty controller
         */
        facultyService.insertNewFaculty = function (faculty) {
            return $http.post(baseUrl + 'faculty', faculty);
        };

        /*
         * get all the faculty information
         */
        facultyService.getAllFacultyDetails = function () {
            return $http.get(baseUrl + 'faculty');
        };

        /*
         * remove faculty using faculty id
         */
        facultyService.deleteFaculty = function (facultyId) {
            return $http({
                method: 'delete',
                url: baseUrl + 'faculty',
                params: { facultyId: facultyId }
            }).then(function (response) {
                return response;
            });
        };

        /*
         * update the faculty
         */
        facultyService.updateFaculty = function (facultyId, updatedValue) {
            return $http({
                method: 'put',
                url: baseUrl + 'faculty',
                params: { facultyId: facultyId, updatedName: updatedValue }
            }).then(function (response) {
                return response;
            });
        };

        return facultyService;
    }]);

