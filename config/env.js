// it would take the port number from the zshrc file - heroku will choose one, or
// if none chosen it will run on port 3000.
const port = process.env.PORT || 3000;
const env = process.env.NDE_ENV || 'development';

module.exports = { port, env };
