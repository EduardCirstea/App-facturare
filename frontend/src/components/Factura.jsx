import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getFactura } from '../features/facturi/facturiSlice'
import { getClient } from '../features/client/clientSlice'
import Navbar from './Navbar'
import EditFactura from './EditFactura'
import { FiEdit } from 'react-icons/fi'

function Factura() {
  const [visible, setVisible] = useState(false)
  const { factura, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.facturi
  )
  const { client } = useSelector((state) => state.client)
  // const { client } = factura
  const params = useParams()
  const { facturaId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFactura(facturaId))
  }, [])
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="header-home">
          <h1 className="logo">Factura ID:{factura._id}</h1>
          <p>Data: {String(factura.data).substring(0, 10)}</p>
        </div>
        <div className="header-home">
          <h2 className="logo">Client:{client.numeFirma}</h2>
        </div>
        <button
          onClick={() => (visible ? setVisible(false) : setVisible(true))}
          className="edit-btn"
        >
          <FiEdit />
          Edit
        </button>

        {visible && <EditFactura factura={factura} />}
      </div>
    </>
  )
}

export default Factura
