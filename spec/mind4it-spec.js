var Mind4it = require('../lib/parsers/mind4it');
var config = require('config');

describe('Mind4it parser', function () {

	it('should set url property', function () {

		var p = new Mind4it('./fixtures/mind4it.html');
		expect(p.url).toBe('./fixtures/mind4it.html');

	});

	it('should find at least one job', function (done) {

		var fixture = './fixtures/mind4it.html';
		var p = new Mind4it(fixture);

		p.parse().then(function (result) {
			expect(result.length).toBe(10);
			done();
		});

	});

});