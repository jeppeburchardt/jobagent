var Prodata = require('../lib/parsers/prodata');
var config = require('config');

describe('Prodata parser', function () {

	it('should set url property', function () {

		var p = new Prodata('./fixtures/prodata.html');
		expect(p.url).toBe('./fixtures/prodata.html');

	});

	it('should find at least one job', function (done) {

		var fixture = './fixtures/prodata.html';
		var p = new Prodata(fixture);

		p.parse().then(function (result) {
			expect(result.length).toBe(28);
			done();
		});

	});

});