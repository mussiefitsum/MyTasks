const express = require('express');
const session = require('express-session');
const path = require('path');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/MyTasks';

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const app = express();

const User = require('./models/users');
const Task = require('./models/tasks');
const { copyFileSync } = require('fs');

const secret = process.env.SECRET || 'topsecret20'

const sessionConfig = {
    name: 'sess1500',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(session(sessionConfig))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, './client/build')));

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000/app')
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('http://localhost:3000/app')
        })
    } catch (e) {
        console.log(e);
        res.redirect('/register')
    }
})

app.get('/api/task', isLoggedIn, async (req, res) => {
    console.log(req.user._id);
    const tasks = await Task.find({ user: req.user._id });
    console.log(tasks);
    res.json(tasks);
});

app.post('/api/task', isLoggedIn, async (req, res) => {
    const { name, description, category, status } = req.body;
    const task = new Task({ name, description, category, status });
    task.user = req.user._id;
    await task.save();
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
});