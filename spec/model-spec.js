var Model = require('../lib/model');


describe('Model', function () {

	it('Should emit event when a new entry is added', function (done) {

		var m = new Model();
		m.on('entry', function (entry) {
			expect(entry.title).toBe('TEST1');
			expect(entry.link).toBe('TEST2');
			done();
		});
		m.addEntry({
			title:'TEST1',
			link:'TEST2'
		});

	});

	it('Should only emit the same URL once', function (done) {

		var m = new Model();
		var count = 0;

		m.on('entry', function (e) {
			count ++;
		});

		m.addEntry({
			title:'TEST1',
			link:'TEST2'
		});

		setTimeout(function () {

			m.addEntry({
				title:'TEST1',
				link:'TEST2'
			});

			setTimeout(function () {
				done();
				expect(count).toBe(1);
			 }, 10);

		}, 10);
		

	});

});