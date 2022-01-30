import mongoose from 'mongoose'

const careerJobsSchema = mongoose.Schema({
    career_job_title: String
})

const CareerJobs = mongoose.model('careerJobs', careerJobsSchema)

export default CareerJobs