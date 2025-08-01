import { FastifyInstance } from 'fastify'
import { CreatePetSchema,Pet} from '../../entities/Pet'
import {DataSource} from "typeorm";

export async function petRoutes(fastify: FastifyInstance, datasource: DataSource) {
    interface PaginationQuery {
        page?: string
        limit?: string
    }
    fastify.get('/pets', async (request, reply) => {
        try {
            const petRepository = datasource.getRepository(Pet)

            const { page = '1', limit = '10' } = request.query as PaginationQuery
            const currentPage = parseInt(page)
            const currentLimit = parseInt(limit)
            const skip = (currentPage - 1) * currentLimit

            const [pets, total] = await petRepository.findAndCount({
                order: { created_at: 'DESC' },
                skip,
                take: currentLimit
            })

            return {
                message: 'Pets retrieved successfully.',
                pets,
                page: currentPage,
                limit: currentLimit,
                total,
                totalPages: Math.ceil(total / currentLimit)
            }
        } catch (error) {
            reply.code(500)
            return {
                error: 'Failed to retrieve pets',
                message: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    })

    fastify.post('/pets', async (request, reply) => {
        const validatedData = CreatePetSchema.parse(request.body)
        const petRepository= datasource.getRepository(Pet)

        const newPet= petRepository.create(validatedData)
        const savedPet= await petRepository.save(newPet)
        reply.code(201)
        return{
            message:'Pet created successfully',
            pet:savedPet
        }
    })

    fastify.get('/pets/:id', async (request, reply) => {
        try {
            const petRepository = datasource.getRepository(Pet)
            const { id } = request.params as { id: string }
            const petId:number = parseInt(id)
            if (isNaN(petId)) {
                reply.code(400)
                return {
                    error: 'Invalid pet ID',
                    message: 'Pet ID must be a number'
                }
            }
            const savedPet: Pet[] = await petRepository.find({
                where:
                        {
                            id:petId
                        }
            })
            if (savedPet.length === 0) {
                reply.code(404)
                return {
                    error: 'Pet not found',
                    message: `Pet with ID ${petId} not found`
                }
            }
            return{
                message:'Pet Found',
                pet:savedPet
            }

        } catch (error) {
            reply.code(500)
            return {
                error: 'Failed to retrieve pet',
                message: error instanceof Error ? error.message : 'Unknown error'
            }
        }
    })
}
