import mongoose from 'mongoose'

const skillsSchema = mongoose.Schema({
  skills_title: String,
  skills_level: String
})

const Skills = mongoose.model('skills', skillsSchema)

export default Skills