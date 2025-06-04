import { useState, useEffect } from "react";
import { getTasks } from "../../api/task";
import Button from "../../components/Button";

export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const tasksData = await getTasks();

                setTasks(tasksData);
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
                setError("Error al obtener las tareas");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();

    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col gap-5 items-center py-12 px-4 md:px-12">
            <div className="w-full flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Tus Tareas</h1>
                <a href="/create-task">
                    <Button
                        value={"Crear"}
                    />
                </a>
            </div>

            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && tasks.length === 0 && (
                <p className="text-gray-500">No hay tareas registradas.</p>
            )}

            {!error && (
                <div className="w-full overflow-x-auto rounded-xl shadow">
                    <table className="w-full min-w-[600px] table-auto rounded-xl overflow-hidden text-left">
                        <thead className="bg-gray-100 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-2">Título</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className="px-4 py-2">Fecha de Creación</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id} className="border-t dark:border-gray-600">
                                    <td className="px-4 py-2">{task.title}</td>
                                    <td className="px-4 py-2">{task.description}</td>
                                    <td className="px-4 py-2">{new Date(task.due_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        <Button
                                            color="bg-red-500"
                                            hoverColor="hover:bg-red-700"
                                            value="Eliminar"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}