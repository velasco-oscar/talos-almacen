import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventario - Talos" },
    { name: "description", content: "Gestión de inventario de medicamentos" },
  ];
};

interface InventarioItem {
  id: string;
  nombre: string;
  codigoBarras: string;
  fechaCaducidad: string;
  precioCompra: number;
  precioVenta: number;
  stockActual: number;
  formula?: string;
  concentracion?: string;
  lote?: string;
  proveedor?: string;
  ubicacion?: string;
  observaciones?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lotes?: Lote[];
}

interface Lote {
  id: string;
  numeroLote: string;
  fechaCaducidad: string;
  cantidad: number;
  precioCompra?: number;
  proveedor?: string;
  fechaRecepcion: string;
  observaciones?: string;
  inventarioId: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface FormData {
  nombre: string;
  codigoBarras: string;
  fechaCaducidad: string;
  precioCompra: string;
  precioVenta: string;
  stockActual: string;
  formula: string;
  concentracion: string;
  lote: string;
  proveedor: string;
  ubicacion: string;
  observaciones: string;
}

interface LoteFormData {
  numeroLote: string;
  fechaCaducidad: string;
  cantidad: string;
  precioCompra: string;
  proveedor: string;
  fechaRecepcion: string;
  observaciones: string;
}

const initialFormData: FormData = {
  nombre: '',
  codigoBarras: '',
  fechaCaducidad: '',
  precioCompra: '',
  precioVenta: '',
  stockActual: '',
  formula: '',
  concentracion: '',
  lote: '',
  proveedor: '',
  ubicacion: '',
  observaciones: ''
};

const initialLoteFormData: LoteFormData = {
  numeroLote: '',
  fechaCaducidad: '',
  cantidad: '',
  precioCompra: '',
  proveedor: '',
  fechaRecepcion: new Date().toISOString().split('T')[0], // Hoy
  observaciones: ''
};

export default function Inventario() {
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoteModal, setShowLoteModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventarioItem | null>(null);
  const [editingLote, setEditingLote] = useState<Lote | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loteFormData, setLoteFormData] = useState<LoteFormData>(initialLoteFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nombre' | 'fechaCaducidad' | 'stockActual'>('nombre');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [lotesLoading, setLotesLoading] = useState(false);
  const [viewingLotes, setViewingLotes] = useState(false);

  // Cargar inventario
  const loadInventario = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/inventario');
      if (!response.ok) throw new Error('Error al cargar inventario');
      const data = await response.json();
      setInventario(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventario();
  }, []);

