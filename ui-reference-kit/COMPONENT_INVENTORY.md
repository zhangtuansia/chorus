# Component Inventory

Complete catalog of all UI components in the Chorus application.

## Base UI Components (47 components)

Located in: `components/base-ui/`

These are foundational components based on shadcn/ui, providing consistent styling and behavior across the application.

### Buttons & Actions
| Component | File | Description |
|-----------|------|-------------|
| Button | `button.tsx` | Primary button component with variants |
| ButtonVariants | `buttonVariants.ts` | Button variant definitions and styles |
| Toggle | `toggle.tsx` | Toggle button (on/off state) |

### Input & Forms
| Component | File | Description |
|-----------|------|-------------|
| Input | `input.tsx` | Text input field |
| Textarea | `textarea.tsx` | Multi-line text input |
| Checkbox | `checkbox.tsx` | Checkbox input |
| Switch | `switch.tsx` | Toggle switch |
| RadioGroup | `radio-group.tsx` | Radio button group |
| Select | `select.tsx` | Dropdown select |
| Label | `label.tsx` | Form label |

### Dialogs & Modals
| Component | File | Description |
|-----------|------|-------------|
| Dialog | `dialog.tsx` | Modal dialog |
| AlertDialog | `alert-dialog.tsx` | Alert/confirmation dialog |
| Sheet | `sheet.tsx` | Slide-in panel |
| FileDialog | `fileDialog.tsx` | File selection dialog |

### Navigation
| Component | File | Description |
|-----------|------|-------------|
| Sidebar | `sidebar.tsx` | Application sidebar |
| Menubar | `menubar.tsx` | Menu bar |
| Tabs | `tabs.tsx` | Tab navigation |
| Command | `command.tsx` | Command palette |

### Menus & Dropdowns
| Component | File | Description |
|-----------|------|-------------|
| DropdownMenu | `dropdown-menu.tsx` | Dropdown menu |
| ContextMenu | `context-menu.tsx` | Right-click context menu |
| Popover | `popover.tsx` | Popover overlay |
| HoverCard | `hover-card.tsx` | Card shown on hover |

### Feedback & Status
| Component | File | Description |
|-----------|------|-------------|
| Alert | `alert.tsx` | Alert message |
| Tooltip | `tooltip.tsx` | Tooltip on hover |
| Progress | `progress.tsx` | Progress bar |
| Skeleton | `skeleton.tsx` | Loading skeleton |
| Badge | `badge.tsx` | Status badge |
| RetroLoader | `retro-loader.tsx` | Retro-style loading animation |
| RetroSpinner | `retro-spinner.tsx` | Retro-style spinner |

### Layout
| Component | File | Description |
|-----------|------|-------------|
| Card | `card.tsx` | Container card |
| Separator | `separator.tsx` | Visual separator |
| Resizable | `resizable.tsx` | Resizable panels |
| ScrollArea | `scroll-area.tsx` | Custom scrollable area |
| Collapsible | `collapsible.tsx` | Collapsible section |

### Data Display
| Component | File | Description |
|-----------|------|-------------|
| Table | `table.tsx` | Data table |
| Avatar | `avatar.tsx` | User avatar |

### Custom/Specialized
| Component | File | Description |
|-----------|------|-------------|
| ProviderLogo | `provider-logo.tsx` | AI provider logo display |
| DraggableTopBar | `draggable-top-bar.tsx` | Draggable window top bar |
| ErrorBoundary | `ErrorBoundary.tsx` | Error boundary wrapper |

## Feature Components (42 components)

Located in: `components/feature-components/`

Application-specific components that implement Chorus features.

### Core Chat Interface
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| MultiChat | `MultiChat.tsx` | ~3500 | Main multi-model chat interface |
| ChatInput | `ChatInput.tsx` | ~900 | Message input with attachments |
| ReplyChat | `ReplyChat.tsx` | ~250 | Reply/thread chat view |
| RepliesDrawer | `RepliesDrawer.tsx` | ~80 | Drawer for viewing replies |
| ChatSuggestions | `ChatSuggestions.tsx` | ~200 | Suggested prompt chips |

