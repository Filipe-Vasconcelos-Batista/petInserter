import { FastifyInstance } from 'fastify'
import { CreatePetSchema,Pet} from '../../entities/Pet'
import {DataSource} from "typeorm";

export async function petRoutes(fastify: FastifyInstance, datasource: DataSource) {

    fastify.get('/pets', async (request, reply) => {
        try {
            const petRepository = datasource.getRepository(Pet)
            const pets = await petRepository.find({
                order: {
                    created_at: 'DESC'
                }
            })
            return {
                message: 'Pets retrieved successfully.',
                pets:    pets,
                count:   pets.length
            }
        }catch (error) {
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