  // Cargar lotes de un producto
  const loadLotes = async (inventarioId: string) => {
    try {
      setLotesLoading(true);
      const response = await fetch(`/api/inventario/${inventarioId}/lotes`);
      if (!response.ok) throw new Error('Error al cargar lotes');
      const data = await response.json();
      setLotes(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cargar lotes');
    } finally {
      setLotesLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en el formulario de lotes
  const handleLoteInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLoteFormData(prev => ({ ...prev, [name]: value }));
  };

  // Abrir modal para crear nuevo item
  const handleCreate = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  // Abrir modal para editar item
  const handleEdit = (item: InventarioItem) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      codigoBarras: item.codigoBarras,
      fechaCaducidad: item.fechaCaducidad.split('T')[0], // Formato YYYY-MM-DD
      precioCompra: item.precioCompra.toString(),
      precioVenta: item.precioVenta.toString(),
      stockActual: item.stockActual.toString(),
      formula: item.formula || '',
      concentracion: item.concentracion || '',
      lote: item.lote || '',
      proveedor: item.proveedor || '',
      ubicacion: item.ubicacion || '',
      observaciones: item.observaciones || ''
    });
    setShowModal(true);
  };

  // Abrir modal para ver y administrar lotes
  const handleViewLotes = async (item: InventarioItem) => {
    setSelectedItem(item);
    setViewingLotes(true);
    await loadLotes(item.id);
  };

  // Abrir modal para agregar nuevo lote
  const handleAddLote = () => {
    if (!selectedItem) return;
    
    setEditingLote(null);
    setLoteFormData({
      ...initialLoteFormData,
      precioCompra: selectedItem.precioCompra.toString(),
      proveedor: selectedItem.proveedor || '',
    });
    setShowLoteModal(true);
  };

  // Abrir modal para editar lote
  const handleEditLote = (lote: Lote) => {
    setEditingLote(lote);
    setLoteFormData({
      numeroLote: lote.numeroLote,
      fechaCaducidad: lote.fechaCaducidad.split('T')[0], // Formato YYYY-MM-DD
      cantidad: lote.cantidad.toString(),
      precioCompra: lote.precioCompra?.toString() || '',
      proveedor: lote.proveedor || '',
      fechaRecepcion: lote.fechaRecepcion.split('T')[0],
      observaciones: lote.observaciones || ''
    });
    setShowLoteModal(true);
  };

  // Guardar item (crear o actualizar)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/api/inventario/${editingItem.id}` : '/api/inventario';
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar');
      }

      await loadInventario();
      setShowModal(false);
      setFormData(initialFormData);
      setEditingItem(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  // Guardar lote (crear o actualizar)
  const handleSaveLote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    try {
      const url = editingLote 
        ? `/api/inventario/lotes/${editingLote.id}` 
        : `/api/inventario/${selectedItem.id}/lotes`;
      const method = editingLote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loteFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar lote');
      }

      await loadLotes(selectedItem.id);
      await loadInventario(); // Para actualizar el stock y fecha de caducidad
      setShowLoteModal(false);
      setLoteFormData(initialLoteFormData);
      setEditingLote(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar lote');
    }
  };

  // Eliminar item
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este item?')) return;

    try {
      const response = await fetch(`/api/inventario/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar');
      await loadInventario();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  // Eliminar lote
  const handleDeleteLote = async (loteId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este lote?')) return;
    if (!selectedItem) return;

    try {
      const response = await fetch(`/api/inventario/lotes/${loteId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar lote');
      await loadLotes(selectedItem.id);
      await loadInventario(); // Para actualizar el stock y fecha de caducidad
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar lote');
    }
  };

  // Filtrar y ordenar inventario
  const filteredAndSortedInventario = inventario
    .filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigoBarras.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.formula && item.formula.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'fechaCaducidad':
          aValue = new Date(a.fechaCaducidad).getTime();
          bValue = new Date(b.fechaCaducidad).getTime();
          break;
        case 'stockActual':
          aValue = a.stockActual;
          bValue = b.stockActual;
          break;
        default:
          aValue = a.nombre.toLowerCase();
          bValue = b.nombre.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Función para determinar el color del stock
  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock <= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  // Función para determinar el color de la fecha de caducidad
  const getCaducidadColor = (fecha: string) => {
    const diasRestantes = Math.ceil((new Date(fecha).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diasRestantes < 0) return 'text-red-600 bg-red-50'; // Caducado
    if (diasRestantes <= 30) return 'text-yellow-600 bg-yellow-50'; // Próximo a caducar
    return 'text-gray-600'; // Normal
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-brand-error-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={loadInventario}
            className="mt-4 px-4 py-2 bg-brand-primary-600 text-white rounded hover:bg-brand-primary-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-neutral-900">Inventario de Medicamentos</h1>
        <button
          onClick={handleCreate}
          className="bg-brand-primary-600 text-white px-4 py-2 rounded-lg hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
        >
          + Nuevo Item
        </button>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Buscar por nombre, código de barras o fórmula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'nombre' | 'fechaCaducidad' | 'stockActual')}
            className="px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
          >
            <option value="nombre">Ordenar por Nombre</option>
            <option value="fechaCaducidad">Ordenar por Caducidad</option>
            <option value="stockActual">Ordenar por Stock</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-brand-neutral-300 rounded-lg hover:bg-brand-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-700"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-brand-neutral-200">
          <h3 className="text-sm font-medium text-brand-neutral-500">Total Items</h3>
          <p className="text-2xl font-bold text-brand-neutral-900">{inventario.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-brand-neutral-200">
          <h3 className="text-sm font-medium text-brand-neutral-500">Stock Bajo (≤10)</h3>
          <p className="text-2xl font-bold text-brand-warning-600">
            {inventario.filter(item => item.stockActual <= 10).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-brand-neutral-200">
          <h3 className="text-sm font-medium text-brand-neutral-500">Sin Stock</h3>
          <p className="text-2xl font-bold text-brand-error-600">
            {inventario.filter(item => item.stockActual === 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-brand-neutral-200">
          <h3 className="text-sm font-medium text-brand-neutral-500">Próximos a Caducar</h3>
          <p className="text-2xl font-bold text-brand-accent-600">
            {inventario.filter(item => {
              const diasRestantes = Math.ceil((new Date(item.fechaCaducidad).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return diasRestantes <= 30 && diasRestantes >= 0;
            }).length}
          </p>
        </div>
      </div>

      {/* Tabla de inventario */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-brand-neutral-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-neutral-200">
            <thead className="bg-brand-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Medicamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Código de Barras
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Precios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Caducidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-neutral-200">
              {filteredAndSortedInventario.map((item) => (
                <tr key={item.id} className="hover:bg-brand-neutral-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-brand-neutral-900">{item.nombre}</div>
                      {item.formula && (
                        <div className="text-sm text-brand-neutral-500">{item.formula}</div>
                      )}
                      {item.concentracion && (
                        <div className="text-xs text-brand-neutral-400">{item.concentracion}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-neutral-900">
                    <code className="bg-brand-neutral-100 px-2 py-1 rounded text-xs">
                      {item.codigoBarras}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockColor(item.stockActual)}`}>
                      {item.stockActual} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-neutral-900">
                    <div>Compra: ${item.precioCompra}</div>
                    <div>Venta: ${item.precioVenta}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${getCaducidadColor(item.fechaCaducidad)}`}>
                      {new Date(item.fechaCaducidad).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewLotes(item)}
                      className="bg-brand-accent-600 text-white px-3 py-1 rounded-md hover:bg-brand-accent-700 focus:outline-none focus:ring-2 focus:ring-brand-accent-500 mr-2"
                    >
                      📦 Lotes
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-brand-primary-600 hover:text-brand-primary-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-brand-error-600 hover:text-brand-error-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAndSortedInventario.length === 0 && (
          <div className="text-center py-8 text-brand-neutral-500">
            No hay items en el inventario que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Modal para crear/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-content border border-brand-neutral-200">
            <h2 className="text-xl font-bold mb-4 text-brand-neutral-900">
              {editingItem ? 'Editar Item' : 'Nuevo Item'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Código de Barras *
                  </label>
                  <input
                    type="text"
                    name="codigoBarras"
                    value={formData.codigoBarras}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Fecha de Caducidad *
                  </label>
                  <input
                    type="date"
                    name="fechaCaducidad"
                    value={formData.fechaCaducidad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Stock Actual
                  </label>
                  <input
                    type="number"
                    name="stockActual"
                    value={formData.stockActual}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Precio de Compra *
                  </label>
                  <input
                    type="number"
                    name="precioCompra"
                    value={formData.precioCompra}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Precio de Venta *
                  </label>
                  <input
                    type="number"
                    name="precioVenta"
                    value={formData.precioVenta}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Fórmula/Composición
                  </label>
                  <input
                    type="text"
                    name="formula"
                    value={formData.formula}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Concentración
                  </label>
                  <input
                    type="text"
                    name="concentracion"
                    value={formData.concentracion}
                    onChange={handleInputChange}
                    placeholder="ej: 500mg, 250ml"
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white placeholder-brand-neutral-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Lote
                  </label>
                  <input
                    type="text"
                    name="lote"
                    value={formData.lote}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    placeholder="ej: Estante A-3"
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white placeholder-brand-neutral-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-brand-neutral-700 border border-brand-neutral-300 rounded-lg hover:bg-brand-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-primary-600 text-white rounded-lg hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                >
                  {editingItem ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para visualizar y administrar lotes */}
      {viewingLotes && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-content border border-brand-neutral-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-neutral-900">
                Lotes de {selectedItem.nombre}
              </h2>
              <button
                onClick={() => {
                  setViewingLotes(false);
                  setSelectedItem(null);
                  setLotes([]);
                }}
                className="text-brand-neutral-500 hover:text-brand-neutral-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <div>
                <p><span className="font-medium">Código:</span> {selectedItem.codigoBarras}</p>
                <p><span className="font-medium">Stock total:</span> {selectedItem.stockActual} unidades</p>
              </div>
              <button
                onClick={handleAddLote}
                className="bg-brand-primary-600 text-white px-4 py-2 rounded-lg hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
              >
                + Nuevo Lote
              </button>
            </div>
            
            {lotesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-600"></div>
              </div>
            ) : (
              <>
                {lotes.length === 0 ? (
                  <div className="text-center py-8 text-brand-neutral-500">
                    Este producto no tiene lotes registrados.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-brand-neutral-200">
                      <thead className="bg-brand-neutral-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            N° Lote
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            F. Caducidad
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            Cantidad
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            F. Recepción
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            Precio Compra
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-brand-neutral-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-brand-neutral-200">
                        {lotes.map((lote) => (
                          <tr key={lote.id} className="hover:bg-brand-neutral-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-brand-neutral-900">{lote.numeroLote}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`text-sm ${getCaducidadColor(lote.fechaCaducidad)}`}>
                                {new Date(lote.fechaCaducidad).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`text-sm ${getStockColor(lote.cantidad)}`}>
                                {lote.cantidad}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-brand-neutral-900">
                                {new Date(lote.fechaRecepcion).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-brand-neutral-900">
                                ${lote.precioCompra?.toFixed(2) || selectedItem.precioCompra.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditLote(lote)}
                                className="text-brand-primary-600 hover:text-brand-primary-900 mr-3"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteLote(lote.id)}
                                className="text-brand-error-600 hover:text-brand-error-900"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Modal para crear/editar lote */}
      {showLoteModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-content border border-brand-neutral-200">
            <h2 className="text-xl font-bold mb-4 text-brand-neutral-900">
              {editingLote ? 'Editar Lote' : 'Nuevo Lote'}
            </h2>
            
            <form onSubmit={handleSaveLote} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Número de Lote *
                  </label>
                  <input
                    type="text"
                    name="numeroLote"
                    value={loteFormData.numeroLote}
                    onChange={handleLoteInputChange}
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Fecha de Caducidad *
                  </label>
                  <input
                    type="date"
                    name="fechaCaducidad"
                    value={loteFormData.fechaCaducidad}
                    onChange={handleLoteInputChange}
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={loteFormData.cantidad}
                    onChange={handleLoteInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Precio de Compra
                  </label>
                  <input
                    type="number"
                    name="precioCompra"
                    value={loteFormData.precioCompra}
                    onChange={handleLoteInputChange}
                    step="0.01"
                    min="0"
                    placeholder={selectedItem.precioCompra.toString()}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Proveedor
                  </label>
                  <input
                    type="text"
                    name="proveedor"
                    value={loteFormData.proveedor}
                    onChange={handleLoteInputChange}
                    placeholder={selectedItem.proveedor || ''}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                    Fecha de Recepción
                  </label>
                  <input
                    type="date"
                    name="fechaRecepcion"
                    value={loteFormData.fechaRecepcion}
                    onChange={handleLoteInputChange}
                    className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-neutral-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  name="observaciones"
                  value={loteFormData.observaciones}
                  onChange={handleLoteInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-brand-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 text-brand-neutral-900 bg-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLoteModal(false)}
                  className="px-4 py-2 text-brand-neutral-700 border border-brand-neutral-300 rounded-lg hover:bg-brand-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-primary-600 text-white rounded-lg hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                >
                  {editingLote ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}