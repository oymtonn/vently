import { pool } from './database.js'
import "./dotenv.js"
import eventData from '../data/events.js'

const createEventsTable = async () => {
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    }
    catch (err) {
        console.log(err)
    }
}

const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
`

const seedEventsTable = async () => {
    await createEventsTable()

    eventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
          }
        const values = [
            event.name,
            event.pricePoint,
            event.audience,
            event.image,
            event.description,
            event.submittedBy,
            event.submittedOn
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
        
            console.log(`✅ ${event.name} added successfully`)
        })
    })
  
}

seedEventsTable()