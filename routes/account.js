import express from 'express'
import cryptoRandomString from 'crypto-random-string'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()
const random = (id) => {
    return id + cryptoRandomString({ length: 20, type: 'alphanumeric' })
}

router.post('/login', async (req, res) => {
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
})

router.post('/login-session', async (req, res) => {
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
})

router.post('/delete', async (req, res) => {
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
})

export default router