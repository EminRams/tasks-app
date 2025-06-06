/**
 * Componente de paginacion y limitacion de resultados para las tablas reutilizable.
 *
 * @component
 * @param {number} props.currentPage - Número de pagina activa.
 * @param {number} props.totalPages - Total de paginas disponibles.
 * @param {function} props.onPageChange - Función callback llamada con el nuevo número de página cuando se selecciona una página.
 * @param {number} props.tasksPerPage - Número actual de tareas mostradas por página.
 * @param {function} props.onTasksPerPageChange - Función callback llamada cuando se cambia el número de tareas por página.
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={5}
 *   onPageChange={handlePageChange}
 *   tasksPerPage={10}
 *   onTasksPerPageChange={handleTasksPerPageChange}
 * />
 */

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    tasksPerPage,
    onTasksPerPageChange,
}) {
    const tasksPerPageOptions = [5, 10, 20, 50];

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
            <div className="flex items-center gap-1 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-900">
                <label htmlFor="tasksPerPage">Mostrar </label>
                <select
                    id="tasksPerPage"
                    value={tasksPerPage}
                    onChange={onTasksPerPageChange}
                    className="dark:bg-gray-900"
                >
                    {tasksPerPageOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}