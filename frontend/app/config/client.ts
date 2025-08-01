/**
 * CONFIGURACIÓN DE CLIENTE - TALOS ALMACÉN
 * ========================================
 * 
 * Este archivo permite cambiar rápidamente el tema/branding para diferentes clientes.
 * Solo necesitas descomentar el tema deseado y comentar los demás.
 * 
 * INSTRUCCIONES:
 * 1. Descomenta SOLO una línea de CLIENT_THEME_ID
 * 2. Guarda el archivo
 * 3. Reinicia el servidor de desarrollo
 * 4. El tema se aplicará automáticamente
 */

// ===== CONFIGURACIÓN ACTUAL =====
// Descomenta SOLO UNA de las siguientes líneas:

export const CLIENT_THEME_ID = "talos-default";        // Tema por defecto (Azul)
// export const CLIENT_THEME_ID = "corporate-green";   // Cliente: Empresa Verde
// export const CLIENT_THEME_ID = "tech-orange";       // Cliente: Tech Startup
// export const CLIENT_THEME_ID = "mi-cliente-personalizado"; // Tu nuevo tema

// ===== CONFIGURACIONES ADICIONALES =====

/**
 * Configuración automática de tema basada en dominio
 * Útil para deploy de múltiples clientes
 */
export const getDomainBasedTheme = (): string => {
  if (typeof window === "undefined") return CLIENT_THEME_ID;
  
  const hostname = window.location.hostname;
  
  // Mapeo de dominios a temas
  const domainThemeMap: Record<string, string> = {
    'empresa-verde.com': 'corporate-green',
    'verde.talos.com': 'corporate-green',
    'techstartup.com': 'tech-orange',
    'tech.talos.com': 'tech-orange',
    'localhost': CLIENT_THEME_ID,
    'talos.com': 'talos-default',
  };
  
  return domainThemeMap[hostname] || CLIENT_THEME_ID;
};

/**
 * Configuración de cliente personalizada
 * Útil para características específicas por cliente
 */
export const CLIENT_CONFIG = {
  // Nombre del cliente (aparece en títulos, etc.)
  clientName: "Talos",
  
  // Logo del cliente (URL o ruta)
  logoUrl: "/logo-client.png",
  
  // Configuraciones específicas
  features: {
    showAdvancedReports: true,
    enableMultiLocation: false,
    showCostPrices: true,
  },
  
  // Información de contacto/soporte
  support: {
    email: "soporte@talos.com",
    phone: "+1-234-567-8900",
    website: "https://talos.com",
  },
} as const;

/**
 * EJEMPLOS DE CONFIGURACIÓN PARA DIFERENTES CLIENTES:
 * 
 * CLIENTE: EMPRESA VERDE
 * ======================
 * export const CLIENT_THEME_ID = "corporate-green";
 * export const CLIENT_CONFIG = {
 *   clientName: "EcoGreen Corp",
 *   logoUrl: "/logo-ecogreen.png",
 *   features: {
 *     showAdvancedReports: true,
 *     enableMultiLocation: true,
 *     showCostPrices: false,
 *   },
 *   support: {
 *     email: "soporte@ecogreen.com",
 *     phone: "+1-555-ECO-GREEN",
 *     website: "https://ecogreen.com",
 *   },
 * };
 * 
 * CLIENTE: TECH STARTUP
 * =====================
 * export const CLIENT_THEME_ID = "tech-orange";
 * export const CLIENT_CONFIG = {
 *   clientName: "TechFlow",
 *   logoUrl: "/logo-techflow.png",
 *   features: {
 *     showAdvancedReports: false,
 *     enableMultiLocation: false,
 *     showCostPrices: true,
 *   },
 *   support: {
 *     email: "help@techflow.io",
 *     phone: "+1-TECH-FLOW",
 *     website: "https://techflow.io",
 *   },
 * };
 */