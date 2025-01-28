import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import HeroSection from "./pages/landing/heroSection"
import SecondSection from "./pages/landing/2ndsection"
import Navbar from './components/navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
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
  </>
  )
} 

export default App
