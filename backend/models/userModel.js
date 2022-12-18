const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    telefon: {
      type: String,
      required: [true, 'Please add a password'],
    },
    adresa: {
      type: String,
      required: [true, 'Please add a password'],
    },
    banca: {
      type: String,
      required: [true, 'Please add a password'],
    },
    iban: {
      type: String,
      required: [true, 'Please add a password'],
    },
    cif: {
      type: Number,
      required: [true, 'Please add a password'],
    },
    cnp: {
      type: Number,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
