import mongoose from 'mongoose'

const techonlogiesTabsSchema = mongoose.Schema({
  technologies_tab_id: String,
  technologies_tab_title: String
})

const TechnologiesTabs = mongoose.model('technologiesTabs', techonlogiesTabsSchema)

export default TechnologiesTabs