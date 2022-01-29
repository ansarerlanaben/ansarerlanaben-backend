import mongoose from 'mongoose'

const portfolioProjectsTabsSchema = mongoose.Schema({
  tab_id:String,
  tab_title: String
})

const PortfolioProjectsTabsEn = mongoose.model('portfolioProjectsTabs_en', portfolioProjectsTabsSchema)

export default PortfolioProjectsTabsEn