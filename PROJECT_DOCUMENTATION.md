# Skyscanner Partner Portal - Project Documentation

**Last Updated:** March 3, 2026  
**ThoughtSpot SDK Version:** 1.44.5  
**React + Vite + TypeScript**

---

## Project Overview

A React-based partner portal for Skyscanner that embeds ThoughtSpot analytics components with Skyscanner branding. The application features multiple analytics pages, a floating AI chatbot, and custom styling aligned with Skyscanner's design system (Backpack).

**ThoughtSpot Cluster:** `https://skyscanner.thoughtspot.cloud/`  
**Authentication:** `AuthType.None` (for development)

---

## Project Structure

```
/Users/cameron.nicholls/skyscanner-partner-portal/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Page header component
│   │   ├── Sidebar.tsx         # Collapsible navigation sidebar
│   │   └── ChatBot.tsx         # Floating SpotterAgentEmbed chatbot
│   ├── pages/
│   │   ├── Home.tsx            # Landing page (Figma design implementation)
│   │   ├── Dashboard.tsx       # Executive Overview Liveboard
│   │   ├── TIVCatchment.tsx    # TIV Catchment Analysis Liveboard
│   │   └── Spotter.tsx         # AI Analytics (SpotterEmbed)
│   ├── lib/
│   │   └── thoughtspot.ts      # Centralized SDK initialization
│   ├── App.tsx                 # Main app with routing
│   ├── App.css                 # Global styles
│   └── main.tsx                # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Key Files and Implementation Details

### 1. `/src/lib/thoughtspot.ts` - Centralized SDK Initialization

**Purpose:** Prevents duplicate `init()` calls across components.

```typescript
import { init, AuthType } from '@thoughtspot/visual-embed-sdk';

let isInitialized = false;

export function initThoughtSpot() {
  if (!isInitialized) {
    init({
      thoughtSpotHost: 'https://skyscanner.thoughtspot.cloud/',
      authType: AuthType.None,
      customizations: {
        style: {
          customCSS: {
            variables: {
              '--ts-var-root-background': '#f5f7fa',
              '--ts-var-root-color': '#1a1a1a',
            },
          },
        },
        iconSpriteUrl: 'https://cdn.jsdelivr.net/gh/CamTS256/icon-store/skyscanner-logo.svg',
      },
    });
    isInitialized = true;
    console.log('ThoughtSpot SDK initialized');
  }
}

initThoughtSpot();
```

**Usage in components:** `import '../lib/thoughtspot';` at the top of any file using ThoughtSpot embeds.

---

### 2. `/src/pages/Dashboard.tsx` - Executive Overview Liveboard

**Liveboard GUID:** `b70d57b9-c080-4d37-bad7-08ec7b9d2f1e`

**Key Features:**
- Transparent Liveboard background
- Preserves ThoughtSpot's highlighted tile styling (for KPIs with dark blue backgrounds)
- Custom CSS removes white backgrounds while maintaining visualization integrity

**Critical CSS Rules:**
```typescript
customizations: {
  style: {
    customCSS: {
      rules_UNSTABLE: {
        // Transparent Liveboard background
        ".liveboard-module__liveboard": {
          background: "transparent !important"
        },
        // Transparent tile backgrounds
        "[class*='pinboard-tile']": {
          background: "transparent !important",
          border: "1px solid rgba(0, 0, 0, 0.08) !important",
          "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.08) !important"
        },
        // Hide footers
        ".footer-module__footerLogo": { display: "none !important" },
        ".footer-module__footer": { display: "none !important" }
      }
    }
  }
}
```

**IMPORTANT:** Do NOT force white backgrounds on `.answer-module__answer` or `.viz-card-module__vizCard` - this breaks ThoughtSpot's highlighted tile feature used for KPI visualizations.

---

### 3. `/src/pages/Spotter.tsx` - AI Analytics Page

**Configuration:**
- `worksheetId: 'auto_mode'` - Auto Select mode for data source discovery
- `updatedSpotterChatPrompt: true` - Uses latest Spotter UI
- Footer hidden via CSS

**Known Limitation:** SpotterEmbed does NOT support pre-filling the search input without auto-executing the query. Any `searchOptions.searchQuery` provided will automatically execute. This is by design - Spotter treats queries as conversational prompts.

**Current Implementation:** Clean Spotter embed with empty state, ready for user input.

---

### 4. `/src/components/ChatBot.tsx` - Floating SpotterAgentEmbed

**Critical Implementation Pattern:**
```typescript
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (containerRef.current) {
    // 1. Create instance with container element
    const agent = new SpotterAgentEmbed(containerRef.current, {
      worksheetId: 'auto_mode',
      updatedSpotterChatPrompt: true,
    });
    
    // 2. MUST call .render() before using sendMessage()
    agent.render();
    
    // 3. Now safe to use
    const sendMessage = async (message: string) => {
      return agent.sendMessage(message);
    };
  }
}, []);

