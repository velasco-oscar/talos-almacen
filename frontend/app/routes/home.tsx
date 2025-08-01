import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { ThemeSelector } from "../utils/ThemeSelector";

// Por ahora definimos los tipos localmente hasta configurar mejor la estructura
interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  cost?: number;
  stock: number;
  minStock: number;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    color?: string;
  };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Talos Almacén - Dashboard" },
    { name: "description", content: "Sistema de gestión de inventario" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-neutral-50">
        <div className="text-lg text-brand-neutral-700 animate-pulse">
          Cargando productos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-neutral-50">
        <div className="text-brand-error-600 text-lg font-medium">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral-50 theme-transition">
      <div className="container mx-auto px-4 py-8">
        {/* Header con selector de temas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-brand-neutral-800 mb-4 sm:mb-0">
            Talos Almacén - Dashboard
          </h1>
          <div className="w-full sm:w-auto sm:max-w-xs">
            <ThemeSelector />
          </div>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-primary-50 border border-brand-primary-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow theme-transition">
            <h2 className="text-xl font-semibold text-brand-primary-800 mb-2">
              Total Productos
            </h2>
            <p className="text-3xl font-bold text-brand-primary-600">
              {products.length}
            </p>
          </div>

          <div className="bg-brand-success-50 border border-brand-success-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow theme-transition">
            <h2 className="text-xl font-semibold text-brand-success-800 mb-2">
              Stock Total
            </h2>
            <p className="text-3xl font-bold text-brand-success-600">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </p>
          </div>

          <div className="bg-brand-warning-50 border border-brand-warning-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow theme-transition">
            <h2 className="text-xl font-semibold text-brand-warning-800 mb-2">
              Stock Bajo
            </h2>
            <p className="text-3xl font-bold text-brand-warning-600">
              {products.filter((p) => p.stock <= p.minStock).length}
            </p>
          </div>
        </div>

        {/* Demostración de botones con temas */}
        <div className="mb-8 p-6 bg-white border border-brand-neutral-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-brand-neutral-800 mb-4">
            Demostración de Componentes con Temas
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="demo-button-primary">
              Botón Primario
            </button>
            <button className="demo-button-secondary">
              Botón Secundario
            </button>
            <button className="bg-brand-accent-500 hover:bg-brand-accent-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Botón Accent
            </button>
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
        </div>

        {/* Tabla de productos */}
        <div className="bg-white border border-brand-neutral-200 rounded-lg shadow-sm overflow-hidden theme-transition">
          <div className="px-6 py-4 border-b border-brand-neutral-200">
            <h2 className="text-2xl font-bold text-brand-neutral-800">
              Productos Registrados
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-brand-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-brand-neutral-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-brand-neutral-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-brand-neutral-500">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-neutral-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-brand-secondary-100 text-brand-secondary-800"
                        style={{
                          backgroundColor: product.category?.color 
                            ? `${product.category.color}20` 
                            : undefined,
                          color: product.category?.color || undefined,
                        }}
                      >
                        {product.category?.name || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          product.stock <= product.minStock
                            ? "text-brand-error-600"
                            : "text-brand-success-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                      <span className="text-xs text-brand-neutral-500 ml-1">
                        (mín: {product.minStock})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-neutral-900">
                      ${product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
