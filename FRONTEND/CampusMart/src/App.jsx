import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import HeroSection from "./pages/landing/heroSection"
import SecondSection from "./pages/landing/2ndsection"
import Navbar from './components/navbar'
import ThirdSection from './pages/landing/3rdSection'
import FourthSection from './pages/landing/4thSection'
import EndSection from './pages/landing/endSection'
import Signup from './pages/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </main>  
    </BrowserRouter>  
  )
}

const LandingPage = ()=>{
  return(
    <>
  <HeroSection/>
  <SecondSection/>
  <ThirdSection/>
  <FourthSection/>
  <EndSection/>
  </>
  )
} 

export default App
