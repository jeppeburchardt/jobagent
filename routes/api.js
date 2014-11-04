var express = require('express');
var router = express.Router();

function api(model) {

	router.get('/jobs', function(req, res) {

		model.getAllEntries(function (rows) {
			res.json(rows);
		});
		
	});

	return router;
}


module.exports = api;
