import mysql from 'mysql2/promise'

const dbConfig ={
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
        console.log(`Conexão estabelecida com o db ${database}`);
        conn.release();
    } catch (err) {
        console.error("Erro ao obter conexão", err)
    }
};

const initializeDatabase = async () => {
    pool = mysql.createPool({
        ...dbConfig,
        acquireTimeout: 20000
    });

    await testConnection();
};

const init = async () => {
    await initializeDatabase();
};

init().catch(err => console.error("Erro ao inicializar o banco de dados:", err));

export { pool };