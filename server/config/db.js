import mysql from 'mysql2/promise'
import envConfig from './env.js'

const configDB = {
    host: envConfig.DB_HOST,
    user: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_DATABASE,
    port: envConfig.DB_PORT
}

let connection

try {
    connection = await mysql.createConnection(configDB)
    console.log('La conexión se ha establecido correctamente.')
} catch (error) {
    throw new Error(`No se pudo realizar la conexión a la base de datos: ${error}`)
}

class Database {
    static async query(query, params = []) {
        try {
            const [results, fields] = await connection.query(query, params)
            return results
        } catch (error) {
            throw new Error(`Error durante la ejecución: ${error}`)
        }
    }
}

export default Database