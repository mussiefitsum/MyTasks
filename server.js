if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const cors = require('cors');
const secure = require('ssl-express-www');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./utilities/ExpressError');
const wrapAsync = require('./utilities/wrapAsync');
const { taskSchema } = require('./schema');

const isDevelopment = process.env.NODE_ENV === 'development';

const mongoose = require('mongoose');
const dbUrl = isDevelopment ? 'mongodb://localhost:27017/MyTasks' : process.env.DB_URL;

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const app = express();

const User = require('./models/users');
const Task = require('./models/tasks');

const secret = process.env.SECRET || 'topsecret20'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

app.set('trust proxy', 1);

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e);
})

const sessionConfig = {
    store,
    name: 'sess1500',
    secret,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(cors({
    origin: ['http://localhost:3000', 'https://res.cloudinary.com/dfuxr1p10/'],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(secure);
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false, }));
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

app.use((req, res, next) => {
    res.removeHeader("Cross-Origin-Resource-Policy")
    res.removeHeader("Cross-Origin-Embedder-Policy")
    next()
})


const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        req.flash('error', 'You must be logged in');
        res.redirect('/login');
        return
    }
    next();
}

const validateTaskSchema = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(x => x.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/app');
    }
    res.render('login');
});

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    console.log('oop')
    res.redirect('/app')
});

app.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect(isDevelopment ? 'http://localhost:3000/app' : '/app');
    }
    res.render('register');
});

app.post('/register', wrapAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect(isDevelopment ? 'http://localhost:3000/app' : '/app')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}));

app.get('/api/task', isLoggedIn, wrapAsync(async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const sortedTasks = tasks.sort((a, b) => b.date - a.date);
        res.status(200).json(sortedTasks);
    } catch (err) {
        res.status(500).send(err)
    }
}));

app.get('/api/task/search', isLoggedIn, wrapAsync(async (req, res) => {
    try {
        const name = req.query.task;
        const tasks = await Task.find({ user: req.user._id });
        const results = tasks.filter(task => task.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err);
    }
}));

app.put('/api/status', isLoggedIn, wrapAsync(async (req, res) => {
    try {
        const { id, status } = req.body;
        const newTask = await Task.findByIdAndUpdate(id, { status: status });
        await newTask.save();
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err)
    }
}));

app.post('/api/task', isLoggedIn, validateTaskSchema, wrapAsync(async (req, res) => {
    try {
        const { name, description, category, status, date } = req.body.task;
        const task = new Task({ name, description, category, status, date });
        task.user = req.user._id;
        await task.save();
        res.status(201).send('Successfully created task');
    } catch (err) {
        res.status(500).send(err)
    }
}));

app.delete('/api/task/:id', isLoggedIn, wrapAsync(async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err)
    }
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

app.get('/app', isLoggedIn, (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Oh No. Something Went Wrong.'
    }
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
});