import mongoose from 'mongoose'

const techonlogiesTabsSchema = mongoose.Schema({
  technologies_tab_id: String,
  technologies_tab_title: String
})

const TechnologiesTabsEn = mongoose.model('technologiesTabs_en', techonlogiesTabsSchema)

export default TechnologiesTabsEn