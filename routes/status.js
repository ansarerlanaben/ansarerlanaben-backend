import express from 'express'
import Status from '../models/status.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const status = await Status.findOne({_id: '623e0ecfba41ff54a8dc18bc'})
    if (status) {
        res.send({
            success: true,
            data: status,
            message: "Status has been retrieved successfully"
        })
    } else {
        res.send({
            skills: false,
            message: "Connection error"
        })
    }
})

router.post('/update', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
        const { status } = req.body
        if (status) {
            new Status({ status: status }).save(err => {
                if (!err) {
                    res.send({
                        success: true,
                        message: "Status has been updated successfully"
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

export default router