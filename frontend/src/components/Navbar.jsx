import { Link } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiLogOutCircle, BiHomeAlt } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

function Navbar({ active }) {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onLogout() {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <div className="sidebar">
        <h1 className="logo">SuperDev</h1>

        <ul>
          <Link to="/" className={active === 'facturi' ? 'active' : null}>
            <BiHomeAlt /> Facturi
          </Link>
          <Link
            to="/facturi-automate"
            className={active === 'facturi-automate' ? 'active' : null}
          >
            <AiOutlineCalendar /> Facturi automate
          </Link>
          <Link
            to="/rapoarte"
            className={active === 'rapoarte' ? 'active' : null}
          >
            <FaListUl /> Rapoarte
          </Link>
          <Link
            to="/settings"
            className={active === 'setari' ? 'active' : null}
          >
            <IoSettingsOutline /> Setari
          </Link>
          <li>
            <button onClick={onLogout} className="btn btn-logout">
              <BiLogOutCircle /> Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
