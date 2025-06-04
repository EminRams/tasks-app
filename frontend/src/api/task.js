import { API_URL } from "../../constants";

export const getTasks = async () => {

    const response = await fetch(`${API_URL}/Task/Index.php`, {
        method: 'GET',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener tareas");
    }

    return response.json();
}