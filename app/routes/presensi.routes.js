module.exports = (app) => {
  const presensis = require("../controllers/presensi.controller");

  let router = require("express").Router();

  // in
  router.get("/", presensis.findAll);
  router.get("/:id", presensis.findOne);
  router.post("/clockin", presensis.clockIn);
  router.post("/clockout", presensis.clockOut);

  app.use("/api/presensi", router);
};
