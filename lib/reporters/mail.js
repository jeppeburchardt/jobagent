'use strict';

var nodemailer = require('nodemailer');
var config = require('config');
var logger = require('../logger');


function Mail (model) {

	var self = this;

	self.model = model;
	
	this.onEntry = function (entry) {

		var mail = {
			from: config.mail.from,
			to: config.mail.to,
			subject: 'New job',
			text: 'I found a new job for you\n\n' + entry.title + ' <' + entry.link + '>'
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
		self.transporter = nodemailer.createTransport(config.mail.transport);
		self.model.on('entry', self.onEntry);
	}
}

module.exports = Mail;