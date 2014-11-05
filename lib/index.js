'use strict';

var config = require('config');
var Model = require('./model');
var Mailer = require('./reporters/mail');
var logger = require('./logger');
var Q = require('q');

function Jobagent() {

	var self = this;

	self.model = new Model();
	self.mailer = new Mailer();

	this.parse = function () {

		var parsers = config.parsers.map(function (parser) {
			logger(parser.name + ' loading ' + parser.url);
			var ParserModule = require('./parsers/' + parser.name);
			var p = new ParserModule(parser.url);
			return p.parse();
		})

		Q.all(parsers).then(function (d) {
			var merged = [];
			merged = merged.concat.apply(merged, d);
			self.handleParserResult(merged);
		});
	};

	this.handleParserResult = function (result) {
		var results = result.map(function (entry) {
			logger('found ' + entry.link);
			return self.model.addEntry(entry);
		});
		Q.all(results).then(self.complete);
	};

	this.complete = function (jobs) {
		var filtered = jobs.filter(function (entry) {
			return (entry !== null);
		});
		if (filtered.length > 0) {
			self.mailer.sendLinks(filtered);
		} else {
			logger('No new links to send :(');
		}
	}
}



module.exports = Jobagent;