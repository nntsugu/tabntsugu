# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chrome Extension built with:
- Manifest V3
- React + Vite
- TypeScript
- ESLint

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build the extension for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Architecture

The extension consists of three main components:

1. **Popup** (`src/popup/`) - React application displayed when clicking the extension icon
2. **Background Service Worker** (`src/background/`) - Handles extension events and messaging
3. **Content Script** (`src/content/`) - Injected into web pages

## Development Workflow

1. Run `npm run dev` to start the development server
2. Load the `dist` folder as an unpacked extension in Chrome
3. The extension uses @crxjs/vite-plugin for hot module replacement