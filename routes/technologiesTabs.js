import express from 'express'
import TechnologiesTabs from '../models/technologiesTabs.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const technologiesTabs = await TechnologiesTabs.find({})
    if (technologiesTabs) {
        res.send({
            success: true,
            data: technologiesTabs,
            message: "Technologies Tabs have been retrieved successfully"
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
        const { technologies_tab_id, technologies_tab_title } = req.body
        if (technologies_tab_id && technologies_tab_title) {
            new TechnologiesTabs({ technologies_tab_id: technologies_tab_id, technologies_tab_title: technologies_tab_title }).save(err => {
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
            TechnologiesTabs.findByIdAndRemove(_id).then(err => {
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
            message: "User is not admin"
        })
    }
})

export default router