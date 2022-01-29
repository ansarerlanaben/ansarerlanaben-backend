import mongoose from 'mongoose'

const skillsSchema = mongoose.Schema({
  skills_title: String,
  skills_level: String
})

const SkillsEn = mongoose.model('skills_en', skillsSchema)

export default SkillsEn