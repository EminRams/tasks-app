import { API_URL } from "../../constants"

export const login = async (data) => {
    const response = await fetch(`${API_URL}/Auth/Login.php`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al iniciar sesión");
    }

    return response.json();
}

export const register = async (data) => {
    const response = await fetch(`${API_URL}/Auth/Register.php`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar usuario");
    }

    return response.json();
}

export const logout = async () => {
    const response = await fetch(`${API_URL}/Auth/Logout.php`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al cerrar sesión");
    }

    // Eliminar el token del usuario
    localStorage.removeItem("user");

    return response.json();
}

export const checkSession = async () => {
    const response = await fetch(`${API_URL}/Auth/CheckSession.php`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Sesión no válida");
    }

    return response.json();
};
