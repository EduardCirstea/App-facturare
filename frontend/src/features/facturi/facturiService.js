import axios from 'axios'
import { useParams } from 'react-router-dom'

const API_URL = 'http://localhost:8000/api/facturi/'

const getFacturi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}
const getFactura = async (facturaId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + facturaId, config)
  return response.data
}

const createFactura = async (facturaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, facturaData, config)
  return response.data
}

const updateFactura = async (facturaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + facturaData.facturaId,
    facturaData,
    config
  )
  return response.data
}

const facturiService = {
  createFactura,
  getFacturi,
  getFactura,
  updateFactura,
}

export default facturiService
