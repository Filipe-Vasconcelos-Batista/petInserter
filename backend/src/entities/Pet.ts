import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { z } from 'zod'

@Entity('pet')
export class Pet {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('text')
  Name!: string

  @Column('int')
  Age!: number

  @Column('text')
  Breed!: string

  @Column('text')
  Species!: string

  @Column('text')
  Gender!: string

  @Column('text')
  Size!: string

  @CreateDateColumn()
  created_at!: Date
}

// Zod schemas for validation
export const CreatePetSchema = z.object({
  Name: z.string()
    .min(3, 'name must be at least 3 characters')
    .max(50, 'name must not exceed 50 characters'),

  Age: z.number()
               .min(0, 'age must be positive')
               .max(50, 'age must be reasonable'),
  Breed: z.string()
                 .min(1, 'breed is required')
                 .max(64, 'breed must not exceed 64 characters'),
  Species: z.string()
                   .min(1, 'species is required')
                   .max(64, 'species must not exceed 64 characters'),
  Gender: z.enum(['Male', 'Female', 'Unknown'])
                  .describe('gender must be Male, Female, or Unknown'),
  Size: z.enum(['Small', 'Medium', 'Large', 'Extra Large'])
                .describe('size must be Small, Medium, Large, or Extra Large')
  })

export const UpdatePetSchema = CreatePetSchema.partial()

export const PetResponseSchema = z.object({
  id: z.number(),
  Name: z.string(),
  Age: z.number(),
  Breed: z.string(),
  Species: z.string(),
  Gender: z.string(),
  Size: z.string(),
  created_at: z.date()
})

export type CreatePetInput = z.infer<typeof CreatePetSchema>
export type UpdatePetInput = z.infer<typeof UpdatePetSchema>
export type PetResponse = z.infer<typeof PetResponseSchema>
