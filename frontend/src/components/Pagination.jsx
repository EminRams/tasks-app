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