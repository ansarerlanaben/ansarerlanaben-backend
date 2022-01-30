import mongoose from 'mongoose'

const portfolioProjectsTabsSchema = mongoose.Schema({
  tab_id:String,
  tab_title: String
})

const PortfolioProjectsTabs = mongoose.model('portfolioProjectsTabs', portfolioProjectsTabsSchema)

export default PortfolioProjectsTabs