const express = require('express');
const router = express.Router();
const {
  getAllInventario,
  getInventarioById,
  createInventario,
  updateInventario,
  deleteInventario,
  searchByBarcode,
  getItemsProximosACaducar,
  getItemsStockBajo
} = require('../controllers/inventarioController');

// Rutas principales CRUD
router.get('/', getAllInventario);
router.get('/:id', getInventarioById);
router.post('/', createInventario);
router.put('/:id', updateInventario);
router.delete('/:id', deleteInventario);

// Rutas especiales
router.get('/barcode/:codigoBarras', searchByBarcode);
router.get('/alerts/caducidad', getItemsProximosACaducar);
router.get('/alerts/stock-bajo', getItemsStockBajo);

module.exports = router;