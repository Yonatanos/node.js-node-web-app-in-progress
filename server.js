const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();  //Creates an app
hbs.registerPartials(__dirname + '/views/partials'); // Register partial use option
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//Middleware for how to twick express
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();

  let logMessage = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('./server.log', logMessage + '\n', (error) => console.log(error));
  next();
});

app.use((request, response, next) => {
  response.render('./maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

// Handler for get request. argument(url, data to send back)
app.get('/', (request, response) => {
  //response.send('<h1>Hello Express!</h1>');
  response.send({
    name: 'Yonatan',
    nicknames: ['Tan tan', 'Johnny']
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    error: 'Unable to fulfill request'
  })
});

app.get('/home', (request, response) => {
  response.render('home', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome Home',
  })
});
//Bind application to port on maching
app.listen(3000);
/* Optional: callback to do something when getting connection
app.listen(3000, () => {
  console.log('Server is up');
});
*/
