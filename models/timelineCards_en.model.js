import mongoose from 'mongoose'

const timelineCardsSchema = mongoose.Schema({
  timeline_card_year: String,
  timeline_card_action: String
})

const TimelineCardsEn = mongoose.model('timelineCards_en', timelineCardsSchema)

export default TimelineCardsEn