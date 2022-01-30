import mongoose from 'mongoose'

const questionsAnswersSchema = mongoose.Schema({
  question: String,
  answer: String
})

const QuestionsAnswers = mongoose.model('questionsAnswers', questionsAnswersSchema)

export default QuestionsAnswers