import mysql from 'mysql2/promise'

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'R&m0V$!#s7Np@',
    port: 3306,
    database: 'odonto'
};

let pool;

const testConnection = async () => {
    try {
        const conn = await pool.getConnection();
        console.log(`Conexão estabelecida com o db ${dbConfig.database}`);
        conn.release();
    } catch (err) {
        console.error("Erro ao obter conexão", err)
    }
};

const createDbQuery = async () => {
    let conn;
    try {
        const conn = await pool.getConnection();
        await conn.query(`CREATE DATABASE IF NOT EXISTS odonto`);
        console.log("Banco de dados acessado/criado com sucesso");

    } catch (err) {
        console.log("Erro ao acessar/criar banco de dados: ", err);
    } finally {
        if (conn) conn.release();
    }
};

const createTablesQuerys = async () => {
    let conn;
    const createProductQuery = `
    CREATE TABLE IF NOT EXISTS produtos 
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT,
        quantidade INT NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        marca VARCHAR(50),
        categoria VARCHAR(50)
    );
`;

    const CreateUserQuery = `
    CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255),
                usuario VARCHAR(255),
                senha VARCHAR(30)
);
    `

    try {
        const conn = await pool.getConnection();
        await conn.query(createProductQuery)
        await conn.query(CreateUserQuery)
        console.log("Tabelas acessadas/criadas com sucesso");
    } catch (err) {
        console.error("Erro ao criar as tabelas:", err);
    } finally {
        if (conn) conn.release();
    }
}

const initializeDatabase = async () => {
    pool = mysql.createPool({
        ...dbConfig,
    });

    await testConnection();
    await createDbQuery();
    await createTablesQuerys();
};

const init = async () => {
    await initializeDatabase();
};

init().catch(err => console.error("Erro ao inicializar o banco de dados:", err));

export { pool };