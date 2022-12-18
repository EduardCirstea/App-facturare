import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { reset, getFacturi } from '../features/facturi/facturiSlice'
import ReactPaginate from 'react-paginate'
import 'antd/dist/antd.css'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

function ReactPaginates({ toggle, text }) {
  const { facturi, isLoading, isSuccess } = useSelector(
    (state) => state.facturi
  )
  const { an, luna, minLuna, maxLuna } = useSelector((state) => state.sortare)

  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const usersPerPage = 10
  const pagesVisited = pageNumber * usersPerPage
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  useEffect(() => {
    dispatch(getFacturi())
  }, [dispatch])

  const changePage = ({ selected }) => {
    setPageNumber(selected)
    const newOffset = (selected * usersPerPage) % facturi.length
    setItemOffset(newOffset)
  }

  const clientEmise = facturi.filter((factura) => factura.emise === true)

  const clientAfisate = facturi.filter((factura) => factura.emise === false)

  let fakeClient = toggle ? clientAfisate : clientEmise

  const pageCount = Math.ceil(fakeClient.length / usersPerPage)

  let facturaFinala
  if (luna && !an) {
    facturaFinala = fakeClient.filter(
      (factura) => String(factura.data).substring(5, 7) === luna
    )
  } else if (an && !luna) {
    facturaFinala = fakeClient.filter(
      (factura) => String(factura.data).substring(0, 4) === an
    )
  } else if (an && luna) {
    facturaFinala = fakeClient.filter(
      (factura) =>
        String(factura.data).substring(5, 7) === luna &&
        String(factura.data).substring(0, 4) === an
    )
  } else {
    facturaFinala = fakeClient
  }

  const displayUsers = facturaFinala
    .filter((factura) => {
      if (text === '') {
        return factura
      } else if (
        factura.client.numeFirma.toLowerCase().includes(text.toLowerCase())
      ) {
        return factura
      }
    })
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((factura) => {
      return (
        <tr key={factura._id}>
          <td>
            <Link to={`/facturi/${factura._id}`}>
              {factura.client.numeFirma}
            </Link>
          </td>
          <td>{String(factura.data).substring(0, 10)}</td>
          <td>
            {factura.pretTotal} {factura.pretType}
          </td>
        </tr>
      )
    })
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nume Client</th>
            <th>Interval</th>
            <th>Suma</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>
      <ReactPaginate
        previousLabel={<AiOutlineArrowLeft />}
        nextLabel={<AiOutlineArrowRight />}
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default ReactPaginates
