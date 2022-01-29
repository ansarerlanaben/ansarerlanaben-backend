import express from 'express'
import SkillsEn from '../models/skills_en.model.js'
import SkillsRu from '../models/skills_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const skills = await SkillsRu.find({})
            res.send({
                success: true,
                data: skills,
                message: "Навыки были доставлены успешно"
            })
        } else if (language === 'en') {
            const skills = await SkillsEn.find({})
            res.send({
                success: true,
                data: skills,
                message: "Skills have been retrieved successfully"
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
                const { skill_title, skill_level } = req.body
                if (skill_title && skill_level) {
                    new SkillsRu({ skill_level: skill_level, skill_title: skill_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Навык был добавлен успешно"
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
                const { skill_title, skill_level } = req.body
                if (skill_level && skill_title) {
                    new SkillsEn({ skill_level: skill_level, skill_title: skill_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Skill has been added successfully"
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
                    SkillsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Навык был удален успешно"
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
                    SkillsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Skill has been deleted successfully"
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