module.exports = (app) => {
    const settings = require('../controllers/setting.controller')

    let router = require('express').Router()

    // in
    router.get('/', settings.findAll)
    router.get('/default', settings.default)
    router.patch('/', settings.updateOne)
    
    app.use('/api/setting', router)
}