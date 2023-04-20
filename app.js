const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  // res.json({message: 'Welcome to Absensi Pegawai'})
  // console.log(req.ip);
  res.send(req.ip);
  //   res.send('Hello World!')
});

require("./app/routes/pegawai.routes")(app);
require("./app/routes/presensi.routes")(app);
require("./app/routes/setting.routes")(app);
require("./app/routes/permit.routes")(app);
require("./app/routes/report.routes")(app);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
