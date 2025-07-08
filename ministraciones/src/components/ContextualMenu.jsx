import { useState, useRef, useEffect } from 'react';

const ContextualMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button 
        className="btnTop mr-1" 
        title="Ver opciones"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-ellipsis-vertical px-1 text-menuIcon"></i>
      </button>

      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-91050 border border-gray-200"
        >
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <i className="fas fa-edit mr-2"></i> Modificar
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
            >
              <i className="fas fa-trash-alt mr-2"></i> Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualMenu;