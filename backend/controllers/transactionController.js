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