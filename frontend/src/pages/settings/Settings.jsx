import Navbar from '../../components/Navbar'
import Clients from '../../components/Clients'

function Settings() {
  return (
    <>
      <Navbar active="setari" />
      <div className="home">
        <Clients />
      </div>
    </>
  )
}

export default Settings
