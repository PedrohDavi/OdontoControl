import { pool } from "../config/db.js";


export const addProduct = async (req, res) => {
    const { nome, descricao, quantidade, preco, marca, categoria, foto } = req.body;
    let conn;

    try {
        const q = "INSERT INTO produtos(`nome`, `descricao`, `quantidade`, `preco`, `marca`, `categoria`, `foto`) VALUES (?, ?, ?, ?, ?, ?, ?)"
        const conn = await pool.getConnection()
        await conn.query(q, [nome, descricao, quantidade, preco, marca, categoria, foto])
        conn.release();
        res.status(201).send('Produto cadastrado com sucesso!');
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send("Erro no servidor!");
    } finally {
        if (conn) conn.release();
    }
};

export const getProducts = async (req, res) => {

    const q = "SELECT * FROM produtos;"
    let conn;

    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(q)
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send("Erro no servidor!");
    } finally {
        if (conn) conn.release();
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    const q = "DELETE FROM produtos WHERE id = ?;";
    let conn;

    try {
        conn = await pool.getConnection(); 
        const result = await conn.query(q, [id]); 
        conn.release(); // Libera a conexão

        // Verifica se algum registro foi deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).json({ mensagem: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};