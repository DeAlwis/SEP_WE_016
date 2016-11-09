angular.module('armsAngularApp')
    .factory('centerService', ['$http', 'CONFIG', function ($http, CONFIG) {
        var baseUrl = CONFIG.BASE_URL;
        var centerService = {};

        centerService.createCenter = function (center) {
            return $http({
                method: 'post',
                url: baseUrl + 'center',
                data: { center: center }
            }).then(function (response) {
                return response;
            });
        }

        centerService.getCenters = function () {
            return $http({
                method: 'get',
                url: baseUrl + 'center'
            }).then(function (response) {
                return response;
            })
        }

        centerService.deleteCenter = function (centerId) {
            return $http({
                method: 'delete',
                url: baseUrl + 'center/' + centerId
            }).then(function (response) {
                return response;
            })
        }

        centerService.updateCenter = function (center) {
            return $http({
                method: 'put',
                url: baseUrl + 'center',
                data: { center: center}
            }).then(function (response) {
                return response;
            })
        }
        return centerService;
    }]);