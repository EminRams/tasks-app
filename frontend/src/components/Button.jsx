/**
 * Componente Boton reutilizable con estilos predefinidos utilizado en formularios o para navegar entre rutas.
 *
 * @component
 * @param {value} props.value - Mensaje a mostrar.
 * @param {color} props.color - Color de fondo
 * @param {hoverColor} props.hoverColor - Color al pasar el ratón por encima.
 *
 * @description
 * De ser utilizado para navegación, debe envolverse entre un elemento <a></a> especificando la ruta en dicho elemento.
 * Los colores a utilizar deben ser solamente clases de TailwindCSS. Ejemplo: bg-blue-500
 * 
 * @example
 * <Notification
 *    message={notificationMessage}
 * />
 */


export default function Button({ value, ...props }) {
    const { color = "bg-blue-500", hoverColor = "hover:bg-blue-700" } = props; // aplicar solamente clases de tailwind
    const className = `${color} ${hoverColor} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${props.className || ""}`;

    return (
        <button
            {...props}
            className={className}
        >
            {value}
        </button>
    )
} 