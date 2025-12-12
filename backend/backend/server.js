import express from 'express';
import cors from 'cors';
import https from 'https';

const app = express();
const PORT = 8000;

// Hugging Face API endpoint
const HF_API_URL = 'https://api-inference.huggingface.co/models/';

// Create a custom HTTPS agent that accepts self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Language pair to model mapping
const LANGUAGE_PAIRS = {
  'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
  'en-de': 'Helsinki-NLP/opus-mt-en-de',
  'en-es': 'Helsinki-NLP/opus-mt-en-es',
  'en-hi': 'Helsinki-NLP/opus-mt-en-hi',
  'en-zh': 'Helsinki-NLP/opus-mt-en-zh',
  'fr-en': 'Helsinki-NLP/opus-mt-fr-en',
  'de-en': 'Helsinki-NLP/opus-mt-de-en',
  'es-en': 'Helsinki-NLP/opus-mt-es-en',
  'hi-en': 'Helsinki-NLP/opus-mt-hi-en',
  'zh-en': 'Helsinki-NLP/opus-mt-zh-en',
};

// Language names
const LANGUAGES = {
  'en': 'English',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'hi': 'Hindi',
  'zh': 'Chinese'
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Multilingual Translator API is running!',
    status: 'active',
    backend: 'Node.js + Express'
  });
});

// Get supported languages
app.get('/languages', (req, res) => {
  res.json({
    supported_pairs: Object.keys(LANGUAGE_PAIRS),
    languages: LANGUAGES
  });
});

// Translation endpoint
app.post('/translate', async (req, res) => {
  try {
    const { text, source_lang, target_lang } = req.body;

    // Validate input
    if (!text || !source_lang || !target_lang) {
      return res.status(400).json({
        detail: 'Missing required fields: text, source_lang, target_lang'
      });
    }

    // Create language pair key
    const langPair = `${source_lang}-${target_lang}`;

    // Check if language pair is supported
    if (!LANGUAGE_PAIRS[langPair]) {
      return res.status(400).json({
        detail: `Language pair ${langPair} is not supported. Supported pairs: ${Object.keys(LANGUAGE_PAIRS).join(', ')}`
      });
    }

    // Get model name
    const modelName = LANGUAGE_PAIRS[langPair];

    console.log(`Translating from ${source_lang} to ${target_lang} using ${modelName}`);

    // Call Hugging Face Inference API using fetch
    const response = await fetch(`${HF_API_URL}${modelName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
      }),
      agent: httpsAgent  // Use custom agent to bypass SSL verification
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HF API error: ${response.status} - ${errorData}`);
    }

    const result = await response.json();

    // Extract translated text
    const translatedText = result[0]?.translation_text || result.translation_text || '';

    if (!translatedText) {
      throw new Error('No translation returned from API');
    }

    res.json({
      translated_text: translatedText,
      source_lang: source_lang,
      target_lang: target_lang
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      detail: `Translation error: ${error.message}`
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for http://localhost:5173`);
  console.log(`🌍 Translation API ready!`);
});
