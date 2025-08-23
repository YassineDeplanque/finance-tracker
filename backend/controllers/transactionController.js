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
    const { amount, source, date } = req.body;
    if(!amount || !source || !date){
        return res.status(400).json({ success: false, message: "Amount and source and date required." });
    }
    try {
        const db = await connection();
        const query = 'INSERT INTO income (amount, source, date) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [amount, source, date]);

        res.status(201).json({
            sucess: true,
            message: "income added"
        })
    } catch (err) {
        console.error("Error inserting income : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const insertExpenses = async (req, res) => {
    const { amount, category, date } = req.body;
    if(!amount || !category || !date){
        return res.status(400).json({ success: false, message: "Amount and category and date required." });
    }
    try {
        const db = await connection();
        const query = 'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [amount, category, date]);

        res.status(201).json({
            sucess: true,
            message: "expenses added"
        })
    } catch (err) {
        console.error("Error inserting expenses : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const query = 'DELETE FROM income WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        res.status(201).json({
            sucess: true,
            message: "income deleted"
        })
    } catch (err) {
        console.error("Error deleting income : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const deleteExpenses = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const query = 'DELETE FROM expenses WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        res.status(201).json({
            sucess: true,
            message: "expenses deleted"
        })
    } catch (err) {
        console.error("Error deleting expenses : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const editIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source, date } = req.body;
    if(!amount || !source || !date){
        return res.status(400).json({ success: false, message: "Amount and source and date required." });
    }
    try {
        const db = await connection();
        const query = 'UPDATE income SET amount = ?, source = ?, date = ? WHERE id = ?';
        const [result] = await db.execute(query, [amount, source, date, id]);

        res.status(201).json({
            sucess: true,
            message: "income edited"
        })
    } catch (err) {
        console.error("Error editing income : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}

export const editExpenses = async (req, res) => {
    const { id } = req.params;
    const { amount, category } = req.body;
    if(!amount || !category){
        return res.status(400).json({ success: false, message: "Amount and category required." });
    }
    try {
        const db = await connection();
        const query = 'UPDATE expenses SET amount = ?, category = ? WHERE id = ?';
        const [result] = await db.execute(query, [amount, category, id]);

        res.status(201).json({
            sucess: true,
            message: "expenses edited"
        })
    } catch (err) {
        console.error("Error editing expenses : ", err);
        res.status(500).json({sucess: false, message: "Servor error"})
    }
}