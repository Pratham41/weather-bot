import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Table from "./components/Table";
import Settings from "./pages/Settings";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Table />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </Dashboard>
      </BrowserRouter>
    </div>
  );
}

export const ProtectedRoute = (props) => {
  const { userInfo } = useSelector((state) => state.admin);

  if (Object.keys(userInfo).length === 0) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
};

export default App;
