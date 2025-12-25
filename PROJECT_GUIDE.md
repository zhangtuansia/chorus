# Chorus 项目代码结构与使用文档

## 1. 项目概述

**Chorus** 是一个原生 Mac AI 聊天应用，允许用户同时与多个 AI 模型（Claude、GPT-4、Gemini 等）进行对话。

### 技术栈

- **前端框架**: React 18 + TypeScript
- **桌面框架**: Tauri 2.x (Rust 后端)
- **状态管理**: TanStack Query + Zustand
- **数据库**: 本地 SQLite
- **样式**: TailwindCSS + Radix UI
- **包管理**: pnpm

### 核心特性

- MCP (Model Context Protocol) 支持
- Ambient Chats（快捷聊天窗口）
- 项目管理
- 自带 API 密钥

---

## 2. 目录结构

```
chorus/
├── src/                          # 前端源码
│   ├── core/                     # 核心业务逻辑
│   │   ├── chorus/               # 主要业务模块
│   │   │   ├── api/              # TanStack Query API 层
│   │   │   ├── db/               # 数据库查询（按实体分类）
│   │   │   ├── ModelProviders/   # AI 模型提供商实现
│   │   │   ├── toolsets/         # 工具集实现
│   │   │   ├── gc-prototype/     # Group Chat 原型
│   │   │   ├── importers/        # 聊天导入器
│   │   │   └── prompts/          # 提示词模板
│   │   ├── infra/                # 基础设施（Store 等）
│   │   └── utilities/            # 工具函数
│   ├── ui/                       # UI 层
│   │   ├── components/           # React 组件
│   │   ├── context/              # React Context
│   │   ├── hooks/                # 自定义 Hooks
│   │   ├── providers/            # Provider 组件
│   │   ├── themes/               # 主题配置
│   │   └── lib/                  # UI 工具函数
│   └── types/                    # TypeScript 类型定义
├── src-tauri/                    # Tauri Rust 后端
│   └── src/
│       ├── main.rs               # 入口点
│       ├── lib.rs                # Tauri 应用配置
│       ├── command.rs            # Tauri 命令
│       ├── migrations.rs         # 数据库迁移
│       └── window.rs             # 窗口管理
├── public/                       # 静态资源
├── screenshots/                  # 应用截图
├── script/                       # 脚本工具
└── docs/                         # 文档
```

---

## 3. 核心模块详解

### 3.1 API 层 (`src/core/chorus/api/`)

使用 TanStack Query 管理所有数据请求：

| 文件 | 用途 |
|------|------|
| `ChatAPI.ts` | 聊天 CRUD 操作 |
| `MessageAPI.ts` | 消息管理 |
| `ModelsAPI.ts` | AI 模型配置 |
| `ProjectAPI.ts` | 项目管理 |
| `AttachmentsAPI.ts` | 附件处理 |
| `ToolsetsAPI.ts` | 工具集配置 |
| `ToolPermissionsAPI.ts` | 工具权限管理 |
| `AppMetadataAPI.ts` | 应用元数据 |

### 3.2 Model Providers (`src/core/chorus/ModelProviders/`)

支持多种 AI 提供商：

| Provider | 文件 |
|----------|------|
| Anthropic (Claude) | `ProviderAnthropic.ts` |
| OpenAI | `ProviderOpenAI.ts` |
| Google (Gemini) | `ProviderGoogle.ts` |
| Grok | `ProviderGrok.ts` |
| OpenRouter | `ProviderOpenRouter.ts` |
| Perplexity | `ProviderPerplexity.ts` |
| Ollama (本地) | `ProviderOllama.ts` |
| LM Studio | `ProviderLMStudio.ts` |

所有 Provider 实现 `IProvider` 接口：

```typescript
interface IProvider {
    streamResponse: (params: StreamResponseParams) => Promise<ModelDisabled | void>;
}
```

### 3.3 工具集 (`src/core/chorus/toolsets/`)

内置工具集：

| 工具集 | 功能 |
|--------|------|
| `web.ts` | 网页搜索和获取 |
| `files.ts` | 文件操作 |
| `terminal.ts` | 终端命令 |
| `github.ts` | GitHub 集成 |
| `slack.ts` | Slack 集成 |
| `coder.ts` | 代码操作 |
| `media.ts` | 媒体处理 |
| `apple.ts` | Apple 服务 |
| `notion.ts` | Notion 集成 |
| `custom.ts` | 自定义 MCP 服务器 |

