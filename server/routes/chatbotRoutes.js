import express from 'express';
import { getChatbotResponse } from '../controllers/chatbotController.js';


const router = express.Router();

router.post('/chatbot', getChatbotResponse);

// module.exports = router;

export default router;