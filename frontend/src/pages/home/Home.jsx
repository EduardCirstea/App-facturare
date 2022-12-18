import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { BsSearch } from 'react-icons/bs'
import { TiDocumentAdd } from 'react-icons/ti'
import { GrDocumentConfig } from 'react-icons/gr'
import { TbGasStation } from 'react-icons/tb'
import { AiOutlineCalendar } from 'react-icons/ai'
import Spinner from '../../components/Spinner'
import { Switch } from 'antd'
import './index.css'
import DataSortare from '../../components/DataSortare'
import ReactPaginates from '../../components/ReactPaginates'

function Home() {
  const [text, setText] = useState('')
  const [toggle, setToggle] = useState(false)
  const [visible, setVisible] = useState(false)

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <>
      <Navbar active="facturi" />
      <div className="home home1">
        <h2>Facturi</h2>
        <div className="search">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              className="search"
              placeholder="Cauta nume client sau numar factura"
              value={text}
              onChange={handleChange}
            />
            <button type="submit" className=" ">
              <BsSearch />
            </button>
          </form>

          <Link to="/emite">
            <div className="icon">
              <TiDocumentAdd />
              <p>Emite</p>
            </div>
          </Link>
          <Link to="/incasare">
            <div className="icon">
              <GrDocumentConfig />
              <p>Incasare</p>
            </div>
          </Link>
          <Link to="/bon-motorina">
            <div className="icon">
              <TbGasStation />
              <p>Bon motorina</p>
            </div>
          </Link>
        </div>
        <div className="row">
          <h3>Lista facturi emise</h3>
          <div className="group-row">
            <Switch
              checkedChildren="Emise"
              unCheckedChildren="Incasate"
              defaultChecked
              onClick={toggler}
            />
            <button
              className="calendar-button"
              onClick={() => {
                if (visible) {
                  setVisible(false)
                } else {
                  setVisible(true)
                }
              }}
            >
              <AiOutlineCalendar className="data " />
            </button>
            {visible && <DataSortare />}
          </div>
        </div>
        <ReactPaginates toggle={toggle} text={text} />
      </div>
    </>
  )
}

export default Home
