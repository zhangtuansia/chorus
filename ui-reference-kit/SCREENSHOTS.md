# Visual Reference - Screenshots

This directory contains screenshots of the Chorus application UI for visual reference.

## 📸 Available Screenshots

### 1. Empty Chat View
**File:** `1_empty_chat.png`

Shows the initial state of the application with:
- Empty chat interface
- Sidebar with navigation
- Model selection area
- Input box at the bottom

**Key UI Elements:**
- AppSidebar (left side)
- Empty state message
- ChatInput component
- Model pills/selector

---

### 2. Active Chat
**File:** `2_chat.png`

Displays an active conversation with:
- Messages from multiple AI models
- Message formatting (markdown rendering)
- User and assistant messages
- Chat history in sidebar

**Key UI Elements:**
- MultiChat component with messages
- MessageMarkdown renderer
- Sidebar with chat list
- Active chat highlighting

---

### 3. Model Picker
**File:** `3_model_picker.png`

Shows the model selection interface:
- Available AI models
- Model configuration options
- Provider logos
- Enable/disable toggles

**Key UI Elements:**
- ManageModelsBox component
- Model list with providers
- Configuration options
- Search/filter capabilities

**Related Components:**
- `ManageModelsBox.tsx` - Main model management interface
- `ModelPills.tsx` - Selected model display
- `QuickChatModelSelector.tsx` - Quick chat picker

---

### 4. Tools/Connections
**File:** `4_tools_aka_connections.png`

Displays MCP tools and connections:
- Available tools/toolsets
- Tool configurations
- Connection status
- Permission settings

**Key UI Elements:**
- ToolsBox component
- Tool list and configuration
- Connection management
- Permission dialogs

**Related Components:**
- `ToolsBox.tsx` - Main tools interface
- `ToolPermissionDialog.tsx` - Permission requests
- `PermissionsTab.tsx` - Settings tab

---

### 5. Quick Chat (Ambient Chat)
**File:** `5_quick_chat.png`

Shows the lightweight quick chat window:
- Floating chat interface
- Model selector
- Minimal UI design
- Keyboard shortcut access (⌥Space)

**Key UI Elements:**
- QuickChatModelSelector
- Lightweight MultiChat variant
- Draggable top bar
- Compact layout

**Related Components:**
- `QuickChatModelSelector.tsx`
- `DraggableTopBar.tsx`
- MultiChat.tsx (quick chat mode)

---

## 🎨 UI Design Patterns Observable

### Color Scheme
- Light/dark mode support
- Neutral color palette
- Accent colors for highlights
- Clear visual hierarchy

### Layout
- **Sidebar navigation** (left)
- **Main content area** (center)
- **Input area** (bottom)
- **Modal overlays** (for settings, dialogs)

### Typography
- Clear, readable fonts
- Size hierarchy (headings, body, small text)
- Monospace for code
- Sans-serif for UI text

### Spacing
- Consistent padding and margins
- Clear section separation
- Breathing room between elements
- Compact but not cramped

### Components Visible
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Cards**: Grouped content areas
- **Badges**: Model indicators, status
- **Icons**: Lucide icons throughout
- **Dropdowns**: Action menus
- **Inputs**: Text fields, textareas
- **Dialogs**: Settings, confirmations

## 📐 Layout Measurements

From the screenshots, you can observe:

### Sidebar Width
- Approximately 240-280px
- Collapsible/expandable
- Resizable with handle

### Main Content
- Flexible width
- Max-width for readability
- Responsive to window size

### Input Area
- Fixed at bottom
- Auto-expanding textarea
- Attachment preview area

### Message Spacing
- Vertical spacing between messages
- Padding inside message cards
- Clear sender identification

## 🎯 Use Cases for Screenshots

### For Developers
1. **Visual reference** when implementing new features
2. **Layout understanding** for component placement
3. **Styling reference** for consistent design
4. **Component identification** - see components in action

### For Designers
1. **Current state** of the application
2. **Design patterns** being used
3. **Visual hierarchy** and spacing
4. **Color and typography** choices

### For Documentation
1. **User guides** and tutorials
2. **Feature demonstrations**
3. **Bug reporting** with visual context
4. **Design discussions**

## 📝 Notes

- **Date**: These screenshots represent the UI as of the time this reference kit was created
- **Updates**: The actual application may have evolved since these were captured
- **Resolution**: Screenshots are at standard desktop resolution
- **Theme**: Appears to be light mode (check for dark mode variations in the app)

## 🔗 Related Documentation

- [README.md](./README.md) - Main overview
- [COMPONENT_INVENTORY.md](./COMPONENT_INVENTORY.md) - Component catalog
- [UI_PATTERNS.md](./specs/UI_PATTERNS.md) - Design patterns
- [Component source files](./components/) - Actual implementations

---

**Tip:** When implementing new features, refer to these screenshots to maintain visual consistency with the existing design!
