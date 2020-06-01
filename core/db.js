const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
	.connect(
		process.env.DB_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.catch(function(err) {
		throw Error(err);
	});

module.exports = mongoose;
