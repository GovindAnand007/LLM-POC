# Quick Start Guide

## 🚀 Get Started in 3 Minutes!

### Step 1: Install Backend Dependencies (1 min)

Open PowerShell and run:

```powershell
cd backend
npm install
```

### Step 2: Install Frontend Dependencies (1 min)

Open a new PowerShell window:

```powershell
npm install
```

### Step 3: Start Backend Server

In the first PowerShell window:

```powershell
cd backend
npm start
```

Wait until you see: 
```
🚀 Server is running on http://localhost:8000
📡 CORS enabled for http://localhost:5173
🌍 Translation API ready!
```

### Step 4: Start Frontend Server

In the second PowerShell window:

```powershell
npm run dev
```

### Step 5: Open in Browser

Go to: **http://localhost:5173**

## ✅ You're Ready!

Try translating "Hello, world!" from English to French!

## 💡 Tips

- **No Python required!** - Everything runs on Node.js
- **Keep both terminals running** - You need both servers
- **Internet required** - Translation uses Hugging Face API
- **First translation may be slower** - Models load on HF servers

## 🆘 Need Help?

Check the full README.md for detailed troubleshooting.

**Common Issues:**

1. **"Port already in use"** - Close other apps using port 8000 or 5173
2. **"Module not found"** - Run `npm install` in the backend folder
3. **Translation fails** - Check if backend is running at localhost:8000 and you have internet connection

---

**Enjoy translating! 🌍**
