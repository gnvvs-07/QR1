// routing libraries
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Qr from "./pages/Qr";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    // routing
    <BrowserRouter>
      <Routes>
        {/* page and path with each route */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/qr" element={<Qr />} />
      </Routes>
    </BrowserRouter>
  )
}
