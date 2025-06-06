import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente Notificacion PopUp reutilizable puede ser utilizado luego de una accion para mostrar informacion al usuario.
 *
 * @component
 * @param {message} props.message - Mensaje a mostrar.
 * 
 * @description
 *  * Notas de uso:
 * - Para ocultar automáticamente la notificación después de un tiempo, implementa un temporizador usando useEffect en el componente padre.
 * 
 * Ejemplo de uso:
 * 
 * function App() {
 *   const [mensaje, setNotificationMessage] = useState("");
*
*   useEffect(() => {
*     if (mensaje) {
*       const timer = setTimeout(() => setNotificationMessage(""), 3000);
*       return () => clearTimeout(timer);
*     }
*   }, [mensaje]);
 * 
 * @example
 * <Notification
 *    message={"Tarea Creada."}
 * />
 */


export default function Notification({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="fixed top-3 right-5 z-50 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-md border border-gray-800 shadow-lg"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
