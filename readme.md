
# GJS TypeBoost

GJS TypeBoost is a GNOME Shell 43 extension development setup using TypeScript and type definitions to make extension development easier and more efficient. It provides auto-completion, type safety, and a streamlined developer experience, solving the biggest pain points in GJS development.

---

## 🌟 Why GJS TypeBoost?

Developing GNOME Shell extensions with JavaScript (GJS) can be frustrating due to:

- ❌ Lack of official TypeScript support
- ❌ Poor documentation
- ❌ No autocomplete in IDEs
- ❌ Debugging without type safety

**GJS TypeBoost** solves these by adding:

- ✅ TypeScript + GNOME API type definitions
- ✅ Full autocomplete and IntelliSense (VSCode-friendly)
- ✅ Simple Makefile to build and install extensions
- ✅ Clean, scalable project structure

---

## 📁 Folder Structure

```
my-extension/
├── src/
│   ├── extension.ts      # Extension entry point
│   ├── prefs.ts          # Preferences dialog logic
│   ├── stylesheet.css    # Extension styles
├── dist/                 # Compiled JS and assets (auto-generated)
├── metadata.json         # GNOME Shell extension metadata
├── package.json          # Node dev dependencies
├── tsconfig.json         # TypeScript compiler settings
├── Makefile              # Build and install automation
├── .gitignore            # Ignore build and dependency folders
└── README.md             # You're reading it!
```

---

## ⚙️ Requirements

- Linux with GNOME Shell 43
- Node.js and npm
- TypeScript (`npm install -g typescript`)
- VSCode (recommended for best dev experience)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shamveelgit/gjs-typeboost.git
cd gjs-typeboost
```

### 2. Install Dependencies

```bash
npm install --dev 
```

### 3. Build the Project

```bash
make
make pack
```

### 4. Install the Extension Locally

```bash
make install
```

> Note: Replace `NAME` and `DOMAIN` in the Makefile to match your project metadata.

---

## 🛠️ Makefile Commands

- `make` – Build the project (compiles TypeScript)
- `make pack` – Create a ZIP file of your extension for distribution
- `make install` – Install the extension to your local GNOME Shell
- `make clean` – Delete `dist/`, `node_modules/`, and zip files

---

## 📦 package.json Highlights

Includes:
- TypeScript for type-safe development

```json
"devDependencies": {
  "typescript": "^5.0.0",
}
```

---

## 🧠 Author

Built with ❤️ by **Shamveel**

---

## 📝 License

This project is licensed under the MIT License. You are free to use, modify, and distribute it.

---

## 🙌 Contributing

If you have suggestions, feel free to open a pull request or issue on GitHub!

---

## 🔗 Links

- GNOME Shell Extension Docs: https://gjs.guide
- Type Definitions for GNOME: https://girs.dev
