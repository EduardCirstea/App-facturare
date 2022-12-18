import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getClients } from '../features/client/clientSlice'
function Clients() {
  const { clients, client } = useSelector((state) => state.client)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getClients())
  }, [dispatch])
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nume Client</th>
              <th>Interval</th>
              <th>Suma</th>
              <th>Edit Client</th>
            </tr>
          </thead>
          {clients.map((edit) => (
            <tbody key={edit._id}>
              <tr>
                <td>{edit.numeFirma}</td>
                <td>{edit.cui}</td>
                <td>{edit.cif}</td>
                <td>
                  <button onClick={() => navigate(`/client/${edit._id}`)}>
                    View client
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div>{client.numeFirma}</div>
    </>
  )
}

export default Clients
