import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly = true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    }
}));


app.use('/transaction', transactionRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log("Server running on port ", port);
})