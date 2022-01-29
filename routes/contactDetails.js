import express from 'express'
import ContactDetailsEn from '../models/contactDetails_en.model.js'
import ContactDetailsRu from '../models/contactDetails_ru.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const contactDetails = await ContactDetailsRu.find({})
            res.send({
                success: true,
                data: contactDetails,
                message: "Контактные данные были доставлены успешно"
            })
        } else if (language === 'en') {
            const contactDetails = await ContactDetailsEn.find({})
            res.send({
                success: true,
                data: contactDetails,
                message: "Contact Details have been retrieved successfully"
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
                const { contact_detail_title, contact_detail_value, contact_detail_link } = req.body
                if (contact_detail_title && contact_detail_value && contact_detail_link) {
                    new ContactDetailsRu({ contact_detail_title: contact_detail_title, contact_detail_value: contact_detail_value, contact_detail_link: contact_detail_link }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Контакные данные были добавлены успешно"
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
                const { contact_detail_title, contact_detail_value, contact_detail_link } = req.body
                if (contact_detail_title && contact_detail_value && contact_detail_link) {
                    new ContactDetailsEn({ contact_detail_title: contact_detail_title, contact_detail_value: contact_detail_value, contact_detail_link: contact_detail_link }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Contact Detail has been added successfully"
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
                    ContactDetailsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Контактные данные были удалены успешно"
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
                    ContactDetailsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Contact Detail has been deleted successfully"
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