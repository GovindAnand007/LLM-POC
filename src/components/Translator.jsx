import { useState, useEffect } from 'react';
import './Translator.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [supportedLanguages, setSupportedLanguages] = useState({});

  // Language names mapping
  const languageNames = {
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'es': 'Spanish',
    'hi': 'Hindi',
    'zh': 'Chinese'
  };

  // Fetch supported languages on component mount
  useEffect(() => {
    fetchSupportedLanguages();
  }, []);

  const fetchSupportedLanguages = async () => {
    try {
      const response = await fetch('http://localhost:8000/languages');
      const data = await response.json();
      setSupportedLanguages(data.languages);
    } catch (err) {
      console.error('Error fetching languages:', err);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch('http://localhost:8000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (err) {
      setError(err.message || 'An error occurred during translation');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      alert('Translation copied to clipboard!');
    }
  };

  return (
    <div className="translator-container">
      <header className="translator-header">
        <h1>🌍 Multilingual Translator</h1>
        <p>Powered by Helsinki-NLP/opus-mt models</p>
      </header>

      <div className="translator-main">
        <div className="language-selector">
          <div className="language-select-group">
            <label htmlFor="source-lang">From:</label>
            <select
              id="source-lang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="language-dropdown"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="swap-button"
            onClick={handleSwapLanguages}
            title="Swap languages"
          >
            ⇄
          </button>

          <div className="language-select-group">
            <label htmlFor="target-lang">To:</label>
            <select
              id="target-lang"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="language-dropdown"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="translation-boxes">
          <div className="text-box-container">
            <label>Input Text:</label>
            <textarea
              className="text-box"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              rows={8}
            />
            <div className="character-count">
              {inputText.length} characters
            </div>
          </div>

          <div className="text-box-container">
            <label>Translation:</label>
            <textarea
              className="text-box output"
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              rows={8}
            />
            {translatedText && (
              <button className="copy-button" onClick={handleCopy}>
                📋 Copy
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="action-buttons">
          <button
            className="translate-button"
            onClick={handleTranslate}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? '⏳ Translating...' : '🔄 Translate'}
          </button>
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={!inputText && !translatedText}
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <footer className="translator-footer">
        <p>
          Using Helsinki-NLP MarianMT models for fast and accurate translation
        </p>
      </footer>
    </div>
  );
};

export default Translator;
