import { pool } from "../config/db.js";
import argon2 from "argon2";

// ====================== REGISTER ======================

export const insertUser = async (req, res) => {
    let { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields must be filled."
        });
    }

    try {
        const hash = await argon2.hash(password, { type: argon2.argon2id });

        const query = `
            INSERT INTO user (name, lastname, email, password)
            VALUES (?, ?, ?, ?)
        `;

        await pool.execute(query, [
            name,
            lastname,
            email,
            hash
        ]);

        return res.status(201).json({
            success: true,
            message: "User inserted"
        });

    } catch (err) {
        console.error("Error inserting user:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ====================== LOGIN ======================

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields must be filled."
        });
    }

    try {
        const query = "SELECT * FROM user WHERE email = ?";
        const [result] = await pool.execute(query, [email]);

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email or password incorrect."
            });
        }

        const user = result[0];

        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                message: "Email or password incorrect."
            });
        }

        req.session.userId = user.id;
        req.session.userEmail = user.email;

        return res.status(200).json({
            success: true,
            message: "User logged in",
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Error login user:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ====================== LOGOUT ======================

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            success: true,
            message: "Logged out"
        });
    });
};