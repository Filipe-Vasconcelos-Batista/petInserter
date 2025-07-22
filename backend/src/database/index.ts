import { DataSource } from 'typeorm'
import { Pet } from '../entities/Pet'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type:        'postgres',
    host:        process.env.DB_HOST,
    port:        parseInt(process.env.DB_PORT || '5432'),
    database:    process.env.DB_NAME,
    username:    process.env.DB_USER,
    password:    process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNC === 'true',
    logging:     process.env.DB_LOGGING === 'true',
    ssl:         process.env.DB_SSL === 'true',
    entities:    [Pet],
    migrations:  [],
    subscribers: []
})


export async function initializeDatabase(): Promise<void> {
    try {
        await AppDataSource.initialize()
        console.log('✅ Database connection initialized successfully')
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        throw error
    }
}
