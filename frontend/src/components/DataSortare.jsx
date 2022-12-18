import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newSort, reset } from '../features/sortare/sortareSlice'

function DataSortare({ visible }) {
  const sortare = useSelector((state) => state.sortare)
  const dispatch = useDispatch()
  const initialInfo = {
    an: '',
    luna: '',
    minLuna: '',
    maxLuna: '',
  }
  const [sortareInfo, setSortareInfo] = useState(initialInfo)
  const { an, luna, minLuna, maxLuna } = sortareInfo

  const onChange = (e) => {
    setSortareInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSort = () => {
    dispatch(newSort(sortareInfo))
  }
  const handleDefault = () => {
    dispatch(reset(initialInfo))
    setSortareInfo(initialInfo)
  }

  return (
    <>
      <div id="data-sortare" className="data-sortare">
        <h3>Sorteaza dupa:</h3>
        <div className="group-select">
          <label htmlFor="an">An:&nbsp;&nbsp;&nbsp;</label>
          <select name="an" value={an} onChange={onChange}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className="group-select">
          <label htmlFor="luna">Luna:</label>
          <select name="luna" value={luna} onChange={onChange}>
            <option value="01">Ianuarie</option>
            <option value="02">Februarie</option>
            <option value="03">Martie</option>
            <option value="04">Aprilie</option>
            <option value="05">Mai</option>
            <option value="06">Iunie</option>
            <option value="07">Iulie</option>
            <option value="08">August</option>
            <option value="09">Septembrie</option>
            <option value="10">Octombrie</option>
            <option value="11">Noiembrie</option>
            <option value="12">Decembrie</option>
          </select>
        </div>
        <p>sau</p>
        <div className="row-data">
          <div className="column-data">
            <label>De la </label>
            <input
              type="date"
              name="minLuna"
              value={minLuna}
              onChange={onChange}
            />
          </div>
          <div>-</div>
          <div className="column-data">
            <label>Pana la </label>
            <input
              type="date"
              value={maxLuna}
              name="maxLuna"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="center">
          <button className="btn btn-sort" onClick={handleSort}>
            Sorteaza
          </button>
          <button className="btn btn-sort" onClick={handleDefault}>
            Default
          </button>
        </div>
      </div>
    </>
  )
}

export default DataSortare
