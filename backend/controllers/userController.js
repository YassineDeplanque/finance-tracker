import { connection } from "../config/db.js";
import argon2 from 'argon2'

export const insertUser = async (req, res) => {
    let { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields must be filled." });
    }
    try {
        const db = await connection()
        const hash = await argon2.hash(password, { type: argon2.argon2id })
        password = hash;
        const query = "INSERT  INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(query, [name, lastname, email, password])

        res.status(200).json({
            success: true,
            message: 'User inserted'
        })
    } catch (err) {
        console.error("Error inserting user : ", err);
        res.status(500).json({ sucess: false, message: "Servor error" })
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields must be filled." });
    }
    try {
        const db = await connection()
        const query = "SELECT * FROM user where email = ?";
        const [result] = await db.execute(query, [email])
        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Email or password incorrect." });
        }
        const user = result[0];

        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(401).json({ success: false, message: "Email or password incorrect." });
        }
        res.status(200).json({
            success: true,
            message: "User logged in",
            user: { id: user.id, name: user.name, lastname: user.lastname, email: user.email }
        });

    } catch (err) {
        console.error("Error login user : ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}