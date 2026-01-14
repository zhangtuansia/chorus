# Configuration Guide

This directory contains all configuration files for the Chorus project. Understanding these configurations is essential for development.

## 📋 Configuration Files

### package.json
**Purpose:** Project dependencies and scripts

**Key Sections:**

#### Dependencies
The project uses many modern libraries:

**UI Framework:**
- `react` - Core UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing

**UI Components:**
- `@radix-ui/*` - Headless UI primitives (base for shadcn/ui)
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `cmdk` - Command palette

**Styling:**
- `tailwindcss` - Utility-first CSS
- `tailwindcss-animate` - Animation utilities
- `@tailwindcss/typography` - Typography plugin
- `@tailwindcss/container-queries` - Container query support
- `clsx` & `tailwind-merge` - Class name utilities

**Data Management:**
- `@tanstack/react-query` - Server state management
- `zustand` - Client state management (if used)

**AI SDKs:**
- `@anthropic-ai/sdk` - Claude API
- `@google/generative-ai` - Gemini API
- `@modelcontextprotocol/sdk` - MCP support
- `openai` - OpenAI API

**Code Rendering:**
- `react-markdown` - Markdown rendering
- `react-syntax-highlighter` - Code highlighting
- `katex` - LaTeX math rendering
- `mermaid` - Diagram rendering

**Desktop Integration:**
- `@tauri-apps/*` - Tauri desktop framework

**Utilities:**
- `date-fns` - Date manipulation
- `lodash` - Utility functions
- `uuid` - UUID generation

#### Scripts
```json
{
  "dev": "./script/dev-instance.sh",          // Start development
  "build": "tsc && vite build",               // Build production
  "lint": "eslint . --ext .ts,.tsx,.js,.jsx", // Lint code
  "format": "prettier --write .",             // Format code
  "test": "vitest",                           // Run tests
  "tauri:dev": "tauri dev",                   // Start Tauri dev
  "validate": "./script/validate.sh"          // Run all checks
}
```

**Important Commands:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Check code quality
- `pnpm format` - Auto-format code
- `pnpm validate` - Run all validation checks

#### Engine Requirements
```json
{
  "engines": {
    "node": ">=22.0.0"
  }
}
```
**Note:** Requires Node.js 22 or higher

---

### eslint.config.mjs
**Purpose:** Code quality and consistency enforcement

**Key Rules:**

#### TypeScript Rules
- **Strict typing** enforced
- **No unused variables** (`noUnusedLocals: true`)
- **No unused parameters** (`noUnusedParameters: true`)
- **Promise handling** required (no floating promises)

#### React Rules
- **Hooks rules** enforced
- **JSX key** prop required
- **Prop types** validation

#### Code Style
- **Consistent imports**
- **No console.log** warnings
- **Proper error handling**

**How to Use:**
```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix
```

**Editor Integration:**
Most editors (VS Code, WebStorm) have ESLint plugins that show errors inline.

---

### .prettierrc
**Purpose:** Code formatting consistency

**Configuration:**
```json
{
  "semi": true,              // Semicolons required
  "trailingComma": "all",   // Trailing commas
  "singleQuote": false,     // Double quotes
  "tabWidth": 4,            // 4-space indentation
  "printWidth": 80          // Line wrap at 80 chars
}
```

**Key Settings:**
- **Tab Width:** 4 spaces (not 2!)
- **Quotes:** Double quotes, not single
- **Semicolons:** Required
- **Trailing Commas:** Always use them

**How to Use:**
```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

**Auto-formatting:**
- Pre-commit hooks auto-format on commit
- Most editors can format on save

**Editor Setup (VS Code):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

### vite.config.ts
**Purpose:** Build tool configuration

**Key Features:**

#### Path Aliases
```typescript
{
  resolve: {
    alias: {
      '@ui': '/src/ui',
      '@core': '/src/core',
      '@': '/src'
    }
  }
}
```
**Usage:** `import { Button } from '@ui/components/ui/button'`

#### Development Server
- **Port:** Default or specified
- **Hot Module Replacement:** Enabled
- **Fast Refresh:** For React

#### Build Optimization
- **Code splitting:** Automatic
- **Tree shaking:** Remove unused code
- **Minification:** Production builds
- **Source maps:** For debugging

#### Plugins
- `@vitejs/plugin-react` - React support with Fast Refresh
- Tauri plugin - Desktop integration

**Build Commands:**
```bash
# Development
pnpm vite:dev

