'use strict';

var Events = require('events');
var md5 = require('MD5');
var sqlite3 = require('sqlite3').verbose();
var cofig = require('config');

function Model() {

	var self = this;

	self.db = new sqlite3.Database(cofig.db.file);

	this.addEntry = function (entry) {

		var hash = md5(entry.link);

		self.exists.get(hash, function (err, row) {
			if (err) {
				self.emit('error', err);
			} else {
				if (row.n === 0) {
					self.insert.run([hash, entry.title, entry.link], function (err) {
						if (err) {
							self.emit('error', err);
						} else {
							self.emit('entry', {
								hash: hash,
								title: entry.title,
								link: entry.link
							});
						}
					});
				}
			}
		});
	};

	this.getAllEntries = function (callback) {

		self.getAll.all(function (err, rows) {
			if (err) {
				self.emit('error', err);
				callback(err);
			} else {
				callback(rows);
			}
		});
	};


	//init tables and statements:
	self.db.serialize(function() {
		self.db.run('CREATE TABLE IF NOT EXISTS jobs (hash, title, link, date);');
		self.db.run('CREATE TABLE IF NOT EXISTS users (email, emailHash, importantWords, spamWords);');
		self.getAll = self.db.prepare('SELECT * FROM jobs;');
		self.exists = self.db.prepare('SELECT COUNT(*) as n FROM jobs WHERE hash = ?');
		self.insert = self.db.prepare('INSERT INTO jobs (hash, title, link) VALUES (?, ?, ?)');
	});
}


Model.prototype.__proto__ = Events.EventEmitter.prototype;

module.exports = Model;