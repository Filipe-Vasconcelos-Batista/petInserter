import { FastifyInstance } from 'fastify'
import { Pool } from 'pg'

export async function healthRoutes(fastify: FastifyInstance, pool: Pool) {
    // Basic health check
    fastify.get('/health', async (request, reply) => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'petpro-backend'
        }
    })

    // Database health check
    fastify.get('/health/db', async (request, reply) => {
        try {
            const client = await pool.connect()

            // Simple query to test connection
            const result = await client.query('SELECT NOW()')
            client.release()

            return {
                status: 'ok',
                database: 'connected',
                timestamp: new Date().toISOString(),
                db_time: result.rows[0].now
            }
        } catch (error) {
            reply.code(503)
            return {
                status: 'error',
                database: 'disconnected',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    })

    // Detailed health check
    fastify.get('/health/detailed', async (request, reply) => {
        const memoryUsage = process.memoryUsage()

        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'petpro-backend',
            uptime: process.uptime(),
            memory: {
                rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
                heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
                heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`
            },
            node_version: process.version,
            environment: process.env.NODE_ENV || 'development'
        }
    })
}
