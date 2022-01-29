import mongoose from 'mongoose'

const careerJobsSchema = mongoose.Schema({
    career_job_title: String
})

const CareerJobsRu = mongoose.model('careerJobs_ru', careerJobsSchema)

export default CareerJobsRu