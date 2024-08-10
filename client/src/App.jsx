import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Qr from "./pages/Qr";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import DashProfile from "./pages/DashProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/qr/:username" element={<Qr />} />
        <Route path="/profile/:username" element={<DashProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}
