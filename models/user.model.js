import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  lang: String,
  role: String
})

const User = mongoose.model('user', userSchema)

export default User