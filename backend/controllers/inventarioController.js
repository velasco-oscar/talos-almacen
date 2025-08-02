const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Obtener todos los items del inventario
const getAllInventario = async (req, res) => {
  try {
    const inventario = await prisma.inventario.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(inventario);
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un item del inventario por ID
const getInventarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.inventario.findUnique({
      where: { id }
    });
    
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error al obtener item del inventario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo item en el inventario
const createInventario = async (req, res) => {
  try {
    const {
      nombre,
      codigoBarras,
      fechaCaducidad,
      precioCompra,
      precioVenta,
      stockActual,
      formula,
      concentracion,
      lote,
      proveedor,
      ubicacion,
      observaciones
    } = req.body;

    // Validaciones básicas
    if (!nombre || !codigoBarras || !fechaCaducidad || !precioCompra || !precioVenta) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoItem = await prisma.inventario.create({
      data: {
        nombre,
        codigoBarras,
        fechaCaducidad: new Date(fechaCaducidad),
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta),
        stockActual: parseInt(stockActual) || 0,
        formula,
        concentracion,
        lote,
        proveedor,
        ubicacion,
        observaciones
      }
    });

    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error('Error al crear item del inventario:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El código de barras ya existe' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un item del inventario
const updateInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      codigoBarras,
      fechaCaducidad,
      precioCompra,
      precioVenta,
      stockActual,
      formula,
      concentracion,
      lote,
      proveedor,
      ubicacion,
      observaciones
    } = req.body;

    const itemActualizado = await prisma.inventario.update({
      where: { id },
      data: {
        nombre,
        codigoBarras,
        fechaCaducidad: fechaCaducidad ? new Date(fechaCaducidad) : undefined,
        precioCompra: precioCompra ? parseFloat(precioCompra) : undefined,
        precioVenta: precioVenta ? parseFloat(precioVenta) : undefined,
        stockActual: stockActual !== undefined ? parseInt(stockActual) : undefined,
        formula,
        concentracion,
        lote,
        proveedor,
        ubicacion,
        observaciones
      }
    });

    res.json(itemActualizado);
  } catch (error) {
    console.error('Error al actualizar item del inventario:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El código de barras ya existe' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un item del inventario (soft delete)
const deleteInventario = async (req, res) => {
  try {
    const { id } = req.params;

    const itemEliminado = await prisma.inventario.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({ message: 'Item eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar item del inventario:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Buscar items por código de barras
const searchByBarcode = async (req, res) => {
  try {
    const { codigoBarras } = req.params;
    
    const item = await prisma.inventario.findUnique({
      where: { codigoBarras }
    });
    
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error al buscar por código de barras:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener items próximos a caducar
const getItemsProximosACaducar = async (req, res) => {
  try {
    const { dias = 30 } = req.query;
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + parseInt(dias));

    const items = await prisma.inventario.findMany({
      where: {
        isActive: true,
        fechaCaducidad: {
          lte: fechaLimite
        }
      },
      orderBy: { fechaCaducidad: 'asc' }
    });

    res.json(items);
  } catch (error) {
    console.error('Error al obtener items próximos a caducar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener items con stock bajo
const getItemsStockBajo = async (req, res) => {
  try {
    const { minimo = 10 } = req.query;

    const items = await prisma.inventario.findMany({
      where: {
        isActive: true,
        stockActual: {
          lte: parseInt(minimo)
        }
      },
      orderBy: { stockActual: 'asc' }
    });

    res.json(items);
  } catch (error) {
    console.error('Error al obtener items con stock bajo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllInventario,
  getInventarioById,
  createInventario,
  updateInventario,
  deleteInventario,
  searchByBarcode,
  getItemsProximosACaducar,
  getItemsStockBajo
};