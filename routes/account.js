import express from 'express'
import cryptoRandomString from 'crypto-random-string'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()
const random = (id) => {
    return id + cryptoRandomString({ length: 20, type: 'alphanumeric' })
}

router.post('/login', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const { username, password } = req.body
            const user = await User.findOne({ username: username })
            if (user) {
                if (password === user.password) {
                    const sessionID = random(user._id)
                    new Session({
                        sessionID: sessionID,
                        userID: user._id,
                        createdAt: new Date()
                    }).save()
                    res.send({
                        success: true,
                        message: 'Вы успешно вошли в аккаунт',
                        data: sessionID
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Неверный пароль'
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: 'Не удалось найти имя пользователя'
                })
            }
        } else if (language === 'en') {
            const { username, password } = req.body
            const user = await User.findOne({ username: username })
            if (user) {
                if (password === user.password) {
                    const sessionID = random(user._id)
                    new Session({
                        sessionID: sessionID,
                        userID: user._id,
                        createdAt: new Date()
                    }).save()
                    res.send({
                        success: true,
                        message: 'Successful login',
                        data: sessionID
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Incorrect password'
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: 'User not found'
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
})

router.post('/login-session', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const { sessionID } = req.body
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const user = await User.findOne({ _id: session.userID })
                res.send({
                    success: true,
                    message: "Аккаунт был доставлен успешно",
                    data: user
                })
            } else {
                res.send({
                    success: false,
                    message: 'Сессия не найдена'
                })
            }
        } else if (language === 'en') {
            const { sessionID } = req.body
            const session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                const user = await User.findOne({ _id: session.userID })
                res.send({
                    success: true,
                    message: "Account has been retrieved successfully",
                    data: user
                })
            } else {
                res.send({
                    success: false,
                    message: 'Session not found'
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
})

router.post('/delete', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const { sessionID } = req.body
            const session = await Session.findOneAndDelete({ sessionID: sessionID })
            if (session) {
                User.findOneAndDelete({ _id: session.userID })
                Session.deleteMany({ userID: session.userID })
                res.send({
                    success: true,
                    message: 'Аккаунт был удален успешно'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Сессия не найдена'
                })
            }
        } else if (language === 'en') {
            const { sessionID } = req.body
            const session = await Session.findOneAndDelete({ sessionID: sessionID })
            if (session) {
                User.findOneAndDelete({ _id: session.userID })
                Session.deleteMany({ userID: session.userID })
                res.send({
                    success: true,
                    message: 'User has been deleted successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Session not found'
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
})

router.post('/logout', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const { sessionID } = req.body
            var session = await Session.findOneAndDelete({ sessionID: sessionID })
            if (session) {
                res.send({
                    success: true,
                    message: 'Вы успешно вышли с аккаунта'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Сессия не найдена'
                })
            }
        } else if (language === 'en') {
            const { sessionID } = req.body
            var session = await Session.findOneAndDelete({ sessionID: sessionID })
            if (session) {
                res.send({
                    success: true,
                    message: 'Successful logout'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Session not found'
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
})

router.post('/change-lang', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const { sessionID, lang } = req.body
            var session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                User.findOneAndUpdate({ _id: session.userID }, { lang: lang })
                res.send({
                    success: true,
                    message: 'Язык был изменен успешно'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Сессия не найдена'
                })
            }
        } else if (language === 'en') {
            const { sessionID, lang } = req.body
            var session = await Session.findOne({ sessionID: sessionID })
            if (session) {
                User.findOneAndUpdate({ _id: session.userID }, { lang: lang })
                res.send({
                    success: true,
                    message: 'Language has been changed successfully'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Session not found'
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
})

export default router