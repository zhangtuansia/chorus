# UI Patterns & Best Practices

Common UI patterns and best practices used throughout the Chorus application.

## Design Principles

### 1. Consistency
- Use base UI components for consistent look and feel
- Follow established spacing and sizing patterns
- Maintain consistent interaction patterns

### 2. Clarity
- Clear visual hierarchy
- Obvious interactive elements
- Helpful feedback messages

### 3. Efficiency
- Keyboard shortcuts for common actions
- Quick access to frequently used features
- Minimal clicks to complete tasks

### 4. Accessibility
- Proper semantic HTML
- ARIA labels where needed
- Keyboard navigation support

## Layout Patterns

### Card Layout
Used for grouping related content:

```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@ui/components/ui/card";

<Card>
    <CardHeader>
        <CardTitle>Section Title</CardTitle>
    </CardHeader>
    <CardContent>
        {/* Content here */}
    </CardContent>
</Card>
```

**Where used:**
- Settings panels
- Chat summaries
- Tool configurations

### Sidebar Pattern
Collapsible sidebar with navigation:

```typescript
import { Sidebar, SidebarContent, SidebarHeader } from "@ui/components/ui/sidebar";

<Sidebar>
    <SidebarHeader>
        <h2>Navigation</h2>
    </SidebarHeader>
    <SidebarContent>
        {/* Navigation items */}
    </SidebarContent>
</Sidebar>
```

**Where used:**
- AppSidebar.tsx - Main navigation
- Chat history
- Project lists

### Split View Pattern
Resizable split panels:

```typescript
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@ui/components/ui/resizable";

<ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={30}>
        {/* Left panel */}
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={70}>
        {/* Right panel */}
    </ResizablePanel>
</ResizablePanelGroup>
```

**Where used:**
- Main app layout (sidebar + content)
- Chat with attachments view

## Interaction Patterns

### Command Palette
Global command search (Cmd+K):

```typescript
import { CommandDialog } from "@ui/components/ui/command";

const [open, setOpen] = useState(false);

// Listen for Cmd+K
useEffect(() => {
    const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen(true);
        }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
}, []);

<CommandDialog open={open} onOpenChange={setOpen}>
    {/* Command items */}
</CommandDialog>
```

**Where used:**
- CommandMenu.tsx - Global search and navigation

### Confirmation Pattern
Confirm before destructive actions:

```typescript
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@ui/components/ui/alert-dialog";

const [showConfirm, setShowConfirm] = useState(false);

<AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
                Delete
            </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
```

**Where used:**
- Deleting chats
- Removing API keys
- Clearing settings

### Inline Editing Pattern
Edit in place without modal:

```typescript
import { EditableTitle } from "@ui/components/EditableTitle";

<EditableTitle
    value={title}
    onChange={setTitle}
    placeholder="Untitled"
/>
```

**Where used:**
- Chat titles
- Project names
- Prompt names

### Dropdown Menu Pattern
Actions menu for items:

```typescript
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@ui/components/ui/dropdown-menu";

<DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
            Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
            Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
            className="text-destructive"
            onClick={handleDelete}
        >
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
```

**Where used:**
- Chat actions
- Message actions
- Project actions

## Data Display Patterns

### Loading States

**Skeleton Loading:**
```typescript
import { Skeleton } from "@ui/components/ui/skeleton";

if (loading) {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    );
}
```

**Spinner Loading:**
```typescript
import { RetroSpinner } from "@ui/components/ui/retro-spinner";

if (loading) {
    return (
        <div className="flex justify-center p-8">
            <RetroSpinner />
        </div>
    );
}
```

**Where used:**
- Initial page load
- Lazy-loaded content
- API requests

### Empty States

```typescript
import { EmptyState } from "@ui/components/EmptyState";

if (items.length === 0) {
    return (
        <EmptyState
            title="No chats yet"
            description="Start a new conversation to get started"
            action={{
                label: "New Chat",
                onClick: handleNewChat,
            }}
        />
    );
}
```

**Where used:**
- Empty chat lists
- No search results
- Empty projects

### Error States

```typescript
import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { AlertCircle } from "lucide-react";

if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error.message}
            </AlertDescription>
        </Alert>
    );
}
```

**Where used:**
- API errors
- Validation errors
- Network issues

### Pagination Pattern

```typescript
const [page, setPage] = useState(1);
const itemsPerPage = 20;

const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
);

<div>
    {/* Display items */}
    {paginatedItems.map(item => <div key={item.id}>{item.name}</div>)}

    {/* Pagination controls */}
    <div className="flex justify-center gap-2 mt-4">
        <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
        >
            Previous
        </Button>
        <span className="flex items-center px-4">
            Page {page} of {Math.ceil(items.length / itemsPerPage)}
        </span>
        <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(items.length / itemsPerPage)}
        >
            Next
        </Button>
    </div>
</div>
```

## Form Patterns

### Basic Form

```typescript
import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";

export function BasicForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
}
```

### Form with Validation

