import express from 'express';
import dotenv from 'dotenv';
import {connect} from 'mongoose';
import apiRoutes from './apiRoutes.js';
import { specs, swaggerUi } from './swagger.js';
import cors from 'cors';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// Connect to MongoDB
connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error('Error connecting to MongoDB', err));

//Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Use API Routes
app.use('/api',apiRoutes);

app.get('/', (req, res) => {
    res.send('Hello from backend with ES6');
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`>> Read on http://localhost:${PORT}`);
});
