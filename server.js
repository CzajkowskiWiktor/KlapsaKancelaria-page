const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

//port will be 5000 for testing
const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());

//make the contact page the the first page on the app
app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.subject,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

