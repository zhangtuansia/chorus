# Chorus UI Reference Kit

This is a comprehensive reference kit for the Chorus UI components, specifications, and coding standards. Use this as a guide when building or modifying UI components in the Chorus application.

## 📁 Directory Structure

```
ui-reference-kit/
├── components/          # All UI components
│   ├── base-ui/        # shadcn/ui base components (buttons, dialogs, etc.)
│   ├── feature-components/  # Main app feature components
│   ├── renderers/      # Message content renderers (markdown, code, etc.)
│   ├── hooks/          # Custom React hooks
│   └── unused/         # Deprecated/unused components
├── specs/              # Specifications and architecture docs
│   ├── coding-standards/    # Coding style and conventions
│   └── architecture/   # App architecture (providers, context)
├── styles/             # Styling and theming
│   ├── themes/         # Theme definitions
│   └── utilities/      # Utility functions and helpers
└── examples/           # Example usage and main app structure
```

## 🎨 Component Categories

### Base UI Components (`components/base-ui/`)
Foundational UI components based on shadcn/ui library:
- **Buttons**: `button.tsx`, `buttonVariants.ts`
- **Dialogs & Modals**: `dialog.tsx`, `alert-dialog.tsx`, `sheet.tsx`
- **Forms**: `input.tsx`, `textarea.tsx`, `checkbox.tsx`, `select.tsx`, `label.tsx`
- **Navigation**: `sidebar.tsx`, `menubar.tsx`, `tabs.tsx`, `command.tsx`
- **Feedback**: `alert.tsx`, `tooltip.tsx`, `progress.tsx`, `skeleton.tsx`
- **Layout**: `card.tsx`, `separator.tsx`, `resizable.tsx`, `scroll-area.tsx`
- **Overlays**: `popover.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `hover-card.tsx`
- **Data**: `table.tsx`, `badge.tsx`, `avatar.tsx`
- **Controls**: `switch.tsx`, `toggle.tsx`, `radio-group.tsx`, `collapsible.tsx`
- **Custom**: `provider-logo.tsx`, `draggable-top-bar.tsx`, `retro-loader.tsx`, `retro-spinner.tsx`

### Feature Components (`components/feature-components/`)
Main application feature components:

#### Core Chat Interface
- `MultiChat.tsx` - Main chat interface with multi-model support
- `ChatInput.tsx` - Input box for typing messages
- `ReplyChat.tsx` - Reply/thread chat interface
- `RepliesDrawer.tsx` - Drawer for viewing replies

#### Sidebar & Navigation
- `AppSidebar.tsx` - Main application sidebar
- `CommandMenu.tsx` - Command palette (Cmd+K)
- `Home.tsx` - Home/landing view

#### Models & Tools
- `ManageModelsBox.tsx` - Model selection and management
- `ModelPills.tsx` - Display selected models
- `QuickChatModelSelector.tsx` - Quick chat model picker
- `ToolsBox.tsx` - MCP tools management
- `ToolPermissionDialog.tsx` - Tool permission requests

#### Projects & Organization
- `ProjectView.tsx` - Project detail view
- `MoveToProjectDropdown.tsx` - Move chat to project
- `ListPrompts.tsx` - Saved prompts list
- `NewPrompt.tsx` - Create new prompt

#### Settings & Configuration
- `Settings.tsx` - Settings/preferences dialog
- `ApiKeysForm.tsx` - API key management
- `PermissionsTab.tsx` - Permissions configuration
- `ShortcutRecorder.tsx` - Keyboard shortcut customization

#### Utilities & Helpers
- `AttachmentsViews.tsx` - File attachment display
- `ChatSuggestions.tsx` - Chat suggestion chips
- `EditableTitle.tsx` - Inline editable title
- `EmptyState.tsx` - Empty state placeholder
- `FindInPage.tsx` - In-page search functionality
- `ImportChatDialog.tsx` - Import chat from file
- `SummaryDialog.tsx` - Chat summary generation
- `MessageCostDisplay.tsx` - Display message costs
- `Metrics.tsx` - Usage metrics display
- `Onboarding.tsx` - User onboarding flow
- `ConfirmButton.tsx` - Confirmation button with state
- `CopyButton.tsx` - Copy to clipboard button
- `FeedbackButton.tsx` - Feedback submission
- `AutoExpandingTextarea.tsx` - Auto-expanding text input
- `Draggable.tsx`, `Droppable.tsx` - Drag & drop utilities

#### Fun Elements
- `AsciiCube.tsx` - ASCII art cube animation
- `AsciiLogo.tsx` - ASCII logo
- `MouseTrackingEye.tsx` - Eye that follows cursor
- `AccessibilityCheck.tsx` - Accessibility checker

### Renderers (`components/renderers/`)
Components for rendering message content:
- `MessageMarkdown.tsx` - Markdown rendering
- `CodeBlock.tsx` - Syntax-highlighted code blocks
- `ThinkBlock.tsx` - Claude thinking/reasoning blocks
- `LatexBlock.tsx` - LaTeX math rendering
- `Mermaid.tsx` - Mermaid diagram rendering
- `ImagePreview.tsx` - Image attachment preview
- `SVG.tsx` - SVG rendering
- `HTML.tsx` - HTML content rendering
- `WebPreview.tsx` - Web page preview

### Hooks (`components/hooks/`)
Custom React hooks:
- `useAttachments.ts` - File attachment management
- `useScrollDetection.tsx` - Scroll position detection
- `useShareChat.ts` - Chat sharing functionality
- `useShortcut.ts` - Keyboard shortcut handling
- `useAppContext.ts` - App context access
- `useDatabase.ts` - Database access
- `useSidebar.ts` - Sidebar state management
- `useTheme.ts` - Theme management
- `useWaitForAppMetadata.ts` - App metadata loading
- `use-mobile.tsx` - Mobile detection
- `useSettings.tsx` - Settings access

## 🎯 Coding Standards

### TypeScript
- **Strict mode enabled** (`strict: true`)
- **Target**: ES2020
- **Avoid `as` assertions** - Use type hints instead, only use `as` with explanatory comment
- **All promises must be handled** (ESLint enforced)

### Naming Conventions
- **Components**: PascalCase (e.g., `MultiChat`, `ChatInput`)
- **Interfaces**: Prefixed with "I" (e.g., `IProvider`, `IMessage`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAttachments`, `useShortcut`)
- **Files**: Match component name (e.g., `MultiChat.tsx`)

