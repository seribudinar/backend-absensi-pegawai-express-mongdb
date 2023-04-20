module.exports = (app) => {
  const permits = require("../controllers/permit.controller");

  let router = require("express").Router();

  router.get("/", permits.findAll);
  router.post("/", permits.insertOne);
  router.get("/nip/:nip", permits.findOneByNip);
  router.get("/id/:id", permits.findOneById);
  router.post("/id/:id", permits.actionById);

  app.use("/api/permit", router);
};