```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
        newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@")) {
        newErrors.email = "Valid email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
        return;
    }

    // Submit form
};

// In render
<div>
    <Label htmlFor="name">Name</Label>
    <Input
        id="name"
        value={formData.name}
        onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            // Clear error on change
            if (errors.name) {
                setErrors({ ...errors, name: "" });
            }
        }}
    />
    {errors.name && (
        <p className="text-sm text-destructive mt-1">{errors.name}</p>
    )}
</div>
```

## Navigation Patterns

### Tab Navigation

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs";

<Tabs defaultValue="general">
    <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="models">Models</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
    </TabsList>
    <TabsContent value="general">
        {/* General settings */}
    </TabsContent>
    <TabsContent value="models">
        {/* Model settings */}
    </TabsContent>
    <TabsContent value="advanced">
        {/* Advanced settings */}
    </TabsContent>
</Tabs>
```

**Where used:**
- Settings dialog
- Project views
- Multi-section forms

### Breadcrumb Navigation

```typescript
export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
    return (
        <nav className="flex items-center space-x-2 text-sm">
            {items.map((item, i) => (
                <div key={i} className="flex items-center">
                    {i > 0 && <span className="mx-2 text-muted-foreground">/</span>}
                    {item.href ? (
                        <a href={item.href} className="hover:underline">
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-muted-foreground">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
```

## Feedback Patterns

### Toast Notifications

```typescript
import { toast } from "sonner";

// Success
toast.success("Changes saved");

// Error with retry
toast.error("Failed to save", {
    action: {
        label: "Retry",
        onClick: handleRetry,
    },
});

// Promise handling
toast.promise(
    saveData(),
    {
        loading: "Saving...",
        success: "Saved successfully",
        error: "Failed to save",
    }
);
```

### Progress Indicators

```typescript
import { Progress } from "@ui/components/ui/progress";

<div className="space-y-2">
    <div className="flex justify-between text-sm">
        <span>Uploading...</span>
        <span>{progress}%</span>
    </div>
    <Progress value={progress} />
</div>
```

### Badges for Status

```typescript
import { Badge } from "@ui/components/ui/badge";

<div className="flex gap-2">
    <Badge variant="default">Active</Badge>
    <Badge variant="secondary">Draft</Badge>
    <Badge variant="destructive">Error</Badge>
    <Badge variant="outline">Pending</Badge>
</div>
```

## Performance Patterns

### Lazy Loading

```typescript
import { lazy, Suspense } from "react";
import { Skeleton } from "@ui/components/ui/skeleton";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

<Suspense fallback={<Skeleton className="h-40 w-full" />}>
    <HeavyComponent />
</Suspense>
```

### Memoization

```typescript
import { useMemo, useCallback } from "react";

// Expensive computation
const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.timestamp - b.timestamp);
}, [items]);

// Callback passed to child
const handleItemClick = useCallback((id: string) => {
    // Handle click
}, []);
```

### Virtualization
For long lists, consider virtualization (not yet implemented in codebase).

## Accessibility Patterns

### Keyboard Navigation

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAction();
    }
};

<div
    role="button"
    tabIndex={0}
    onClick={handleAction}
    onKeyDown={handleKeyDown}
>
    Click or press Enter
</div>
```

### ARIA Labels

```typescript
<Button
    aria-label="Close dialog"
    onClick={onClose}
>
    <X className="h-4 w-4" />
</Button>

<input
    aria-describedby="email-help"
    aria-invalid={!!errors.email}
/>
{errors.email && (
    <p id="email-help" className="text-sm text-destructive">
        {errors.email}
    </p>
)}
```

### Focus Management

```typescript
import { useEffect, useRef } from "react";

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    // Auto-focus input when dialog opens
    if (open) {
        inputRef.current?.focus();
    }
}, [open]);

<Input ref={inputRef} />
```

## Animation Patterns

### Smooth Transitions

```typescript
<div className="transition-all duration-200 hover:scale-105">
    Hover me
</div>

<div className={cn(
    "transition-opacity duration-300",
    isVisible ? "opacity-100" : "opacity-0"
)}>
    Fading content
</div>
```

### Collapsible Content

```typescript
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@ui/components/ui/collapsible";

<Collapsible>
    <CollapsibleTrigger>
        Show more
    </CollapsibleTrigger>
    <CollapsibleContent>
        {/* Hidden content */}
    </CollapsibleContent>
</Collapsible>
```

## Best Practices Summary

### DO:
- ✅ Use base UI components for consistency
- ✅ Provide loading and error states
- ✅ Show helpful feedback messages
- ✅ Handle keyboard shortcuts
- ✅ Use proper semantic HTML
- ✅ Provide clear calls to action
- ✅ Validate user input
- ✅ Confirm destructive actions
- ✅ Use appropriate spacing (Tailwind's space-* classes)
- ✅ Follow mobile-first responsive design

### DON'T:
- ❌ Create custom components when base UI exists
- ❌ Forget loading and error states
- ❌ Use generic error messages
- ❌ Nest dialogs (use sheets or stacked modals instead)
- ❌ Ignore accessibility
- ❌ Make clickable areas too small
- ❌ Use too many colors
- ❌ Overuse animations
- ❌ Hide important information in tooltips
- ❌ Create overly complex forms

---

For implementation details, see the component source files in `components/`.
