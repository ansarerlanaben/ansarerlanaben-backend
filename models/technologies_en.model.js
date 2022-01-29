import mongoose from 'mongoose'

const techonlogiesSchema = mongoose.Schema({
  technologie_title: String,
  technologie_id: String,
  technologie_img: String
})

const TechnologiesEn = mongoose.model('technologies_en', techonlogiesSchema)

export default TechnologiesEn