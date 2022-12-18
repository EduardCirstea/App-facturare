import { useEffect, useState } from 'react'
import { getClients, getClient } from '../features/client/clientSlice'
import { updateFactura } from '../features/facturi/facturiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'antd'
import 'antd/dist/antd.min.css'
import { nanoid } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

function EditFactura({ factura }) {
  const [numeClient, setClient] = useState(factura.client.numeFirma)
  const [inputList, setInputList] = useState(factura.produse)
  const [toggle, setToggle] = useState(false)
  const [{ emise, incasate }, setEmise] = useState({
    emise: factura.emise,
    incasate: factura.incasate,
  })
  const { clients, client, isLoading, isSucces } = useSelector(
    (state) => state.client
  )
  const [tva, setTva] = useState(factura.tva)

  let [pretTotal, setPretTotal] = useState(factura.pretTotal)
  const [pretType, setPretType] = useState(factura.pretType)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClients())
  }, [])

  const toggler = () => {
    if (toggle) {
      setToggle(false)
      setEmise({ emise: true, incasate: false })
    } else {
      setToggle(true)
      setEmise({ emise: false, incasate: true })
    }
  }

  const handleRemove = async (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
    var pretTotal = 0
    list.map((produs) => {
      let prev = Number(produs.pret)
      let cantitate = Number(produs.cantitate)
      pretTotal = pretTotal + prev * cantitate
      setPretTotal(pretTotal)
    })
  }
  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
    var pretTotal = 0
    list.forEach((produs) => {
      let prev = Number(produs.pret)
      let cantitate = Number(produs.cantitate)
      pretTotal = pretTotal + prev * cantitate
      setPretTotal(pretTotal)
    })
  }

  const handleAdd = (e) => {
    setInputList([
      ...inputList,
      { servicii: '', unitati: '', cantitate: '', pret: '', id: nanoid() },
    ])
    e.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    inputList.map((list) => {
      if (
        list.servicii === '' ||
        list.unitati === '' ||
        list.pret === '' ||
        list.cantitate === ''
      ) {
        toast.error('Please complete all fields')
      }
    })
    const pretTva = (pretTotal * tva) / 100

    const updatedFactura = {
      numeFirma: numeClient,
      facturaId: factura._id,
      produse: inputList,
      emise: emise,
      incasate: incasate,
      pretType,
      tva: Number(tva),
      pretTotal,
      pretTva,
    }

    dispatch(updateFactura(updatedFactura))
  }

  return (
    <form className="my-20" onSubmit={handleSubmit}>
      <label htmlFor="nume">Select Client: </label>
      <select
        className="select-client"
        type="text"
        name="client"
        value={numeClient}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Nume client"
      >
        {clients.map((client) => (
          <option key={client._id} value={client.numeFirma}>
            {client.numeFirma}
          </option>
        ))}
      </select>
      <div className="inline">
        <Switch
          checkedChildren="Emisa"
          unCheckedChildren="Incasata"
          defaultChecked
          onClick={toggler}
        />
      </div>
      <div className="row-prettva">
        <div>
          <label htmlFor="pretType">Alege valuta: </label>
          <select
            name="pretType"
            value={pretType}
            onChange={(e) => setPretType(e.target.value)}
          >
            <option value="lei">Lei</option>
            <option value="euro">Euro</option>
            <option default hidden value={pretType}>
              {pretType}
            </option>
            <option value="lire">Lira</option>
            <option value="usd">Usd</option>
          </select>
        </div>

        <div>
          <label htmlFor="tva">Tva: </label>
          <input
            name="tva"
            type="number"
            onChange={(e) => setTva(e.target.value)}
            placeholder={tva}
          />{' '}
          %
        </div>
      </div>
      <div className="input-list">
        {inputList.map((produse, i) => (
          <div key={i}>
            <div className="form-grup">
              <label htmlFor="">Servicii: </label>
              <input
                type="text"
                name="servicii"
                value={produse.servicii}
                placeholder={produse.servicii}
                onChange={(e) => handleinputchange(e, i)}
              />
            </div>
            <div className="form-grup">
              <label htmlFor="unitati">Unitati: </label>
              <select
                type="text"
                name="unitati"
                value={produse.unitati}
                placeholder={produse.unitati}
                onChange={(e) => handleinputchange(e, i)}
              >
                <option default value="u.m." hidden>
                  u.m.
                </option>
                <option value="bucati">Bucati</option>
                <option value="ore">Ore</option>
              </select>
            </div>
            <div className="form-grup">
              <label htmlFor="cantitate">Cantitate: </label>
              <input
                type="text"
                name="cantitate"
                value={produse.cantitate}
                onChange={(e) => handleinputchange(e, i)}
                placeholder={produse.cantitate}
              />
            </div>
            <div className="form-grup">
              <label htmlFor="pret">Pret: </label>
              <input
                type="text"
                name="pret"
                value={produse.pret}
                onChange={(e) => handleinputchange(e, i)}
                placeholder={produse.pret}
              />
            </div>
            <div className="form-grup">
              <button
                className="deleteBtn"
                onClick={(index) => handleRemove(index)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="add">
        <button className="addBtn" onClick={handleAdd}>
          +
        </button>
      </div>
      <div className="button-row">
        <div className="pret">
          <p>
            Pret fara tva:{(pretTotal - (pretTotal * tva) / 100).toFixed(2)}
          </p>
          <p>Pret tva: {(pretTotal * tva) / 100}</p>
          <p>Pret total: {pretTotal}</p>
        </div>
      </div>
      <div className="grid-center">
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default EditFactura
