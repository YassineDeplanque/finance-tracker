import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = async () => {
    try{
        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        });

        console.log('Connexion réussie !');

        await connection.end();
    } catch (err) {
        console.error('Erreur de connexion :', err);
    }
}


connection();