const express = require('express');
const app = express();
const loginController = require('./controllers/loginController');
const newPlannerController = require('./controllers/newPlannerController');
const installmentController = require('./controllers/installmentController'); // Create a new controller for handling installment-related operations
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname, '/css')));
app.use('/css', express.static(path.join(__dirname, 'css')))
// Render login page for both GET and POST requests to root
app.route('/')
  .get(loginController.renderLoginPage)
  .post(loginController.login);

// Render login page for GET request to /login
app.get('/login', loginController.renderLoginPage);

// Handle login form submission for POST request to /login
app.post('/login', loginController.login);

// Create a new planner for the specified user
app.post('/:user/new_planner', newPlannerController.createNewPlanner);

// Schedule a task to run daily
cron.schedule('0 0 * * *', () => {
    const currentDay = new Date().getDate();
  
    // Call the installmentController for the current day
    installmentController.handleInstallmentsForDay(currentDay);
  }, {
    timezone: 'Asia/Kolkata', // Set the timezone for India
  });





//testing code for daily check for intsallments
  app.get('/test-installments', (req, res) => {
   // const currentDay = new Date().getDate();
  
    // Call the installmentController for the current day
    installmentController.handleInstallmentsForDay(1);
  
    res.send('Test successful!');
  });






  

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