### 3.4 主要 UI 组件 (`src/ui/components/`)

| 组件 | 用途 |
|------|------|
| `App.tsx` | 根组件，路由配置 |
| `MultiChat.tsx` | 主聊天界面 |
| `ChatInput.tsx` | 聊天输入框 |
| `AppSidebar.tsx` | 侧边栏 |
| `ManageModelsBox.tsx` | 模型选择器 |
| `Settings.tsx` | 设置页面 |
| `ProjectView.tsx` | 项目视图 |
| `Onboarding.tsx` | 引导页 |

---

## 4. 数据存储

### 存储位置

```bash
# 生产环境
~/Library/Application Support/sh.chorus.app/

# 开发环境
~/Library/Application Support/sh.chorus.app.dev.<instance>/
```

### 主要数据文件

| 文件/目录 | 内容 |
|-----------|------|
| `chats.db` | SQLite 数据库（聊天、消息、配置） |
| `settings` | 应用设置 |
| `auth.dat` | 加密的认证令牌 |
| `uploads/` | 用户上传的附件 |
| `generated_images/` | AI 生成的图片 |

### 数据库主要表

- `chats` - 聊天会话
- `messages` - 消息
- `message_sets` - 消息集
- `message_parts` - 消息部分（工具调用）
- `models` - AI 模型
- `model_configs` - 模型配置
- `projects` - 项目
- `attachments` - 附件
- `toolsets_config` - 工具集配置
- `tool_permissions` - 工具权限

详细 Schema 见 `SCHEMA.md`。

---

## 5. 开发指南

### 5.1 环境准备

```bash
# 必需工具
- Node.js >= 22.0.0
- Rust + Cargo
- pnpm
- git-lfs

# 可选
- imagemagick
```

### 5.2 常用命令

```bash
# 安装依赖和初始化
pnpm run setup

# 开发模式
pnpm run dev

# 或分别运行
pnpm run vite:dev      # 仅前端
pnpm run tauri:dev     # Tauri 开发模式

# 构建
pnpm run build

# 不同环境
pnpm run tauri:qa      # QA 环境
pnpm run tauri:prod    # 生产环境

# 代码检查
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run validate

# 测试
pnpm run test

# 生成数据库 Schema 文档
pnpm run generate-schema

# 删除本地数据库
pnpm run delete-db
```

### 5.3 代码规范

- **TypeScript**: 严格类型，ES2020 目标
- **路径别名**: `@ui/*`, `@core/*`, `@/*`
- **命名约定**:
  - React 组件: PascalCase
  - 接口: `I` 前缀 (如 `IProvider`)
  - Hooks: `use` 前缀
- **格式化**: 4 空格缩进，Prettier
- **空值处理**: 优先使用 `undefined`，数据库 `null` 需转换
- **日期处理**: 使用 `displayDate()` 和 `convertDate()`

### 5.4 数据模型变更流程

1. 在 `src-tauri/src/migrations.rs` 添加迁移
2. 修改 `src/core/chorus/DB.ts` 的读写函数
3. 更新相关类型定义
4. 添加/修改 TanStack Query API

---

## 6. Claude Code 集成

项目配置了 Claude Code 的工作流程支持。

### `.claude/settings.json`

配置了 Claude 允许执行的操作权限：
- 文件编辑
- Git 操作 (checkout, add, commit, push, pull, rebase 等)
- GitHub CLI (gh issue, gh pr)
- 文件搜索 (rg, grep, find)
- Cargo check

### 工作流程

1. **设置**: 创建 `claude/feature-name` 分支，不直接提交 main
2. **开发**: 频繁提交，请用户测试验证
3. **审查**: 创建 PR，包含测试计划
4. **分支管理**: 使用 rebase 或 cherry-pick，不用 merge

### Claude 特殊规则

需要明确获得许可才能使用：
- `setTimeout`
- `useImperativeHandle`
- `useRef`
- 类型断言 `as`

---

## 7. 核心数据流与架构

### 7.1 消息系统架构

Chorus 采用灵活的消息系统，支持多种交互模式：

#### 核心类型

