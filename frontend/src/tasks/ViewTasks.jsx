import { logout } from "../api/auth";

function ViewTasks() {
    return (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors dark:text-gray-200">
            <h1>Logeado</h1>
            <p>Bienvenido, {JSON.parse(localStorage.getItem("user")).username}!</p>

            <button
                onClick={() => {
                    logout();
                    // redireccionar a la página de login
                    window.location.href = "/login";
                }}
                className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cerrar sesión
            </button>
        </div>
    )
}

export default ViewTasks;