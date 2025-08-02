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

// Funciones para manejo de lotes

// Obtener todos los lotes de un producto
const getLotesByProductId = async (req, res) => {
  try {
    const { inventarioId } = req.params;
    
    const lotes = await prisma.lote.findMany({
      where: { 
        inventarioId,
        isActive: true 
      },
      orderBy: { fechaCaducidad: 'asc' }
    });
    
    res.json(lotes);
  } catch (error) {
    console.error('Error al obtener lotes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo lote para un producto
const createLote = async (req, res) => {
  try {
    const { inventarioId } = req.params;
    const {
      numeroLote,
      fechaCaducidad,
      cantidad,
      precioCompra,
      proveedor,
      fechaRecepcion,
      observaciones
    } = req.body;

    // Validaciones básicas
    if (!numeroLote || !fechaCaducidad || cantidad === undefined) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar que el producto existe
    const producto = await prisma.inventario.findUnique({
      where: { id: inventarioId }
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Crear el lote
    const nuevoLote = await prisma.lote.create({
      data: {
        numeroLote,
        fechaCaducidad: new Date(fechaCaducidad),
        cantidad: parseInt(cantidad),
        precioCompra: precioCompra ? parseFloat(precioCompra) : producto.precioCompra,
        proveedor: proveedor || producto.proveedor,
        fechaRecepcion: fechaRecepcion ? new Date(fechaRecepcion) : new Date(),
        observaciones,
        inventarioId
      }
    });

    // Actualizar el stock total del producto
    const lotes = await prisma.lote.findMany({
      where: {
        inventarioId,
        isActive: true
      }
    });

    const stockTotal = lotes.reduce((total, lote) => total + lote.cantidad, 0);
    const fechaMasCercana = lotes.reduce((fecha, lote) => 
      (lote.cantidad > 0 && new Date(lote.fechaCaducidad) < new Date(fecha)) 
        ? lote.fechaCaducidad 
        : fecha, 
      new Date(8640000000000000) // Fecha máxima
    );

    await prisma.inventario.update({
      where: { id: inventarioId },
      data: {
        stockActual: stockTotal,
        fechaCaducidad: fechaMasCercana,
        lote: nuevoLote.numeroLote, // Actualizar con el último lote ingresado
      }
    });

    res.status(201).json(nuevoLote);
  } catch (error) {
    console.error('Error al crear lote:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un lote
const updateLote = async (req, res) => {
  try {
    const { loteId } = req.params;
    const {
      numeroLote,
      fechaCaducidad,
      cantidad,
      precioCompra,
      proveedor,
      fechaRecepcion,
      observaciones
    } = req.body;

    const loteActualizado = await prisma.lote.update({
      where: { id: loteId },
      data: {
        numeroLote,
        fechaCaducidad: fechaCaducidad ? new Date(fechaCaducidad) : undefined,
        cantidad: cantidad !== undefined ? parseInt(cantidad) : undefined,
        precioCompra: precioCompra ? parseFloat(precioCompra) : undefined,
        proveedor,
        fechaRecepcion: fechaRecepcion ? new Date(fechaRecepcion) : undefined,
        observaciones
      }
    });

    // Obtener el inventarioId del lote actualizado
    const inventarioId = loteActualizado.inventarioId;

    // Actualizar el stock total y fecha de caducidad más próxima del producto
    const lotes = await prisma.lote.findMany({
      where: {
        inventarioId,
        isActive: true
      }
    });

    const stockTotal = lotes.reduce((total, lote) => total + lote.cantidad, 0);
    
    let fechaMasCercana = new Date(8640000000000000); // Fecha máxima
    for (const lote of lotes) {
      if (lote.cantidad > 0 && new Date(lote.fechaCaducidad) < fechaMasCercana) {
        fechaMasCercana = new Date(lote.fechaCaducidad);
      }
    }

    await prisma.inventario.update({
      where: { id: inventarioId },
      data: {
        stockActual: stockTotal,
        fechaCaducidad: fechaMasCercana
      }
    });

    res.json(loteActualizado);
  } catch (error) {
    console.error('Error al actualizar lote:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un lote (soft delete)
const deleteLote = async (req, res) => {
  try {
    const { loteId } = req.params;

    // Obtener el inventarioId antes de actualizar
    const lote = await prisma.lote.findUnique({
      where: { id: loteId }
    });

    if (!lote) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    const inventarioId = lote.inventarioId;

    // Marcar como inactivo
    await prisma.lote.update({
      where: { id: loteId },
      data: { isActive: false }
    });

    // Actualizar el stock total del producto
    const lotes = await prisma.lote.findMany({
      where: {
        inventarioId,
        isActive: true
      }
    });

    const stockTotal = lotes.reduce((total, lote) => total + lote.cantidad, 0);
    
    let fechaMasCercana = new Date(8640000000000000); // Fecha máxima
    for (const lote of lotes) {
      if (lote.cantidad > 0 && new Date(lote.fechaCaducidad) < fechaMasCercana) {
        fechaMasCercana = new Date(lote.fechaCaducidad);
      }
    }

    await prisma.inventario.update({
      where: { id: inventarioId },
      data: {
        stockActual: stockTotal,
        fechaCaducidad: fechaMasCercana
      }
    });

    res.json({ message: 'Lote eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar lote:', error);
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
  getItemsStockBajo,
  getLotesByProductId,
  createLote,
  updateLote,
  deleteLote
};