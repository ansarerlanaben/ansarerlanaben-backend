import mongoose from 'mongoose'

const skillsSchema = mongoose.Schema({
  skill_title: String,
  skill_level: String
})

const SkillsRu = mongoose.model('skills_ru', skillsSchema)

export default SkillsRu