import express from 'express'
import TimelineCardsEn from '../models/timelineCards_en.model.js'
import TimelineCardsRu from '../models/timelineCards_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const timelineCards = await TimelineCardsRu.find({})
            res.send({
                success: true,
                data: timelineCards,
                message: "Временные карточки были доставлены успешно"
            })
        } else if (language === 'en') {
            const timelineCards = await TimelineCardsEn.find({})
            res.send({
                success: true,
                data: timelineCards,
                message: "Timeline Cards have been retrieved successfully"
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
                const { timeline_card_year, timeline_card_action } = req.body
                if (timeline_card_year && timeline_card_action) {
                    new TimelineCardsRu({ timeline_card_year: timeline_card_year, timeline_card_action: timeline_card_action }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Временная карточка была добавлена успешно"
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
                const { timeline_card_year, timeline_card_action } = req.body
                if (timeline_card_year && timeline_card_action) {
                    new TimelineCardsEn({ timeline_card_year: timeline_card_year, timeline_card_action: timeline_card_action }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Timeline Card has been added successfully"
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
                    TimelineCardsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Временная карточка была удалена успешно"
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
                    TimelineCardsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Timeline Card has been deleted successfully"
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