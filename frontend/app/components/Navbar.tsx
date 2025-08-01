import { useState } from "react";
import { Link, useLocation } from "react-router";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
      </svg>
    ),
  },
  {
    name: "Productos",
    href: "/productos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: "Categorías",
    href: "/categorias",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Para móvil
  const [isExpanded, setIsExpanded] = useState(true); // Para desktop
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-brand-neutral-200 shadow-lg transform transition-all duration-300 ease-in-out theme-transition
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:inset-0
          ${isExpanded ? "w-64" : "w-16"}
        `}
      >
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-brand-neutral-200">
          <Link
            to="/"
            className={`flex items-center text-brand-primary-600 hover:text-brand-primary-700 transition-colors ${
              isExpanded ? "space-x-3" : "justify-center"
            }`}
          >
            <div className="w-8 h-8 bg-brand-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            {isExpanded && (
              <span className="text-xl font-bold text-brand-neutral-800 transition-opacity duration-300">
                Talos
              </span>
            )}
          </Link>

          {/* Botón para contraer/expandir en desktop */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:block text-brand-neutral-500 hover:text-brand-primary-600 p-1 rounded-md transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-0" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón para cerrar en móvil */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-brand-neutral-500 hover:text-brand-primary-600 p-1 rounded-md transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)} // Cerrar sidebar al hacer clic en móvil
              className={`group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-brand-primary-100 text-brand-primary-700 border border-brand-primary-200"
                  : "text-brand-neutral-600 hover:text-brand-primary-600 hover:bg-brand-neutral-50"
              } ${isExpanded ? "space-x-3" : "justify-center"}`}
              title={!isExpanded ? item.name : undefined}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isExpanded && (
                <span className="transition-opacity duration-300">{item.name}</span>
              )}
              {!isExpanded && (
                <span className="absolute left-16 bg-brand-neutral-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer del Sidebar - Usuario */}
        <div className="p-3 border-t border-brand-neutral-200">
          <div
            className={`flex items-center px-3 py-2 rounded-lg hover:bg-brand-neutral-50 transition-colors cursor-pointer group ${
              isExpanded ? "space-x-3" : "justify-center"
            }`}
            title={!isExpanded ? "Usuario" : undefined}
          >
            <div className="w-8 h-8 bg-brand-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0 transition-opacity duration-300">
                <div className="text-sm font-medium text-brand-neutral-700 truncate">Usuario</div>
                <div className="text-xs text-brand-neutral-500 truncate">usuario@ejemplo.com</div>
              </div>
            )}
            {isExpanded && (
              <button className="text-brand-neutral-400 hover:text-brand-primary-600 transition-colors flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            {!isExpanded && (
              <span className="absolute left-16 bg-brand-neutral-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                Usuario
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Topbar para controles móviles */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-brand-neutral-200 shadow-sm theme-transition">
        <div className="flex items-center justify-between h-full px-4">
          {/* Botón menú hamburguesa */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-brand-neutral-500 hover:text-brand-primary-600 p-2 rounded-md transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo móvil */}
          <Link to="/" className="flex items-center space-x-2 text-brand-primary-600">
            <div className="w-8 h-8 bg-brand-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-brand-neutral-800">Talos</span>
          </Link>

          {/* Notificaciones */}
          <button className="text-brand-neutral-500 hover:text-brand-primary-600 p-2 rounded-md transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5a2 2 0 00-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Botón flotante para expandir cuando está colapsado (solo desktop) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="hidden lg:block fixed top-20 left-20 z-30 w-10 h-10 bg-brand-primary-500 hover:bg-brand-primary-600 text-white rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </>
  );
}

// Mantener compatibilidad con el nombre anterior
export { Sidebar as Navbar };