const express = require("express");
const {check, validationResult} = require("express-validator");

const router = express.Router();

const validations = [
	check('name')
	.trim()
	.isLength({min:3})
	.escape()
	.withMessage("Name cannot be that short."),
	check('email')
	.trim()
	.isEmail()
	.normalizeEmail()
	.withMessage("Invalid Email"),
];

module.exports = () => {

	router.get('/', async (request, response, next) => {
		try{
			response.render('layout', {template: "index"});
		}
		catch(err){
			return next(err);
		}
	});

	router.post('/success', validations, (request, response) =>{
		const errors = validationResult(request);
		
		response.render('layout', {template: "success", errors});
	});

	return router;
};