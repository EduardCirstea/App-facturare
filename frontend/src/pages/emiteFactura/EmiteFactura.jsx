import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getClients, getClient } from '../../features/client/clientSlice'
import { createFactura } from '../../features/facturi/facturiSlice'
import './index.css'
import axios from 'axios'
import RegisterClient from '../../components/RegisterClient'
import Navbar from '../../components/Navbar'
import { saveAs } from 'file-saver'
import PdfTemplate from '../../components/PdfTemplate'
import { useNavigate } from 'react-router-dom'
import { Document, Page } from 'react-pdf'

function EmiteFactura() {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [visiblePdf, setVisiblePdf] = useState(false)
  const [tva, setTva] = useState(19)
  let [pretTotal, setPretTotal] = useState(0)
  const [pretType, setPretType] = useState('lei')
  const [inputList, setInputList] = useState([
    {
      servicii: '',
      unitati: '',
      cantitate: 0,
      pret: 0,
    },
  ])
  const { clients, client, isLoading, isSucces } = useSelector(
    (state) => state.client
  )
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = async (e) => {
    setValue(e.target.value)
    clients.map((client) => {
      if (e.target.value === client.numeFirma) {
        console.log(e.target.value)
        dispatch(getClient(client._id))
      }
    })
  }

  const handleRemove = async (index) => {
    const list = [...inputList]
    list.splice(index, 1)
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
    e.preventDefault()

    setInputList([
      ...inputList,
      { servicii: '', unitati: '', cantitate: '', pret: '' },
    ])
  }
  const handleVisible = (e) => {
    e.preventDefault()
    setVisible(true)
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm)
    clients.map((client) => {
      if (searchTerm === client.numeFirma) {
        dispatch(getClient(client._id))
      }
    })
  }

  const handleinputchange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
    var pretTotal = 0
    list.map((produs) => {
      let prev = Number(produs.pret)
      let cantitate = Number(produs.cantitate)
      pretTotal = pretTotal + prev * cantitate
      setPretTotal(pretTotal)
    })
  }

  useEffect(() => {
    dispatch(getClients())
  }, [])
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  var pdf

  const handleSubmit = (e) => {
    e.preventDefault()

    const pretTva = (pretTotal * tva) / 100

    console.log(client._id)
    const facturaData = {
      clientId: client._id,
      produse: inputList,
      data: new Date(),
      emise: true,
      incasate: false,
      pretType,
      tva: Number(tva),
      pretTotal,
      pretTva,
    }

    console.log(facturaData)
    dispatch(createFactura(facturaData))

    setVisiblePdf(true)

    axios
      .get('http://localhost:8000/api/facturi/download-pdf', {
        responseType: 'blob',
      })

      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        pdf = URL.createObjectURL(pdfBlob)
      })
  }
  const generateFactura = (e) => {
    e.preventDefault()
    const pretTva = (pretTotal * tva) / 100
    const token = user.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const facturaData = {
      user: user,
      clientId: client._id,
      produse: inputList,
      data: new Date(),
      emise: true,
      incasate: false,
      pretType,
      tva: Number(tva),
      pretTotal,
      pretTva,
    }
    axios
      .post('http://localhost:8000/api/facturi/create-pdf', facturaData, config)
      .then(() =>
        axios.get('http://localhost:8000/api/facturi/download-pdf', {
          responseType: 'blob',
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        saveAs(pdfBlob, 'Factura.pdf')
      })
  }

  return (
    <>
      <Navbar />
      {visible && <RegisterClient setVisible={setVisible} />}
      <div className="home">
        <h2>Generare factura noua</h2>

        <p>
          Pentru generarea unei facturi noi, avem nevoie de urmatoarele
          informatii:
        </p>
        <form className="search12" onSubmit={handleSubmit}>
          <label htmlFor="nume">Nume client</label>
          <div className="search1">
            <input
              type="text"
              name="nume"
              id="nume"
              value={value}
              onChange={handleChange}
            />

            <div className="dropdown">
              {clients
                .filter((item) => {
                  const searchTerm = value.toLowerCase()
                  const fullName = item.numeFirma.toLowerCase()

                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  )
                })
                .slice(0, 10)
                .map((item) => (
                  <div
                    onClick={() => onSearch(item.numeFirma)}
                    className="dropdown-row"
                    key={item._id}
                  >
                    {item.numeFirma}
                  </div>
                ))}
            </div>

            <button className="open_signup" onClick={handleVisible}>
              Client nou
            </button>
          </div>
          <div className="row-prettva">
            <div>
              <label htmlFor="pretType">Alege valuta: </label>
              <select
                name="pretType"
                value={pretType}
                onChange={(e) => setPretType(e.target.value)}
              >
                <option default value="lei">
                  Lei
                </option>
                <option value="euro">Euro</option>
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
                placeholder="Enter Tva"
              />{' '}
              %
            </div>
          </div>
          {inputList.map((x, i) => (
            <div key={i}>
              <div className="select-input">
                <div>
                  <label>Denumirea serviciilor/produselor</label>
                  <input
                    type="text"
                    name="servicii"
                    id="servicii"
                    placeholder="Denumirea serviciilor/produselor"
                    onChange={(e) => handleinputchange(e, i)}
                  />
                </div>
                <div>
                  <label htmlFor="unitati">Unitati de masura</label>
                  <select
                    name="unitati"
                    id="unitati"
                    onChange={(e) => handleinputchange(e, i)}
                    defaultValue="u.m."
                  >
                    <option value="u.m." default hidden>
                      u.m.
                    </option>
                    <option value="bucati">Bucati</option>
                    <option value="ore">Ore</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cantitate">Cantitate</label>
                  <input
                    type="number"
                    name="cantitate"
                    id="cantitate"
                    placeholder="Cantitate"
                    onChange={(e) => handleinputchange(e, i)}
                  />
                </div>
                <div>
                  <label htmlFor="pret">Pret unitar</label>
                  <input
                    type="number"
                    name="pret"
                    id="pret"
                    placeholder="Pret unitar"
                    onChange={(e) => handleinputchange(e, i)}
                  />
                </div>

                {inputList.length !== 1 && (
                  <div>
                    <button className="delete-btn" onClick={handleRemove}>
                      -
                    </button>
                  </div>
                )}
                {inputList.length - 1 === i && (
                  <div>
                    <button onClick={handleAdd}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="button-row">
            <div className="pret">
              <p>
                Pret fara tva:{(pretTotal - (pretTotal * tva) / 100).toFixed(2)}
              </p>
              <p>Pret tva: {(pretTotal * tva) / 100}</p>
              <p>Pret total: {pretTotal}</p>
            </div>
            <div>
              <button onClick={handleSubmit}>Preview factura</button>
              <button onClick={generateFactura}>Download</button>
              <button onClick={() => navigate('/')}>Inapoi</button>
            </div>
          </div>
        </form>
        {visiblePdf && (
          <div className="blur">
            <div className="container-pdf">
              <i className="exit_icon" onClick={() => setVisiblePdf(false)}>
                x
              </i>
              <div className="content-pdf">
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
              <div className="button-row">
                <button>Emite</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EmiteFactura
