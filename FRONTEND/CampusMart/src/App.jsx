import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import HeroSection from "./pages/landing/heroSection";
import SecondSection from "./pages/landing/2ndsection";
import ThirdSection from "./pages/landing/3rdSection";
import FourthSection from "./pages/landing/4thSection";
import EndSection from "./pages/landing/endSection";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
import Navbar from "./components/navbar";
import ProtectedNavBar from "./components/protectedNavbar";
import Protected from "./pages/protected";
import AddListing from "./pages/addListing";
import ChatPage from "./pages/ChatPage";
import MarketPlace from "./pages/marketPlace";

function App() {
  
  
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const location = useLocation();

  const noNavbarRoutes = ["/signup", "/signin"];
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar only on Landing Page */}
      {isLandingPage && <Navbar />}

      {/* Show ProtectedNavBar only for logged-in users, except on /signup and /signin */}
      {isLoggedIn && !isLandingPage && !noNavbarRoutes.includes(location.pathname) && <ProtectedNavBar />}

      {/* Render the page content */}
      <main className="flex-grow overflow-y-scrollscrollbar-hide">
        <Routes>
          <Route path="/" element={<LandingPage className=" " />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/addListing" element={<Protected><AddListing /></Protected>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/marketPlace" element={<Protected><MarketPlace /></Protected>} />
        </Routes>
      </main>
    </div>
  );
}

const LandingPage = () => {
  return (
    <>
       <div id="hero" className="">
        <HeroSection />
      </div>
      <div id="second">
        <SecondSection />
      </div>
      <div id="third">
        <ThirdSection />
      </div>
      <div id="fourth">
        <FourthSection />
      </div>
      <div id="end">
        <EndSection />
      </div>
    </>
  );
};

export default App;
