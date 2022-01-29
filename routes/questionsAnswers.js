import express from 'express'
import QuestionsAnswersEn from '../models/questionsAnswers_en.model.js'
import QuestionsAnswersRu from '../models/questionsAnswers_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const questionsAnswers = await QuestionsAnswersRu.find({})
            res.send({
                success: true,
                data: questionsAnswers,
                message: "Вопросы и ответы были доставлены успешно"
            })
        } else if (language === 'en') {
            const questionsAnswers = await QuestionsAnswersEn.find({})
            res.send({
                success: true,
                data: questionsAnswers,
                message: "Questions Answers have been retrieved successfully"
            })
        } else {
            res.send({
                success: false,
                message: "Invalid language"
            })
        }
    } else {
        res.send({
            success: false,
            message: "You must include language param in header"
        })
    }
})

router.post('/add', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const language = req.headers['language']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
            if (language) {
                if (language === 'ru') {
                    const { question, answer } = req.body
                    if (question && answer) {
                        new QuestionsAnswersRu({ question: question, answer: answer }).save(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Вопрос ответ был добавлен успешно"
                                })
                            }
                            else {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            }
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Заполните пустые поля"
                        })
                    }
                } else if (language === 'en') {
                    const { question, answer } = req.body
                    if (question && answer) {
                        new QuestionsAnswersEn({ question: question, answer: answer }).save(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Question Answer has been added successfully"
                                })
                            }
                            else {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            }
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Missing fields"
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: "Invalid language"
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: "You must include language param in header"
                })
            }
        } else {
            res.send({
                success: false,
                message: "User is not admin"
            })
        }
})

router.post('/delete', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const language = req.headers['language']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
            if (language) {
                if (language === 'ru') {
                    const { _id } = req.body
                    if (_id) {
                        QuestionsAnswersRu.findByIdAndRemove(_id).then(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Вопрос ответ был удален успешно"
                                })
                            } else {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            }
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Заполните пустые поля"
                        })
                    }
                } else if (language === 'en') {
                    const { _id } = req.body
                    if (_id) {
                        QuestionsAnswersEn.findByIdAndRemove(_id).then(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Question Answer has been deleted successfully"
                                })
                            } else {
                                res.send({
                                    success: false,
                                    message: err
                                })
                            }
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Missing fields"
                        })
                    }
                } else {
                    res.send({
                        success: false,
                        message: "Invalid language"
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: "You must include language param in header"
                })
            }
        } else {
            res.send({
                success: false,
                message: "User is not admin"
            })
        }
})

export default router