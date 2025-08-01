# Sistema de Temas Personalizables - Talos Almacén

Este sistema permite cambiar fácilmente los colores de branding para diferentes clientes usando Tailwind CSS y CSS Variables.

## 📁 Estructura de Archivos

```
frontend/
├── app/
│   ├── app.css                 # Variables CSS y configuración de temas
│   ├── utils/theme.ts          # Lógica del sistema de temas
│   ├── config/client.ts        # Configuración rápida de cliente
│   ├── routes/
│   │   ├── home.tsx           # Ejemplo de uso en componentes
│   │   └── theme-demo.tsx     # Demostración completa del sistema
│   └── root.tsx               # Inicialización automática
```

## 🎨 Temas Disponibles

### 1. **Talos (Azul)** - `talos-default`
- Tema por defecto con paleta azul corporativa
- Colores: Azul primario, Indigo secundario, Purple accent

### 2. **Corporativo Verde** - `corporate-green`  
- Para empresas ambientales y sostenibles
- Colores: Verde primario, Teal secundario, Lime accent

### 3. **Tech Naranja** - `tech-orange`
- Para empresas tecnológicas
- Colores: Naranja primario, Amber secundario, Red accent

## 🚀 Uso Rápido

### Cambio de Cliente (Método Simple)

1. Edita `app/config/client.ts`
2. Descomenta el tema deseado:

```typescript
// export const CLIENT_THEME_ID = "talos-default";        // Azul
export const CLIENT_THEME_ID = "corporate-green";         // Verde
// export const CLIENT_THEME_ID = "tech-orange";          // Naranja
```

3. Reinicia el servidor de desarrollo

### Cambio Dinámico en la UI

Usa el componente `ThemeSelector` en cualquier parte de tu aplicación:

```tsx
import { ThemeSelector } from "../utils/theme";

function MyComponent() {
  return (
    <div>
      <ThemeSelector />
    </div>
  );
}
```

## 🎯 Clases CSS Disponibles

### Colores Primarios
```css
bg-brand-primary-50     /* Fondo muy claro */
bg-brand-primary-500    /* Fondo principal */
bg-brand-primary-600    /* Fondo hover */
text-brand-primary-700  /* Texto */
border-brand-primary-200 /* Bordes */
```

### Colores Secundarios
```css
bg-brand-secondary-50
bg-brand-secondary-500
text-brand-secondary-700
border-brand-secondary-200
```

### Colores de Accent
```css
bg-brand-accent-500
text-brand-accent-700
border-brand-accent-200
```

### Estados del Sistema
```css
/* Éxito */
bg-brand-success-50
text-brand-success-600
border-brand-success-200

/* Advertencia */
bg-brand-warning-50
text-brand-warning-600
border-brand-warning-200

/* Error */
bg-brand-error-50
text-brand-error-600
border-brand-error-200
```

### Neutrales
```css
bg-brand-neutral-50     /* Fondos claros */
bg-brand-neutral-100
text-brand-neutral-700  /* Textos principales */
text-brand-neutral-500  /* Textos secundarios */
border-brand-neutral-200 /* Bordes suaves */
```

## 📖 Ejemplos de Componentes

### Botón Primario
```tsx
<button className="bg-brand-primary-500 hover:bg-brand-primary-600 text-white px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary-500">
  Botón Primario
</button>
```

### Card con Tema
```tsx
<div className="bg-brand-primary-50 border border-brand-primary-200 p-6 rounded-lg hover:bg-brand-primary-100 transition-colors">
  <h3 className="text-brand-primary-700 font-semibold mb-2">Título</h3>
  <p className="text-brand-neutral-600">Contenido de la card</p>
</div>
```

### Formulario
```tsx
<input 
  className="w-full px-3 py-2 border border-brand-neutral-300 rounded-md 
           bg-white text-brand-neutral-900 
           focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500
           transition-colors"
  placeholder="Campo de texto"
/>
```

### Estados de Notificación
```tsx
{/* Éxito */}
<div className="bg-brand-success-50 border border-brand-success-200 p-4 rounded-lg">
  <p className="text-brand-success-700">¡Operación exitosa!</p>
</div>

{/* Error */}
<div className="bg-brand-error-50 border border-brand-error-200 p-4 rounded-lg">
  <p className="text-brand-error-700">Ha ocurrido un error</p>
</div>
```

