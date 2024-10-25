import express from 'express';
import path from 'path';
import cors from 'cors';
import chatbotRoutes from './routes/chatbotRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5050;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use chatbot routes
app.use('/api', chatbotRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


