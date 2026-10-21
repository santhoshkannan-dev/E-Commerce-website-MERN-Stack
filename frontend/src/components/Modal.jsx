import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative glass-panel rounded-3xl border border-emerald-900/50 bg-forest-950 p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 transform transition-all">
        <button
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-forest-900/80 border border-emerald-900/50 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-forest-900 transition-colors"
          onClick={onClose}
        >
          <FaTimes className="text-xs" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
