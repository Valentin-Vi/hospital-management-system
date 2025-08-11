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
        'http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.0.61:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Endpoints
import { AuthRouter } from '@auth';
import { AdminRouter } from "@routers"

app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`[backend] listening: http://localhost:${PORT}`);
});
