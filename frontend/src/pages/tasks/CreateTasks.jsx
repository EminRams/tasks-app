import { useState, useEffect } from "react";
import { createTask } from "../../api/task";
import Button from "../../components/Button";
import Notificacion from "../../components/Notificacion";

export default function CreateTasks() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await createTask({
                title,
                description,
                due_date: dueDate,
            });

            // Enviar notificacion
            setNotificationMessage("✅ Tarea Creada.");
            setTitle("");
            setDescription("");
            setDueDate("");

        } catch (err) {
            setError("Error al Crear la Tarea.");
            setNotificationMessage("❌" + error);
        }

    };

    // Eliminar la notificacion despues de 3 segundos
    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => setNotificationMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notificationMessage]);


    return (
        <div className="min-h-screen w-full flex flex-col gap-5 items-center py-12 px-4 md:px-12">
            <Notificacion message={notificationMessage} />

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
                        maxLength={255}
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
                        min={new Date().toISOString().split("T")[0]} // Evitar fechas anteriores a hoy
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        value="Crear"
                    />
                    <a href="/">
                        <Button
                            value="Volver"
                            color="bg-gray-500"
                            hoverColor="hover:bg-gray-700"
                            type="button"
                        />
                    </a>
                </div>
            </form>
        </div>
    );
}