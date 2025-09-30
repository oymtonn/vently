import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import eventData from '../data/events.js'
import EventsController from '../controllers/events.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', EventsController.getEvents)

export default router