### Navigation & Layout
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| AppSidebar | `AppSidebar.tsx` | ~1400 | Main application sidebar |
| CommandMenu | `CommandMenu.tsx` | ~450 | Command palette (Cmd+K) |
| Home | `Home.tsx` | ~30 | Home/landing page |

### Models & AI
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| ManageModelsBox | `ManageModelsBox.tsx` | ~1100 | Model selection & config |
| ModelPills | `ModelPills.tsx` | ~120 | Display selected models |
| QuickChatModelSelector | `QuickChatModelSelector.tsx` | ~180 | Quick chat model picker |
| MessageCostDisplay | `MessageCostDisplay.tsx` | ~35 | Display message costs |

### Tools & Integrations
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| ToolsBox | `ToolsBox.tsx` | ~380 | MCP tools management |
| ToolPermissionDialog | `ToolPermissionDialog.tsx` | ~190 | Tool permission requests |

### Projects & Organization
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| ProjectView | `ProjectView.tsx` | ~800 | Project detail view |
| MoveToProjectDropdown | `MoveToProjectDropdown.tsx` | ~100 | Move chat to project |
| ListPrompts | `ListPrompts.tsx` | ~250 | Saved prompts list |
| NewPrompt | `NewPrompt.tsx` | ~160 | Create new prompt |

### Settings & Configuration
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| Settings | `Settings.tsx` | ~2500 | Settings/preferences dialog |
| ApiKeysForm | `ApiKeysForm.tsx` | ~150 | API key management |
| PermissionsTab | `PermissionsTab.tsx` | ~450 | Permissions configuration |
| ShortcutRecorder | `ShortcutRecorder.tsx` | ~100 | Keyboard shortcut customization |
| Onboarding | `Onboarding.tsx` | ~150 | User onboarding flow |

### Attachments & Files
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| AttachmentsViews | `AttachmentsViews.tsx` | ~450 | File attachment display |
| ImportChatDialog | `ImportChatDialog.tsx` | ~550 | Import chat from file |

### UI Utilities
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| EditableTitle | `EditableTitle.tsx` | ~120 | Inline editable title |
| EmptyState | `EmptyState.tsx` | ~50 | Empty state placeholder |
| FindInPage | `FindInPage.tsx` | ~500 | In-page search |
| SummaryDialog | `SummaryDialog.tsx` | ~140 | Chat summary generation |
| Metrics | `Metrics.tsx` | ~70 | Usage metrics display |
| ConfirmButton | `ConfirmButton.tsx` | ~60 | Confirmation button |
| CopyButton | `CopyButton.tsx` | ~40 | Copy to clipboard |
| FeedbackButton | `FeedbackButton.tsx` | ~15 | Feedback submission |
| AutoExpandingTextarea | `AutoExpandingTextarea.tsx` | ~40 | Auto-expanding input |

### Drag & Drop
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| Draggable | `Draggable.tsx` | ~25 | Draggable wrapper |
| Droppable | `Droppable.tsx` | ~20 | Drop target wrapper |

### Fun/Experimental
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| AsciiCube | `AsciiCube.tsx` | ~70 | ASCII art cube animation |
| AsciiLogo | `AsciiLogo.tsx` | ~35 | ASCII logo |
| MouseTrackingEye | `MouseTrackingEye.tsx` | ~120 | Eye that follows cursor |
| AccessibilityCheck | `AccessibilityCheck.tsx` | ~90 | Accessibility checker |

### Deprecated
| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| MultiChatDeprecationPath | `MultiChatDeprecationPath.tsx` | ~1400 | Legacy chat implementation |

## Renderer Components (9 components)

Located in: `components/renderers/`

Components for rendering different types of message content.

