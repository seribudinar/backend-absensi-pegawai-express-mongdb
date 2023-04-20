const db = require("../models");
const Pegawai = db.pegawais;
const Presensi = db.presenses;
const Permit = db.permits;

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
  res.status(200).json({ data: pegawai, message: "success" });
};

exports.countLate = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const presensi = await Presensi.aggregate([
    {
      $match: {
        informationIn: "late",
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    { $count: "Total Late" },
  ]);
  res.status(200).json({
    data: { startDate: startDate, endDate: endDate, presensi: presensi[0] },
    message: "success",
  });
};

exports.countLateByNip = async (req, res) => {
  const nip = req.params.nip;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const presensi = await Presensi.aggregate([
    {
      $match: {
        nip: nip,
        informationIn: "late",
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    { $count: "Total Late" },
  ]);
  res.status(200).json({
    data: {
      nip: nip,
      startDate: startDate,
      endDate: endDate,
      presensi: presensi[0],
    },
    message: "success",
  });
};

exports.countPermit = async (req, res) => {
  const nip = req.body.nip;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const tipe = req.body.tipe;
  const status = req.body.status;

  const permit = await Permit.aggregate([
    {
      $match: {
        nip: nip,
        tipe: tipe,
        status: status,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    { $count: "Permit" },
  ]);
  res.status(200).json({
    data: {
      nip: nip,
      startDate: startDate,
      endDate: endDate,
      tipe: tipe,
      status: status,
      count: permit[0],
    },
    message: "success",
  });
};

exports.countAbsen = async (req, res) => {
  const nip = req.body.nip;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  var day = 24;

  const permitAcc = await Permit.aggregate([
    {
      $match: {
        nip: nip,
        status: "accept",
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    { $count: "Permit" },
  ]);

  const presensi = await Presensi.aggregate([
    {
      $match: {
        nip: nip,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    { $count: "Presensi" },
  ]);

  const pA = permitAcc[0] == null ? 0 : permitAcc[0]["Permit"];
  const pS = presensi[0] == null ? 0 : presensi[0]["Presensi"];
  res.status(200).json({
    data: {
      nip: nip,
      startDate: startDate,
      endDate: endDate,
      count: {
        permit: permitAcc[0] || 0,
        presensi: pS,
        absen: day - Number(pA) - Number(pS),
      },
    },
    message: "success",
  });
};
