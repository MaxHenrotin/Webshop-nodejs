const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des sessions
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
const homeRoutes = require('./routes/home.routes');
const cartRoutes = require('./routes/cart.routes');

app.use('/', homeRoutes);
app.use('/', cartRoutes); //i add /cart already in the routes

// Démarrage du serveur
app.listen(PORT,  '0.0.0.0', () => {  //0.0.0.0 so i can conect from any device if i know the ip adress of my computer
  console.log(`Serveur started on http://localhost:${PORT}`);
});