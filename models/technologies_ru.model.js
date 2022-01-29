import mongoose from 'mongoose'

const techonlogiesSchema = mongoose.Schema({
  technologie_title: String,
  technologie_id: String,
  technologie_img: String
})

const TechnologiesRu = mongoose.model('technologies_ru', techonlogiesSchema)

export default TechnologiesRu