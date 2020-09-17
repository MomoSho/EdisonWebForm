/***************************************************************************************************
 * Copyright (c) 2014 General Electric Company. All rights reserved. 
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 *
 ***************************************************************************************************
 * 
 * @description
 * A factory that provides a method to gets an array of users from the server.
 *
 * @author
 *  <@ge.com>
 *
 ***************************************************************************************************/
define(['angular', 'urlBuilder'], function() {
    
  // Module Dependencies
  var dependencies = [
    'Services.UrlBuilder',
  ];
    
  // Module Definition
  var mod = angular.module('Services.GetActiveUsers', dependencies);

  /**
   * @name getActiveUsers
   * @type factory
   * 
   * @description
   * A factory that provides a method to gets an array of users from the server.
   */    
  mod.factory('getActiveUsers', ['$q', '$log', 'urlBuilder', function($q, $log, urlBuilder) {   
    /**
     * Base url for requests to the Users REST API.
     */
    var USERS_URL = '/v1/umgmt/users';

    /** 
     * Public API 
     */
    return {
      // GET
      getUsers: getUsers
    };
	
    /**
     * Gets an array of users from the server.
     *
     * @param options.firstName
     *    The first name of the user to retrieve.
     *
     * @param options.lastName
     *    The last name of the user to retrieve.
     *
     * @param options.userName
     *    The username of the user to retrieve.
     *
     * @param options.email
     *    The email of the user to retrieve.
     *
     * @param options.offset
     *    The offset of the first user to return (default is 0).
     *
     * @param options.limit
     *    The maximum number of users to return (default is 50).
     *
     * @param options.siteId
     *    The IDs of site(s) from which to return users. It can be either:
     *        a) An array of site IDs.
     *        b) A comma-separated string of site IDs.
     *
     * @param settings.async
     *    By default, all requests are sent asynchronously (i.e. this is set to true by default). 
     *    If you need synchronous requests, set this option to false. Please note that synchronous 
     *    requests may temporarily lock the browser, disabling any actions while the request is active.
     *
     * @return
     *    A promise that will be resolved/rejected once a response is received.
     */
    function getUsers(options, settings) {
      var deferred = $q.defer(),
          settings = settings || {},
          url = urlBuilder.buildUrl(USERS_URL, options);

      $.ajax({
        async: (settings.async === false) ? false : true,
        dataType: 'json',
        type: 'get',
        url: url,
        success: success,
        error: error
      });
      
      return deferred.promise;

      function success(data, textStatus, jqXHR) {
        $log.log('Success: usersApi: GET "' + url + '"');
        var users = data || { data: [], next: 0, offset: 0, total: 0 };
        userExtender.extendUsers(users.data);
        deferred.resolve(users);
      }

      function error(jqXHR, textStatus, errorThrown) {
        var errorMsg = 'Error: usersApi: GET "' + url + '" (failed): ' + errorThrown;
        $log.error(errorMsg);
        deferred.reject(errorMsg);
      }

    } 
	
  }]);