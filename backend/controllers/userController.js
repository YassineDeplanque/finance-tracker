import { connection } from "../config/db.js";
import argon2 from 'argon2'

export const insertUser = async (req, res) => {
    let { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields must be filled." });
    }
    try {
        const db = await connection()
        const hash = await argon2.hash(password, {type: argon2.argon2id})
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