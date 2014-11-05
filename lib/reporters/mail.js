'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config');
var logger = require('../logger');


function Mail (model) {

	var self = this;

	self.model = model;
	
	this.sendLinks = function (links) {

		var subject = 'I\'ve found ' + links.length + ' new jobs';
		var text = links.map(function (l) {
			return l.title + '\n\r' + '<' + l.link + '>';
		}).join('\n\r\n\r');

		if (config.mail) {
			self.transporter = nodemailer.createTransport(smtpTransport(config.mail.transport));
			self.send(text);
		} else {
			logger('Mail transport not configured!');
			logger(subject);
			logger(text);
		}

	};

	this.send = function (subject, text) {
		var mail = {
			from: config.mail.from,
			to: config.mail.to,
			subject: subject,
			text: text
		};

		self.transporter.sendMail(mail, function (err, info) {
			if (err) {
				logger(err);
			} else {
				logger(info.response);
			}
		});
	}
}

module.exports = Mail;