# Production build
pnpm build

# Preview production build
pnpm vite:preview
```

---

### tsconfig.json
**Purpose:** TypeScript compiler configuration

**Location:** `../specs/tsconfig.json` (copied to reference kit)

**Key Settings:**
- **Target:** ES2020
- **Strict mode:** Enabled
- **Module resolution:** Bundler
- **JSX:** react-jsx
- **Path aliases:** Configured

See [CODING_STANDARDS.md](../specs/coding-standards/CODING_STANDARDS.md) for details.

---

### tailwind.config.cjs
**Purpose:** Tailwind CSS configuration

**Location:** `../styles/tailwind.config.cjs` (copied to reference kit)

**Key Features:**
- **Dark mode:** Class-based
- **Custom colors:** CSS variables
- **Typography plugin:** For markdown
- **Custom fonts:** Geist, Monaspace, etc.
- **Animations:** Custom keyframes
- **Container queries:** Support

See [README.md](../README.md#styling--theming) for details.

---

## 🔄 Development Workflow

### Initial Setup
```bash
# Install dependencies
pnpm install

# Setup instance (if needed)
pnpm setup
```

### Development
```bash
# Start development server
pnpm dev

# In another terminal, run linting
pnpm lint
```

### Before Committing
```bash
# Validate everything
pnpm validate

# Or manually:
pnpm lint
pnpm format:check
pnpm test
pnpm build
```

**Note:** Pre-commit hooks (Husky) automatically run:
- Prettier formatting
- ESLint checks
- TypeScript checks

### Building
```bash
# Build for production
pnpm build

# Test the build
pnpm vite:preview
```

---

## 🛠️ Configuration Best Practices

### When Adding Dependencies

1. **Check if it exists:**
   ```bash
   pnpm list <package-name>
   ```

2. **Add to correct section:**
   - `dependencies` - Runtime dependencies
   - `devDependencies` - Development only

3. **Use specific versions:**
   - Avoid `^` or `~` for major dependencies
   - Pin versions for stability

### When Modifying ESLint

1. **Test the rule:**
   ```bash
   pnpm lint
   ```

2. **Document reasoning:**
   - Why the rule was added/changed
   - What problems it solves

3. **Check impact:**
   - Run on entire codebase
   - Fix or suppress existing violations

### When Changing Prettier

1. **Format entire codebase:**
   ```bash
   pnpm format
   ```

2. **Commit formatting separately:**
   - Don't mix formatting with logic changes
   - Makes reviews easier

### When Updating TypeScript Config

1. **Check for breaking changes:**
   ```bash
   pnpm build
   ```

2. **Update incrementally:**
   - One setting at a time
   - Test thoroughly

---

## 📚 Configuration References

### ESLint
- [ESLint Docs](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)

### Prettier
- [Prettier Docs](https://prettier.io/docs/en/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

### Vite
- [Vite Docs](https://vitejs.dev/)
- [Vite Config](https://vitejs.dev/config/)
- [Vite React Plugin](https://github.com/vitejs/vite-plugin-react)

### TypeScript
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)

### Tailwind
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Config](https://tailwindcss.com/docs/configuration)

---

## 🔍 Troubleshooting

### Build Errors

**Problem:** "Cannot find module '@ui/...'"
**Solution:** Check `vite.config.ts` path aliases

**Problem:** TypeScript errors
**Solution:** Run `pnpm build` to see full errors

### Linting Issues

**Problem:** ESLint errors on save
**Solution:** Run `pnpm lint:fix`

**Problem:** Prettier conflicts with ESLint
**Solution:** Prettier should run last (configured correctly)

### Dependencies

**Problem:** Dependency version conflicts
**Solution:**
```bash
pnpm install --force
# or
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Performance

**Problem:** Slow development server
**Solution:**
- Check Vite config
- Clear cache: `rm -rf node_modules/.vite`

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Start dev | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Format | `pnpm format` |
| Test | `pnpm test` |
| Validate all | `pnpm validate` |

---

**For more details, check the actual configuration files in this directory!**
