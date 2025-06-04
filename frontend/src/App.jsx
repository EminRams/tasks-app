import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import ViewTasks from './pages/tasks/ViewTasks';
import Layout from "./components/Layout";
import { useEffect } from "react";

const isAuthenticated = () => {
  // Verificar si el usuario está autenticado
  const user = localStorage.getItem("user");

  return user;
}

function App() {
  useEffect(() => {
    
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={isAuthenticated() ? <ViewTasks /> : <Navigate to="/login" replace />}
          />
        </Route>
        <Route
          path='/login'
          element={!isAuthenticated() ? <Login /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App
