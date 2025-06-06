import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../../api/task";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Notification from "../../components/Notification";

export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(5);

    // Calcular tareas a mostrar
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTasksPerPageChange = (e) => {
        setTasksPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(taskToDelete.id);
            setTasks(tasks.filter(task => task.id !== taskToDelete.id));
            setNotificationMessage("🗑️ Tarea Eliminada.")
            setShowModal(false);
            setTaskToDelete(null);
        } catch (error) {
            setNotificationMessage("❌ Error al Eliminar.");
        }
    }

    function handleClickOutsideModal(e) {
        if (!e.target.closest("#delete-modal")) setShowModal(false);
    }

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

        if (notificationMessage) {
            const timer = setTimeout(() => setNotificationMessage(null), 3000);
            return () => clearTimeout(timer);
        }

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutsideModal);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        }
        return () => document.removeEventListener("mousedown", handleClickOutsideModal);


    }, [notificationMessage, showModal]);

    return (
        <div className="min-h-screen w-full flex flex-col gap-5 items-center py-12 px-4 md:px-12">
            <Notification message={notificationMessage} />

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

            {!error && tasks.length > 0 && (
                <>
                    <div className="w-full overflow-x-auto rounded-md shadow">
                        <table className="w-full min-w-[600px] table-auto rounded-md overflow-hidden text-left">
                            <thead className="bg-gray-100 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-2">Título</th>
                                    <th className="px-4 py-2">Descripción</th>
                                    <th className="px-4 py-2">Fecha Limíte</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTasks.map((task) => (
                                    <tr key={task.id} className="border-t dark:border-gray-600">
                                        <td className="px-4 py-2">{task.title}</td>
                                        <td className="px-4 py-2">{task.description}</td>
                                        <td className="px-4 py-2">{new Date(task.due_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">
                                            <Button
                                                color="bg-red-500"
                                                hoverColor="hover:bg-red-700"
                                                value={"Eliminar"}
                                                onClick={() => {
                                                    setTaskToDelete(task);
                                                    setShowModal(true);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 bg-black opacity-40"></div>
                            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-md shadow-xl max-w-md w-full" id="delete-modal">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">¿Eliminar Tarea?</h2>
                                <p className="mb-6 text-gray-700 dark:text-gray-300">
                                    ¿Estás seguro de eliminar este registro?
                                </p>
                                <div className="flex justify-end gap-4">
                                    <Button
                                        value="Cancelar"
                                        color="bg-gray-500"
                                        hoverColor="hover:bg-gray-700"
                                        onClick={() => {
                                            setShowModal(false);
                                            setTaskToDelete(null);
                                        }}
                                    />
                                    <Button
                                        value="Eliminar"
                                        color="bg-red-500"
                                        hoverColor="hover:bg-red-700"
                                        onClick={handleDelete}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        tasksPerPage={tasksPerPage}
                        onTasksPerPageChange={handleTasksPerPageChange}
                    />
                </>
            )}
        </div>
    )
}