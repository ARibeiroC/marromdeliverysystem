import { Outlet } from "react-router-dom"


// IMPORT COMPONENTS
import { Header } from './components/Header/Header'

// IMPORT STYLES CSS
import './css/app.css'

function App() {

  return (
    <div className="app">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>    
  )
}

export default App
