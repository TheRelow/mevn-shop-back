const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
});

module.exports = model("User", schema);
