"use strict";

var Events = require('events');
var cheerio = require('cheerio');
var loader = require('../loader');

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
			html('.ja_div4').each(function (i, tag) {
				var job = cheerio(tag);

				var title = job.find('.ja_p7').text().replace(/^\s+|\s+$/g, '');
				var link = job.find('a').attr('href');

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
