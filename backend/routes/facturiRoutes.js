const express = require('express')
const router = express.Router()
const {
  getFacturi,
  getFactura,
  createFactura,
  updateFactura,
  deleteFactura,
  createPdf,
  downloadFactura,
} = require('../controllers/facturiController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFacturi).post(protect, createFactura)
router.route('/create-pdf').post(createPdf)
router.route('/download-pdf').get(downloadFactura)
router
  .route('/:id')
  .get(protect, getFactura)
  .put(protect, updateFactura)
  .delete(protect, deleteFactura)
module.exports = router
