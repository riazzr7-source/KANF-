# KANF V0

**KANF V0** is a lightweight Windows desktop AI execution framework foundation built with **Tauri v2 + React + TypeScript + Rust + SQLite**.

> **Note**: Phase 1 implements the Project Foundation and Main Desktop UI Shell. PC control, mouse/keyboard automation, browser automation, and live model execution are reserved for future phases.

---

## Architecture Overview

- **Desktop Framework**: [Tauri v2](https://v2.tauri.app/)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Zustand
- **Backend**: Rust (`rusqlite` bundled, `serde`, `tauri-plugin-log`)
- **Persistence**: Self-contained SQLite database (`kanf_v0.db`) in WAL mode

---

## Desktop UI Shell Layout

```text
┌──────────────────────────────────────────────────────────────────────┐
│ KANF V0                                           ● System Ready    │
├──────────────┬────────────────────────────────────┬──────────────────┤
│              │                                    │                  │
│  WORKSPACE   │              CANVAS                │       CHAT       │
│              │                                    │                  │
│  Home        │   Current task / plan / output     │   KANF           │
│  Tasks       │                                    │                  │
│  Memory      │   Dynamic workspace area           │   Conversation   │
│  Models      │                                    │                  │
│  Apps        │                                    │                  │
│  Settings    │                                    │   [ message... ] │
│              │                                    │        mic send  │
│              │                                    │                  │
├──────────────┴────────────────────────────────────┴──────────────────┤
│ Models ●     PC ●     Browser ●     Terminal ●     Runtime ●        │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **Node.js**: `v18+` (or `v20+`)
- **Rust**: `1.77.2+`
- **Windows Build Tools** (for Windows): Visual Studio C++ Build Tools & WebView2

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
# or for strict reproducible install:
npm ci
```

### 2. Run in Development Mode

**Browser Preview (Frontend only with LocalStorage fallback):**
```bash
npm run dev
```

**Full Desktop Mode (Tauri Native App):**
```bash
npm run tauri dev
```

### 3. Build for Production

**Frontend Production Build:**
```bash
npm run build
```

**Windows Native Installer Build:**
```powershell
npm run tauri build
```

The installer binaries (`.exe` / `.msi`) will be generated under `src-tauri/target/release/bundle/`.
