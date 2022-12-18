import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Spinner from '../../components/Spinner'
import './index.css'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    //Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, message, isSuccess, user, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
    Cookies.set('user', JSON.stringify(userData))
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <h1 className="logo">SuperDev</h1>
      <div className="container">
        <h2 className="title">Hello again!</h2>
        <h3>Genereaza o factura in doar cateva click-uri</h3>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                name="email"
                id="email"
                onChange={onChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                name="password"
                id="password"
                onChange={onChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <button id="mt-6" className="btn btn-transparent btn-block">
                Login
              </button>
            </div>
          </form>
        </section>
        <div className="line">sau</div>
        <p>
          Poti sa devii membru <a href="#">aici.</a>
        </p>
      </div>
    </>
  )
}

export default Login
