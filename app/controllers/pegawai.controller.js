const db = require('../models')
const Pegawai = db.pegawais

exports.findAll = (req, res) => {
    Pegawai.find()
        .then((result) => {
            (result !== null ?
                res.status(200).json({
                    data:result,
                    message: "success"
                })
                : res.status(200).json({
                    data:`Data not available to retrievied!`,
                    message: "success"
                })
            )
        }).catch((err) => {
            // res.status(500).json({
            //     message: err.message || "Some error while retrieving Pegawai."
        // })
    })
}

exports.findOne = (req, res) => {
    const nip = req.params.id
    Pegawai.findOne({
            nip: nip
        })
        .then((result) => {
            (result !== null ?
                res.status(200).json({
                    data:result,
                    message: "success"
                })
                : res.status(200).json({
                    data:`data nip=${nip} not found!`,
                    message: "success"
                })
            )
        }).catch((err) => {
            res.status(500).json({
                message: err.message || "Some error while retrieving Pegawai."
            })
        })
}

exports.insertOne = (req, res) => {
    const nip = req.body.nip
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const imageUrl = req.body.imageUrl

    Pegawai.create({
        nip: nip,
    	name: name,
    	email: email,
    	password: password,
    	imageUrl: imageUrl
    })
    .then((result) => {
        res.status(200).json({message: "success"})
    }).catch((err) => {
            res.status(500).json({
                message: err.message || "Some error while creating Pegawai."
        })
    })
}

exports.updateOne = (req, res) => {
    const nip = req.body.nip
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const imageUrl = req.body.imageUrl

    Pegawai.updateOne({
        nip: nip
    },{
        $set: {
            name: name,
            email: email,
            password: password,
            imageUrl: imageUrl
        }
    })
    .then((result) => {
        res.status(200).json({message: "success"})
    }).catch((err) => {
            res.status(500).json({
                message: err.message || "Some error while creating Pegawai."
        })
    })
}

exports.delOne = (req, res) => {
    const nip = req.params.nip
    Pegawai.deleteOne({
        nip: nip
    })
    .then((result) => {
        res.status(200).json({message: "success"})
    }).catch((err) => {
            res.status(500).json({
                message: err.message || "Some error while creating Pegawai."
        })
    })
}