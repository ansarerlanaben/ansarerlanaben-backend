import mongoose from 'mongoose'

const contactFormSchema = mongoose.Schema({
  username: String,
  subject: String,
  email: String,
  message: String
})

const ContactForm = mongoose.model('contactForm', contactFormSchema)

export default ContactForm