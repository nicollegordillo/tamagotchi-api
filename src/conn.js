import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Nicolle',
    database: 'blog_nicolle',
    password: 'nicolle',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool
