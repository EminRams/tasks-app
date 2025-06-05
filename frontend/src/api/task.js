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

export const createTask = async (data) => {
    const response = await fetch(`${API_URL}/Task/Create.php`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear tarea");
    }

    return response.json();
}