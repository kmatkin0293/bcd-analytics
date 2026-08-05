# Partner Portal with ThoughtSpot Embed – Cursor Context

> **Purpose:** This file provides context for AI-assisted development. Point Cursor at this file when working on this project or adapting it to similar analytics portal applications. It describes the app structure, ThoughtSpot integration patterns, and **configuration values that users must supply**—especially when using a different ThoughtSpot instance or different Liveboards/Models.

---

## 1. App Overview

This is a **React-based partner portal** that embeds ThoughtSpot analytics components. The app provides:

- **Multiple analytics pages** – Each page embeds a ThoughtSpot Liveboard
- **AI analytics page** – Full-page Spotter (natural language search)
- **Floating AI chatbot** – SpotterAgent for conversational data queries
- **Custom branding** – Styling aligned with the host brand (e.g. Skyscanner Backpack)

**Tech stack:** React 18, Vite, TypeScript, React Router, ThoughtSpot Visual Embed SDK (~1.44.x)

---

## 2. ThoughtSpot-Specific Architecture

### 2.1 Centralized SDK Initialization

All ThoughtSpot embeds use a **single initialization** in `src/lib/thoughtspot.ts`:

```typescript
import { init, AuthType } from '@thoughtspot/visual-embed-sdk';

init({
  thoughtSpotHost: '<THOUGHTSPOT_INSTANCE_URL>',  // e.g. https://your-org.thoughtspot.cloud
  authType: AuthType.None,
  customizations: { /* branding, footer hiding, etc. */ },
});
```

**Important:** Components that use embeds must import this file first:  
`import '../lib/thoughtspot';`

### 2.2 Embed Types and Locations

| Component | Embed Type | Config Key | File |
|-----------|------------|------------|------|
| Executive Overview | LiveboardEmbed | `liveboardId` | `src/pages/Dashboard.tsx` |
| TIV Catchment Analysis | LiveboardEmbed | `liveboardId` | `src/pages/TIVCatchmentAnalysis.tsx` |
| Market Trends | LiveboardEmbed | `liveboardId` | `src/pages/TIVMarketTrendV1.tsx` |
| AI Analytics (full page) | SpotterEmbed | `worksheetId` | `src/pages/Spotter.tsx` |
| Floating chatbot | useSpotterAgent / SpotterAgentEmbed | `worksheetId` | `src/components/ChatBot.tsx` |

### 2.3 Authentication: AuthType.None

The app uses **`AuthType.None`**. This means:

- **No programmatic login** – The SDK does not send credentials or tokens
- **Session-based auth** – The user must already be **logged in** to the ThoughtSpot instance in the same browser
- **Typical flow:** User logs into ThoughtSpot (e.g. `https://your-org.thoughtspot.cloud`) in a tab, then opens the portal; the embedded iframes reuse that session via cookies

**If embeds show a login prompt or fail to load:**  
The user needs to open the ThoughtSpot URL in the same browser, log in, then refresh the portal.

---

## 3. Configuration Values Users Must Provide

When adapting this app to a **different ThoughtSpot instance** or **different content**, users need to supply these values. Many users are not technical, so **Cursor should prompt for them** when making changes.

### 3.1 ThoughtSpot Instance URL

**Where it’s used:** `src/lib/thoughtspot.ts` → `thoughtSpotHost`

**What to ask the user:**
- “What is your ThoughtSpot instance URL? (e.g. `https://yourcompany.thoughtspot.cloud`)”
- “Make sure you are logged into this ThoughtSpot instance in your browser before using the portal.”

### 3.2 Liveboard GUIDs

Each Liveboard page needs a **Liveboard GUID** (UUID format, e.g. `a2e125ee-29de-491a-b869-efef4d20cef8`).

**Where they’re used:**

| Page | File | Variable |
|------|------|----------|
| Executive Overview / Dashboard | `src/pages/Dashboard.tsx` | `liveboardId` |
| TIV Catchment Analysis | `src/pages/TIVCatchmentAnalysis.tsx` | `liveboardId` |
| Market Trends | `src/pages/TIVMarketTrendV1.tsx` | `liveboardId` |

**What to ask the user:**
- “What is the Liveboard GUID for [page name]? You can find it in ThoughtSpot by opening the Liveboard and checking the URL or object properties.”
- “Do you have different Liveboards for each page, or should we reuse one?”

