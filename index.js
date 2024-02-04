const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const rateLimit = require('express-rate-limit');
const loginController = require('./controllers/loginController');
const newPlannerController = require('./controllers/newPlannerController');
const installmentController = require('./controllers/installmentController');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');

// prevent brute force attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/css', express.static(path.join(__dirname, 'css')));

// Apply rate limiter only to the login route
app.use('/login', limiter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

// Testing code for daily check for installments
app.get('/test-installments', (req, res) => {
  // const currentDay = new Date().getDate();
  
  // Call the installmentController for the current day
  installmentController.handleInstallmentsForDay(1);
  
  res.send('Test successful!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
