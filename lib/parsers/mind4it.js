"use strict";

var Events = require('events');
var cheerio = require('cheerio');
var loader = require('../loader');
var md5 = require('MD5');

function Prodata(url) {

	var self = this;

	self.url = url;

	this.parse = function () {
		loader(self.url, function (err, res, body) {
			if (err) {
				self.emit('error', err);
				return;
			}
			var html = cheerio.load(body, {normalizeWhitespace: true});
			html('.share-body .commentary').each(function (i, tag) {
				var job = cheerio(tag);

				var title = job.text();
				var link = self.url + '#' + md5(title);

				self.emit('entry', {
					title: title,
					link: link
				});
			});
		});
	};
}

Prodata.prototype.__proto__ = Events.EventEmitter.prototype;
module.exports = Prodata;
