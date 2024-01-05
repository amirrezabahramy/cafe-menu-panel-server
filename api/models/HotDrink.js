const mongoose = require("mongoose");

const hotDrinkSchema = new mongoose.Schema(
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
  { collection: "hot-drinks" }
);

hotDrinkSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true, new: true });
  next();
});

const model = mongoose.model("HotDrink", hotDrinkSchema);

module.exports = model;
