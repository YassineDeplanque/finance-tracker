import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors())
app.use(express.json())

app.use('/transaction', transactionRoutes);

app.listen(port, () => {
    console.log("Server running on port ", port);
})