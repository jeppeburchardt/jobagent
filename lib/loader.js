"use strict";

var request = require('request');
var fs = require('fs');

function loader (uri, handler) {

	try {

		request(uri, function (err, res, body) {
			handler(err, res, body);
		});

	} catch (e) {

		fs.readFile(uri, function (err, data) {
			handler(err, null, data);
		});

	}

}

module.exports = loader;