import { pool } from "../config/db.js";

// ====================== INCOME ======================

export const getIncome = async (req, res) => {
    try {
        const query = 'SELECT * FROM income WHERE user_id = ? ORDER BY date DESC';
        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting incomes:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumIncome = async (req, res) => {
    try {
        const query = 'SELECT SUM(amount) AS total FROM income WHERE user_id = ?';
        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting total income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getIncomeMonth = async (req, res) => {
    try {
        const query = `
            SELECT * FROM income 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE()) 
            ORDER BY date DESC
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting monthly income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumIncomeMonth = async (req, res) => {
    try {
        const query = `
            SELECT SUM(amount) AS total FROM income 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE())
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting monthly income sum:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getIncomeThreeMonths = async (req, res) => {
    try {
        const query = `
            SELECT * FROM income 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
            ORDER BY date DESC
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting last 3 months income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumIncomeThreeMonths = async (req, res) => {
    try {
        const query = `
            SELECT SUM(amount) AS total FROM income 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting 3-month income sum:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const insertIncome = async (req, res) => {
    const { amount, source, date } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!amount || !source || !date) {
        return res.status(400).json({ success: false, message: "Amount, source and date required." });
    }

    try {
        const query = `
            INSERT INTO income (amount, source, date, user_id)
            VALUES (?, ?, ?, ?)
        `;

        await pool.execute(query, [amount, source, date, userId]);

        return res.status(201).json({ success: true, message: "Income added" });
    } catch (err) {
        console.error("Error inserting income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const editIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source, date } = req.body;

    if (!amount || !source || !date) {
        return res.status(400).json({ success: false, message: "Amount, source and date required." });
    }

    try {
        const query = `
            UPDATE income 
            SET amount = ?, source = ?, date = ? 
            WHERE id = ? AND user_id = ?
        `;

        await pool.execute(query, [amount, source, date, id, req.session.userId]);

        return res.status(200).json({ success: true, message: "Income updated" });
    } catch (err) {
        console.error("Error updating income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM income WHERE id = ? AND user_id = ?';
        await pool.execute(query, [id, req.session.userId]);

        return res.status(200).json({ success: true, message: "Income deleted" });
    } catch (err) {
        console.error("Error deleting income:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ====================== EXPENSES ======================

export const getExpenses = async (req, res) => {
    try {
        const query = 'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC';
        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting expenses:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumExpenses = async (req, res) => {
    try {
        const query = 'SELECT SUM(amount) AS total FROM expenses WHERE user_id = ?';
        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting expenses sum:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getExpensesMonth = async (req, res) => {
    try {
        const query = `
            SELECT * FROM expenses 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE()) 
            ORDER BY date DESC
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting monthly expenses:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumExpensesMonth = async (req, res) => {
    try {
        const query = `
            SELECT SUM(amount) AS total FROM expenses 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE())
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting monthly expenses sum:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getExpensesThreeMonths = async (req, res) => {
    try {
        const query = `
            SELECT * FROM expenses 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m') 
            ORDER BY date DESC
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result);
    } catch (err) {
        console.error("Error getting last 3 months expenses:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSumExpensesThreeMonths = async (req, res) => {
    try {
        const query = `
            SELECT SUM(amount) AS total FROM expenses 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
        `;

        const [result] = await pool.execute(query, [req.session.userId]);

        return res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting 3-month expenses sum:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const insertExpenses = async (req, res) => {
    const { amount, category, date } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!amount || !category || !date) {
        return res.status(400).json({ success: false, message: "Amount, category and date required." });
    }

    try {
        const query = `
            INSERT INTO expenses (amount, category, date, user_id)
            VALUES (?, ?, ?, ?)
        `;

        await pool.execute(query, [amount, category, date, userId]);

        return res.status(201).json({ success: true, message: "Expense added" });
    } catch (err) {
        console.error("Error inserting expense:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const editExpenses = async (req, res) => {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    if (!amount || !category || !date) {
        return res.status(400).json({ success: false, message: "Amount, category and date required." });
    }

    try {
        const query = `
            UPDATE expenses 
            SET amount = ?, category = ?, date = ? 
            WHERE id = ? AND user_id = ?
        `;

        await pool.execute(query, [amount, category, date, id, req.session.userId]);

        return res.status(200).json({ success: true, message: "Expense updated" });
    } catch (err) {
        console.error("Error editing expense:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteExpenses = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM expenses WHERE id = ? AND user_id = ?';
        await pool.execute(query, [id, req.session.userId]);

        return res.status(200).json({ success: true, message: "Expense deleted" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};