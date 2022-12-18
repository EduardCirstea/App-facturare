const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Client = require('../models/clientModel')

//@desc    Get user tickets
//@route   Get /api/tickets
//@access  Private
const getClients = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const clients = await Client.find({ user: req.user.id })

  res.status(200).json(clients)
})

//@desc    Get user client
//@route   Get /api/tickets/:id
//@access  Private
const getClient = asyncHandler(async (req, res) => {
  const { numeFirma } = req.body
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const client = await Client.findById(req.params.id)
  if (!client) {
    res.status(404)
    throw new Error('Client not found')
  }

  if (client.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(client)
})

//@desc    Create new ticket
//@route   POST /api/tickets
//@access  Private
const createClient = asyncHandler(async (req, res) => {
  const { numeFirma, adresa, email, telefon, cui, cif, iban, banca } = req.body
  if (
    !numeFirma ||
    !adresa ||
    !email ||
    !telefon ||
    !cui ||
    !cif ||
    !iban ||
    !banca
  ) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const client = await Client.create({
    numeFirma,
    user: user,
    adresa,
    email,
    telefon,
    cui,
    cif,
    iban,
    banca,
  })

  res.status(201).json(client)
})

//@desc    Delete ticket
//@route   Delete /api/tickets/:id
//@access  Private
const deleteClient = asyncHandler(async (req, res) => {
  const { numeFirma } = req.body
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const client = await Client.findOne({ numeFirma })
  if (!client) {
    res.status(404)
    throw new Error('Client not found')
  }

  if (client.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await client.remove()

  res.status(200).json({ success: true })
})

//@desc    Update ticket
//@route   PUT /api/tickets/:id
//@access  Private
const updateClient = asyncHandler(async (req, res) => {
  const { numeFirma, adresa, email, telefon, cui, cif, iban, banca } = req.body
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const client = await Client.findOne({ numeFirma })
  if (!client) {
    res.status(404)
    throw new Error('Client not found')
  }

  if (client.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedClient = await Client.findOneAndUpdate(client, {
    adresa,
    email,
    telefon,
    cui,
    cif,
    iban,
    banca,
  })

  res.status(200).json(updatedClient)
})

module.exports = {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
}
