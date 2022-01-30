import express from 'express'
import TimelineCards from '../models/timelineCards.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const timelineCards = await TimelineCards.find({})
    if (timelineCards) {
        res.send({
            success: true,
            data: timelineCards,
            message: "Timeline Cards have been retrieved successfully"
        })
    } else {
        res.send({
            success: false,
            message: "Connection error"
        })
    }
})

router.post('/add', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
        const { timeline_card_year, timeline_card_action } = req.body
        if (timeline_card_year && timeline_card_action) {
            new TimelineCards({ timeline_card_year: timeline_card_year, timeline_card_action: timeline_card_action }).save(err => {
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
            message: "User is not admin"
        })
    }
})

router.post('/delete', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
        const { _id } = req.body
        if (_id) {
            TimelineCards.findByIdAndRemove(_id).then(err => {
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
            message: "User is not admin"
        })
    }
})

export default router