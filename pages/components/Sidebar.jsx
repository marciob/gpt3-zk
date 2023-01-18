import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-800 h-screen w-64 fixed top-0 left-0">
      <nav className="flex flex-col h-full">
        <div className="p-4 text-white">
          <p className="text-lg font-medium">
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              Protocols
            </button>
          </p>
          {isOpen && (
            <div className="p-4">
              <a
                href="#"
                className="block py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                Semaphore
              </a>
              <a
                href="#"
                className="block py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                Unirep
              </a>
            </div>
          )}
        </div>
        <div className="p-4">
          <a
            href="#"
            className="block py-2 text-base font-medium text-white hover:bg-gray-700"
          >
            Train me
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
