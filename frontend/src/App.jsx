import { BrowserRouter, Route, Routes, Navigate, Router } from "react-router-dom";
import { useEffect } from "react";
import Login from './pages/auth/Login';
import ViewTasks from './pages/tasks/ViewTasks';
import Layout from "./components/Layout";
import { checkSession } from "./api/auth";
import CreateTasks from "./pages/tasks/CreateTasks";
import Register from "./pages/auth/Register";

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

    // Verificar si el usuario está autenticado al cargar la aplicación
    checkSession()
      .catch(() => {
        localStorage.removeItem("user");
      });

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={isAuthenticated() ? <ViewTasks /> : <Navigate to="/login" replace />}
          />
          <Route
            path='/create-task'
            element={isAuthenticated() ? <CreateTasks /> : <Navigate to="/login" replace />}
          />
        </Route>
        <Route
          path='/login'
          element={!isAuthenticated() ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!isAuthenticated() ? <Register /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App
