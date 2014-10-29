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
		
		p.once('entry', function (entry) {
			expect(entry.link).toBe('http://www.konsulenter.dk/opgave/3638/Ms-Dynamics-Ax-2009-forretningskonsulenter/');
			expect(entry.title).toBe('Ms Dynamics Ax 2009 forretningskonsulenter');
			done();
		});

		p.parse();

	});

});