# Cortexa — Personalized Product Recommendations. (React Native)

A simple assignment project that showcases on-device LLM-powered product recommendations with a clean UX.

## What it does
- Uses Gemini LLM on the client (for development/demo).
- Explains the “why” behind each recommendation via a WhyModal.
- Smooth UI/UX with React Native Reanimated animations.
- Filters and sorting to refine results.

## How it works (short)
- Token optimization: Two-step flow
  1) Send user query to Gemini to get relevant categories.
  2) Send only catalog chunks matching those categories for the final recommendation call.
- Production notes:
  - Add a small server layer to secure keys, enforce rate limits, log usage, and orchestrate prompts.
  - Consider a RAG setup (embeddings + vector DB) for scalable, accurate retrieval over large catalogs.

## Install
Prereqs: Node.js, Expo, iOS/Android simulator or device.

1) Clone the repo:
   - git clone https://github.com/govindKulk/cortexa && cd cortexa
2) Install deps:
   - npm install (or yarn / pnpm)
3) Environment:
   - Copy .env.example to .env
   - Set your key:
     - expo_public_gemini_api_key=YOUR_GEMINI_KEY

## Run
- npx expo start
- Press i for iOS simulator, a for Android, or scan QR with Expo Go.

## Demo
[![Watch the video](https://img.youtube.com/vi/AAfpHQ14yT8/maxresdefault.jpg)](https://www.youtube.com/shorts/AAfpHQ14yT8)

## Notes
- Client-side key is fine for this assignment/demo. For production, move LLM calls server-side and consider RAG.
- Built with React Native + Expo + TypeScript + React Native Reanimated.

```
