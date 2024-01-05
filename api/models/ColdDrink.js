const mongoose = require("mongoose");

const coldDrinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { collection: "cold-drinks" }
);

coldDrinkSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true, new: true });
  next();
});

const model = mongoose.model("ColdDrink", coldDrinkSchema);

module.exports = model;
