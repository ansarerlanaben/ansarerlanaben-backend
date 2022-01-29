import express from 'express'
import TechnologiesTabsEn from '../models/technologiesTabs_en.model.js'
import TechnologiesTabsRu from '../models/technologiesTabs_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const technologiesTabs = await TechnologiesTabsRu.find({})
            res.send({
                success: true,
                data: technologiesTabs,
                message: "Технология табы были доставлены успешно"
            })
        } else if (language === 'en') {
            const technologiesTabs = await TechnologiesTabsEn.find({})
            res.send({
                success: true,
                data: technologiesTabs,
                message: "Technologies Tabs have been retrieved successfully"
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
                const { technologies_tab_id, technologies_tab_title } = req.body
                if (technologies_tab_id && technologies_tab_title) {
                    new TechnologiesTabsRu({ technologies_tab_id: technologies_tab_id, technologies_tab_title: technologies_tab_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Технология таб был добавлен успешно"
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
                const { technologies_tab_id, technologies_tab_title } = req.body
                if (technologies_tab_id && technologies_tab_title) {
                    new TechnologiesTabsEn({ technologies_tab_id: technologies_tab_id, technologies_tab_title: technologies_tab_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Technologies Tab has been added successfully"
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
                    TechnologiesTabsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Технология таб был удален успешно"
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
                    TechnologiesTabsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Technologies Tab has been deleted successfully"
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