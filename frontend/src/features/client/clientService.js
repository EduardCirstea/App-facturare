import axios from 'axios'

const API_URL = 'http://localhost:8000/api/client/'

const getClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getClient = async (numeFirma, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + numeFirma, config)
  return response.data
}

const createClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, clientData, config)
  return response.data
}

const updateClient = async (updatedClient, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + updatedClient.clientId,
    updatedClient,
    config
  )
  return response.data
}

const clientService = {
  createClient,
  getClients,
  getClient,
  updateClient,
  //   closeTicket,
}

export default clientService
