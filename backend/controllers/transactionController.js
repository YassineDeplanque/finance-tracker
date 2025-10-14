import { connection } from "../config/db.js";

// ====================== INCOME ======================

// Récupérer tous les revenus du user
export const getIncome = async (req, res) => {
    try {
        const db = await connection();
        const query = 'SELECT * FROM income WHERE user_id = ? ORDER BY date DESC';
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting incomes:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme totale des revenus du user
export const getSumIncome = async (req, res) => {
    try {
        const db = await connection();
        const query = 'SELECT SUM(amount) AS total FROM income WHERE user_id = ?';
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting total income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Revenus du mois en cours
export const getIncomeMonth = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT * FROM income 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE()) 
            ORDER BY date DESC
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting monthly income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme des revenus du mois
export const getSumIncomeMonth = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT SUM(amount) AS total FROM income 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE())
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting monthly income sum:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Revenus sur les 3 derniers mois
export const getIncomeThreeMonths = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT * FROM income 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
            ORDER BY date DESC
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting last 3 months income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme des revenus sur les 3 derniers mois
export const getSumIncomeThreeMonths = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT SUM(amount) AS total FROM income 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting 3-month income sum:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Ajouter un revenu
export const insertIncome = async (req, res) => {
    const { amount, source, date } = req.body;
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!amount || !source || !date)
        return res.status(400).json({ success: false, message: "Amount, source and date required." });

    try {
        const db = await connection();
        const query = 'INSERT INTO income (amount, source, date, user_id) VALUES (?, ?, ?, ?)';
        await db.execute(query, [amount, source, date, userId]);

        res.status(201).json({ success: true, message: "Income added" });
    } catch (err) {
        console.error("Error inserting income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Modifier un revenu
export const editIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source, date } = req.body;

    if (!amount || !source || !date)
        return res.status(400).json({ success: false, message: "Amount, source and date required." });

    try {
        const db = await connection();
        const query = `
            UPDATE income 
            SET amount = ?, source = ?, date = ? 
            WHERE id = ? AND user_id = ?
        `;
        await db.execute(query, [amount, source, date, id, req.session.userId]);

        res.status(200).json({ success: true, message: "Income updated" });
    } catch (err) {
        console.error("Error updating income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Supprimer un revenu
export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const query = 'DELETE FROM income WHERE id = ? AND user_id = ?';
        await db.execute(query, [id, req.session.userId]);

        res.status(200).json({ success: true, message: "Income deleted" });
    } catch (err) {
        console.error("Error deleting income:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ====================== EXPENSES ======================

// Récupérer toutes les dépenses du user
export const getExpenses = async (req, res) => {
    try {
        const db = await connection();
        const query = 'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC';
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting expenses:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme totale des dépenses du user
export const getSumExpenses = async (req, res) => {
    try {
        const db = await connection();
        const query = 'SELECT SUM(amount) AS total FROM expenses WHERE user_id = ?';
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting expenses sum:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Dépenses du mois
export const getExpensesMonth = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT * FROM expenses 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE()) 
            ORDER BY date DESC
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting monthly expenses:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme dépenses du mois
export const getSumExpensesMonth = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT SUM(amount) AS total FROM expenses 
            WHERE user_id = ? 
            AND YEAR(date) = YEAR(CURDATE()) 
            AND MONTH(date) = MONTH(CURDATE())
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting monthly expenses sum:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Dépenses sur les 3 derniers mois
export const getExpensesThreeMonths = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT * FROM expenses 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m') 
            ORDER BY date DESC
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error getting last 3 months expenses:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Somme dépenses sur 3 mois
export const getSumExpensesThreeMonths = async (req, res) => {
    try {
        const db = await connection();
        const query = `
            SELECT SUM(amount) AS total FROM expenses 
            WHERE user_id = ? 
            AND DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m')
        `;
        const [result] = await db.execute(query, [req.session.userId]);

        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Error getting 3-month expenses sum:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Ajouter une dépense
export const insertExpenses = async (req, res) => {
    const { amount, category, date } = req.body;
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!amount || !category || !date)
        return res.status(400).json({ success: false, message: "Amount, category and date required." });

    try {
        const db = await connection();
        const query = 'INSERT INTO expenses (amount, category, date, user_id) VALUES (?, ?, ?, ?)';
        await db.execute(query, [amount, category, date, userId]);

        res.status(201).json({ success: true, message: "Expense added" });
    } catch (err) {
        console.error("Error inserting expense:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Modifier une dépense
export const editExpenses = async (req, res) => {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    if (!amount || !category || !date)
        return res.status(400).json({ success: false, message: "Amount, category and date required." });

    try {
        const db = await connection();
        const query = `
            UPDATE expenses 
            SET amount = ?, category = ?, date = ? 
            WHERE id = ? AND user_id = ?
        `;
        await db.execute(query, [amount, category, date, id, req.session.userId]);

        res.status(200).json({ success: true, message: "Expense updated" });
    } catch (err) {
        console.error("Error editing expense:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Supprimer une dépense
export const deleteExpenses = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connection();
        const query = 'DELETE FROM expenses WHERE id = ? AND user_id = ?';
        await db.execute(query, [id, req.session.userId]);

        res.status(200).json({ success: true, message: "Expense deleted" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
