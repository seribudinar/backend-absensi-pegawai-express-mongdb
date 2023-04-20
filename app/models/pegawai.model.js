module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    nip: String,
    name: String,
    email: String,
    password: String,
    imageUrl: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pegawai = mongoose.model("pegawais", schema);
  return Pegawai;
};
