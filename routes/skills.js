import express from 'express'
import Skills from '../models/skills.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const skills = await Skills.find({})
    if (skills) {
        res.send({
            success: true,
            data: skills,
            message: "Skills have been retrieved successfully"
        })
    } else {
        res.send({
            skills: false,
            message: "Connection error"
        })
    }
})

router.post('/add', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
        const { skill_title, skill_level } = req.body
        if (skill_level && skill_title) {
            new Skills({ skill_level: skill_level, skill_title: skill_title }).save(err => {
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
            Skills.findByIdAndRemove(_id).then(err => {
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
            message: "User is not admin"
        })
    }
})

export default router