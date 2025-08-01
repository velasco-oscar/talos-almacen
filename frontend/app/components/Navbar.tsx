import { useState, useEffect } from "react";
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
      </svg>
    ),
  },
  {
    name: "Productos",
    href: "/productos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: "Categorías",
    href: "/categorias",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

// Componente de icono hamburguesa animado mejorado - funciona en móvil y desktop
const NavigationToggleIcon = ({ isOpen, isMobile }: { isOpen: boolean; isMobile: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Línea superior */}
        <span
          className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-out ${
            isOpen 
              ? "rotate-45 translate-y-0" 
              : "-translate-y-1.5 rotate-0"
          }`}
          style={{
            transformOrigin: 'center',
          }}
        />
        {/* Línea del medio */}
        <span
          className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-out ${
            isOpen 
              ? "opacity-0 scale-0" 
              : "opacity-100 scale-100"
          }`}
        />
        {/* Línea inferior */}
        <span
          className={`absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-out ${
            isOpen 
              ? "-rotate-45 translate-y-0" 
              : "translate-y-1.5 rotate-0"
          }`}
          style={{
            transformOrigin: 'center',
          }}
        />
      </div>
      
      {/* Efecto de pulse al hacer click */}
      <div className="absolute inset-0 rounded-lg bg-current opacity-0 scale-0 transition-all duration-150 ease-out group-active:opacity-10 group-active:scale-100" />
    </div>
  );
};

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const location = useLocation();

  // SSR-safe client detection
  useEffect(() => {
    setIsClient(true);
    
    // Check if we're on mobile initially
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    
    checkMobile();
    
    // Add resize listener for responsive behavior
    const handleResize = () => {
      checkMobile();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Auto-close mobile menu on route change for better UX
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Enhanced keyboard navigation support
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isMobileOpen]);

  // Prevent body scroll when mobile menu is open - fixes layout shift issues
  useEffect(() => {
    if (!isClient) return;
    
    const body = document.body;
    if (isMobileOpen && isMobile) {
      body.style.overflow = "hidden";
      body.style.paddingRight = "0px"; // Prevent layout shift from scrollbar
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isMobileOpen, isMobile, isClient]);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleToggleClick = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsDesktopExpanded(!isDesktopExpanded);
    }
  };

  const getToggleAriaLabel = () => {
    if (isMobile) {
      return isMobileOpen ? "Close navigation menu" : "Open navigation menu";
    }
    return isDesktopExpanded ? "Collapse sidebar" : "Expand sidebar";
  };

  const shouldShowContent = () => {
    return isDesktopExpanded || isMobile;
  };

  return (
    <>
      {/* 
        MOBILE BACKDROP OVERLAY 
        - Uses backdrop-blur for modern glass effect
        - Proper z-index management to prevent layering issues
      */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          onKeyDown={(e) => e.key === "Enter" && setIsMobileOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
        />
      )}

      {/* 
        MAIN NAVIGATION CONTAINER
        - Fixed width values prevent horizontal overflow
        - overflow-x-hidden eliminates unwanted scrollbars
        - Stable container dimensions prevent layout jumps
      */}
      <nav
        className={`
          fixed inset-y-0 left-0 z-50 
          bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-out
          overflow-x-hidden overflow-y-auto
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
          ${isDesktopExpanded ? "w-72" : "w-16"}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* 
          NAVIGATION HEADER 
          - Persistent toggle button stays in same position
          - Flex layout prevents content overflow
          - min-h ensures consistent height
        */}
        <div className="flex items-center justify-between min-h-[4rem] px-4 border-b border-gray-200 bg-white">
          {/* 
            PERSISTENT NAVIGATION TOGGLE - ALWAYS VISIBLE
            This button remains in the same position regardless of navbar state
          */}
          <button
            onClick={handleToggleClick}
            className="flex items-center justify-center w-10 h-10 
                     text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                     focus:text-blue-600 focus:bg-blue-50 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     rounded-lg transition-all duration-200 flex-shrink-0 group"
            aria-label={getToggleAriaLabel()}
            aria-expanded={isMobile ? isMobileOpen : isDesktopExpanded}
          >
            <NavigationToggleIcon 
              isOpen={isMobile ? isMobileOpen : !isDesktopExpanded} 
              isMobile={isMobile} 
            />
          </button>

          {/* 
            LOGO SECTION
            - Conditional rendering prevents overflow
            - Proper text truncation for long names
          */}
          {shouldShowContent() && (
            <Link
              to="/"
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 
                       focus:text-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 rounded-lg
                       transition-colors duration-200 flex-1 min-w-0 ml-4"
              aria-label="Talos - Go to homepage"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 
                           rounded-lg flex items-center justify-center shadow-sm 
                           flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-800 truncate">
                Talos
              </span>
            </Link>
          )}
        </div>

        {/* 
          NAVIGATION MENU
          - Proper overflow handling prevents horizontal scrollbars
          - Consistent spacing using CSS Grid for better alignment
          - min-w-0 prevents flex item overflow
        */}
        <div className="flex-1 px-3 py-4 overflow-x-hidden overflow-y-auto">
          <ul className="space-y-1" role="menubar">
            {navigation.map((item) => (
              <li key={item.name} role="none">
                <Link
                  to={item.href}
                  role="menuitem"
                  className={`
                    group relative flex items-center px-3 py-2.5 rounded-lg 
                    text-sm font-medium transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    min-w-0 overflow-hidden
                    ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100"
                    }
                  `}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {/* Icon container - fixed width prevents layout shifts */}
                  <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                    {item.icon}
                  </div>
                  
                  {/* 
                    Text content - conditional rendering prevents overflow
                    Uses proper text truncation for long menu items
                  */}
                  {shouldShowContent() && (
                    <span className="ml-3 text-sm font-medium truncate flex-1 min-w-0">
                      {item.name}
                    </span>
                  )}

                  {/* Active page indicator */}
                  {isActive(item.href) && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 
                                 w-0.5 h-6 bg-blue-600 rounded-r-full" />
                  )}

                  {/* 
                    Tooltip for collapsed desktop state
                    Positioned absolutely to avoid affecting layout
                  */}
                  {!isDesktopExpanded && !isMobile && isClient && (
                    <div className="absolute left-full ml-2 px-2 py-1 
                                 bg-gray-900 text-white text-xs rounded 
                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                 transition-all duration-200 pointer-events-none z-50 
                                 whitespace-nowrap shadow-lg">
                      {item.name}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 
                                   w-1.5 h-1.5 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 
          USER SECTION 
          - Consistent with navigation layout
          - Proper overflow handling
          - Touch-friendly sizing (minimum 44px)
        */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div
            className={`
              flex items-center p-2 rounded-lg cursor-pointer group
              hover:bg-gray-50 active:bg-gray-100 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              min-h-[44px] min-w-0 overflow-hidden
            `}
            role="button"
            tabIndex={0}
            aria-label="User menu"
          >
            {/* User avatar - fixed size prevents layout shifts */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 
                         rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            
            {/* User info - conditional rendering prevents overflow */}
            {shouldShowContent() && (
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">
                  Usuario Admin
                </div>
                <div className="text-xs text-gray-500 truncate">
                  admin@talos.com
                </div>
              </div>
            )}

            {/* Settings button - conditional rendering */}
            {shouldShowContent() && (
              <button 
                className="ml-2 p-1 text-gray-400 hover:text-blue-600 
                         focus:text-blue-600 rounded transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                aria-label="User settings"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}

            {/* Tooltip for collapsed user section */}
            {!isDesktopExpanded && !isMobile && isClient && (
              <div className="absolute left-full ml-2 px-2 py-1 
                           bg-gray-900 text-white text-xs rounded 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                           transition-all duration-200 pointer-events-none z-50 
                           whitespace-nowrap shadow-lg">
                Usuario Admin
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 
                             w-1.5 h-1.5 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 
        MAIN CONTENT SPACER
        - Provides proper spacing for main content when sidebar is visible
        - Responsive width matches sidebar width
        - Prevents content overlap
      */}
      <div 
        className={`
          hidden lg:block flex-shrink-0 transition-all duration-300
          ${isDesktopExpanded ? "w-72" : "w-16"}
        `} 
        aria-hidden="true"
      />
    </>
  );
}

// Maintain backward compatibility
export { Sidebar as Navbar };