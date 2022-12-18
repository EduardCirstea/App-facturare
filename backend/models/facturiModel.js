const mongoose = require("mongoose");

const facturiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    client: {
      type: Object,
      required: true,
    },
    produse: [
      {
        servicii: {
          type: String,
          required: true,
        },
        unitati: {
          type: String,
          required: true,
        },
        cantitate: {
          type: Number,
          required: true,
        },
        pret: {
          type: Number,
          required: true,
        },
      },
    ],
    data: {
      type: Date,
      required: true,
    },
    tva: {
      type: Number,
      required: true,
    },
    pretTotal: {
      type: Number,
      required: true,
    },
    pretTva: {
      type: Number,
      required: true,
    },
    incasate: {
      type: Boolean,
      required: true,
    },
    emise: {
      type: Boolean,
      required: true,
    },
    pretType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facturi", facturiSchema);
