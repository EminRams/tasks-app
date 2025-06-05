import { useState } from "react";
import { createTask } from "../../api/task";
import Button from "../../components/Button";

export default function CreateTasks() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await createTask({
                title,
                description,
                due_date: dueDate,
            });

            // Notificacion
            alert("Tarea creada exitosamente");

            window.location.href = "/";
        } catch (err) {
            setError("Error al crear la tarea. Por favor, inténtalo de nuevo.");
        }
    };


    return (
        <div className="min-h-screen w-full flex flex-col gap-5 items-center py-12 px-4 md:px-12">
            <h1 className="text-3xl font-bold">Crear Tarea</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
            >
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="dueDate">
                        Fecha de Vencimiento
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <Button
                    type="submit"
                    value="Crear"
                />
            </form>
        </div>
    );
}