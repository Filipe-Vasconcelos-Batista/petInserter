import dotenv from 'dotenv'
import { Pool } from 'pg'
import 'reflect-metadata';
import { registerRoutes } from './src/routes'
import { initializeDatabase, AppDataSource } from './src/database'
import {buildApp} from "./src/app";

dotenv.config()

const app= buildApp()
const pool = new Pool({})
export { app }

// Test database connection


// Start server
async function start(): Promise<void> {
    try {
        // Connect to database first
        await initializeDatabase()

        await registerRoutes(app, pool)

        // Start the server
        const port = parseInt(process.env.PORT || '3000')
        const host = process.env.HOST || '0.0.0.0'

        await app.listen({ port, host })
        console.log(`🚀 Server running on http://${host}:${port}`)
    } catch (error) {
        console.error('❌ Server startup failed:', error)
        process.exit(1)
    }
}

process.on('SIGTERM', async () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...')
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy()
    }
    process.exit(0)
})

process.on('SIGINT', async () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...')
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy()
    }
    process.exit(0)
})



if(require.main===module){
    start()
}

