import express from 'express'
import PortfolioProjectsEn from '../models/portfolioProjects_en.model.js'
import PortfolioProjectsRu from '../models/portfolioProjects_ru.model.js'
import Configs from '../models/configs.model.js'
import multer from 'multer'
import Session from '../models/session.model.js'
import User from '../models/user.model.js'

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
            const portfolioProjects = await PortfolioProjectsRu.find({})
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Портфолио проекты были доставлены успешно"
            })
        } else if (language === 'en') {
            const portfolioProjects = await PortfolioProjectsEn.find({})
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Portfolio Projects have been retrieved successfully"
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

router.get('/project-:id/get', async (req, res) => {
    const language = req.headers['language']
    if (language) {
        if (language === 'ru') {
            const portfolioProjects = await PortfolioProjectsRu.findOne({ _id: req.params.id })
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Портфолио проект был доставлен успешно"
            })
        } else if (language === 'en') {
            const portfolioProjects = await PortfolioProjectsEn.findOne({ _id: req.params.id })
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Portfolio Project has been retrieved successfully"
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
            const portfolioProjects = await PortfolioProjectsRu.find({ project_theme_id: req.params.id })
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Портфолио проекты были доставлены успешно"
            })
        } else if (language === 'en') {
            const portfolioProjects = await PortfolioProjectsEn.find({ project_theme_id: req.params.id })
            res.send({
                success: true,
                data: portfolioProjects,
                message: "Portfolio Projects have been retrieved successfully"
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
            upload.fields([{ name: 'project_logo', maxCount: 10 }, { name: 'project_poster', maxCount: 10 }])
            if (language === 'ru') {
                const { project_title, project_overview, project_tags, project_theme, project_theme_id, project_link, project_favourite, project_year } = req.body
                if (project_title && project_overview && project_tags && project_theme && project_theme_id && project_link && project_favourite && project_year) {
                    const project_posters = []
                    req.files.project_poster.forEach(file => {
                        project_posters.push(file.path)
                    })
                    new PortfolioProjectsRu({
                        project_poster: project_posters,
                        project_title: project_title,
                        project_overview: project_overview,
                        project_tags: project_tags,
                        project_logo: req.files.project_logo[0].path,
                        project_theme: project_theme,
                        project_theme_id: project_theme_id,
                        project_link: project_link,
                        project_favourite: project_favourite,
                        project_year: project_year
                    }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Портфолио проект был добавлен успешно"
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
                const { project_title, project_overview, project_tags, project_theme, project_theme_id, project_link, project_favourite, project_year } = req.body
                if (project_title && project_overview && project_tags && project_theme && project_theme_id && project_link && project_favourite && project_year) {
                    const project_posters = []
                    req.files.project_poster.forEach(file => {
                        project_posters.push(file.path)
                    })
                    new PortfolioProjectsEn({
                        project_poster: project_posters,
                        project_title: project_title,
                        project_overview: project_overview,
                        project_tags: project_tags,
                        project_logo: req.files.project_logo[0].path,
                        project_theme: project_theme,
                        project_theme_id: project_theme_id,
                        project_link: project_link,
                        project_favourite: project_favourite,
                        project_year: project_year
                    }).save(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Portfolio Project has been added successfully"
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
                    PortfolioProjectsRu.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Портфолио проект был удален успешно"
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
                    PortfolioProjectsEn.findByIdAndRemove(_id).then(err => {
                        if (!err) {
                            res.send({
                                success: true,
                                message: "Portfolio Project has been deleted successfully"
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