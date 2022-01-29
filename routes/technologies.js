import express from 'express'
import TechnologiesEn from '../models/technologies_en.model.js'
import TechnologiesRu from '../models/technologies_ru.model.js'
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
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const technologies = await TechnologiesRu.find({})
            res.send({
                success: true,
                data: technologies,
                message: "Технологии были доставлены успешно"
            })
        } else if (language === 'en') {
            const technologies = await TechnologiesEn.find({})
            res.send({
                success: true,
                data: technologies,
                message: "Technologies have been retrieved successfully"
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

router.get('/random/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const technologies = await TechnologiesRu.find({})
            const technologie = technologies[Math.floor(Math.random() * technologies.length)]
            res.send({
                success: true,
                data: technologie,
                message: "Технология была доставлена успешно"
            })
        } else if (language === 'en') {
            const technologies = await TechnologiesEn.find({})
            const technologie = technologies[Math.floor(Math.random() * technologies.length)]
            res.send({
                success: true,
                data: technologie,
                message: "Technologie has been retrieved successfully"
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

router.get('/category-:id/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const technologie = await TechnologiesRu.find({ technologie_id: req.params.id })
            res.send({
                success: true,
                data: technologie,
                message: "Технологии были доставлены успешно"
            })
        } else if (language === 'en') {
            const technologie = await TechnologiesEn.find({ technologie_id: req.params.id })
            res.send({
                success: true,
                data: technologie,
                message: "Technologies have been retrieved successfully"
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
                upload.single('technologie_img')
                if (language === 'ru') {
                    const { technologie_id, technologie_title } = req.body
                    if (technologie_id && technologie_title) {
                        new TechnologiesRu({ technologie_id: technologie_id, technologie_title: technologie_title, technologie_img: req.file ? req.file.path : null }).save(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Технология была добавлена успешно"
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
                            message: "Заполните пустые поля"
                        })
                    }
                } else if (language === 'en') {
                    const { technologie_id, technologie_title } = req.body
                    if (technologie_id && technologie_title) {
                        new TechnologiesEn({ technologie_id: technologie_id, technologie_title: technologie_title, technologie_img: req.file ? req.file.path : null }).save(err => {
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
                        TechnologiesRu.findByIdAndRemove(_id).then(err => {
                            if (!err) {
                                res.send({
                                    success: true,
                                    message: "Технология была удалена успешно"
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
                            message: "Заполните пустые поля"
                        })
                    }
                } else if (language === 'en') {
                    const { _id } = req.body
                    if (_id) {
                        TechnologiesEn.findByIdAndRemove(_id).then(err => {
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