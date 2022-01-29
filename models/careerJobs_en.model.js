import mongoose from 'mongoose'

const careerJobsSchema = mongoose.Schema({
    career_job_title: String
})

const CareerJobsEn = mongoose.model('careerJobs_en', careerJobsSchema)

export default CareerJobsEn