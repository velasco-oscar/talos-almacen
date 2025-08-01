import { useTheme } from "../utils/theme";
import { ThemeSelector } from "../utils/ThemeSelector";
import type { Route } from "./+types/theme-demo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo de Temas - Talos Almacén" },
    { name: "description", content: "Demostración del sistema de temas personalizables" },
  ];
}

export default function ThemeDemo() {
  const { currentThemeInfo, availableThemes } = useTheme();

  return (
    <div className="min-h-screen bg-brand-neutral-50 theme-transition">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brand-neutral-800 mb-4">
            Sistema de Temas Personalizables
          </h1>
          <p className="text-lg text-brand-neutral-600 mb-6">
            Demostración completa del sistema de branding dinámico para diferentes clientes
          </p>
          
          <div className="max-w-md">
            <ThemeSelector />
          </div>
        </div>

        {/* Información del tema actual */}
        {currentThemeInfo && (
          <div className="mb-8 p-6 bg-white border border-brand-neutral-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-neutral-800 mb-2">
              Tema Actual: {currentThemeInfo.name}
            </h2>
            <p className="text-brand-neutral-600 mb-4">
              {currentThemeInfo.description}
            </p>
            
            {/* Paleta de colores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-brand-neutral-700 mb-3">Colores Primarios</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="w-8 h-8 bg-brand-primary-500 rounded border-2 border-brand-neutral-300" title="Primary 500"></div>
                  <div className="w-8 h-8 bg-brand-primary-600 rounded border-2 border-brand-neutral-300" title="Primary 600"></div>
                  <div className="w-8 h-8 bg-brand-primary-700 rounded border-2 border-brand-neutral-300" title="Primary 700"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-brand-neutral-700 mb-3">Colores Secundarios</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="w-8 h-8 bg-brand-secondary-500 rounded border-2 border-brand-neutral-300" title="Secondary 500"></div>
                  <div className="w-8 h-8 bg-brand-secondary-600 rounded border-2 border-brand-neutral-300" title="Secondary 600"></div>
                  <div className="w-8 h-8 bg-brand-secondary-700 rounded border-2 border-brand-neutral-300" title="Secondary 700"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-brand-neutral-700 mb-3">Colores Accent</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="w-8 h-8 bg-brand-accent-500 rounded border-2 border-brand-neutral-300" title="Accent 500"></div>
                  <div className="w-8 h-8 bg-brand-accent-600 rounded border-2 border-brand-neutral-300" title="Accent 600"></div>
                  <div className="w-8 h-8 bg-brand-accent-700 rounded border-2 border-brand-neutral-300" title="Accent 700"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demostración de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Botones */}
          <div className="bg-white border border-brand-neutral-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-neutral-800 mb-4">Botones</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button className="demo-button-primary">Primario</button>
                <button className="demo-button-secondary">Secundario</button>
                <button className="bg-brand-accent-500 hover:bg-brand-accent-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Accent
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="bg-brand-success-500 hover:bg-brand-success-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Éxito
                </button>
                <button className="bg-brand-warning-500 hover:bg-brand-warning-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Advertencia
                </button>
                <button className="bg-brand-error-500 hover:bg-brand-error-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Error
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="border border-brand-primary-500 text-brand-primary-600 hover:bg-brand-primary-50 px-4 py-2 rounded-md font-medium transition-colors">
                  Outline
                </button>
                <button className="text-brand-primary-600 hover:text-brand-primary-700 hover:bg-brand-primary-50 px-4 py-2 rounded-md font-medium transition-colors">
                  Ghost
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white border border-brand-neutral-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-brand-neutral-800 mb-4">Cards</h3>
            <div className="space-y-4">
              <div className="demo-card">
                <h4 className="font-semibold text-brand-primary-700 mb-2">Card Primaria</h4>
                <p className="text-brand-neutral-600">Contenido de ejemplo con colores del tema.</p>
              </div>
              
              <div className="bg-brand-secondary-50 border border-brand-secondary-200 rounded-lg p-4 hover:bg-brand-secondary-100 transition-colors">
                <h4 className="font-semibold text-brand-secondary-700 mb-2">Card Secundaria</h4>
                <p className="text-brand-neutral-600">Contenido de ejemplo con colores secundarios.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estados del sistema */}
        <div className="bg-white border border-brand-neutral-200 rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-brand-neutral-800 mb-4">Estados del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-brand-success-50 border border-brand-success-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-brand-success-500 rounded-full mr-2"></div>
                <span className="font-medium text-brand-success-700">Éxito</span>
              </div>
              <p className="text-sm text-brand-success-600">Operación completada correctamente</p>
            </div>
            
            <div className="bg-brand-warning-50 border border-brand-warning-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-brand-warning-500 rounded-full mr-2"></div>
                <span className="font-medium text-brand-warning-700">Advertencia</span>
              </div>
              <p className="text-sm text-brand-warning-600">Atención requerida</p>
            </div>
            
            <div className="bg-brand-error-50 border border-brand-error-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-brand-error-500 rounded-full mr-2"></div>
                <span className="font-medium text-brand-error-700">Error</span>
              </div>
              <p className="text-sm text-brand-error-600">Ha ocurrido un problema</p>
            </div>
            
            <div className="bg-brand-neutral-50 border border-brand-neutral-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-brand-neutral-500 rounded-full mr-2"></div>
                <span className="font-medium text-brand-neutral-700">Información</span>
              </div>
              <p className="text-sm text-brand-neutral-600">Información adicional</p>
            </div>
          </div>
        </div>

        {/* Formularios */}
        <div className="bg-white border border-brand-neutral-200 rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-brand-neutral-800 mb-4">Formularios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-neutral-700 mb-2">
                Campo de texto
              </label>
              <input
                type="text"
                placeholder="Ingresa tu texto"
                className="w-full px-3 py-2 border border-brand-neutral-300 rounded-md 
                         bg-white text-brand-neutral-900 
                         focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500
                         transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-neutral-700 mb-2">
                Select
              </label>
              <select className="w-full px-3 py-2 border border-brand-neutral-300 rounded-md 
                               bg-white text-brand-neutral-900 
                               focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500
                               transition-colors">
                <option>Opción 1</option>
                <option>Opción 2</option>
                <option>Opción 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de todos los temas disponibles */}
        <div className="bg-white border border-brand-neutral-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-brand-neutral-800 mb-4">Temas Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableThemes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 border-2 rounded-lg transition-all cursor-pointer hover:shadow-md ${
                  currentThemeInfo?.id === theme.id
                    ? "border-brand-primary-500 bg-brand-primary-50"
                    : "border-brand-neutral-200 bg-white hover:border-brand-neutral-300"
                }`}
              >
                <h4 className="font-semibold text-brand-neutral-800 mb-2">{theme.name}</h4>
                <p className="text-sm text-brand-neutral-600 mb-3">{theme.description}</p>
                
                {/* Preview de colores */}
                <div className="flex gap-1 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `rgb(${theme.colors.primary[500]})` }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `rgb(${theme.colors.secondary[500]})` }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `rgb(${theme.colors.accent[500]})` }}
                  ></div>
                </div>
                
                <code className="text-xs text-brand-neutral-500 bg-brand-neutral-100 px-2 py-1 rounded">
                  {theme.id}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Instrucciones de uso */}
        <div className="mt-8 bg-brand-accent-50 border border-brand-accent-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-brand-accent-800 mb-4">
            📋 Cómo usar el sistema de temas
          </h3>
          <div className="prose prose-sm text-brand-accent-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Cambio rápido:</strong> Usa el selector arriba para cambiar temas dinámicamente
              </li>
              <li>
                <strong>Configuración de cliente:</strong> Edita <code className="bg-brand-accent-100 px-1 rounded">app/config/client.ts</code> para cambio permanente
              </li>
              <li>
                <strong>Clases CSS:</strong> Usa clases como <code className="bg-brand-accent-100 px-1 rounded">bg-brand-primary-500</code> en lugar de <code className="bg-brand-accent-100 px-1 rounded">bg-blue-500</code>
              </li>
              <li>
                <strong>Estados:</strong> Usa <code className="bg-brand-accent-100 px-1 rounded">text-brand-success-600</code>, <code className="bg-brand-accent-100 px-1 rounded">text-brand-error-600</code>, etc.
              </li>
              <li>
                <strong>Neutrales:</strong> Usa <code className="bg-brand-accent-100 px-1 rounded">text-brand-neutral-700</code> para textos y fondos
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}