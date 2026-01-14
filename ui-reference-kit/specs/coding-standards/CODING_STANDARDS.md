# Chorus Coding Standards

Complete coding standards and conventions for the Chorus UI codebase.

## TypeScript Configuration

### Compiler Settings
- **Target**: ES2020
- **Strict mode**: Enabled
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx
- **Unused variables/parameters**: Error on unused

### Path Aliases
```json
{
  "@ui/*": ["./src/ui/*"],
  "@core/*": ["./src/core/*"],
  "@/*": ["./src/*"]
}
```

Always use these aliases instead of relative imports.

## Naming Conventions

### Components
**PascalCase** for React components:
```typescript
// ✅ Good
export function MultiChat() { }
export function ChatInput() { }
export function AppSidebar() { }

// ❌ Bad
export function multiChat() { }
export function chat_input() { }
```

### Interfaces
**Prefixed with "I"**:
```typescript
// ✅ Good
interface IProvider {
    name: string;
    apiKey: string;
}

interface IMessage {
    id: string;
    content: string;
}

// ❌ Bad
interface Provider { }
interface MessageType { }
```

### Hooks
**camelCase with "use" prefix**:
```typescript
// ✅ Good
export function useAttachments() { }
export function useScrollDetection() { }

// ❌ Bad
export function UseAttachments() { }
export function attachments() { }
```

### Files
**Match component name**:
```
MultiChat.tsx      // for MultiChat component
useAttachments.ts  // for useAttachments hook
button.tsx         // for Button component (lowercase for base UI)
```

## Import Style

### Use Path Aliases
```typescript
// ✅ Good
import { Button } from "@ui/components/ui/button";
import { useDatabase } from "@ui/hooks/useDatabase";
import { Chat } from "@core/chorus/api/ChatAPI";

// ❌ Bad
import { Button } from "../../components/ui/button";
import { useDatabase } from "../hooks/useDatabase";
import { Chat } from "../../../core/chorus/api/ChatAPI";
```

### Import Order
1. React and external libraries
2. @ui imports
3. @core imports
4. @/ imports
5. Relative imports (if unavoidable)
6. CSS imports

```typescript
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@ui/components/ui/button";
import { useDatabase } from "@ui/hooks/useDatabase";

import { Chat } from "@core/chorus/api/ChatAPI";

import "./styles.css";
```

## Type Safety

### Strict Typing
Always provide explicit types. Avoid `any`.

```typescript
// ✅ Good
interface Props {
    chatId: string;
    onClose: () => void;
    messages: IMessage[];
}

function ChatView({ chatId, onClose, messages }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const data = useQuery<Chat>(...);
}

// ❌ Bad
function ChatView({ chatId, onClose, messages }: any) {
    const [loading, setLoading] = useState(false); // unclear type
    const data = useQuery(...); // no type parameter
}
```

### Avoid Type Assertions
Only use `as` in exceptional circumstances with explanatory comment:

```typescript
// ✅ Good - no assertion needed
const chat: Chat = await fetchChat(id);

// ⚠️ Acceptable with comment
// Converting from legacy format that lacks type info
const provider = data as IProvider;

// ❌ Bad - no explanation
const result = response as any;
```

### Use Type Hints
Prefer type hints over assertions:

```typescript
// ✅ Good
const messages: IMessage[] = [];
const chat: Chat | undefined = chats.find(c => c.id === id);

// ❌ Bad
const messages = [] as IMessage[];
const chat = chats.find(c => c.id === id) as Chat;
```

## Promise Handling

### All Promises Must Be Handled
ESLint enforces promise handling:

```typescript
// ✅ Good
async function loadChat() {
    await fetchChat(id);
}

function onClick() {
    void loadChat(); // explicitly void for fire-and-forget
}

// Alternative
function onClick() {
    loadChat().catch(error => {
        console.error("Failed to load chat:", error);
    });
}

// ❌ Bad
function onClick() {
    loadChat(); // ESLint error: promise not handled
}
```

## Data Handling

### Prefer undefined over null
```typescript
// ✅ Good
interface IChat {
    parentChatId?: string;
    projectId?: string;
}

const chat = {
    id: "123",
    parentChatId: undefined,
};

// ❌ Bad
interface IChat {
    parentChatId: string | null;
}

const chat = {
    id: "123",
    parentChatId: null,
};
```

### Convert null from Database
SQLite may return null - convert to undefined:

```typescript
// ✅ Good
const chat: IChat = {
    id: row.id,
    parentChatId: row.parent_chat_id ?? undefined,
    projectId: row.project_id ?? undefined,
};

// ❌ Bad
const chat = {
    id: row.id,
    parentChatId: row.parent_chat_id, // may be null
};
```

### No Foreign Keys or Constraints
Keep database schema flexible:

```sql
-- ✅ Good
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    chat_id TEXT NOT NULL,
    content TEXT
);

-- ❌ Bad
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    chat_id TEXT NOT NULL,
    content TEXT,
    FOREIGN KEY (chat_id) REFERENCES chats(id)
);
```

## Date Handling

### Reading from Database
Use `convertDate()` to convert to UTC:

```typescript
import { convertDate, displayDate } from "@ui/lib/utils";

// SQLite stores dates without 'Z' suffix
const createdAt = convertDate(row.created_at); // Converts to UTC Date
```

