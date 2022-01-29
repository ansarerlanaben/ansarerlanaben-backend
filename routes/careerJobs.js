import express from 'express'
import CareerJobsRu from '../models/careerJobs_ru.model.js'
import CareerJobsEn from '../models/careerJobs_en.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const careerJobs = await CareerJobsRu.find({})
            res.send({
                success: true,
                data: careerJobs,
                message: "Карьерные профессии были доставлены успешно"
            })
        } else if (language === 'en') {
            const careerJobs = await CareerJobsEn.find({})
            res.send({
                success: true,
                data: careerJobs,
                message: "Career Jobs have been retrieved successfully"
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
                const { career_job_title } = req.body
                if (career_job_title) {
                    new CareerJobsRu({ career_job_title: career_job_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Карьерная профессия была успешно добавлена"
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                message: "Ошибка соединения"
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
                const { career_job_title } = req.body
                if (career_job_title) {
                    new CareerJobsEn({ career_job_title: career_job_title }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Career Job has been added successfully"
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                message: "Connection error"
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
                    CareerJobsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Карьерная профессия была удалена успешно"
                            })
                        } else {
                            res.send({
                                success: false,
                                message: "Ошибка соединения"
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
                    CareerJobsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Career Job has been deleted successfully"
                            })
                        } else {
                            res.send({
                                success: false,
                                message: "Connection error"
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
