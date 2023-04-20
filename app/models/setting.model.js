module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            timeStart: String,
            timeEnd: String,
        }
    )

    schema.method("toJSON", function () {
        const {__v, _id, ...object } = this.toObject()
        object.id = _id;
        return object
    })

    const Setting = mongoose.model("settings", schema)
    return Setting
}