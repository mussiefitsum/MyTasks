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
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect(401, '/login');
        return
    }
    next();
}

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000/app')
});

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
    try {
        const tasks = await Task.find({ user: req.user._id });
        const sortedTasks = tasks.sort((a, b) => b.date - a.date);
        res.status(200).json(sortedTasks);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

app.get('/api/task/search', isLoggedIn, async (req, res) => {
    try {
        const name = req.query.task;
        const tasks = await Task.find({ user: req.user._id });
        const results = tasks.filter(task => task.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

app.put('/api/status', isLoggedIn, async (req, res) => {
    try {
        const { id, status } = req.body;
        const newTask = await Task.findByIdAndUpdate(id, { status: status });
        await newTask.save();
        res.status(204).send();
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/api/task', isLoggedIn, async (req, res) => {
    try {
        const { name, description, category, status, date } = req.body;
        const task = new Task({ name, description, category, status, date });
        task.user = req.user._id;
        await task.save();
        res.status(201).send('Successfully created task');
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

app.delete('/api/task/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

app.get('*', isLoggedIn, (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
});