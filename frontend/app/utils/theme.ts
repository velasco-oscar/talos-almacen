import { useState, useEffect } from "react";
import { CLIENT_THEME_ID } from "../config/client";

// Tipos para el sistema de temas
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: ColorPalette;
    secondary: ColorPalette;
    accent: ColorPalette;
    success?: ColorPalette;
    warning?: ColorPalette;
    error?: ColorPalette;
    neutral?: ColorPalette;
  };
}

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

// Configuraciones de temas predefinidos
export const AVAILABLE_THEMES: ThemeConfig[] = [
  {
    id: "talos-default",
    name: "Talos (Azul)",
    description: "Tema por defecto de Talos con paleta azul corporativa",
    colors: {
      primary: {
        50: "239 246 255",
        100: "219 234 254",
        200: "191 219 254",
        300: "147 197 253",
        400: "96 165 250",
        500: "59 130 246",
        600: "37 99 235",
        700: "29 78 216",
        800: "30 64 175",
        900: "30 58 138",
        950: "23 37 84",
      },
      secondary: {
        50: "238 242 255",
        100: "224 231 255",
        200: "199 210 254",
        300: "165 180 252",
        400: "129 140 248",
        500: "99 102 241",
        600: "79 70 229",
        700: "67 56 202",
        800: "55 48 163",
        900: "49 46 129",
        950: "30 27 75",
      },
      accent: {
        50: "250 245 255",
        100: "243 232 255",
        200: "233 213 255",
        300: "196 181 253",
        400: "168 85 247",
        500: "147 51 234",
        600: "126 34 206",
        700: "107 33 168",
        800: "88 28 135",
        900: "74 29 114",
        950: "49 10 101",
      },
    },
  },
  {
    id: "corporate-green",
    name: "Corporativo Verde",
    description: "Tema verde para empresas ambientales y sostenibles",
    colors: {
      primary: {
        50: "236 253 245",
        100: "209 250 229",
        200: "167 243 208",
        300: "110 231 183",
        400: "52 211 153",
        500: "16 185 129",
        600: "5 150 105",
        700: "4 120 87",
        800: "6 95 70",
        900: "6 78 59",
        950: "2 44 34",
      },
      secondary: {
        50: "240 253 250",
        100: "204 251 241",
        200: "153 246 228",
        300: "94 234 212",
        400: "45 212 191",
        500: "20 184 166",
        600: "13 148 136",
        700: "15 118 110",
        800: "17 94 89",
        900: "19 78 74",
        950: "4 47 46",
      },
      accent: {
        50: "247 254 231",
        100: "236 252 203",
        200: "217 249 157",
        300: "190 242 100",
        400: "163 230 53",
        500: "132 204 22",
        600: "101 163 13",
        700: "77 124 15",
        800: "63 98 18",
        900: "54 83 20",
        950: "26 46 5",
      },
    },
  },
  {
    id: "tech-orange",
    name: "Tech Naranja",
    description: "Tema naranja vibrante para empresas tecnológicas",
    colors: {
      primary: {
        50: "255 247 237",
        100: "255 237 213",
        200: "254 215 170",
        300: "253 186 116",
        400: "251 146 60",
        500: "249 115 22",
        600: "234 88 12",
        700: "194 65 12",
        800: "154 52 18",
        900: "124 45 18",
        950: "67 20 7",
      },
      secondary: {
        50: "255 251 235",
        100: "254 243 199",
        200: "253 230 138",
        300: "252 211 77",
        400: "251 191 36",
        500: "245 158 11",
        600: "217 119 6",
        700: "180 83 9",
        800: "146 64 14",
        900: "120 53 15",
        950: "69 26 3",
      },
      accent: {
        50: "254 242 242",
        100: "254 226 226",
        200: "254 202 202",
        300: "252 165 165",
        400: "248 113 113",
        500: "239 68 68",
        600: "220 38 38",
        700: "185 28 28",
        800: "153 27 27",
        900: "127 29 29",
        950: "69 10 10",
      },
    },
  },
  {
    id: "mi-cliente-personalizado",
    name: "Mi Cliente",
    description: "Tema personalizado para mi cliente específico",
    colors: {
      primary: {
        50: "248 250 252", // Muy claro
        100: "241 245 249",
        200: "226 232 240",
        300: "203 213 225",
        400: "148 163 184",
        500: "100 116 139", // Color principal
        600: "71 85 105",   // Hover
        700: "51 65 85",    // Activo
        800: "30 41 59",
        900: "15 23 42",
        950: "2 6 23",      // Muy oscuro
      },
      secondary: {
        50: "255 250 250",
        100: "254 224 224",
        200: "254 202 202",
        300: "252 165 165",
        400: "248 113 113",
        500: "239 68 68",    // Ejemplo: rojo
        600: "220 38 38",
        700: "185 28 28",
        800: "153 27 27",
        900: "127 29 29",
        950: "69 10 10",
      },
      accent: {
        50: "254 242 242",
        100: "254 226 226",
        200: "254 202 202",
        300: "252 165 165",
        400: "248 113 113",
        500: "34 197 94",    // Ejemplo: verde
        600: "22 163 74",
        700: "16 139 60",
        800: "12 115 47",
        900: "10 95 39",
        950: "5 47 20",
      },
    },
  },
];

