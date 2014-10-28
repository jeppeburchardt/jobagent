"use strict";

var request = require('request');
var fs = require('fs');

function loader (uri, handler) {

	request(uri, function (err, res, body) {
		if (err) {
			fs.readFile(uri, function (fserr, data) {
				handler(fserr, null, data);
			});
		} else {
			handler(err, res, body);
		}
	});

}

module.exports = loader;