const express = require('express');
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const { port, env } = require('./config/env');


//create an expres app
const app = express();

//set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//set up out static files folder
// first look in public folder for target, then look at routes
app.use(express.static(`${__dirname}/public`));


// routes, just before the error handler
app.use(routes);

// set up the error handler - the LAST piece of middle ware.
app.use(errorHandler);

//test
app.listen(port, () => console.log(`express is listening to port ${port}`));
