# Quick Start Guide

Get up and running with Chorus UI development quickly.

## 🎯 First Steps

### 1. Understand the Project Structure

```
src/ui/
├── components/         # All React components
│   ├── ui/            # Base shadcn/ui components
│   ├── renderers/     # Message content renderers
│   └── *.tsx          # Feature components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── providers/         # Context providers
├── context/           # React contexts
├── themes/            # Theme definitions
└── App.tsx           # Root component
```

### 2. Set Up Your Environment

**Required Tools:**
- Node.js (ES2020+)
- pnpm (package manager)
- TypeScript knowledge
- React experience

**Install Dependencies:**
```bash
pnpm install
```

**Start Development:**
```bash
pnpm dev
```

### 3. Read Key Documentation

1. **CLAUDE.md** - Project onboarding (in project root)
2. **This reference kit** - UI component guide
3. **SCHEMA.md** - Database schema (in project root)

## 🚀 Common Tasks

### Creating a New Component

**1. Feature Component**

```typescript
// src/ui/components/MyNewComponent.tsx
import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { useDatabase } from "@ui/hooks/useDatabase";

interface MyNewComponentProps {
    chatId: string;
    onClose: () => void;
}

export function MyNewComponent({ chatId, onClose }: MyNewComponentProps) {
    const [loading, setLoading] = useState(false);
    const db = useDatabase();

    const handleAction = async () => {
        setLoading(true);
        try {
            // Your logic here
            await db.updateChat(chatId, { /* ... */ });
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-medium">My Component</h2>
            <Button
                onClick={handleAction}
                disabled={loading}
            >
                {loading ? "Loading..." : "Do Something"}
            </Button>
            <Button
                variant="outline"
                onClick={onClose}
            >
                Close
            </Button>
        </div>
    );
}
```

**2. Custom Hook**

```typescript
// src/ui/hooks/useMyFeature.ts
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useMyFeature(id: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["myFeature", id],
        queryFn: async () => {
            // Fetch data
            return await fetchData(id);
        },
    });

    return {
        data,
        loading: isLoading,
        error,
    };
}

// Usage in component
function MyComponent({ id }: { id: string }) {
    const { data, loading, error } = useMyFeature(id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>{/* Use data */}</div>;
}
```

### Styling a Component

**Use Tailwind CSS with cn() utility:**

```typescript
import { cn } from "@ui/lib/utils";

interface CardProps {
    variant?: "default" | "highlighted";
    className?: string;
    children: React.ReactNode;
}

export function Card({ variant = "default", className, children }: CardProps) {
    return (
        <div
            className={cn(
                // Base styles
                "rounded-lg border p-4",
                // Variant styles
                variant === "default" && "bg-card text-card-foreground",
                variant === "highlighted" && "bg-accent text-accent-foreground",
                // Custom classes
                className
            )}
        >
            {children}
        </div>
    );
}
```

**Using Theme Variables:**

```typescript
// Use CSS variables for theme-aware colors
<div className="bg-background text-foreground border-border">
    <button className="bg-primary text-primary-foreground">
        Primary Button
    </button>
</div>
```

### Adding a Dialog

```typescript
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";

export function MyDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Open Dialog
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                            Description of what this dialog does.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {/* Dialog content */}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            // Handle action
                            setOpen(false);
                        }}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
```

### Working with Database

**Using TanStack Query:**

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDatabase } from "@ui/hooks/useDatabase";

export function ChatComponent({ chatId }: { chatId: string }) {
    const db = useDatabase();
    const queryClient = useQueryClient();

    // Query - fetch data
    const { data: chat, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => db.getChat(chatId),
    });

    // Mutation - update data
    const updateMutation = useMutation({
        mutationFn: (updates: Partial<Chat>) =>
            db.updateChat(chatId, updates),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
        },
    });

    const handleUpdate = () => {
        updateMutation.mutate({ title: "New Title" });
    };

    if (isLoading) return <div>Loading...</div>;
    if (!chat) return <div>Chat not found</div>;

    return (
        <div>
            <h1>{chat.title}</h1>
            <Button onClick={handleUpdate}>
                Update Title
            </Button>
        </div>
    );
}
```

### Handling User Input

```typescript
import { useState } from "react";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";

