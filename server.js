const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { connectToDatabase, sequelize } = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const FLAG_FILE_PATH = path.join(__dirname, 'initialized.flag');

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api', customerRoutes);

// Start the server
const startServer = async () => {
  try {
    await connectToDatabase();

    // Check if the flag file exists
    const isInitialized = fs.existsSync(FLAG_FILE_PATH);

    if (!isInitialized) {
        // Synchronize models with the database
        await sequelize.sync({ alter: true }); // `alter: true` to ensure the tables are updated as needed

        // Create the flag file to indicate initialization
        fs.writeFileSync(FLAG_FILE_PATH, 'Tables initialized');
        console.log('Tables were created or updated for the first time.');
    } else {
        console.log('Tables have already been initialized.');
    }

    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
