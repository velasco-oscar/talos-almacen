import { useTheme } from "./theme";

interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className = "" }: ThemeSelectorProps) {
  const { currentTheme, availableThemes, changeTheme } = useTheme();

  return (
    <div className={`theme-selector ${className}`}>
      <label className="block text-sm font-medium text-brand-neutral-700 mb-2">
        Tema de la aplicación
      </label>
      <select
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value)}
        className="w-full px-3 py-2 border border-brand-neutral-300 rounded-md bg-white text-brand-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 transition-colors"
      >
        {availableThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-brand-neutral-500">
        {availableThemes.find((t) => t.id === currentTheme)?.description}
      </p>
    </div>
  );
}