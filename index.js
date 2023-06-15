const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const { authentication } = require('./middlewares/authMiddleware')

//! TODO: change name
const dbName = 'crypto';

databaseConnect()
    .then(() => console.log('Database connected successfuly!'))
    .catch((error) => {
        console.error('Error initializing database');
        console.error(error.message);
        process.exit(1);
    })


const router = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));    //parse "form" data in req.body
app.use(cookieParser());                                
app.use(authentication);                             // проверка има ли логнат user
app.use(router);                                     // всички request-и минават през основен router


async function databaseConnect() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
}

app.listen(3000, () => console.log('Server is running on port 3000...'));