### Imports
Use path aliases instead of relative imports:
- `@ui/*` - UI components and utilities
- `@core/*` - Core business logic
- `@/*` - General src imports

```typescript
// ✅ Good
import { Button } from "@ui/components/ui/button";
import { useDatabase } from "@ui/hooks/useDatabase";

// ❌ Bad
import { Button } from "../../components/ui/button";
import { useDatabase } from "../hooks/useDatabase";
```

### Formatting
- **Indentation**: 4 spaces
- **Prettier** formatting enforced via pre-commit hooks
- **Line length**: Keep reasonable (no hard limit)

### Data Handling
- **Prefer `undefined` over `null`**
- **Convert null from DB**: `parentChatId: row.parent_chat_id ?? undefined`
- **No foreign keys or constraints** - Keep schema flexible

### Dates
- **Read from DB**: Use `convertDate()` to convert to UTC
- **Display**: Use `displayDate()` for formatting
```typescript
import { convertDate, displayDate } from "@ui/lib/utils";

const date = convertDate(row.created_at);
const formatted = displayDate(date);
```

### Restricted Features
**Require explicit permission before using:**
- `setTimeout`
- `useImperativeHandle`
- `useRef`
- Type assertions with `as`

## 🎨 Styling & Theming

### Tailwind Configuration
- **Dark mode**: Class-based (`darkMode: ["class"]`)
- **Font families**: Inter, Geist, Monaspace, JetBrains Mono, Fira Code
- **Custom colors**: Defined via CSS variables in themes
- **Typography plugin**: @tailwindcss/typography for markdown
- **Container queries**: @tailwindcss/container-queries

### CSS Variables
All colors use CSS variables for theme support:
```css
--background
--foreground
--primary
--secondary
--accent
--muted
--destructive
--border
--input
--ring
```

See `styles/themes/` for complete theme definitions.

### Utility Function
Use `cn()` for conditional class names:
```typescript
import { cn } from "@ui/lib/utils";

<div className={cn(
    "base-classes",
    isActive && "active-classes",
    variant === "primary" && "primary-classes"
)} />
```

## 🏗️ Architecture

### Context Providers
- `AppProvider` - Main app state
- `AppMetadataProvider` - App metadata
- `DatabaseProvider` - Database access
- `SidebarProvider` - Sidebar state
- `ThemeProvider` - Theme management

See `specs/architecture/providers/` and `specs/architecture/context/` for details.

### Data Flow
1. **Database** (`src/core/chorus/db/`) - SQL queries by entity
2. **API Layer** (`src/core/chorus/api/`) - TanStack Query queries/mutations
3. **Components** - Use hooks to access API layer
4. **UI Updates** - React Query handles caching and updates

### State Management
- **TanStack Query** for server state (chats, messages, models)
- **React Context** for app-level state (theme, sidebar, settings)
- **Local state** for component-specific state

## 📱 Key Features Implementation

### Multi-Model Chat
See `MultiChat.tsx` - Sends prompts to multiple models simultaneously

### Quick Chats (Ambient Chats)
Lightweight chat windows - implemented in `MultiChat.tsx`

### Projects
Folder organization for chats - starts in `AppSidebar.tsx`

### MCP Tools
Tool/connection management - see `Toolsets.ts` and `ToolsBox.tsx`

### Routing
Uses `react-router-dom` - see `examples/App.tsx`

## 🔍 Quick Reference

### Component Sizes
- `xs`: 10px / 12px line height
- `sm`: 12px / 16px line height
- `base`: 14px / 20px line height (default)
- `lg`: 16px / 24px line height

### Font Weights
- `light`: 250
- `default`: 400
- `medium`: 450
- `semibold`: 500

### Border Radius
- `sm`: calc(var(--radius) - 4px)
- `md`: calc(var(--radius) - 2px)
- `lg`: var(--radius)

### Common Patterns

#### Button Usage
```typescript
import { Button } from "@ui/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">More</Button>
```

#### Dialog Usage
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/components/ui/dialog";

<Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Content */}
    </DialogContent>
</Dialog>
```

#### Toast Notifications
```typescript
import { toast } from "sonner";

toast.success("Success message");
toast.error("Error message");
toast.info("Info message");
```

## 📚 Additional Resources

- **Main Docs**: See `CLAUDE.md` in project root
- **Schema**: See `SCHEMA.md` for database schema
- **Screenshots**: `screenshots/` directory for visual reference

## 🚀 Getting Started

1. Browse `components/` to see available components
2. Check `specs/coding-standards/` for coding guidelines
3. Review `styles/` for theming and styling patterns
4. Look at `examples/` for usage examples
5. Reference this README for quick lookups

---

**Note**: This reference kit is a snapshot of the UI components and specifications. Always check the main codebase for the most up-to-date implementations.
