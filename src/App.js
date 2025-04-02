import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./screens/Home";
import Update from "./screens/Update";
import Login from "./screens/Login";
import Account from "./screens/Account";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";
import { History } from "./screens/History";

function App() {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("session"))?.SessionId.toString() || ""
  );
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  if (!token) {
    return (
      <AuthProvider>
        <Login setToken={setToken} />
      </AuthProvider>
    );
  }
  return (
    <div>
      <div className="App" style={{ backgroundColor: "white" }}>
        <AuthProvider>
          <Router>
            <TopNavigation setToken={setToken} />
            <main>
              <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route
                  path="/"
                  element={
                    <Home
                      data={data}
                      setData={setData}
                      setSearchField={setSearchField}
                      setSearchValue={setSearchValue}
                      searchField={searchField}
                      searchValue={searchValue}
                    />
                  }
                />
                <Route path="/account" element={<Account />} />
                <Route
                  path="/update"
                  element={
                    <Update
                      data={data}
                      searchField={searchField}
                      searchValue={searchValue}
                    />
                  }
                />
                <Route
                  path="/history"
                  element={<History setToken={setToken} />}
                />
              </Routes>
            </main>
          </Router>
        </AuthProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
