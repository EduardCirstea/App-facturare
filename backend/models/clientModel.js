const mongoose = require('mongoose')

const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    numeFirma: {
      type: String,
      required: true,
    },

    adresa: {
      type: String,
      required: true,
    },
    telefon: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cif: {
      type: String,
      required: true,
    },
    cui: {
      type: String,
      required: true,
    },
    banca: {
      type: String,
      required: true,
    },
    iban: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Client', clientSchema)
