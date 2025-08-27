import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        const [result] = await connection.query(
            'SELECT * FROM `income`'
        );
    } catch (err) {
    console.log(err);
    }

    return connection;

}

connection();