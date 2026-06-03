# 🚀 QUICK START — Gacha Release Tracker

## 30 Seconds to Running App

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Dev Server
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

✅ **Done.** The tracker is running.

---

## Using Claude Code (Recommended)

### Prerequisites
- Node.js 18+ installed
- Claude Code CLI: `npm install -g @anthropic-ai/claude-code`

### Start Claude Code Session
```bash
claude code .
```

Claude Code will:
- Scan your project
- Load all files
- Enable AI-assisted development

### Example Commands in Claude Code
```
"Add a sort dropdown"
"Fix the status tag colors"
"Add more games to the database"
"Create a mobile nav menu"
```

See **CLAUDE_CODE_SETUP.md** for full guide.

---

## Project Files Overview

| File | Purpose |
|------|---------|
| `src/components/GachaTracker.tsx` | **Main component** (40+ games, all filtering logic) |
| `src/app/tracker/page.tsx` | Tracker page |
| `src/app/layout.tsx` | Root layout + metadata |
| `src/styles/globals.css` | Global CSS with Tailwind |
| `tailwind.config.js` | Tailwind configuration |
| `package.json` | Dependencies & scripts |

---

## What's Already Implemented

✅ Full game database (40+ games)  
✅ Platform filtering (PC, Android, iOS, PlayStation, Xbox)  
✅ Gameplay filtering (Real-time, Turn-Based, Rhythm)  
✅ Environment filtering (3D, Stage-Based)  
✅ Release date sorting  
✅ Search functionality  
✅ localStorage persistence  
✅ Image loading with fallbacks  
✅ Mobile responsive  
✅ Accessibility labels  
✅ [Confirmed] badge styling  
✅ Status color coding  

---

## What Needs Work (For Claude Code)

Ask Claude Code to:
- "Add game icons/images with real URLs"
- "Improve status tag visibility"
- "Add pagination for 100+ games"
- "Create a stats dashboard"
- "Add dark mode toggle"
- "Optimize for mobile"

---

## Building & Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Follow prompts to connect your GitHub repo. Vercel auto-deploys on push.

### Docker
```bash
docker build -t gacha-tracker .
docker run -p 3000:3000 gacha-tracker
```

---

## Customization

### Change Brand Color
Search for `#0088DD` and replace with your color throughout the project.

### Add Games
Edit `src/components/GachaTracker.tsx` → `ALL_GAMES_DATA` array.

### Modify Styling
Edit `tailwind.config.js` or add custom CSS in `src/styles/globals.css`.

---

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Styles not updating?**
Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Test the filtering and search
5. 🤖 Open `claude code .` to iterate with AI
6. 🚢 Deploy to Vercel when ready

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: June 3, 2026

For detailed setup with Claude Code, see **CLAUDE_CODE_SETUP.md**.
