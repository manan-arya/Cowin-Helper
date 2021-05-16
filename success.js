const express = require("express");

const router = express.Router();

module.exports = () => {

	router.get('/success', async (request, response, next) => {
		try{
			response.render('layout', {template: "success"});
		}
		catch(err){
			return next(err);
		}
	});

	return router;
};