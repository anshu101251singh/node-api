// controllers/customerController.js
const Customer = require('../models/customer');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
        "status": true,
        "message": "Customer added successfully!",
        "data": customer
  });
  } catch (error) {
    res.status(400).json({ 
        "status": false,
        error: error.message 
    });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({
        "status": true,
        "message": "List of all customers",
        "data": customers
    });
  } catch (error) {
    res.status(500).json({ 
        "status": false,
        error: error.message 
    });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
