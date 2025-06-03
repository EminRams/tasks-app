import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './auth/Login'
import ViewTasks from './tasks/ViewTasks'

const isAuthenticated = () => {
  // Verificar si el usuario está autenticado
  const user = localStorage.getItem("user");

  return user;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isAuthenticated() ? <ViewTasks /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/login'
          element={!isAuthenticated() ? <Login /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App
