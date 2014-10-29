'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config');
var logger = require('../logger');


function Mail (model) {

	var self = this;

	self.model = model;
	
	this.onEntry = function (entry) {

		var mail = {
			from: config.mail.from,
			to: config.mail.to,
			subject: entry.title,
			text: '<' + entry.link + '>'
		}

		self.transporter.sendMail(mail, function (err, info) {
			if (err) {
				logger(err);
			} else {
				logger(info.response);
			}
		});

	}

	if (config.mail) {
		self.transporter = nodemailer.createTransport(smtpTransport(config.mail.transport));
		self.model.on('entry', self.onEntry);
	} else {
		logger('Mail transport not configured!');
	}
}

module.exports = Mail;