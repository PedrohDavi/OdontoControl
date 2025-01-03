import bcrypt from 'bcrypt';
import pool from '../config/db.js';



const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        console.log("Erro ao hashear a senha: ", err);
        throw err;
    }
};

const saltRounds = 10;

export const addUser = async (req, res) => {
    const { nome, usuario, senha } = req.body;
    let conn;

    try {
        const hashedSenha = await bcrypt.hash(senha,saltRounds)

        const q = "INSERT INTO users(`nome`, `usuario`, `senha`) VALUES (?, ?, ?)";
        const conn = await pool.getConnection()
        await conn.query(q, [nome, usuario, hashedSenha]);
        conn.release();
        res.status(201).send('Usuário criado com sucesso!');
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send("Erro no servidor!");
    } finally {
        if(conn) conn.release();
    }
};