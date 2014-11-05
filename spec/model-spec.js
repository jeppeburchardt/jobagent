var Model = require('../lib/model');


describe('Model', function () {

	it('should add entry', function (done) {

		var m = new Model();

		m.addEntry({
			title:'TEST',
			link:'LOL'
		}).done(function (r) {
			expect(r.title).toBe('TEST');
			expect(r.link).toBe('LOL');
			expect(r.hash).toBe('aee4bd941f8b4d9e39210c06c44fcb71');
			done();
		});

	});

	it('should only add unique entries', function (done) {
		var m = new Model();

		m.addEntry({
			link:'LOL'
		}).then(function (r) {
			expect(r.link).toBe('LOL');

			m.addEntry({
				link:'LOL'
			}).then(function (r2) {
				expect(r2).toBe(null);
				done();
			});
		});
	});

	xit('Should emit event when a new entry is added', function (done) {

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

	xit('Should only emit the same URL once', function (done) {

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