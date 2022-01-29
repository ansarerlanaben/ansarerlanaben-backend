import express from 'express'
import PortfolioProjectsTabsEn from '../models/portfolioProjectsTabs_en.model.js'
import PortfolioProjectsTabsRu from '../models/portfolioProjectsTabs_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const portfolioProjectsTabs = await PortfolioProjectsTabsRu.find({})
            res.send({
                success: true,
                data: portfolioProjectsTabs,
                message: "Портфолио проект табы были доставлены успешно"
            })
        } else if (language === 'en') {
            const portfolioProjectsTabs = await PortfolioProjectsTabsEn.find({})
            res.send({
                success: true,
                data: portfolioProjectsTabs,
                message: "Portfolio Projects Tabs have been retrieved successfully"
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
                const { tab_title, tab_id } = req.body
                if (tab_title && tab_id) {
                    new PortfolioProjectsTabsRu({ tab_id: tab_id, tab_title: tab_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Портфолио проект таб был добавлен успешно"
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
                const { tab_title, tab_id } = req.body
                if (tab_title && tab_id) {
                    new PortfolioProjectsTabsEn({ tab_title: tab_title, tab_id: tab_id }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Portfolio Projects Tab has been added successfully"
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
                    PortfolioProjectsTabsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Портфолио проект таб был удален успешно"
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
                    PortfolioProjectsTabsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Portfolio Projects Tab has been deleted successfully"
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