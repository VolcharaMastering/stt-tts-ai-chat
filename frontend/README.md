# 🎨 Frontend for STT/TTS AI Chat

Frontend for **speech-to-text (STT)** and **text-to-speech (TTS)** chat with AI answers.  
Built with **React + TypeScript + Vite**.

---

## 🚀 Features

-   💬 Send **text requests** directly to the backend.
-   🎙️ Send **voice requests** and get them decoded into text.
-   🖼️ Two answer blocks:
    1. **Decoded voice request** (transcribed text).
    2. **AI GPT answer** with **audio playback**.
-   ⚡ Powered by:
    -   **Zustand** for state management
    -   **Zod** for data validation
    -   [full-form-control](https://www.npmjs.com/package/full-form-control) for form validation  
        ([GitHub Repo](https://github.com/VolcharaMastering/full-form-control))

---

## 🛠️ Getting Started

### 1. Development Mode

```bash
npm run dev
```

### 2. Production Build

```bash
npm run build
npm start
```

---

## ✅ Tech Stack

-   **React + Vite + TypeScript** – frontend framework
-   **Zustand** – state management
-   **Zod** – schema validation
-   **full-form-control** – custom form validation library

---

## 📂 Project Structure

```
/frontend
 ├── src/
 │   ├── components/   # UI components
 │   ├── store/        # Zustand state
 │   ├── forms/        # Full-form-control validation
 │   └── ...
 ├── package.json
 └── vite.config.ts
```
