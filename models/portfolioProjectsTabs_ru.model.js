import mongoose from 'mongoose'

const portfolioProjectsTabsSchema = mongoose.Schema({
  tab_id:String,
  tab_title: String
})

const PortfolioProjectsTabsRu = mongoose.model('portfolioProjectsTabs_ru', portfolioProjectsTabsSchema)

export default PortfolioProjectsTabsRu