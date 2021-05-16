const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const data = require('./data/district_mappings.json')
const userData = require('./data/user_selections.json')

const app = express();
const port = 5500;

app.set('trust proxy', 1);

app.use(cookieSession({
	name: 'session',
	keys: ['73910ecbhjcschcsjhck83','hui1hi1290s9u19s']
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

app.locals.SiteName = 'Cowin Helper';


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'./static')));

// Main

const routes = require('./routes');

app.use('/', routes());

/*app.get('/',(request,response) =>{
	return response.render('./layout/index');
});

app.get('/:userID',(request,response) => {
	userData.forEach(function (user){
		if(user.userID == request.params.userID){
			const area = user.district_selection || user.pincode_selection;
			return response.send(`We will keep you notified about 18+ slots at ${area}`);
		}
	});
});*/

//Error part
app.use((request, response, next) =>{
	return next(createError(404,"Page not found"));
});


app.use((err, request, response, next) => {
	console.log(err);
	response.locals.message = err.message;
	const status = err.status || 500;
	response.locals.status = status;
	response.render('error');
});

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
  });