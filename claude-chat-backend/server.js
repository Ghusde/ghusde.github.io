import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-6';
const allowedOrigins = [FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS not allowed'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '5mb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'claude-chat-backend',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string' 
      });
    }

    if (!CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY is not set in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: API key not found' 
      });
    }

    // Build messages array for Claude API
    // If conversationHistory exists and is array, append new message
    // Otherwise, just send the new message
    const messages = (conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0)
      ? [...conversationHistory, { role: 'user', content: message }]
      : [{ role: 'user', content: message }];

    console.log(`Sending ${messages.length} messages to Claude API...`);

    // Call Claude API
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        messages: messages
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    // Send response back to frontend
    res.json(response.data);

  } catch (error) {
    console.error('Claude API Error:', error.response?.data || error.message);
    
    // Handle specific error types
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid Claude API key' 
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limited by Claude API. Try again later.' 
      });
    }

    res.status(500).json({ 
      error: error.response?.data?.error?.message || error.message || 'Unknown error occurred'
    });
  }
});

app.use((err, _req, res, _next) => {
  if (err?.message === 'CORS not allowed') {
    return res.status(403).json({ error: 'CORS not allowed for this origin.' });
  }

  return res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
  console.log(`Claude model in use: ${CLAUDE_MODEL}`);
});
