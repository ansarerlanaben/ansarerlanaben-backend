import express from 'express'
import CareerJobs from '../models/careerJobs.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const careerJobs = await CareerJobs.find({})
    if (careerJobs) {
        res.send({
            success: true,
            data: careerJobs,
            message: "Career Jobs have been retrieved successfully"
        })
    } else {
        res.send({
            success: false,
            message: 'Connection error'
        })
    }
})

router.post('/add', async (req, res) => {
    const sessionID = req.headers['sessionID']
    const session = await Session.findOne({ sessionID: sessionID })
    const user = await User.findOne({ _id: session?.userID, role: 'admin' })
    if (user) {
        const { career_job_title } = req.body
        if (career_job_title) {
            new CareerJobs({ career_job_title: career_job_title }).save(err => {
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
            CareerJobs.findByIdAndRemove(_id).then(err => {
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
            message: "User is not admin"
        })
    }
})

export default router
