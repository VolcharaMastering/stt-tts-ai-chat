# 🌐 AI Chat Project (STT + TTS)

Full-stack project for **voice & text chat with AI answers**.  
Includes both **backend** (API + AI integrations) and **frontend** (React interface).

---

## 🚀 Features

-   🎙️ **Speech-to-Text (STT)** – Convert voice messages into text with AssemblyAI.
-   🤖 **AI Responses** – GPT-4o generates smart answers.
-   🔊 **Text-to-Speech (TTS)** – Optionally convert GPT answers into MP3 audio with Google Cloud TTS.
-   🖥️ **Frontend UI** – Simple React + Vite interface for sending text/voice and showing AI responses.
-   📂 **Full project setup** – Dockerized backend, modern frontend stack.

---

## 🛠️ Tech Stack

### Backend

-   **Node.js / Express** – API backend
-   **AssemblyAI** – Speech-to-Text
-   **OpenAI GPT-4o** – AI answers
-   **Google Cloud TTS** – Text-to-Speech
-   **Docker & Docker Compose** – Containerized setup

### Frontend

-   **React + Vite + TypeScript** – modern UI stack
-   **Zustand** – state management
-   **Zod** – validation
-   **full-form-control** – form validation ([NPM](https://www.npmjs.com/package/full-form-control))

---

## 📂 Project Structure

```
/project-root
 ├── /backend        # API server (Node.js, Express, AI integrations)
 │   ├── docker-compose.yml
 │   ├── .env.example
 │   ├── tts-servise-account.json (ignored)
 │   └── src/
 │
 ├── /frontend       # Client app (React, Vite, TS)
 │   ├── src/
 │   ├── package.json
 │   └── vite.config.ts
 │
 └── README.md       # This file
```

---

## ▶️ Running the Project

### 1. Start Backend

```bash
cd backend
docker-compose up -d
cp .env.example .env
# Add your API keys in .env
```

Set up **Google Cloud TTS credentials** as `tts-servise-account.json` in `/backend`.

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev   # for development
```

---

## ⚠️ Notes

-   AssemblyAI currently works reliably **only with English audio**.
-   Designed for **chat-like interaction** with optional **voice answers**.
