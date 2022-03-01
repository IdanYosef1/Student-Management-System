const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/database');
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

const studentsRouter = require('./Routes/students');
app.use('/api/students', studentsRouter);

app.listen(8000, () => console.log('app is listening on port 8000'));