import mongoose from "mongoose";

const ProduktSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 250,
    },
    category: {
      type: String,
      required: true,
      maxlength: 30,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
      maxlength: 30,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    extras: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  }
  //   { timestamps: true }
);

export default mongoose.models.Produkt ||
  mongoose.model("Produkt", ProduktSchema);
