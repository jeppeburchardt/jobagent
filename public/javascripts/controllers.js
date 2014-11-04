var jobAgentApp = angular.module('jobAgentApp', []);

jobAgentApp.controller('SettingsCtrl', function ($scope, $http) {

	$http.get('/api/jobs').success(function(data) {
		$scope.jobs = data;
		updateClasses();
	});

	$scope.important = 'dynamics ios';
	$scope.spam = 'scrum manager';
	$scope.show = 'show-all';
	$scope.dirty = false;

	function updateClasses() {
		var importantWords = $scope.important.toLowerCase().split(' ');
		var spamWords = $scope.spam.toLowerCase().split(' ');

		$scope.jobs.forEach(function (obj) {
			var title = obj.title.toLowerCase();
			obj.important = importantWords.some(function (word) {
				return (word.length > 2 && title.indexOf(word) > -1);
			});
			obj.spam = spamWords.some(function (word) {
				return (word.length > 2 && title.indexOf(word) > -1);
			});
			// obj.important = ($scope.important && obj.title.indexOf($scope.important) > -1);
			// obj.spam = ($scope.spam && obj.title.indexOf($scope.spam) > -1);
			obj.cssClass = obj.important ? 'important' : obj.spam ? 'spam' : '';
			console.log(obj.cssClass);
		});
	}

	$scope.changeTags = function () {
		$scope.dirty = true;
		updateClasses();
	}

	
});