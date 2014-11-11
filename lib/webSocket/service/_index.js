var PersonDomain = require('./data');

var PersonService = function() {
	this.personDao = null;
}

PersonService.prototype.testMethodTransaction = function(cb, txStatus) {
	var person = new PersonDomain['func']();
	person.setIp('yy');
	person.setCreateTime(new Date());

	var self = this;
	this.personDao.transaction(txStatus).add(person, function(err, results) {
		if (err) {
			cb(err);
			return;
		}
		self.personDao.transaction(txStatus).getList([ 1, 2 ], function(err, results) {
			if (err) {
				cb(err);
				return;
			}
			cb(null, results);
		});
	});
}