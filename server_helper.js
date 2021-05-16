const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

app.set('trust proxy', 1);

app.use(cookieSession({
	name: 'session',
	keys: ['73910ecbhjcschcsjhck83','hui1hi1290s9u19s']
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

app.use(async (request, response, next) => {
	try{
		const names = await speakerService.getList();
		app.locals.SpeakerNames = names;
		}
	catch(err){
		return next(err);
	}
	return next();
});

app.locals.SiteName = 'Neetu Shatran Waala';

const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const { request, response } = require('express');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'./static')));

app.use('/', routes(
	{
		feedbackService,
		speakerService
	}
));


app.use((request, response, next) =>{
	return next(createError(404,"Page not found"));
});

app.use((err, request, response, next) => {
	response.locals.message = err.message;
	const status = err.status || 500;
	response.locals.status = status;
	response.render('error');
	//response.status(status);
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});