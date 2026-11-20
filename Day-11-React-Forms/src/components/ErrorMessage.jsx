import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-500"
        >
          <AlertCircle size={14} /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
