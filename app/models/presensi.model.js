module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    nip: String,
    date: String,
    timeIn: String,
    timeOut: String,
    pictureIn: String,
    pictureOut: String,
    addressIn: String,
    addressOut: String,
    informationIn: String,
    informationOut: String,
    ipIn: String,
    ipOut: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Presensi = mongoose.model("presenses", schema);
  return Presensi;
};
