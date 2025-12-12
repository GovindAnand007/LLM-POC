# 🌍 Multilingual Translator App

A modern React-based multilingual translator application powered by Helsinki-NLP's MarianMT models. This app provides fast and accurate translations between multiple languages using state-of-the-art neural machine translation.

## ✨ Features

- 🔄 Real-time translation between 6+ languages
- 🎨 Modern and responsive UI
- ⚡ Fast translation using lightweight MarianMT models
- 🔁 Language swap functionality
- 📋 Copy to clipboard
- 🎯 Character counter
- ⚠️ Error handling and loading states

## 🌐 Supported Languages

- English (en)
- French (fr)
- German (de)
- Spanish (es)
- Hindi (hi)
- Chinese (zh)

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js + Express** - Backend server
- **Hugging Face Inference API** - Translation service
- **Helsinki-NLP/opus-mt** - Translation models

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

That's it! No Python required! 🎉

## 🚀 Installation & Setup

### Step 1: Clone or Navigate to the Project

```bash
cd translator-app
```

### Step 2: Set Up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

**Note:** The backend uses Hugging Face Inference API, so no model downloads are needed! All translation happens via API calls.

### Step 3: Set Up the Frontend

1. Open a new terminal and navigate to the project root:
```bash
cd translator-app
```

2. Install npm dependencies:
```bash
npm install
```

## ▶️ Running the Application

You need to run both the backend and frontend servers simultaneously.

### Terminal 1: Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start at: `http://localhost:8000`

You should see:
```
🚀 Server is running on http://localhost:8000
📡 CORS enabled for http://localhost:5173
🌍 Translation API ready!
```

### Terminal 2: Start the Frontend Development Server

```bash
# From the project root
npm run dev
```

The frontend will start at: `http://localhost:5173`

You should see:
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Step 4: Open the App

Open your browser and navigate to: **http://localhost:5173**

## 📖 How to Use

1. **Select Source Language**: Choose the language you want to translate from
2. **Select Target Language**: Choose the language you want to translate to
3. **Enter Text**: Type or paste the text you want to translate
4. **Click Translate**: Press the "🔄 Translate" button
5. **View Results**: The translation will appear in the output box
6. **Copy Translation**: Use the "📋 Copy" button to copy the translation
7. **Swap Languages**: Click the "⇄" button to swap source and target languages
8. **Clear Text**: Use the "🗑️ Clear" button to reset the form

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

### GET `/`
- Returns API status message

### GET `/languages`
- Returns list of supported languages and language pairs

### POST `/translate`
- Translates text from source language to target language
- Request Body:
```json
{
  "text": "Hello, world!",
  "source_lang": "en",
  "target_lang": "fr"
}
```
- Response:
```json
{
  "translated_text": "Bonjour le monde!",
  "source_lang": "en",
  "target_lang": "fr"
}
```

## 🎯 Project Structure

```
translator-app/
├── backend/
│   ├── main.py              # FastAPI backend server
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/
│   │   ├── Translator.jsx   # Main translator component
│   │   └── Translator.css   # Component styles
│   ├── App.jsx              # Root component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── package.json             # Node.js dependencies
└── README.md               # This file
```

## 🐛 Troubleshooting

### Backend Issues

**API Connection Issues:**
- Ensure you have a stable internet connection
- The backend uses Hugging Face Inference API for translation
- First request might be slower as models are loaded on Hugging Face servers

**Port 8000 already in use:**
```bash
# Find and kill the process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**Dependency errors:**
- Make sure you're in the backend directory
- Reinstall dependencies: `npm install --force`

### Frontend Issues

**Port 5173 already in use:**
- The Vite dev server will automatically use the next available port
- Or manually specify a port in `vite.config.js`

**API connection errors:**
- Ensure the backend server is running on `http://localhost:8000`
- Check CORS settings in `backend/server.js`
- Verify the API endpoint URLs in `Translator.jsx`

## 🚀 Adding More Languages

To add more language pairs:

1. Check available models at: https://huggingface.co/Helsinki-NLP
2. Add the language pair to `LANGUAGE_PAIRS` in `backend/server.js`:
```javascript
const LANGUAGE_PAIRS = {
    'en-it': 'Helsinki-NLP/opus-mt-en-it',  // Add this line
    // ... existing pairs
}
```
3. Update the `languageNames` object in `Translator.jsx`:
```javascript
const languageNames = {
    'it': 'Italian',  // Add this line
    // ... existing languages
};
```

## 📝 Notes

- Translation quality depends on the Helsinki-NLP models
- Translation is done via Hugging Face Inference API (requires internet)
- First translation for each language pair may be slow (model loading on HF servers)
- Subsequent translations are faster due to server-side caching
- No local storage or model downloads required!

## 🙏 Credits

- **Helsinki-NLP** for the MarianMT models
- **Hugging Face** for the Inference API
- **Express.js** for the backend framework
- **React** and **Vite** for the frontend

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy Translating! 🌍✨**
