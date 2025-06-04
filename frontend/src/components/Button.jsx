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