import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./components/GlobalStyle";
import UserContext from "./components/contexts/userContext";
import LoginPage from "./components/login/loginPage";
import Register from "./components/login/registerPage";
import Today from "./components/loged/today";
import Habits from "./components/loged/habits";
import History from "./components/loged/history";
import BarContext from "./components/contexts/todayBar";

function App() {
  const [user, setUser] = useState()
  const [bar, setBar] = useState()

  return (
    <>
      <GlobalStyle />
      <BarContext.Provider value={{ bar, setBar }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/hoje" element={<Today />} />
              <Route path="/habitos" element={<Habits />} />
              <Route path="/historico" element={<History />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </BarContext.Provider>
    </>
  );
}
export default App;
