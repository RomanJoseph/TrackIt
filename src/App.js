import LoginPage from "./components/login/loginPage";
import Register from "./components/login/registerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/cadastro" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
