import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Factura from './components/Factura'
import Client from './components/Client'
import EmiteFactura from './pages/emiteFactura/EmiteFactura'
import FacturiAutomate from './pages/facturiAutomate/FacturiAutomate'
import Rapoarte from './pages/rapoarte/Rapoarte'
import Settings from './pages/settings/Settings'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './pages/pagenotfound/PageNotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} exact />
          </Route>
          <Route path="/facturi/:facturaId" element={<PrivateRoute />}>
            <Route path="/facturi/:facturaId" element={<Factura />} />
          </Route>
          <Route path="/client/:clientId" element={<PrivateRoute />}>
            <Route path="/client/:clientId" element={<Client />} />
          </Route>
          <Route path="/facturi-automate" element={<PrivateRoute />}>
            <Route
              path="/facturi-automate"
              element={<FacturiAutomate />}
              exact
            />
          </Route>
          <Route path="/rapoarte" element={<PrivateRoute />}>
            <Route path="/rapoarte" element={<Rapoarte />} exact />
          </Route>

          <Route path="/emite" element={<PrivateRoute />}>
            <Route path="/emite" element={<EmiteFactura />} exact />
          </Route>
          <Route path="/settings" element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} exact />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
