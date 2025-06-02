# TabnTsugu

A Chrome extension to export all tabs from your current profile windows to Markdown format.

## Features

- 📝 Export all open tabs to Markdown format
- 💾 Download tab lists as `.md` files
- 📂 Load previously saved tab lists
- 🔗 Open all links from a saved list in their original window configuration
- ✏️ Edit markdown content directly in the extension
- 🌓 Dark mode support

## Installation

### From Source (Development)

1. Clone the repository:
```bash
git clone https://github.com/nntsugu/tabntsugu.git
cd tabntsugu
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` folder from the project

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Chrome browser

### Setup

1. Clone the repository:
```bash
git clone https://github.com/nntsugu/tabntsugu.git
cd tabntsugu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

The extension will automatically reload when you make changes (thanks to @crxjs/vite-plugin).

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

1. Click the TabnTsugu extension icon in your Chrome toolbar
2. A new tab will open showing all your currently open tabs organized by window
3. Use the available actions:
   - **Refresh**: Update the tab list
   - **Copy Markdown**: Copy the list to clipboard
   - **Download**: Save as a `.md` file with timestamp
   - **Load**: Import a previously saved `.md` file
   - **Open links**: Open all tabs from the list in their original window configuration

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **@crxjs/vite-plugin** - Chrome extension development
- **ESLint** - Code linting

## Project Structure

```
tabntsugu/
├── src/
│   ├── background/     # Background service worker
│   ├── content/        # Content scripts
│   └── tab/           # New tab page UI
├── manifest.json       # Extension manifest
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

TabnTsugu Contributors

## Acknowledgments

- Built with React, Vite, and TypeScript
- Chrome extension development powered by @crxjs/vite-plugin