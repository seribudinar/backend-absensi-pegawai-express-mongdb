module.exports = (app) => {
  const reports = require("../controllers/report.controller");

  let router = require("express").Router();

  // in
  router.get("/", reports.findAll);
  router.post("/late/:nip", reports.countLateByNip);
  router.post("/late/", reports.countLate);
  router.post("/permit/", reports.countPermit);
  router.post("/absen/", reports.countAbsen);

  app.use("/api/report", router);
};
