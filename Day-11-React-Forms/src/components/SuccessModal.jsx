import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({ open, name, course, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="success-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="glass relative w-full max-w-md rounded-[2rem] p-8 text-center"
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-muted hover:text-fg">
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
              className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-white shadow-lg"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 id="success-title" className="text-2xl font-extrabold">You're in, {name.split(" ")[0]}!</h3>
            <p className="mt-2 text-muted">
              Your seat in <b className="text-fg">{course}</b> is reserved. We've sent the next steps to your inbox.
            </p>
            <button onClick={onClose} className="btn btn-primary mt-6 w-full">Done</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
