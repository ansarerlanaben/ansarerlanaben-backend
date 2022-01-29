import express from 'express'
import ContactForm from '../models/contactForm.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const contactForm = await ContactForm.find({})
            res.send({
                success: true,
                data: contactForm,
                message: "Контактная форма была доставлена успешно"
            })
        } else if (language === 'en') {
            const contactForm = await ContactForm.find({})
            res.send({
                success: true,
                data: contactForm,
                message: "Contact Form has been retrieved successfully"
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
                const errors = {}
                if (!username.trim()) {
                    errors.username = true
                }
                if (!subject.trim()) {
                    errors.subject = true
                }
                if (!message.trim()) {
                    errors.message = true
                }
                if (!email) {
                    errors.email = true
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                    errors.email = true
                }
                if (Object.keys(errors).length === 0) {
                    new ContactForm({
                        username: username,
                        subject: subject,
                        email: email,
                        message: message
                    }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Сообщение было отправлено успешно"
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
                        errors: errors,
                        message: "Заполните пустые поля"
                    })
                }
            } else if (language === 'en') {
                const errors = {}
                if (!username.trim()) {
                    errors.username = true
                }
                if (!subject.trim()) {
                    errors.subject = true
                }
                if (!message.trim()) {
                    errors.message = true
                }
                if (!email) {
                    errors.email = true
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                    errors.email = true
                }
                if (Object.keys(errors).length === 0) {
                    new ContactForm({
                        username: username,
                        subject: subject,
                        email: email,
                        message: message
                    }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Message has been sent successfully"
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
                        errors: errors,
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
                ContactMe.deleteMany().then(err => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: "Контактная форма была очищена успешно"
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "Ошибка соединения"
                        })
                    }
                })
            } else if (language === 'en') {
                ContactMe.deleteMany().then(err => {
                    if (!err) {
                        res.send({
                            success: true,
                            message: "Contact Form has been cleared successfully"
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
            message: 'User is not admin'
        })
    }
})

export default router