export function InputForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        try {
            // Save data
            await saveData({ title, content });
            toast.success("Saved successfully");

            // Reset form
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Save failed:", error);
            toast.error("Failed to save");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content
                </label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter content"
                    rows={4}
                />
            </div>

            <Button type="submit">
                Save
            </Button>
        </form>
    );
}
```

### Showing Notifications

```typescript
import { toast } from "sonner";

// Success
toast.success("Operation completed successfully");

// Error
toast.error("Something went wrong");

// Info
toast.info("FYI: This is informational");

// With description
toast.success("Chat saved", {
    description: "Your changes have been saved to the database",
});

// With action
toast.error("Failed to delete", {
    action: {
        label: "Retry",
        onClick: () => handleDelete(),
    },
});

// Loading state
const toastId = toast.loading("Saving...");
try {
    await saveData();
    toast.success("Saved!", { id: toastId });
} catch (error) {
    toast.error("Failed", { id: toastId });
}
```

## 📋 Common Patterns

### Conditional Rendering

```typescript
// Loading state
if (loading) return <Skeleton className="h-20 w-full" />;

// Error state
if (error) return <Alert variant="destructive">{error.message}</Alert>;

// Empty state
if (!data || data.length === 0) {
    return <EmptyState
        title="No items found"
        description="Try creating a new item"
    />;
}

// Success state
return <div>{/* Render data */}</div>;
```

### Lists

```typescript
export function ChatList({ chats }: { chats: Chat[] }) {
    return (
        <div className="space-y-2">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    className="p-4 rounded-lg border hover:bg-accent"
                >
                    <h3 className="font-medium">{chat.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {displayDate(convertDate(chat.createdAt))}
                    </p>
                </div>
            ))}
        </div>
    );
}
```

### Context Menu

```typescript
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@ui/components/ui/context-menu";

export function ItemWithContextMenu({ item }: { item: Item }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="p-4 border rounded">
                    {item.title}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => handleEdit(item)}>
                    Edit
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDuplicate(item)}>
                    Duplicate
                </ContextMenuItem>
                <ContextMenuItem
                    className="text-destructive"
                    onClick={() => handleDelete(item)}
                >
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
```

## 🐛 Debugging Tips

### React Query DevTools

```typescript
// Add to App.tsx in development
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Your app */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
```

### Console Logging

```typescript
// Use descriptive labels
console.log("Chat loaded:", chat);
console.error("Failed to save:", error);

// Use groups for related logs
console.group("Message handling");
console.log("Message:", message);
console.log("Sender:", sender);
console.groupEnd();
```

### React DevTools

- Install React DevTools browser extension
- Inspect component props and state
- Profile component rendering

## 📚 Next Steps

1. **Explore existing components** - Read through `MultiChat.tsx` and `AppSidebar.tsx`
2. **Try the examples** - Build a simple dialog or form
3. **Read the full specs** - Check `CODING_STANDARDS.md`
4. **Study the patterns** - See how existing components handle data
5. **Ask questions** - Use the command menu and feedback button

## 🔗 Important Files to Reference

- **`src/ui/components/MultiChat.tsx`** - Main chat interface (learn patterns)
- **`src/ui/components/ui/button.tsx`** - Example base component
- **`src/ui/lib/utils.ts`** - Utility functions
- **`src/ui/hooks/useAttachments.ts`** - Complex hook example
- **`tailwind.config.cjs`** - Styling configuration

## ⚠️ Common Mistakes to Avoid

1. **Don't use relative imports** - Use `@ui/*`, `@core/*` aliases
2. **Don't forget to handle promises** - ESLint will catch this
3. **Don't use `null`** - Prefer `undefined`
4. **Don't skip type definitions** - TypeScript strict mode is on
5. **Don't create files without reading** - ALWAYS prefer editing existing files

---

**Ready to code?** Start with a small component and gradually build up complexity!
