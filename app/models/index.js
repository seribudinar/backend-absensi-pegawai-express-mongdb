const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pegawais = require("./pegawai.model")(mongoose);
db.presenses = require("./presensi.model")(mongoose);
db.settings = require("./setting.model")(mongoose);
db.permits = require("./permit.model")(mongoose);

module.exports = db;
