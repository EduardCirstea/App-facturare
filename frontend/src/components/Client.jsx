import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClient, deleteClient } from '../features/client/clientSlice'
import EditClient from './EditClient'
import Navbar from './Navbar'
function Client() {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()
  const { clientId } = useParams()
  const { client } = useSelector((state) => state.client)

  const handleDelete = () => {
    // dispatch(deleteClient(client))
    // Navigate('/client')
  }
  useEffect(() => {
    dispatch(getClient(clientId))
  }, [])
  return (
    <>
      <Navbar />
      <div className="home">
        <h1>Nume Client:{client.numeFirma}</h1>
        <button
          onClick={() => (visible ? setVisible(false) : setVisible(true))}
        >
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>

        {visible && <EditClient client={client} />}
      </div>
    </>
  )
}

export default Client
