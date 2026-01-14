# UI Reference Kit Index

Quick navigation to all documentation and resources in this UI reference kit.

## 📖 Documentation

### Getting Started
- **[README.md](./README.md)** - Main overview and directory structure
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide for new developers
- **[COMPONENT_INVENTORY.md](./COMPONENT_INVENTORY.md)** - Complete list of all components

### Specifications
- **[specs/coding-standards/CODING_STANDARDS.md](./specs/coding-standards/CODING_STANDARDS.md)** - Complete coding standards
- **[specs/UI_PATTERNS.md](./specs/UI_PATTERNS.md)** - Common UI patterns and best practices

### Visual & Configuration
- **[SCREENSHOTS.md](./SCREENSHOTS.md)** - Visual reference with UI screenshots
- **[config/CONFIG_GUIDE.md](./config/CONFIG_GUIDE.md)** - Configuration files documentation

## 📁 Component Directories

### Base UI Components
**Location:** `components/base-ui/`

Foundational shadcn/ui components:
- Buttons, forms, inputs
- Dialogs, sheets, popovers
- Navigation, menus, tabs
- Feedback, alerts, tooltips
- Layout, cards, separators
- Data display

**[View all 47 base components →](./COMPONENT_INVENTORY.md#base-ui-components-47-components)**

### Feature Components
**Location:** `components/feature-components/`

Application-specific components:
- Chat interface (`MultiChat.tsx`, `ChatInput.tsx`)
- Sidebar and navigation (`AppSidebar.tsx`, `CommandMenu.tsx`)
- Models and AI (`ManageModelsBox.tsx`, `ModelPills.tsx`)
- Projects and organization
- Settings and configuration
- Tools and integrations

**[View all 42 feature components →](./COMPONENT_INVENTORY.md#feature-components-42-components)**

### Renderers
**Location:** `components/renderers/`

Message content renderers:
- Markdown, code blocks
- LaTeX, Mermaid diagrams
- Images, SVG, HTML
- Web previews
- Think blocks

**[View all 9 renderers →](./COMPONENT_INVENTORY.md#renderer-components-9-components)**

### Custom Hooks
**Location:** `components/hooks/`

Reusable React hooks:
- `useAttachments` - File attachment management
- `useScrollDetection` - Scroll position tracking
- `useShortcut` - Keyboard shortcuts
- `useShareChat` - Chat sharing
- And more...

**[View all 12 hooks →](./COMPONENT_INVENTORY.md#custom-hooks-12-hooks)**

### Experimental Components
**Location:** `components/gc-prototype/`

Group chat prototype (experimental):
- `GroupChat.tsx` - Group chat interface
- `GroupChatThread.tsx` - Thread view
- `CollapsibleMessage.tsx` - Collapsible messages

## 🎨 Styles & Theming

### Theme System
**Location:** `styles/themes/`

- Theme definitions and color palettes
- CSS variable system
- Dark mode support

### Tailwind Configuration
**Location:** `styles/tailwind.config.cjs`

- Custom colors and fonts
- Typography plugin config
- Animations and transitions
- Container queries

### Utilities
**Location:** `styles/utilities/`

- `cn()` - Class name utility
- `displayDate()` - Date formatting
- `convertDate()` - SQLite date conversion
- And more...

## 🏗️ Architecture

### Providers
**Location:** `specs/architecture/providers/`

- `AppProvider` - Main app state
- `DatabaseProvider` - Database access
- `SidebarProvider` - Sidebar state
- `ThemeProvider` - Theme management

### Context
**Location:** `specs/architecture/context/`

- React context definitions
- State management patterns

## ⚙️ Configuration

### Configuration Files
**Location:** `config/`

- **package.json** - Dependencies and npm scripts
- **eslint.config.mjs** - ESLint rules and configuration
- **.prettierrc** - Prettier formatting settings
- **vite.config.ts** - Vite build tool configuration
- **tsconfig.json** - TypeScript compiler settings
- **tailwind.config.cjs** - Tailwind CSS configuration

**[View configuration guide →](./config/CONFIG_GUIDE.md)**

## 📸 Visual Reference

### Screenshots
**Location:** `screenshots/`

Five UI screenshots for visual reference:
1. **Empty Chat View** - Initial state
2. **Active Chat** - Conversation in progress
3. **Model Picker** - Model selection interface
4. **Tools/Connections** - MCP tools management
5. **Quick Chat** - Ambient chat window

**[View screenshot descriptions →](./SCREENSHOTS.md)**

## 📚 Documentation by Topic

### For New Developers
1. Start with [README.md](./README.md) - Overview
2. Read [QUICK_START.md](./QUICK_START.md) - Get coding fast
3. Browse [COMPONENT_INVENTORY.md](./COMPONENT_INVENTORY.md) - See what's available

### For UI Development
1. Check [UI_PATTERNS.md](./specs/UI_PATTERNS.md) - Common patterns
2. Review [CODING_STANDARDS.md](./specs/coding-standards/CODING_STANDARDS.md) - Standards
3. Explore `components/base-ui/` - Base components

### For Component Development
1. Read [QUICK_START.md](./QUICK_START.md) - Creating components
2. Study existing components in `components/feature-components/`
3. Follow patterns in [UI_PATTERNS.md](./specs/UI_PATTERNS.md)

### For Architecture Understanding
1. Review `specs/architecture/` - Providers and context
2. Read [CODING_STANDARDS.md](./specs/coding-standards/CODING_STANDARDS.md) - Data flow
3. Examine `examples/App.tsx` - Root component

## 🔍 Quick References

### Component Lookup
Need a specific component? Check:
1. [COMPONENT_INVENTORY.md](./COMPONENT_INVENTORY.md) - Full catalog with descriptions
2. `components/` directories - Actual source code

### Pattern Lookup
Need to implement a pattern? Check:
1. [UI_PATTERNS.md](./specs/UI_PATTERNS.md) - Layout, interaction, and data patterns
2. [QUICK_START.md](./QUICK_START.md) - Common tasks

### Standards Lookup
Need to check a standard? See:
1. [CODING_STANDARDS.md](./specs/coding-standards/CODING_STANDARDS.md) - TypeScript, naming, formatting

## 📊 Statistics

- **Total Components**: 117 (114 + 3 experimental)
- **Base UI**: 47 components
- **Feature Components**: 42 components
- **Renderers**: 9 components
- **Custom Hooks**: 12 hooks
- **Experimental**: 3 components (gc-prototype)
- **Documentation Pages**: 8 pages
- **Screenshots**: 5 UI reference images
- **Configuration Files**: 6 files

## 🎯 Common Tasks

| Task | Documentation |
|------|---------------|
| Create a new component | [QUICK_START.md](./QUICK_START.md#creating-a-new-component) |
| Add a dialog | [QUICK_START.md](./QUICK_START.md#adding-a-dialog) |
| Style a component | [QUICK_START.md](./QUICK_START.md#styling-a-component) |
| Work with database | [QUICK_START.md](./QUICK_START.md#working-with-database) |
| Handle user input | [QUICK_START.md](./QUICK_START.md#handling-user-input) |
| Show notifications | [QUICK_START.md](./QUICK_START.md#showing-notifications) |
| Implement forms | [UI_PATTERNS.md](./specs/UI_PATTERNS.md#form-patterns) |
| Add navigation | [UI_PATTERNS.md](./specs/UI_PATTERNS.md#navigation-patterns) |
| Loading states | [UI_PATTERNS.md](./specs/UI_PATTERNS.md#loading-states) |
| Error handling | [UI_PATTERNS.md](./specs/UI_PATTERNS.md#error-states) |
| Setup configuration | [CONFIG_GUIDE.md](./config/CONFIG_GUIDE.md) |
| View UI examples | [SCREENSHOTS.md](./SCREENSHOTS.md) |

## 🔗 External Resources

### Related Project Documentation
- **CLAUDE.md** (project root) - Main onboarding document
- **SCHEMA.md** (project root) - Database schema
- **README.md** (project root) - Project README

### Tools & Libraries
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type system
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Base components
- [TanStack Query](https://tanstack.com/query/) - Data fetching
- [Tauri](https://tauri.app/) - Desktop framework

## 📝 Notes

- This reference kit is a snapshot of the UI at a point in time
- Always check the main codebase (`src/ui/`) for the most current code
- Components may have been updated since this reference was created
- Use this as a learning and reference tool, not as executable code

## 🚀 Getting Help

1. **Browse this reference kit** - Most answers are here
2. **Check the component source** - See how it's actually implemented
3. **Read the main docs** - CLAUDE.md, SCHEMA.md in project root
4. **Ask questions** - Use the feedback mechanisms in the app

---

**Ready to start?** → Go to [QUICK_START.md](./QUICK_START.md)

**Need a component?** → Check [COMPONENT_INVENTORY.md](./COMPONENT_INVENTORY.md)

**Learning patterns?** → Read [UI_PATTERNS.md](./specs/UI_PATTERNS.md)

**Want standards?** → See [CODING_STANDARDS.md](./specs/coding-standards/CODING_STANDARDS.md)
