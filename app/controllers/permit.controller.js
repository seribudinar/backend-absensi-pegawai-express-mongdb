const db = require("../models");
const Permit = db.permits;
var mongoose = require("mongoose");

exports.findAll = (req, res) => {
  Permit.find()
    .then((result) => {
      result !== null
        ? res.status(200).json({
            data: result,
            message: "success",
          })
        : res.status(200).json({
            data: `Data not available to retrievied!`,
            message: "success",
          });
    })
    .catch((err) => {
      // res.status(500).json({
      //     message: err.message || "Some error while retrieving Permit."
      // })
    });
};

exports.findOneByNip = (req, res) => {
  const nip = req.params.nip;
  Permit.findOne({
    nip: nip,
  })
    .then((result) => {
      result !== null
        ? res.status(200).json({
            data: result,
            message: "success",
          })
        : res.status(200).json({
            data: `data nip=${nip} not found!`,
            message: "success",
          });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while retrieving Permit.",
      });
    });
};

exports.findOneById = (req, res) => {
  const id = req.params.id;
  const nip = req.params.nip;
  Permit.findOne({
    _id: id,
    nip: nip,
  })
    .then((result) => {
      result !== null
        ? res.status(200).json({
            data: result,
            message: "success",
          })
        : res.status(200).json({
            data: `data nip=${nip} not found!`,
            message: "success",
          });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while retrieving Permit.",
      });
    });
};

exports.insertOne = (req, res) => {
  const nip = req.body.nip;
  const date = req.body.date;
  const tipe = req.body.tipe;
  const reason = req.body.reason;

  Permit.create({
    nip: nip,
    date: date,
    tipe: tipe,
    reason: reason,
    status: "pending",
  })
    .then((result) => {
      res.status(200).json({ message: "success, waiting for approval" });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while creating Permit.",
      });
    });
};

exports.actionById = (req, res) => {
  const id = req.params.id;
  const action = req.body.action;

  Permit.findOneAndUpdate(
    { _id: id },
    {
      $set: { status: action },
    }
  )
    .then((result) => {
      res.status(200).json({ message: `success, approval ${action}ed` });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while creating Permit.",
      });
    });
};
