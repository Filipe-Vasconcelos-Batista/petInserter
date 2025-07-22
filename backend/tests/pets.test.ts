import request from 'supertest'
import { app } from '../index'
import { TestDataSource } from '../src/database/testDatabase'
import {petRoutes} from '../src/routes/pets/pets'


beforeAll(async () => {
    await TestDataSource.initialize()
    await petRoutes(app, TestDataSource)
    await app.ready()
})

afterAll(async () => {
    await app.close()
    await TestDataSource.destroy()
})

describe('POST /pets', () => {
    it('should create a new pet and respond with 201', async () => {
        const payload = {
            Name: "Moon",
            Age: 17,
            Breed: "Black Retriever",
            Species: "Dog",
            Gender: "Male",
            Size: "Small"
        }

        const res = await request(app.server)
                .post('/pets')
                .send(payload)

        expect(res.status).toBe(201)
        expect(res.body.message).toBe('Pet created successfully')
        expect(res.body.pet).toMatchObject(payload)
    })
})

describe('POST /pets', () => {
    it('should fail to create a new pet and respond with 500', async () => {
        const payload = {
            Age: 17,
            Breed: "Black Retriever",
            Species: "Dog",
            Gender: "Male",
            Size: "Small"
        }

        const res = await request(app.server)
                .post('/pets')
                .send(payload)

        expect(res.status).toBe(500)
    })
})
