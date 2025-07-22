import { DataSource } from 'typeorm'
import { Pet } from '../entities/Pet'

export const TestDataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    synchronize: true,
    entities: [Pet],
})
