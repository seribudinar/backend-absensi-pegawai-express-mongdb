const db = require("../models");
const Setting = db.settings;
var mongoose = require("mongoose");

exports.findAll = (req, res) => {
  Setting.find()
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
      //     message: err.message || "Some error while retrieving Setting."
      // })
    });
};

exports.default = (req, res) => {
  mongoose.connection.db
    .dropCollection("settings")
    .then((result) => {
      Setting.create({
        timeStart: "08:00:00",
        timeEnd: "17:00:00",
      })
        .then((result) => {
          res.status(200).json({ message: "success" });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message || "Some error while creating Setting.",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while creating Setting.",
      });
    });
};

exports.updateOne = (req, res) => {
  data = req.body;
  Setting.updateOne(data)
    .then((result) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error while creating Setting.",
      });
    });
};
