"use strict";

var Events = require('events');
var cheerio = require('cheerio');
var loader = require('../loader');
var Q = require('q');

function Prodata(url) {

	var self = this;

	self.url = url;

	this.parse = function () {

		var deferred = Q.defer();
		var result = [];

		loader(self.url).then(function (body) {

			var html = cheerio.load(body, {normalizeWhitespace: true});
			html('.ja_div4').each(function (i, tag) {
				var job = cheerio(tag);
				var title = job.find('.ja_p7').text().replace(/^\s+|\s+$/g, '');
				var link = job.find('a').attr('href');
				result.push({
					title: title,
					link: link
				});
			});
			deferred.resolve(result);
		});

		return deferred.promise;
	};
}

Prodata.prototype.__proto__ = Events.EventEmitter.prototype;
module.exports = Prodata;
