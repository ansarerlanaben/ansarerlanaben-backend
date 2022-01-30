import mongoose from 'mongoose'

const techonlogiesSchema = mongoose.Schema({
  technologie_title: String,
  technologie_id: String,
  technologie_img: String
})

const Technologies = mongoose.model('technologies', techonlogiesSchema)

export default Technologies