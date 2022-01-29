import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import careerJobs from './routes/careerJobs.js'
import contactForm from './routes/contactForm.js'
import contactDetails from './routes/contactDetails.js'
import portfolioProjects from './routes/portfolioProjects.js'
import portfolioProjectsTabs from './routes/portfolioProjectsTabs.js'
import questionsAnswers from './routes/questionsAnswers.js'
import skills from './routes/skills.js'
import technologies from './routes/technologies.js'
import technologiesTabs from './routes/technologiesTabs.js'
import timelineCards from './routes/timelineCards.js'

const app = express()

dotenv.config()
const PORT = process.env.PORT || 9000
const DBURL = process.env.DB
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${HOST}:${PORT}`)
    mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        _ => {
            console.log('Succesfully connected to database')
        }, err => {
            console.log(err)
        }
    )
})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api/careerJobs', careerJobs)
app.use('/api/contactDetails', contactDetails)
app.use('/api/contactForm', contactForm)
app.use('/api/portfolioProjects', portfolioProjects)
app.use('/api/portfolioProjectsTabs', portfolioProjectsTabs)
app.use('/api/questionsAnswers', questionsAnswers)
app.use('/api/skills', skills)
app.use('/api/technologies', technologies)
app.use('/api/technologiesTabs', technologiesTabs)
app.use('/api/timelineCards', timelineCards)
