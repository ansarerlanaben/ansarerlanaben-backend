import mongoose from 'mongoose'

const contactDetailsSchema = mongoose.Schema({
    contact_detail_title: String,
    contact_detail_value: String,
    contact_detail_link: String
})

const ContactDetails = mongoose.model('contactDetails', contactDetailsSchema)

export default ContactDetails