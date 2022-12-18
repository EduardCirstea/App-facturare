const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const Facturi = require('../models/facturiModel')

const pdf = require('html-pdf')
const pdfTemplate = require('../documents')

const getFacturi = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const facturi = await Facturi.find({ user: req.user.id })
  res.status(200).json(facturi)
})

const getFactura = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const factura = await Facturi.findById(req.params.id)
  if (!factura) {
    res.status(404)
    throw new Error('Factura not found')
  }

  if (factura.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(factura)
})

const createFactura = asyncHandler(async (req, res) => {
  const {
    clientId,
    produse,
    data,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  } = req.body
  if (!produse || !data || !pretType || !tva || !pretTotal || !pretTva) {
    res.status(400)
    throw new Error('Please add all necersary data')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const client = await Client.findById(clientId)
  const factura = await Facturi.create({
    user: req.user.id,
    client: client,
    produse,
    data,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  })

  res.status(201).json(factura)
})

const updateFactura = asyncHandler(async (req, res) => {
  const {
    facturaId,
    numeFirma,
    produse,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  } = req.body
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const factura = await Facturi.findById(req.params.id)
  if (!factura) {
    res.status(404)
    throw new Error('factura not found')
  }

  if (factura.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedFactura = await Client.findByIdAndUpdate(factura, {
    numeFirma,
    produse,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  })

  res.status(200).json(updatedFactura)
})

const deleteFactura = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const factura = await Facturi.findById(req.params.id)
  if (!factura) {
    res.status(404)
    throw new Error('Facturi not found')
  }

  if (factura.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await factura.remove()

  res.status(200).json({ success: true })
})

const createPdf = async (req, res) => {
  const {
    user,
    clientId,
    produse,
    data,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  } = req.body

  const user1 = await User.findById(user._id)
  const client = await Client.findById(clientId)

  // const user = {
  //   name: 'marian',
  //   cnp: '2222',
  //   cif: '2222',
  //   tel: '0232',
  //   banca: 'bcr',
  //   iban: '2222',
  // }
  console.log(user1)
  const factura = {
    user: user1,
    client: client,
    produse,
    data,
    emise,
    incasate,
    pretType,
    tva,
    pretTotal,
    pretTva,
  }

  pdf
    .create(pdfTemplate(factura), {})
    .toFile('backend/controllers/docs/result.pdf', (err) => {
      if (err) {
        res.send(Promise.reject())
      }

      res.send(Promise.resolve())
    })
}
const downloadFactura = asyncHandler(async (req, res) => {
  res.sendFile(`${__dirname}/docs/result.pdf`)
})

module.exports = {
  createFactura,
  getFacturi,
  getFactura,
  deleteFactura,
  updateFactura,
  createPdf,
  downloadFactura,
}
