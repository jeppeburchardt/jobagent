'use strict';

var config = require('config');
var Model = require('./model');
var Mailer = require('./reporters/mail');
var logger = require('./logger');

function Jobagent() {

	var self = this;

	self.model = new Model();
	self.mailer = new Mailer(self.model);

	this.parse = function () {
		config.parsers.forEach(function (parser) {
			logger(parser.name + ' loading ' + parser.url);
			var ParserModule = require('./parsers/' + parser.name);
			var p = new ParserModule(parser.url);
			p.on('entry', self.onParserEntry);
			p.on('error', self.onError);
			p.parse();
		});
	};
	this.onParserEntry = function (entry) {
		logger(parser.name + ' found ' + entry.link);
		self.model.addEntry(entry);
	};
	this.onModelEntry = function (entry) {
		logger('NEW ENTRY! ' + entry.link);
	};
	this.onError = function (err) {
		logger(err);
	};

	self.model.on('entry', self.onModelEntry);
	self.model.on('error', self.onError);
}



module.exports = Jobagent;