import { pool } from "../config/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configuração do armazenamento no servidor
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo
    },
});

const upload = multer({ storage: storage });

export const uploadImage = upload.single("foto");

// Adiciona um produto ao banco
export const addProduct = async (req, res) => {
    const { nome, descricao, quantidade, preco, marca, categoria } = req.body;
    const foto = req.file ? req.file.filename : null; // Nome do arquivo salvo

    if (!nome || !descricao || !quantidade || !preco || !marca || !categoria || !foto) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    let conn;
    try {
        const q = "INSERT INTO produtos(`nome`, `descricao`, `quantidade`, `preco`, `marca`, `categoria`, `foto`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        conn = await pool.getConnection();
        await conn.query(q, [nome, descricao, quantidade, preco, marca, categoria, foto]);
        conn.release();

        res.status(201).json({ message: "Produto cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).json({ error: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};

// Rotas POST
export const getProducts = async (req, res) => {
    const q = "SELECT * FROM produtos;";
    let conn;

    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(q);

        // Ajusta a URL da imagem para o frontend
        const produtos = rows.map(produto => ({
            ...produto,
            foto: produto.foto ? `http://localhost:5000/uploads/${produto.foto}` : null,
        }));

        res.status(200).json(produtos);
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).json({ error: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};

//Rotas GET
export const getProductById = async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM produtos WHERE id = ?;";
    let conn;

    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(q, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Produto não encontrado!" });
        }

        const produto = {
            ...rows[0],
            foto: rows[0].foto ? `http://localhost:5000/uploads/${rows[0].foto}` : null,
        };

        res.status(200).json(produto);
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).json({ error: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};


// Rota DELETE
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM produtos WHERE id = ?;";
    let conn;

    try {
        conn = await pool.getConnection();
        const result = await conn.query(q, [id]);
        conn.release();

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


// Rotas PUT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, marca, categoria, foto } = req.body;
        const novaFoto = req.file ? `/uploads/${req.file.filename}` : foto; // Mantém a imagem se não for alterada

        if (!nome || !descricao || !preco) {
            return res.status(400).json({ message: "Campos obrigatórios não podem estar vazios" });
        }

        await pool.query(
            `UPDATE produtos 
             SET nome = ?, descricao = ?, preco = ?, marca = ?, categoria = ?, foto = ? 
             WHERE id = ?`,
            [nome, descricao, preco, marca, categoria, novaFoto, id]
        );

        res.json({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
};



export const updateQuantidade = async (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    const q = `
        UPDATE produtos 
        SET quantidade = ?
        WHERE id = ?;
    `;

    let conn;

    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(q, [quantidade, id]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        res.status(200).json({ mensagem: "Quantidade atualizada com sucesso!" });
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).json({ mensagem: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};


