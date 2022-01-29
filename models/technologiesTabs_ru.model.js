import mongoose from 'mongoose'

const techonlogiesTabsSchema = mongoose.Schema({
  technologies_tab_id: String,
  technologies_tab_title: String
})

const TechnologiesTabsRu = mongoose.model('technologiesTabs_ru', techonlogiesTabsSchema)

export default TechnologiesTabsRu