module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    nip: String,
    name: String,
    date: String,
    tipe: String,
    reason: String,
    status: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Permit = mongoose.model("permits", schema);
  return Permit;
};
