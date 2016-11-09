angular.module('armsAngularApp')
  .factory('subjectService', ['$http', 'CONFIG', function ($http, CONFIG) {
    /*
       * get the base url 
       */
    var baseUrl = CONFIG.BASE_URL;
    var subjectService = {};

    /*
     * use the service to insert new subject
     */
    subjectService.insertNewSubject = function (subjectInstance) {
      return $http.post(baseUrl + 'subject', subjectInstance).then(function (res) {
        return res;
      });
    }

    /*
     * get all the available subjects
     */
    subjectService.getAllSubjects = function () {
      return $http.get(baseUrl + 'subject').then(function (res) {
        return res;
      })
    }

    /*
     * delete the subject
     */
    subjectService.deleteSubject = function (subjectId) {
      return $http({
        method: "delete",
        url: baseUrl + 'subject',
        params: { subjectId: subjectId }
      }).then(function (data) {
        return data;
      })
    }

    /*
    * update subject
    */
    subjectService.updateSubject = function (subject) {
      return $http({
        method: 'put',
        url: baseUrl + 'subject',
        params: subject
      }).then(function (data) {
        return data;
      })
    }

    subjectService.getSubjectNames = function () {
      return $http.post(baseUrl + '/subject/getNames').then(function (res) {
        return res;
      });
    }

    return subjectService;
  }]);