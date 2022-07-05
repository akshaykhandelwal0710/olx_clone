//imports
import Users from './schemas/user.js';
import Items from './schemas/item.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url = 'mongodb+srv://admin:jbzam6YUZO74PjlZ@cluster0.7u9no.mongodb.net/campusOLX?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");
});

//api routes
app.get('/users/fetch', (req, res) => {
    Users.findOne({roll: req.query.roll}, (err, data) => {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    });
});

app.post('/users/register', (req, res) => {
    const user = {
        name: req.query.name,
        roll: req.query.roll,
        email: req.query.email,
        contact: req.query.contact
    };
    console.log(user);

    Users.create(user, (err, data) => {
        if (err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
});

//listeners
app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});