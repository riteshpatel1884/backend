const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/ecommerce/user.models');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretword';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.render('register', { error: 'All fields are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('register', { error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userid: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Unable to create account. Try again.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('login', { error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userid: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Unable to sign in. Try again.' });
  }
});

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.redirect('/login');
  }
}

app.get('/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.userid).lean();
  if (!user) {
    return res.redirect('/login');
  }

  res.render('profile', { user });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});