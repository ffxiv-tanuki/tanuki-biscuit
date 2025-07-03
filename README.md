# tanuki-biscuit


## 🛠️ Project Setup (Fresh Machine, Node 22 LTS)

If you're setting this up on a new machine, follow these steps to get the project running:

### ✅ Prerequisites
- Node.js **LTS v22.x** installed ([https://nodejs.org](https://nodejs.org))
- npm (comes bundled with Node)

---

### ⚡ Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ffxiv-tanuki/tanuki-biscuit.git
   cd tanuki-biscuit
   ```

2. Install project dependencies (includes dev tools):

   ```bash
   npm install
   ```

3. If you ever need to manually reinstall or fix development tools:

   ```bash
   npm install -D typescript tsx @types/node
   ```

4. Run the bot in development mode:

   ```bash
   npm run dev
   ```

---

### 🧩 Additional Notes

- We use `"type": "module"` for native ESM support.
- `.ts` files run directly using [`tsx`](https://github.com/esbuild-kit/tsx), no build step required during development.
- For production builds:

   ```bash
   npm run build
   npm start
   ```

- To deploy slash commands or utilities:

   ```bash
   npm run deploy
   ```

---

### 📦 Common Scripts

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Run the bot using `tsx` (TypeScript, ESM)   |
| `npm run deploy`   | Run slash command deployment script         |
| `npm run build`    | Compile project to `dist/`                  |
| `npm start`        | Run the compiled JavaScript output          |

---

### ❓ Troubleshooting

If you encounter errors like `Unknown file extension ".ts"`:
- Make sure you're using Node **22.x LTS**.
- Ensure dependencies are installed with `npm install`.
- We rely on `tsx` for clean TypeScript execution in ESM mode.

If `tsx` or dev tools seem missing, run:

```bash
npm install -D typescript tsx @types/node
```



## Discord Bots vs. Apps

| Feature                        | **Bot**                                                 | **App**                                                                                          |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Definition**                 | Program that connects via a bot token to automate tasks | The entire container for bots, slash commands, interactions                                      |
| **Technical Identity**         | Specific user with a bot token & permissions            | Registered entity in the [Discord Developer Portal](https://discord.com/developers/applications) |
| **Components**                 | Message handling, events, commands                      | Encompasses bots, slash commands, buttons, modals, webhooks                                      |
| **Slash Commands**             | Originally optional for bots, now standard              | Apps define slash commands globally or per guild                                                 |
| **Interactions API**           | Handled by bots that are part of apps                   | Apps own interactions like buttons, selects, modals                                              |
| **OAuth2 Scopes**              | `bot` scope gives you a bot in servers                  | `applications.commands` registers slash commands                                                 |
| **Monetization / Marketplace** | Bots can be listed in public marketplaces               | Apps themselves are the listing unit (includes bots)                                             |
| **User Perception**            | Bots are seen as the thing talking in chat              | Apps are seen in OAuth screens, settings, dev portal                                             |