## 🛠️ Uso Avanzado

### Hook useTheme
```tsx
import { useTheme } from "../utils/theme";

function MyComponent() {
  const { currentTheme, currentThemeInfo, availableThemes, changeTheme } = useTheme();
  
  return (
    <div>
      <p>Tema actual: {currentThemeInfo?.name}</p>
      <button onClick={() => changeTheme("corporate-green")}>
        Cambiar a Verde
      </button>
    </div>
  );
}
```

### Crear Tema Personalizado
```tsx
import { ThemeManager } from "../utils/theme";

// Crear tema custom
const customTheme = ThemeManager.createCustomTheme(
  "mi-tema",
  "Mi Tema Custom",
  "Descripción del tema",
  {
    primary: {
      50: "240 249 255",
      500: "14 116 144",
      // ... resto de variantes
    },
    secondary: { /* ... */ },
    accent: { /* ... */ }
  }
);

// Aplicar tema
ThemeManager.applyTheme("mi-tema");
```

## 🎨 Personalización por Cliente

### Configuración Automática por Dominio
El sistema puede detectar automáticamente el tema basado en el dominio:

```typescript
// En client.ts
export const getDomainBasedTheme = (): string => {
  const hostname = window.location.hostname;
  
  const domainThemeMap: Record<string, string> = {
    'empresa-verde.com': 'corporate-green',
    'techstartup.com': 'tech-orange',
    // ...
  };
  
  return domainThemeMap[hostname] || CLIENT_THEME_ID;
};
```

### Variables CSS Personalizadas
Para cambios más profundos, edita directamente las variables en `app.css`:

```css
:root {
  /* Cambiar colores primarios */
  --brand-primary-500: 34 197 94;  /* Verde */
  --brand-primary-600: 22 163 74;
  /* ... */
}

[data-theme="mi-cliente"] {
  --brand-primary-500: 239 68 68;  /* Rojo */
  /* ... */
}
```

## 📱 Demostración

Visita `/theme-demo` en tu aplicación para ver:
- Todos los temas disponibles
- Componentes con diferentes estados
- Guía visual de colores
- Ejemplos de uso en vivo

## 🔧 Migración de Código Existente

### Antes (colores hardcodeados):
```tsx
<div className="bg-blue-500 text-white p-4">
  <h1 className="text-gray-800">Título</h1>
  <p className="text-gray-600">Descripción</p>
  <button className="bg-green-500 hover:bg-green-600">Guardar</button>
</div>
```

### Después (sistema de temas):
```tsx
<div className="bg-brand-primary-500 text-white p-4">
  <h1 className="text-brand-neutral-800">Título</h1>
  <p className="text-brand-neutral-600">Descripción</p>
  <button className="bg-brand-success-500 hover:bg-brand-success-600">Guardar</button>
</div>
```

## ✅ Checklist de Implementación

- [x] CSS Variables configuradas en `app.css`
- [x] Sistema de gestión de temas en `theme.ts`
- [x] Hook `useTheme` para React
- [x] Componente `ThemeSelector`
- [x] Configuración de cliente en `client.ts`
- [x] Inicialización automática en `root.tsx`
- [x] Ejemplos de uso en componentes
- [x] Página de demostración en `/theme-demo`
- [x] Soporte para localStorage
- [x] Transiciones suaves entre temas
- [x] Compatibilidad con modo oscuro
- [x] Documentación completa

## 🚀 Deploy para Múltiples Clientes

### Opción 1: Build por Cliente
```bash
# Cliente Verde
npm run build:green

# Cliente Naranja  
npm run build:orange
```

### Opción 2: Detección Automática
El sistema detecta automáticamente el tema basado en el dominio o configuración.

### Opción 3: Variable de Entorno
```bash
REACT_APP_CLIENT_THEME=corporate-green npm run build
```

---

## 📞 Soporte

Para dudas o problemas con el sistema de temas:
- Revisa la página `/theme-demo` para ejemplos
- Consulta este README para la documentación completa
- Verifica que las clases `brand-*` estén siendo usadas correctamente

**¡Disfruta de tu sistema de temas totalmente personalizable! 🎨**