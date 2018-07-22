const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();  //Creates an app

//Middleware for how to twick express. (method use)
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partials'); // Register partial use option
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


app.use((req, res, next) => {
  let now = new Date().toString();

  let logMessage = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('./server.log', logMessage + '\n', (error) => {
    if (error) {
      console.log(error);
    };
  });
  next();
});

/* To uncomment the code below when site is under maintainance */
// app.use((request, response, next) => {
//   response.render('./maintainance.hbs');
// });


//Request handlers
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

app.get('/projects', (request, response) => {
  response.render('projects', {
    pageTitle: 'My Projects',
    welcomeMessage: 'Wellcome ',
  })
});

//Bind application to port on maching
app.listen(port);

/* Optional: callback to do something when getting connection
app.listen(port, () => {
  console.log('Server is up');
});
*/
