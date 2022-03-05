const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/database');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
connectDB();

const studentsRouter = require('./Routes/students');
app.use('/api/students', studentsRouter);
app.use(express.static("Client"));

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname + '../Client/login.html'));
});

app.listen(port, () => {
    console.log("app is listening on " + port);
});