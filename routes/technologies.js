import express from 'express'
import Technologies from '../models/technologies.model.js'
import User from '../models/user.model.js'
import Session from '../models/session.model.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(new Error('This is not image file type'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

router.get('/get', async (req, res) => {
    const technologies = await Technologies.find({})
    if (technologies) {
        res.send({
            success: true,
            data: technologies,
            message: "Technologies have been retrieved successfully"
        })
    } else {
        res.send({
            success: false,
            message: "Connection error"
        })
    }
})

router.get('/random/get', async (req, res) => {
    const technologies = await Technologies.find({})
    const technologie = technologies[Math.floor(Math.random() * technologies.length)]
    if (technologie) {
        res.send({
            success: true,
            data: technologie,
            message: "Technologie has been retrieved successfully"
        })
    } else {
        res.send({
            success: false,
            message: "Connection error"
        })
    }
})

router.get('/category-:id/get', async (req, res) => {
    const technologie = await Technologies.find({ technologie_id: req.params.id })
    if (technologie) {
        res.send({
            success: true,
            data: technologie,
            message: "Technologies have been retrieved successfully"
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
        upload.single('technologie_img')
        const { technologie_id, technologie_title } = req.body
        if (technologie_id && technologie_title) {
            new Technologies({ technologie_id: technologie_id, technologie_title: technologie_title, technologie_img: req.file ? req.file.path : null }).save(err => {
                if (!err) {
                    res.send({
                        success: true,
                        message: "Technologie has been added successfully"
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
            Technologies.findByIdAndRemove(_id).then(err => {
                if (!err) {
                    res.send({
                        success: true,
                        message: "Technologie has been deleted successfully"
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