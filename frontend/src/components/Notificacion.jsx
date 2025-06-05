// src/components/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

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
