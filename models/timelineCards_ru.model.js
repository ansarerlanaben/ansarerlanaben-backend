import mongoose from 'mongoose'

const timelineCardsSchema = mongoose.Schema({
  timeline_card_year: String,
  timeline_card_action: String
})

const TimelineCardsRu = mongoose.model('timelineCards_ru', timelineCardsSchema)

export default TimelineCardsRu