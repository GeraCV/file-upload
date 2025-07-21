import dotenv from 'dotenv'
import { join } from 'path'
import appRoot from 'app-root-path'

const rootEnv = join(appRoot.path, '/.env')
dotenv.config({path: rootEnv})

const envConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT,
}

export default envConfig