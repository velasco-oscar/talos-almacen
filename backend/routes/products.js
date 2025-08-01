const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require('../controllers/productController');

// GET /api/products - Obtener todos los productos
router.get('/', getAllProducts);

// GET /api/products/low-stock - Productos con stock bajo
router.get('/low-stock', getLowStockProducts);

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', getProductById);

// POST /api/products - Crear nuevo producto
router.post('/', createProduct);

// PUT /api/products/:id - Actualizar producto
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Eliminar producto (soft delete)
router.delete('/:id', deleteProduct);

module.exports = router;