```typescript
// 消息集（MessageSet）- 聊天中的一个"回合"
type MessageSet = {
    id: string;
    chatId: string;
    type: "user" | "ai";
    level: number;
    selectedBlockType: BlockType;
    createdAt: string;
};

// 消息
interface Message {
    id: string;
    chatId: string;
    messageSetId: string;
    blockType: BlockType;
    text: string;
    model: string;
    selected: boolean;
    state: "streaming" | "idle";
    parts: MessagePart[];  // 多部分消息（支持工具调用）
    // ... 更多字段
}

// Block 类型（不同的响应展示模式）
type BlockType = "user" | "chat" | "compare" | "tools" | "brainstorm";
```

#### Block 类型说明

| Block | 用途 |
|-------|------|
| `user` | 用户输入 |
| `chat` | 单模型聊天（带 Reviews） |
| `compare` | 多模型对比 |
| `tools` | 带工具调用的对话（默认模式） |
| `brainstorm` | 头脑风暴 |

### 7.2 工具系统（Toolsets）

工具系统基于 MCP (Model Context Protocol) 实现：

```typescript
// 用户可见的工具定义
interface UserTool {
    toolsetName: string;        // 如 "files"
    displayNameSuffix: string;  // 如 "read"
    description?: string;
    inputSchema: Record<string, unknown>;
}

// 工具调用
type UserToolCall = {
    id: string;
    namespacedToolName: string;  // "files_read"
    args: unknown;
    toolMetadata?: {...};
};

// 工具结果
type UserToolResult = {
    id: string;
    content: string;
};
```

#### ToolsetsManager 单例

```typescript
class ToolsetsManager {
    private _builtInToolsets: Toolset[] = [];
    private _customToolsets: CustomToolset[] = [];

    // 执行工具调用（含权限检查）
    async executeToolCall(toolCall, modelName): Promise<UserToolResult>

    // 列出所有工具集
    listToolsets(): Toolset[]

    // 刷新工具集状态
    refreshToolsets(config, customToolsets): Promise<void>
}
```

### 7.3 TanStack Query 缓存策略

```typescript
// Query Keys 结构
const chatKeys = {
    all: () => ["chats"] as const,
    allDetails: () => [...chatKeys.all(), "detail"] as const,
};

const messageKeys = {
    messageSets: (chatId: string) => ["chats", chatId, "messageSets", "list"],
    messageAttachments: (messageId: string) => ["messages", messageId, "attachments"],
};

// Query 配置
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            networkMode: "always",
            refetchOnWindowFocus: false,
            staleTime: Infinity,  // 数据永不过期
        },
    },
});
```

---

## 8. Tauri 后端（Rust）

### 8.1 核心文件

| 文件 | 功能 |
|------|------|
| `lib.rs` | 应用初始化、菜单、系统托盘、全局快捷键 |
| `command.rs` | Tauri 命令（前端调用的 Rust 函数） |
| `migrations.rs` | SQLite 数据库迁移 |
| `window.rs` | 窗口管理（包括 Quick Chat 面板） |

### 8.2 主要 Tauri 插件

```rust
tauri_plugin_sql          // SQLite 数据库
tauri_plugin_fs           // 文件系统
tauri_plugin_http         // HTTP 请求
tauri_plugin_shell        // Shell 命令
tauri_plugin_dialog       // 系统对话框
tauri_plugin_notification // 系统通知
tauri_plugin_clipboard_manager  // 剪贴板
tauri_plugin_global_shortcut    // 全局快捷键
tauri_plugin_updater      // 自动更新
tauri_plugin_deep_link    // Deep Link 处理
tauri_plugin_store        // 本地存储
tauri_plugin_stronghold   // 安全存储
tauri_plugin_macos_permissions  // macOS 权限
tauri_nspanel            // macOS NSPanel（Quick Chat）
```

### 8.3 数据库迁移

迁移定义在 `src-tauri/src/migrations.rs`，使用 `tauri-plugin-sql` 自动执行。

生成 Schema 文档：
```bash
pnpm run generate-schema
```

---

## 9. UI 组件深入

### 9.1 路由结构

```tsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/new-prompt" element={<NewPrompt />} />
    <Route path="/prompts" element={<ListPrompts />} />
    <Route path="/chat/:chatId" element={<MultiChat />} />
    <Route path="/projects/:projectId" element={<ProjectView />} />
</Routes>
```

### 9.2 Context 与 Provider

