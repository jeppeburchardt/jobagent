'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var config = require('config');

function logger (log) {

	var name = moment().format('YYYY-MM-DD') + '.log';
	var file = path.join(config.log || '', name);
	var date = moment().format();

	fs.appendFile(file, date + '\t' + log + '\n', function (err) {
		if (err) console.log(err);
	});
}

module.exports = logger;