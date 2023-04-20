const db = require("../models");
const Presensi = db.presenses;
const Pegawai = db.pegawais;
const Setting = db.settings;

exports.findAll = async (req, res) => {
  const pegawai = await Pegawai.aggregate([
    {
      $lookup: {
        from: "presenses",
        localField: "nip",
        foreignField: "nip",
        as: "presensi",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          id: "$_id",
          nip: "$nip",
          name: "$name",
          presensi: "$presensi",
        },
      },
    },
  ]);
  res.status(200).json({
    data: pegawai,
    message: "success",
  });
};

exports.findOne = (req, res) => {
  const nip = req.params.id;
  Presensi.find({
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
        message: err.message || "Some error while retrieving Presensi.",
      });
    });
};

exports.clockIn = (req, res) => {
  const nip = req.body.nip;
  const date = req.body.date;
  const timeIn = req.body.timeIn;
  const pictureIn = req.body.pictureIn;
  const addressIn = req.body.addressIn;
  const ip = req.ip;
  // let timeStartWork = 0
  var informationIn = "";

  Setting.find({}, "timeStart")
    .then((result) => {
      var timeStart1 = result[0].timeStart.split(":");
      var timeStartWork =
        Number(timeStart1[0]) * 3600 +
        Number(timeStart1[1]) * 60 +
        Number(timeStart1[2]);

      var timeInWork = timeIn.split(":");
      var timeStartIn =
        Number(timeInWork[0]) * 3600 +
        Number(timeInWork[1]) * 60 +
        Number(timeInWork[2]);
      var diff = Number(timeStartWork) - Number(timeStartIn);
      diff < 0 ? (informationIn = "late") : (informationIn = "");
    })
    .then((result) => {
      Presensi.findOne({
        $and: [
          {
            nip: nip,
          },
          {
            date: date,
          },
        ],
      })
        .then((result) => {
          result == null
            ? Presensi.create({
                nip: nip,
                date: date,
                timeIn: timeIn,
                pictureIn: pictureIn,
                addressIn: addressIn,
                ipIn: ip,
                informationIn: informationIn,
              })
                .then((result2) => {
                  res.status(200).json({
                    message: `Berhasil clockin pada pukul ${result2.timeIn} ${result2.informationIn}`,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message:
                      err.message || "Some error while creating Absensi.",
                  });
                })
            : res.status(200).json({
                message: `Anda sudah clockin pada pukul ${result.timeIn}`,
              });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message || "Some error while creating Absensi.",
          });
        });
    });
};

exports.clockOut = (req, res) => {
  const nip = req.body.nip;
  const date = req.body.date;
  const timeOut = req.body.timeOut;
  const pictureOut = req.body.pictureOut;
  const addressOut = req.body.addressOut;
  const ip = req.ip;
  var informationOut = "";

  Setting.find({}, "timeEnd")
    .then((result) => {
      var timeEnd1 = result[0].timeEnd.split(":");
      var timeEndWork =
        Number(timeEnd1[0]) * 3600 +
        Number(timeEnd1[1]) * 60 +
        Number(timeEnd1[2]);

      var timeOut1 = timeOut.split(":");
      var timeEndOut =
        Number(timeOut1[0]) * 3600 +
        Number(timeOut1[1]) * 60 +
        Number(timeOut1[2]);
      var diff = Number(timeEndWork) - Number(timeEndOut);
      diff > 0 ? (informationOut = "kecepatan") : (informationOut = "");
    })
    .then((result) => {
      Presensi.findOneAndUpdate(
        {
          nip: nip,
          date: date,
        },
        {
          $set: {
            timeOut: timeOut,
            pictureOut: pictureOut,
            addressOut: addressOut,
            ipOut: ip,
            informationOut: informationOut,
          },
        }
      )
        .then((result2) => {
          res.status(200).json({
            message: `Berhasil clockout pada pukul ${timeOut} ${informationOut}`,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message || "Some error while creating Absensi.",
          });
        });
    });
};
