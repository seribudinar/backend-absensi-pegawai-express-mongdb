module.exports = (app) => {
    const pegawais = require('../controllers/pegawai.controller')

    let router = require('express').Router()

    // in
    router.get('/', pegawais.findAll)
    router.get('/:id', pegawais.findOne)
    router.post('/', pegawais.insertOne)
    router.patch('/', pegawais.updateOne)
    router.delete('/:nip/delete', pegawais.delOne)

    app.use('/api/pegawai', router)
}