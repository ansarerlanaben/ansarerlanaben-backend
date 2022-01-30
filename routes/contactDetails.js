import express from 'express'
import ContactDetails from '../models/contactDetails.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'

const router = express.Router()

router.get('/get', async (req, res) => {
    const contactDetails = await ContactDetails.find({})
    if (contactDetails) {
        res.send({
            success: true,
            data: contactDetails,
            message: "Contact Details have been retrieved successfully"
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
        const { contact_detail_title, contact_detail_value, contact_detail_link } = req.body
        if (contact_detail_title && contact_detail_value && contact_detail_link) {
            new ContactDetails({ contact_detail_title: contact_detail_title, contact_detail_value: contact_detail_value, contact_detail_link: contact_detail_link }).save(err => {
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
            ContactDetails.findByIdAndRemove(_id).then(err => {
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
            message: "User is not admin"
        })
    }
})

export default router