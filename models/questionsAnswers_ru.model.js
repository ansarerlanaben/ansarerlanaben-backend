import mongoose from 'mongoose'

const questionsAnswersSchema = mongoose.Schema({
  question: String,
  answer: String
})

const QuestionsAnswersRu = mongoose.model('questionsAnswers_ru', questionsAnswersSchema)

export default QuestionsAnswersRu