### 3.3 Spotter / Worksheet GUIDs (Models)

Spotter and SpotterAgent use a **Worksheet (Model) GUID** to define the data source.

**Where they’re used:**

| Component | File | Variable | Notes |
|-----------|------|----------|-------|
| AI Analytics page | `src/pages/Spotter.tsx` | `worksheetId` | Can be `'auto_mode'` for auto data discovery, or a specific Model GUID |
| Floating chatbot | `src/components/ChatBot.tsx` | `worksheetId` in `useSpotterAgent()` | Usually a specific Model GUID for consistent answers |

**What to ask the user:**
- “For the AI Analytics page: use `auto_mode` (auto-select data) or a specific Model/Worksheet GUID?”
- “For the floating chatbot: what is the Model (Worksheet) GUID that Spotter should use? This is the data source for AI answers.”

---

## 4. Quick Reference: Current GUIDs (Example Values)

These are **example values** from the Skyscanner setup. Replace them when using a different instance:

| Object | Type | Example GUID | File |
|--------|------|--------------|------|
| Executive Overview Liveboard | Liveboard | `a2e125ee-29de-491a-b869-efef4d20cef8` | Dashboard.tsx |
| TIV Catchment Liveboard | Liveboard | `9dd48107-a2c7-4877-a9fd-035d9094fdc3` | TIVCatchmentAnalysis.tsx |
| Market Trends Liveboard | Liveboard | `14debd3b-aa25-4943-b682-3fb03b49dcfd` | TIVMarketTrendV1.tsx |
| Spotter page data source | Worksheet | `auto_mode` | Spotter.tsx |
| Chatbot data source | Worksheet | `86a1d73a-9e2d-4377-bc69-db76746d10c0` | ChatBot.tsx |

---

## 5. Cursor Guidance for Non-Technical Users

When helping users adapt this app, Cursor should:

1. **Ask for the ThoughtSpot instance URL** before changing `thoughtspot.ts`.
2. **Ask for Liveboard GUIDs** for each analytics page they want to embed.
3. **Ask for Worksheet/Model GUIDs** for Spotter and the chatbot.
4. **Remind about AuthType.None:**  
   “You need to be logged into your ThoughtSpot instance in this browser. Open [their URL], sign in, then refresh the portal.”
5. **Explain where to find GUIDs:**  
   In ThoughtSpot, open the Liveboard or Model, check the URL or object metadata for the GUID (UUID format).

---

## 6. Project Structure (Relevant Files)

```
src/
├── lib/
│   └── thoughtspot.ts      # SDK init – thoughtSpotHost, AuthType
├── pages/
│   ├── Dashboard.tsx       # Liveboard: liveboardId
│   ├── TIVCatchmentAnalysis.tsx
│   ├── TIVMarketTrendV1.tsx
│   └── Spotter.tsx         # SpotterEmbed: worksheetId
├── components/
│   └── ChatBot.tsx         # useSpotterAgent: worksheetId
├── App.tsx                 # Routing
└── main.tsx
```

---

## 7. Common Patterns and Pitfalls

- **Single init:** Only `thoughtspot.ts` should call `init()`. Other components import it.
- **Highlighted tiles:** Avoid forcing white backgrounds on `.answer-module__answer` or `.viz-card-module__vizCard`; it breaks KPI highlighted tiles.
- **SpotterAgent:** Requires a container ref, `.render()` before `sendMessage()`, and a valid `worksheetId`.
- **Footer:** Custom CSS hides “Powered by ThoughtSpot” via `.footer-module__*` rules.

---

## 8. Optional: Environment-Based Configuration

To avoid hardcoding values, consider using environment variables (e.g. `VITE_THOUGHTSPOT_HOST`, `VITE_LIVEBOARD_DASHBOARD`, etc.) and a central config. Cursor can help refactor the codebase to read from `import.meta.env` so users only need to edit a `.env` file—no code changes required for different instances.

---

## 9. Adapting to a New Scenario

For a similar app (different org, different Liveboards/Models):

1. Create or update a config (e.g. `.env` or `src/config/thoughtspot.ts`) with placeholders.
2. Prompt the user for: instance URL, Liveboard GUIDs, Worksheet GUIDs.
3. Update `thoughtspot.ts` and each embed component with the provided values.
4. Confirm the user understands the AuthType.None login requirement.

---

*Last updated: March 2026*
