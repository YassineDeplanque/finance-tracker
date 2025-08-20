import { connection } from "../config/db.js";

export const getIncome = async (req, res) => {
    try{
        const db = await connection();
        const query = 'SELECT  * FROM income';
        const [result] = await db.execute(query);

        res.status(200).json(result);
    } catch(err) {
        console.error("Error geting incomes : ", err)
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const getExpenses = async (req, res) => {
    try{
        const db = await connection();
        const query = 'SELECT  * FROM expenses';
        const [result] = await db.execute(query);

        res.status(200).json(result);
    } catch(err) {
        console.error("Error geting incomes : ", err)
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const insertIncome = async (req, res) => {
    const { amount, source } = req.body;
    try {
        const db = await connection();
        const query = 'INSERT INTO income (amount, source) VALUES (?, ?)';
        const [result] = await db.execute(query, [amount, source]);

        res.status(201).json(result)
    } catch (err) {
        console.error("Error inserting income : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}