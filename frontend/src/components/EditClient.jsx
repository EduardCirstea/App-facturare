import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { updateClient } from '../features/client/clientSlice'
function EditClient({ client }) {
  const [formData, setFormData] = useState({
    numeFirma: client.numeFirma,
    adresa: client.adresa,
    telefon: client.telefon,
    email: client.email,
    cui: client.cui,
    cif: client.cif,
    banca: client.banca,
    iban: client.iban,
  })
  const { numeFirma, adresa, telefon, email, cui, cif, banca, iban } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.client
  )
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }
  //   if (isSuccess) {
  //     dispatch(reset)
  //   }
  //   dispatch(reset)
  // }, [dispatch, isError, isSuccess, message, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedClient = {
      clientId: client._id,
      numeFirma,
      adresa,
      telefon,
      email,
      cui,
      cif,
      banca,
      iban,
    }
    dispatch(updateClient(updatedClient))
  }
  return (
    <section className="edit-client">
      <form className="register_form" onSubmit={handleSubmit}>
        <label htmlFor="numeFirma">Nume Firma</label>
        <input
          type="text"
          name="numeFirma"
          placeholder="Nume Firma"
          value={numeFirma}
          onChange={onChange}
        />
        <label htmlFor="adresa">Adresa</label>
        <input
          type="text"
          name="adresa"
          placeholder="Adresa"
          value={adresa}
          onChange={onChange}
        />
        <label htmlFor="telefon">Telefon</label>
        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          value={telefon}
          onChange={onChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="cui">CUI</label>
        <input
          type="text"
          name="cui"
          placeholder="CUI"
          value={cui}
          onChange={onChange}
        />
        <label htmlFor="cif">CIF</label>
        <input
          type="text"
          name="cif"
          placeholder="CIF"
          value={cif}
          onChange={onChange}
        />
        <label htmlFor="banca">Banca</label>
        <input
          type="text"
          name="banca"
          placeholder="Banca"
          value={banca}
          onChange={onChange}
        />
        <label htmlFor="iban">IBAN</label>
        <input
          type="text"
          name="iban"
          placeholder="IBAN"
          value={iban}
          onChange={onChange}
        />

        <button className="btn-register">Adauga</button>
      </form>
    </section>
  )
}

export default EditClient
