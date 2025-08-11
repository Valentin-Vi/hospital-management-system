import express from "express";
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
// Enable JSON
app.use(express.json());
// Enable cookie parsing
app.use(cookieParser());
// Enable Cross Origin Resource Sharing
app.use(cors({
    origin: [
        'http://localhost:5173', 'http://127.0.0.1:5173',
        'http://localhost:3010', 'http://127.0.0.1:3010',
        'http://localhost:3080', 'http://127.0.0.1:3080'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.options('*', cors());
// Endpoints
import { authRouter } from '@auth';
app.use('/auth', authRouter);
// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});