| Provider | 功能 |
|----------|------|
| `QueryClientProvider` | TanStack Query |
| `ThemeProvider` | 主题管理 |
| `DatabaseProvider` | 数据库实例 |
| `AppProvider` | 应用状态（Quick Chat、缩放等） |
| `AppMetadataProvider` | 应用元数据 |
| `SidebarProvider` | 侧边栏状态 |

### 9.3 自定义 Hooks

| Hook | 用途 |
|------|------|
| `useAppContext` | 获取应用上下文 |
| `useDatabase` | 获取数据库实例 |
| `useTheme` | 主题操作 |
| `useShortcut` | 键盘快捷键 |
| `useAttachments` | 附件操作 |
| `useShareChat` | 分享聊天 |
| `useSettings` | 设置 |

### 9.4 Dialog 管理

使用 Zustand Store 管理对话框状态：

```typescript
// DialogStore.ts
const useDialogStore = create<DialogStore>((set) => ({
    activeDialogId: null,
}));

export const dialogActions = {
    openDialog: (dialogId: string) => {...},
    closeDialog: () => {...},
};
```

---

## 10. 快捷键参考

| 快捷键 | 功能 |
|--------|------|
| `⌘ + N` | 新建聊天 |
| `⌘ + Shift + N` | 新建项目 |
| `⌘ + ,` | 打开设置 |
| `⌘ + K` | 命令菜单 |
| `⌘ + P` | 提示词页面 |
| `⌘ + [` / `⌘ + ]` | 导航前进/后退 |
| `⌘ + =` / `⌘ + -` | 放大/缩小 |
| `⌘ + 0` | 重置缩放 |
| `⌘ + Shift + G` | 新建 Group Chat |
| 全局快捷键 | Quick Chat（可自定义） |

---

## 11. Deep Link 支持

支持 `chorus://` 协议：

```
chorus://chat/{chatId}           - 打开指定聊天
chorus://slack?access_token=...  - Slack 集成
chorus://github_integration?...  - GitHub 集成
```

---

## 12. 调试技巧

### 12.1 前端调试

```typescript
// React Scan 集成（开发模式）
import { scan } from "react-scan";
scan({ enabled: true, log: true });

// TanStack Query DevTools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

### 12.2 模型请求调试

在 `ProviderAnthropic.ts` 添加：
```typescript
console.log(`createParams: ${JSON.stringify(createParams, null, 2)}`);
```

### 12.3 数据库调试

```bash
# 查看数据库
sqlite3 ~/Library/Application\ Support/sh.chorus.app/chats.db

# 删除开发数据库
pnpm run delete-db
```

---

## 13. 备份与恢复

```bash
# 使用备份脚本
./script/backup-chorus-data.sh prod          # 备份生产实例
./script/backup-chorus-data.sh dev           # 备份开发实例
./script/backup-chorus-data.sh all           # 备份所有实例

# 手动备份
cp -r ~/Library/Application\ Support/sh.chorus.app ~/Desktop/chorus-backup
```

**重要**: 数据库迁移前务必备份！

---

## 14. 发布流程

```bash
# 交互式发布
pnpm run release

# 详细流程见 RELEASING.md
```

发布渠道：
- **QA**: 每次 push 到 main 自动构建
- **Production**: 手动触发

Nightly 下载：https://cdn.crabnebula.app/download/chorus/chorus/latest/platform/dmg-aarch64?channel=qa

---

## 15. 后端服务

部分功能依赖远程后端 `app.chorus.sh`（Elixir 实现）：
- 用户账户管理
- 计费
- API 请求代理

本地不存储账户和计费信息。

---

## 16. 项目约定总结

1. **分支管理**: 使用 `claude/feature-name` 分支，永不直接提交 main
2. **提交规范**: 频繁提交，每次提交包含 Co-Author 信息
3. **代码风格**: 严格 TypeScript，路径别名，4空格缩进
4. **测试**: 每个 PR 需包含测试计划
5. **Git 操作**: rebase 优先，不使用 merge
6. **PR 创建**: 使用 `gh` CLI，标记 `by-claude` 标签

---

## 17. 相关文档

- `CLAUDE.md` / `WARP.md` - AI 助手引导文档
- `AGENT.md` - Agent 开发指南
- `SCHEMA.md` - 数据库 Schema
- `DATA_STORAGE.md` - 数据存储详解
- `RELEASING.md` - 发布流程
- `README.md` - 快速入门