// Utilidades para gestión de temas
export class ThemeManager {
  private static readonly THEME_KEY = "talos-theme";
  // Ahora usa la configuración del cliente como tema por defecto
  private static readonly DEFAULT_THEME = CLIENT_THEME_ID;

  /**
   * Obtiene el tema actual desde localStorage o configuración de cliente
   */
  static getCurrentTheme(): string {
    if (typeof window === "undefined") return this.DEFAULT_THEME;
    // Primero verifica localStorage, si no existe usa la configuración de cliente
    return localStorage.getItem(this.THEME_KEY) || this.DEFAULT_THEME;
  }

  /**
   * Obtiene el tema configurado para el cliente (sin localStorage)
   */
  static getClientConfiguredTheme(): string {
    return CLIENT_THEME_ID;
  }

  /**
   * Aplica un tema específico
   */
  static applyTheme(themeId: string): void {
    if (typeof window === "undefined") return;

    const theme = AVAILABLE_THEMES.find((t) => t.id === themeId);
    if (!theme) {
      console.warn(`Tema "${themeId}" no encontrado`);
      return;
    }

    // Guardar en localStorage
    localStorage.setItem(this.THEME_KEY, themeId);

    // Aplicar data-theme al documento
    if (themeId === "talos-default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }

    // Aplicar variables CSS dinámicamente (opcional, para temas custom)
    this.setCSSVariables(theme);

    // Dispatch evento personalizado para notificar cambios
    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: { themeId, theme } })
    );
  }

  /**
   * Aplica variables CSS dinámicamente
   */
  private static setCSSVariables(theme: ThemeConfig): void {
    const root = document.documentElement;

    // Aplicar colores primary
    Object.entries(theme.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--brand-primary-${key}`, value);
    });

    // Aplicar colores secondary
    Object.entries(theme.colors.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--brand-secondary-${key}`, value);
    });

    // Aplicar colores accent
    Object.entries(theme.colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--brand-accent-${key}`, value);
    });

    // Aplicar colores opcionales si están definidos
    if (theme.colors.success) {
      Object.entries(theme.colors.success).forEach(([key, value]) => {
        root.style.setProperty(`--brand-success-${key}`, value);
      });
    }

    if (theme.colors.warning) {
      Object.entries(theme.colors.warning).forEach(([key, value]) => {
        root.style.setProperty(`--brand-warning-${key}`, value);
      });
    }

    if (theme.colors.error) {
      Object.entries(theme.colors.error).forEach(([key, value]) => {
        root.style.setProperty(`--brand-error-${key}`, value);
      });
    }

    if (theme.colors.neutral) {
      Object.entries(theme.colors.neutral).forEach(([key, value]) => {
        root.style.setProperty(`--brand-neutral-${key}`, value);
      });
    }
  }

  /**
   * Inicializa el tema al cargar la aplicación
   * Prioriza: configuración de cliente > localStorage > tema por defecto
   */
  static initializeTheme(): void {
    const clientTheme = this.getClientConfiguredTheme();
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem(this.THEME_KEY) : null;
    
    // Si el tema configurado en client.ts es diferente al guardado, usar el de client.ts
    // Esto permite que los cambios en client.ts sobrescriban el localStorage
    if (clientTheme !== savedTheme) {
      console.log(`Aplicando tema configurado para cliente: ${clientTheme}`);
      this.applyTheme(clientTheme);
    } else {
      // Si coinciden, usar el que está guardado
      this.applyTheme(savedTheme || clientTheme);
    }
  }

  /**
   * Crea un tema personalizado desde colores RGB
   */
  static createCustomTheme(
    id: string,
    name: string,
    description: string,
    colors: ThemeConfig["colors"]
  ): ThemeConfig {
    return {
      id,
      name,
      description,
      colors,
    };
  }

  /**
   * Resetea al tema configurado para el cliente
   */
  static resetToClientTheme(): void {
    this.applyTheme(this.getClientConfiguredTheme());
  }

  /**
   * Obtiene todos los temas disponibles
   */
  static getAvailableThemes(): ThemeConfig[] {
    return AVAILABLE_THEMES;
  }

  /**
   * Obtiene información del tema actual
   */
  static getCurrentThemeInfo(): ThemeConfig | null {
    const currentTheme = this.getCurrentTheme();
    return AVAILABLE_THEMES.find((t) => t.id === currentTheme) || null;
  }
}

// Hook para React
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(
    ThemeManager.getCurrentTheme()
  );

  useEffect(() => {
    // Inicializar tema
    ThemeManager.initializeTheme();

    // Escuchar cambios de tema
    const handleThemeChange = (event: CustomEvent) => {
      setCurrentTheme(event.detail.themeId);
    };

    window.addEventListener("themeChanged", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener(
        "themeChanged",
        handleThemeChange as EventListener
      );
    };
  }, []);

  const changeTheme = (themeId: string) => {
    ThemeManager.applyTheme(themeId);
  };

  const currentThemeInfo = ThemeManager.getCurrentThemeInfo();
  const availableThemes = ThemeManager.getAvailableThemes();

  return {
    currentTheme,
    currentThemeInfo,
    availableThemes,
    changeTheme,
  };
}