import mongoose from 'mongoose'

const questionsAnswersSchema = mongoose.Schema({
  question: String,
  answer: String
})

const QuestionsAnswersEn = mongoose.model('questionsAnswers_en', questionsAnswersSchema)

export default QuestionsAnswersEn