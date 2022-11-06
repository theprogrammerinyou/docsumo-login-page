import "./App.css";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { RequiresAuth } from "./utils/RequiresAuth";
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequiresAuth>
                <Home />
              </RequiresAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