// Hidden container element required
<div ref={containerRef} style={{ display: 'none' }} />
```

**Documentation:** https://developers.thoughtspot.com/docs/embed-spotter-agent

---

### 5. `/src/pages/Home.tsx` - Landing Page

**Design:** Matches Figma specification with:
- Hero section with gradient background
- Stats cards with metrics
- Feature cards grid
- Skyscanner branding (colors, fonts, imagery)
- Background image: `background-image: url('https://content.skyscnr.com/m/3c50e36bef8f8cf5/original/Flights-Header.jpg')`

---

### 6. `/src/components/Sidebar.tsx` - Navigation

**Routes:**
- `/` - Home
- `/dashboard` - Executive Overview
- `/tiv-catchment` - TIV Catchment Analysis
- `/spotter` - AI Analytics

**Features:**
- Collapsible with toggle button
- Skyscanner blue brand colors
- Persistent state

---

## Important Technical Decisions & Fixes

### Issue 1: Multiple SDK init() Calls
**Problem:** Components calling `init()` multiple times caused conflicts.  
**Solution:** Created `/src/lib/thoughtspot.ts` with singleton pattern. All components now import this file instead of calling `init()` directly.

### Issue 2: Whited-Out Highlighted Tiles
**Problem:** Two KPI visualizations (Average Total Price, Number of redirects weekly) appeared white on the Executive Overview Liveboard.  
**Solution:** These use ThoughtSpot's "highlighted tile" feature (dark blue background in ThoughtSpot UI). Removed CSS rules that forced white backgrounds on `.answer-module__answer` and `.viz-card-module__vizCard`. Now only the Liveboard background and tile borders are customized, preserving visualization styling.

### Issue 3: SpotterAgentEmbed Not Working
**Problem:** Chatbot returned fixed text responses instead of calling ThoughtSpot AI.  
**Solution:** SpotterAgentEmbed requires:
1. A container DOM element passed to constructor
2. Calling `.render()` before using `.sendMessage()`
3. Hidden div with ref in JSX: `<div ref={containerRef} style={{ display: 'none' }} />`

### Issue 4: App Crashing on Dashboard
**Problem:** EmbedEvent import causing React errors.  
**Solution:** Removed unnecessary EmbedEvent import and event listeners from Dashboard.tsx.

### Issue 5: Pre-filling Spotter Search Without Auto-Execute
**Problem:** Wanted typewriter animation text in Spotter search bar without auto-execution.  
**Solution:** NOT POSSIBLE with current SDK. `searchOptions.searchQuery` always executes. SpotterEmbed treats any query as a prompt. This would require a feature request to ThoughtSpot.

---

## ThoughtSpot Object GUIDs

| Object | Type | GUID |
|--------|------|------|
| Executive Overview | Liveboard | `b70d57b9-c080-4d37-bad7-08ec7b9d2f1e` |
| TIV Catchment Analysis | Liveboard | `0f98877f-d3cc-4f15-ac7b-4dfa4c5f7cb9` |
| Spotter Worksheet | Worksheet | `auto_mode` |

---

## Styling & Branding

### Skyscanner Colors
```css
--skyscanner-blue: #05507d;
--skyscanner-light-blue: #00b2e3;
--skyscanner-pink: #ff5998;
--background-gray: #f5f7fa;
```

### Custom Icon
**Skyscanner Logo:** `https://cdn.jsdelivr.net/gh/CamTS256/icon-store/skyscanner-logo.svg`

### Font
Uses Backpack design system fonts via system font stack.

---

## Key Dependencies

```json
{
  "@thoughtspot/visual-embed-sdk": "^1.44.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "lucide-react": "^0.468.0"
}
```

---

## Running the Application

```bash
cd /Users/cameron.nicholls/skyscanner-partner-portal
npm install
npm run dev
```

Access at: `http://localhost:5173/`

---

## Known Limitations & Future Enhancements

1. **Spotter Pre-fill:** Cannot pre-fill Spotter search input without auto-execution (SDK limitation)
2. **Authentication:** Currently using `AuthType.None` - should implement proper auth for production
3. **TIV Market Trend Page:** Page was deleted - only Dashboard and TIV Catchment remain

---

## Troubleshooting

### Problem: Visualizations appear white/blank
**Check:** Ensure highlighted tiles CSS rules are not forcing white backgrounds on answer modules.

### Problem: Multiple SDK initialization errors
**Check:** All components should import `/src/lib/thoughtspot.ts` instead of calling `init()` directly.

### Problem: SpotterAgentEmbed not responding
**Check:** 
1. Container ref is created and passed to constructor
2. `.render()` is called before `.sendMessage()`
3. Hidden div exists in JSX

### Problem: TypeScript errors
**Run:** `cd /Users/cameron.nicholls/skyscanner-partner-portal && npx tsc --noEmit`

---

## File Checksums (for verification)

Key configuration files that should exist:
- ✅ `/src/lib/thoughtspot.ts` - Centralized SDK init
- ✅ `/src/components/ChatBot.tsx` - SpotterAgentEmbed with container pattern
- ✅ `/src/pages/Dashboard.tsx` - Transparent Liveboard with preserved highlighted tiles
- ✅ `/src/pages/Spotter.tsx` - SpotterEmbed with auto_mode worksheet
- ✅ `/src/pages/Home.tsx` - Figma design implementation

---

## Contact & Resources

- **ThoughtSpot Docs:** https://developers.thoughtspot.com/docs
- **Visual Embed SDK Reference:** https://developers.thoughtspot.com/docs/VisualEmbedSdk
- **Spotter Agent Embed:** https://developers.thoughtspot.com/docs/embed-spotter-agent
- **GitHub Examples:** https://github.com/thoughtspot/visual-embed-sdk

---

**End of Documentation**
