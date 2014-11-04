'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var config = require('config');

function logger (log) {

	var name = moment().format('YYYY-MM-DD') + '.log';
	var file = path.join(config.log || '', name);
	var date = moment().format();

	if (process.env.NODE_ENV == 'production') {
		fs.appendFile(file, date + ' ' + log + '\n', function (err) {
			if (err) console.log(err);
		});		
	} else {
		console.log(date + ' ' + log);
	}


}

module.exports = logger;