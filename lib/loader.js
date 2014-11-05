"use strict";

var request = require('request');
var fs = require('fs');
var Q = require('q');

function loader (uri, handler) {

	var deferred = Q.defer();

	request(uri, function (err, res, body) {
		if (err) {
			fs.readFile(uri, function (fserr, data) {
				if (fserr) {
					deferred.reject(fserr);
				} else {
					deferred.resolve(data);
				}
			});
		} else {
			deferred.resolve(body);
		}
	});

	return deferred.promise;

}

module.exports = loader;