### Displaying Dates
Use `displayDate()` for user-friendly formatting:

```typescript
import { convertDate, displayDate } from "@ui/lib/utils";

const date = convertDate(row.created_at);
const formatted = displayDate(date);
// Output: "Jan 14, 2025, 3:45 PM PST"
```

## Formatting

### Indentation
4 spaces (enforced by Prettier):

```typescript
function Component() {
    return (
        <div>
            <button onClick={() => {
                console.log("clicked");
            }}>
                Click me
            </button>
        </div>
    );
}
```

### Line Length
No hard limit, but keep reasonable (80-120 characters preferred):

```typescript
// ✅ Good
const result = await fetchData(
    chatId,
    options
);

// ⚠️ Acceptable
const result = await fetchData(chatId, { includeMessages: true, limit: 100 });

// ❌ Bad
const result = await fetchDataWithMessagesAndAttachmentsAndMetadataAndEverythingElse(chatId, projectId, userId, { includeMessages: true, includeAttachments: true, includeMetadata: true, limit: 100 });
```

### Prettier
Pre-commit hooks automatically format code. Configuration:
- Single quotes
- Trailing commas where valid
- Semicolons required
- Tab width: 4

## Restricted Features

### Require Permission Before Using

The following features require explicit permission from the user:

1. **setTimeout / setInterval**
   - May cause memory leaks
   - Consider alternatives: `useEffect` cleanup, TanStack Query refetch intervals

2. **useImperativeHandle**
   - Breaks React's declarative model
   - Usually indicates design issue

3. **useRef** (for DOM manipulation)
   - Prefer controlled components
   - May be needed for focus management or third-party libraries

4. **Type assertions with `as`**
   - Usually indicates missing type safety
   - Must include explanatory comment if used

```typescript
// ❌ Don't use without permission
setTimeout(() => { }, 1000);
const ref = useRef<HTMLDivElement>(null);
const value = data as string;

// ✅ Ask first and explain why it's necessary
```

## React Patterns

### Functional Components
Always use functional components with hooks:

```typescript
// ✅ Good
function ChatInput({ chatId }: { chatId: string }) {
    const [value, setValue] = useState("");

    return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// ❌ Bad - class components
class ChatInput extends React.Component { }
```

### Props Interface
Define props interface separately for clarity:

```typescript
// ✅ Good
interface ChatInputProps {
    chatId: string;
    onSubmit: (content: string) => void;
    placeholder?: string;
}

export function ChatInput({ chatId, onSubmit, placeholder }: ChatInputProps) {
    // ...
}

// ❌ Bad - inline props
export function ChatInput({ chatId, onSubmit, placeholder }: {
    chatId: string;
    onSubmit: (content: string) => void;
    placeholder?: string;
}) {
    // ...
}
```

### Custom Hooks
Extract reusable logic into custom hooks:

```typescript
// ✅ Good
function useChat(chatId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => fetchChat(chatId),
    });

    return { chat: data, loading: isLoading };
}

// Usage
function ChatView({ chatId }: { chatId: string }) {
    const { chat, loading } = useChat(chatId);
    // ...
}
```

## Error Handling

### Try-Catch for Async Operations
```typescript
async function loadChat() {
    try {
        const chat = await fetchChat(id);
        setChat(chat);
    } catch (error) {
        console.error("Failed to load chat:", error);
        toast.error("Failed to load chat");
    }
}
```

### Toast for User-Facing Errors
```typescript
import { toast } from "sonner";

try {
    await saveChat(chat);
    toast.success("Chat saved");
} catch (error) {
    toast.error("Failed to save chat");
}
```

## Performance

### Memoization
Use `useMemo` and `useCallback` judiciously:

```typescript
// ✅ Good - expensive computation
const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
}, [messages]);

// ✅ Good - callback passed to child
const handleSubmit = useCallback((content: string) => {
    sendMessage(content);
}, [sendMessage]);

// ❌ Bad - premature optimization
const total = useMemo(() => a + b, [a, b]);
```

## Comments

### When to Comment
- Explain *why*, not *what*
- Document non-obvious behavior
- Clarify complex algorithms
- Note workarounds or temporary solutions

```typescript
// ✅ Good
// SQLite stores dates without 'Z' suffix, so we need to add it
// to parse the date correctly as UTC
const date = new Date(row.created_at + "Z");

// ✅ Good
// Temporary: Skip validation until API v2 is deployed
if (!skipValidation) {
    validate(data);
}

// ❌ Bad - obvious from code
// Set loading to true
setLoading(true);
```

### JSDoc for Public APIs
Document exported functions and components:

```typescript
/**
 * Converts a SQLite date string to a UTC Date object.
 * SQLite stores dates without the 'Z' suffix.
 */
export function convertDate(d: string): Date {
    return new Date(d + "Z");
}
```

## Testing

(To be added as testing practices are established)

## Git Commit Messages

- Use present tense: "Add feature" not "Added feature"
- Use imperative mood: "Fix bug" not "Fixes bug"
- Reference issue numbers: "#123"
- Keep first line under 72 characters

```
Add multi-model chat support (#123)

- Implement model selection UI
- Add API support for multiple models
- Update chat view to display multiple responses
```

---

**Remember**: These standards are enforced by ESLint and Prettier via pre-commit hooks. Code that doesn't meet standards will be automatically formatted or rejected.
