import { FastifyInstance } from 'fastify'
import { Pool } from 'pg'
import { healthRoutes } from './health/health'
import {petRoutes} from "./pets/pets";
import fastifyCors from "@fastify/cors";
import {AppDataSource} from '../database'

export async function registerRoutes(
        fastify: FastifyInstance,
        pool: Pool
) {
    // 1. Enable CORS globally
    await fastify.register(fastifyCors, {
        origin: true,
    })

    // 2. Register your route-handlers under a common prefix
    await fastify.register(
            async (instance: FastifyInstance) => {
                await healthRoutes(instance, pool)
                await petRoutes(instance, AppDataSource)
            },
            {
                prefix: process.env.PREFIX || '/api/v1'
            }
    )

    // 3. Fallback 404
    fastify.setNotFoundHandler(async (request, reply) => {
        reply.code(404)
        return {
            error: 'Not Found',
            message: `Route ${request.method} ${request.url} not found`,
            timestamp: new Date().toISOString(),
        }
    })
}
