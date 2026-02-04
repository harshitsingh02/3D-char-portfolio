# 🎨 My Portfolio

**Immersive 3D Web Experience · High Performance · Modern Frontend**

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?logo=greensock\&logoColor=white)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Vite-success)](#)

A **high-performance, cinematic 3D portfolio** built with **React, TypeScript, and Three.js**.
This project demonstrates **advanced frontend engineering**, **real-time 3D rendering**, and **production-grade performance optimization**.

---

## 🌟 Key Features

* 🎭 3D character system 
* 🎬 GSAP + ScrollTrigger cinematic animations
* 🚀 Smooth scrolling
* 🔐 3D model delivery
* 📦 Manual vendor chunk splitting for caching
* 🧠 Centralized asset loading management

---

## 🚀 Tech Stack

* **Core:** React 18, TypeScript
* **3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animation:** GSAP + ScrollTrigger
* **Styling:** Modern CSS3 with CSS Variables
* **Build Tool:** Vite

---

## 📂 Project Structure

```text
├── public/
│   ├── models/             # Encrypted (.enc) & standard (.glb) 3D assets
│   ├── images/             # Optimized WebP images
│   └── draco/              # Draco mesh compression decoders
├── src/
│   ├── components/
│   │   ├── Character/      # 3D scene orchestration & animation logic
│   │   └── styles/         # Component-scoped CSS
│   ├── context/            # Global Loading & Theme state
│   ├── data/               # Static configuration & bone data
│   ├── utils/              # Custom utilities (TextSplitter, helpers)
│   ├── App.tsx             # App root with lazy loading
│   └── main.tsx            # Entry point with providers & StrictMode
└── vite.config.ts          # Manual chunking & build optimizations
```

---

## 🏗️ System Architecture

### 1. 3D Character Pipeline

**Encrypted Assets**
All character models are stored as `.enc` files and decrypted at runtime using a custom decryption utility, protecting original assets from extraction.

---

### 2. Animation & Scroll Orchestration

**GSAP + ScrollTrigger**

Centralized timelines (`setCharTimeline`, `setAllTimeline`) orchestrate:

* Character transitions
* Section-based animations

---

### 3. Performance & Optimization

**Manual Vite Chunking**
Heavy libraries such as Three.js and GSAP are split into vendor chunks for better caching and faster reloads.

**Draco Compression**
Google Draco compression significantly reduces 3D geometry size and network payload.

**Global Loading Manager**
A centralized `LoadingProvider` tracks asset progress and triggers entrance animations only after **100% load completion**.

---

## 🛠️ Setup & Installation

### Prerequisites

* Node.js v18+
* npm v9+

### Installation

```sh
git clone <repository-url>
npm install
```

---

## ▶️ Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start development server            |
| `npm run build` | Production build with optimizations |
| `npm run lint`  | ESLint + TypeScript validation      |

---



