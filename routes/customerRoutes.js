const express = require('express');
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} = require('../controllers/customerController');

const router = express.Router();

// Define routes
router.post('/customers', createCustomer);
router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomerById);
router.delete('/customers/:id', deleteCustomerById);

module.exports = router;
