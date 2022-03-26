import mongoose from 'mongoose'

const statusSchema = mongoose.Schema({
    status: String
})

const Status = mongoose.model('status', statusSchema)

export default Status