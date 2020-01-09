// import and init server
const fastify = require('fastify')();
require('dotenv').config();

// routes
fastify.register(require('./routes/checkout'));

// listener
fastify.listen(5000, function(err, addr) {
	if (err) {
		console.log(err);
		process.exit(1);
	} else {
		console.log('server running on port 5000');
	}
});
