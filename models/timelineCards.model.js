import mongoose from 'mongoose'

const timelineCardsSchema = mongoose.Schema({
  timeline_card_year: String,
  timeline_card_action: String
})

const TimelineCards = mongoose.model('timelineCards', timelineCardsSchema)

export default TimelineCards