| Component | File | Description |
|-----------|------|-------------|
| MessageMarkdown | `MessageMarkdown.tsx` | Main markdown renderer with syntax highlighting |
| CodeBlock | `CodeBlock.tsx` | Syntax-highlighted code blocks with copy button |
| ThinkBlock | `ThinkBlock.tsx` | Claude thinking/reasoning blocks |
| LatexBlock | `LatexBlock.tsx` | LaTeX math rendering |
| Mermaid | `Mermaid.tsx` | Mermaid diagram rendering |
| ImagePreview | `ImagePreview.tsx` | Image attachment preview with zoom |
| SVG | `SVG.tsx` | SVG file rendering |
| HTML | `HTML.tsx` | HTML content rendering (sandboxed) |
| WebPreview | `WebPreview.tsx` | Web page preview with metadata |

## Custom Hooks (12 hooks)

Located in: `components/hooks/`

Reusable React hooks for common functionality.

| Hook | File | Description |
|------|------|-------------|
| useAttachments | `useAttachments.ts` | File attachment management |
| useScrollDetection | `useScrollDetection.tsx` | Scroll position detection |
| useShareChat | `useShareChat.ts` | Chat sharing functionality |
| useShortcut | `useShortcut.ts` | Keyboard shortcut handling |
| useAppContext | `useAppContext.ts` | App context access |
| useDatabase | `useDatabase.ts` | Database access |
| useSidebar | `useSidebar.ts` | Sidebar state management |
| useTheme | `useTheme.ts` | Theme management |
| useWaitForAppMetadata | `useWaitForAppMetadata.ts` | Wait for app metadata |
| useMobile | `use-mobile.tsx` | Mobile device detection |
| useSettings | `useSettings.tsx` | Settings access and management |

## Unused/Deprecated Components (1 component)

Located in: `components/unused/`

| Component | File | Status |
|-----------|------|--------|
| CopyButton | `CopyButton.tsx` | Replaced by version in main components |

## Group Chat Prototype (3 components)

Located in: `components/gc-prototype/`

Experimental components for group chat feature (not yet released).

| Component | File | Description |
|-----------|------|-------------|
| GroupChat | `GroupChat.tsx` | Group chat interface |
| GroupChatThread | `GroupChatThread.tsx` | Thread view for group chat |
| CollapsibleMessage | `CollapsibleMessage.tsx` | Collapsible message in group chat |

## Summary Statistics

- **Total Components**: 114
- **Base UI Components**: 47
- **Feature Components**: 42
- **Renderers**: 9
- **Custom Hooks**: 12
- **Unused/Deprecated**: 1
- **Experimental**: 3

### Largest Components (by lines)
1. MultiChat.tsx (~3500 lines)
2. Settings.tsx (~2500 lines)
3. MultiChatDeprecationPath.tsx (~1400 lines)
4. AppSidebar.tsx (~1400 lines)
5. ManageModelsBox.tsx (~1100 lines)
6. ChatInput.tsx (~900 lines)
7. ProjectView.tsx (~800 lines)
8. ImportChatDialog.tsx (~550 lines)
9. FindInPage.tsx (~500 lines)
10. AttachmentsViews.tsx (~450 lines)

### Component Categories by Count
- **Input/Forms**: 7 base + 3 feature = 10
- **Navigation**: 4 base + 3 feature = 7
- **Dialogs/Modals**: 4 base + 4 feature = 8
- **Chat Related**: 5 feature + 9 renderers = 14
- **Settings/Config**: 4 feature = 4
- **Models/AI**: 4 feature = 4
- **Projects**: 4 feature = 4

## Component Dependencies

### Most Used Base Components
1. Button - Used throughout the app
2. Dialog - Multiple dialog implementations
3. Tooltip - Widespread for help text
4. DropdownMenu - Navigation and actions
5. Input/Textarea - All form interactions

### Key Feature Components
1. **MultiChat** - Core of the application
2. **AppSidebar** - Navigation backbone
3. **ChatInput** - Message entry point
4. **ManageModelsBox** - Model configuration
5. **Settings** - App configuration

### Integration Points
- All feature components use base UI components
- Most feature components use custom hooks
- Renderers are used by MultiChat for message display
- Hooks provide data access and state management

---

For detailed component documentation, see the source files in `components/`.
