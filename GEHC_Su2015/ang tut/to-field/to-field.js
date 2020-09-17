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
 * Provides the Type Ahead Functionality for the To Field
 *
 * @author
 * Monique Shotande <moniqueshotande@ge.com>
 *
 ***************************************************************************************************/
 
 define(['angular', 'getActiveUsers'], function () {

	// Module Dependencies
	var dependencies = [
		'Services.GetActiveUsers'
	];

	// Module Definition
	var mod = angular.module('cloudav.typeAhead', dependencies);
	 
	 mod.directive('toField', ['getActiveUsers', function (getActiveUsers) {
		 
		 return {
			 restrict: 'E',
			 
			 templateUrl: "caseexchange/modules/create-case/directives/to-field/to-field.html",
			 controller: function($scope) {
				 
				// Array of users shown in the email input typeahead
				$scope.usersInTypeahead = [];
				 
				// Array of added recipients
				$scope.addedRecipients = [];
				
				// Highlight to field on focused 
				$scope.toFieldInputFocused = false;
				
				/**
				  * Hiding recipients dropdown if recipient input value is less than 2. 
				  */
				$scope.$watch('formData.recipientsInput', function (newValue, oldValue) {
					if (newValue && newValue.length < 2) {
					  $scope.usersInTypeahead = [];
					}
				});
				
				/**
				  * Gets an array of users for the UI-Bootstrap Typeahead that is attached to the input field.
				  *
				  * @param email
				  *    The current value of the input field.
				  */
				$scope.getActiveUsers = function (email) {
					if (email && email.length >= 2) {
					  $scope.fetchingUserList = true;

					  //prevent resetting the flag when the typeahead is working,
					  //this might accidentally submit the form with fake email id
					  $scope.noUsersFound = $scope.noUsersFound || false;
				  
					  $scope.recipientAlreadySelected = false;
					  // Request possible matches from the server (note: the '*' is a wildcard)
					  return usersApi.getUsers({ search: email, status: 'active' }).then(
						function success(users) {
						  $scope.fetchingUserList = false;
						  if (users.data.length > 0) {
							if (email === $scope.formData.recipientsInput) {
							  $scope.usersInTypeahead = users.data;
							  $scope.noUsersFound = false;
							}
						  }
						  else {
							$scope.usersInTypeahead = [];
							$scope.noUsersFound = true;
						  }
						  return users.data;
						},
						function error(reason) {
						  $scope.fetchingUserList = false;
						  $scope.usersInTypeahead = [];
						  $scope.noUsersFound = true;
						  return [];
						});
					} else {
					  $scope.usersInTypeahead = [];
					  return [];
					}
				  }
				  
				 /**
				   * Finds the selected user in the list of added users.
				   *
				   * @param user
				   *    The selected user for adding/removing
				   */
				  var findRecipient = function (user) {
					return _.find($scope.addedRecipients, function (recipient) {
					  return recipient.email === user.email;
					});
				  }
				  
				 /**
				   * Adds the recipient in the list of added users.
				   *
				   * @param user
				   *    The selected user for adding into the list
				   */
				  $scope.addRecipient = function (user) {
					$scope.formData.recipientsInput = "";
					$scope.toFieldInputFocused = true;
					$scope.usersInTypeahead = [];
					if (findRecipient(user)) {
					  $scope.recipientAlreadySelected = true;
					}
					else {
					  $scope.addedRecipients.push(user);
					  $scope.formData.tempRecipients = $scope.addedRecipients;
					  // Hide the error if there is atleast one recipient
					  $scope.displayNoRecipientError = false;
					}
					angular.element('#recipientsInput').focus();
				  }

				
				 /**
				   * Removes the recipient from the list of added users.
				   *
				   * @param user
				   *    The selected user for removing from the list
				   */
				  $scope.removeRecipient = function (user) {
					var recipient = findRecipient(user);
					if (recipient) {
					  $scope.addedRecipients.splice($scope.addedRecipients.indexOf(recipient), 1);
					  $scope.formData.tempRecipients = $scope.addedRecipients;
					  // If there are no more recipient, then display the error.
					  $scope.displayNoRecipientError = $scope.addedRecipients.length === 0;
					}
				  }

				  /**
				   * Highlighting To field on focus
				   */
				  $scope.highlightToField = function () {
					$scope.toFieldInputFocused = true;
				  }

				  
				 
			 }
		 };
	 }]);
 });