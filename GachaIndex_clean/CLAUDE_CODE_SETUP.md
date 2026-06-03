# Gacha Release Tracker — Claude Code Project Setup

## 🚀 Quick Start with Claude Code

### Prerequisites
- Node.js 18+ installed
- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code`)
- This project folder extracted

### Step 1: Initialize the Project

```bash
cd gacha-release-tracker
npm install
```

### Step 2: Open with Claude Code

```bash
claude code .
```

Claude Code will automatically:
- Scan your project structure
- Load the configuration files
- Prepare the components for editing
- Enable agentic development mode

### Step 3: Start Development Server

Inside Claude Code terminal or your regular terminal:

```bash
npm run dev
```

Your app will be running at **http://localhost:3000**

---

## 📁 Project Structure

```
gacha-release-tracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Tailwind CSS
│   │   ├── page.tsx            # Home page
│   │   └── tracker/
│   │       └── page.tsx        # Tracker page (imports GachaTracker component)
│   ├── components/
│   │   └── GachaTracker.jsx    # Main tracker component
│   └── styles/
│       └── globals.css         # Global Tailwind imports
├── public/                      # Static assets (favicons, images, etc.)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── next.config.js               # Next.js config
└── README.md                    # This file
```

---

## 🛠️ What Claude Code Can Do With This Project

### Generate New Features
```
"Add sorting by release date (ascending/descending)"
"Create a confirmed vs TBA filter toggle"
"Add a stats dashboard showing games by platform"
```

### Refactor Components
```
"Split GachaTracker into smaller components (Header, FilterBar, GameCard, etc.)"
"Extract the game data into a separate data layer"
"Move filter logic into a custom hook"
```

### Fix Issues
```
"Fix the status tag colors so they're visible"
"Add a [Confirmed] badge to games with confirmed dates"
"Make the image fallback more robust"
```

### Deploy & Build
```
"Build the project for production"
"Create a GitHub Actions workflow"
"Generate a Docker configuration"
```

---

## 📝 File Descriptions

### `src/app/layout.tsx`
Root layout that wraps all pages. Includes Tailwind CSS global styles and meta tags.

### `src/app/page.tsx`
Homepage. Can include a landing page or redirect to `/tracker`.

### `src/app/tracker/page.tsx`
The tracker page that imports and renders the `GachaTracker` component.

### `src/components/GachaTracker.jsx`
**The main component.** All filtering, searching, and display logic lives here. This is what you'll iterate on.

### `src/styles/globals.css`
Global CSS. Imports Tailwind directives. Safe to add custom styles here.

---

## 🎨 Customization Points (For Claude Code)

### Change Brand Colors
Look for `#0088DD` (Harri Blue) throughout the component and replace with your color.

Example prompt to Claude Code:
```
"Replace all instances of Harri Blue (#0088DD) with our new brand color #FF6B35"
```

### Update the Game Database
The game data is in `src/components/GachaTracker.jsx` inside `ALL_GAMES_DATA`.

Example prompt:
```
"Add 5 new games to the database: [list games with details]"
"Update Monster Hunter Outlanders release date from TBA to 2026"
```

### Add New Filters
Currently supports: Platform only. 

Example prompt to Claude Code:
```
"Add a Gameplay filter (Real-time, Turn-Based, Rhythm) and an Environment filter (3D, Stage-Based)"
```

---

## 🔍 Common Claude Code Workflows

### Workflow 1: Add Missing Feature
```
claude code .
> "Add a 'sort by name' dropdown"
> "Add a results counter showing X of Y games"
> "Add a 'Clear All Filters' button"
```

### Workflow 2: Debug & Fix
```
claude code .
> "Why aren't the status tag colors showing properly?"
> "Fix the [Confirmed] badge styling"
> "Make sure all links open in a new tab"
```

### Workflow 3: Refactor for Performance
```
claude code .
> "Split GachaTracker into smaller components for better reusability"
> "Move the ALL_GAMES_DATA to a separate data file"
> "Add useMemo to optimize the filter logic"
```

### Workflow 4: Deploy
```
claude code .
> "Create a production build"
> "Generate a Vercel deployment config"
> "Add environment variables for API keys"
```

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| `next@14` | React framework, routing, SSR |
| `react@18` | UI library |
| `tailwindcss@3` | Utility-first CSS |
| `typescript@5` | Type safety |

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Login and link your GitHub repo
npm i -g vercel
vercel

# Then in Vercel dashboard, connect your GitHub repo
# Vercel will auto-build and deploy on every push
```

### Docker
Ask Claude Code to generate a Dockerfile:
```
"Generate a Dockerfile for this Next.js app"
```

### Manual (Node.js server)
```bash
npm run build
npm run start
# App runs on http://localhost:3000
```

---

## 🐛 Troubleshooting

### `npm install` fails
- Ensure Node.js 18+ is installed: `node --version`
- Try clearing cache: `npm cache clean --force`

### Claude Code can't find files
- Make sure you're running `claude code .` from the project root
- Check that all files are in their correct locations (see Project Structure)

### Tailwind styles not applying
- Make sure `npm run dev` is running
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that files are in `src/app/` and `src/components/` (Claude Code watches these)

### Images not loading
- Check browser console for CORS errors
- YouTube image URLs should work. If they don't, use placeholder colors.
- Add `unoptimized: true` in `next.config.js` (already done)

---

## 📚 Claude Code Commands Reference

```bash
# Start development
claude code .

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint

# Clear build cache
rm -rf .next
npm run build
```

---

## 🔗 Quick Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Claude Code Docs**: https://anthropic.com/claude-code
- **React Docs**: https://react.dev

---

## 💬 Example Claude Code Sessions

### Session 1: Add Filters
```
You: "Add gameplay and environment filters to the tracker"

Claude Code will:
1. Identify the game data structure
2. Add filter UI buttons/dropdowns
3. Update the filter logic
4. Test the implementation
```

### Session 2: Fix Styling Issues
```
You: "The status tags are invisible. Make them more visible with better colors"

Claude Code will:
1. Review current styling
2. Add proper Tailwind color classes
3. Add visual hierarchy
4. Test on mobile
```

### Session 3: Performance Optimization
```
You: "Optimize the component for 100+ games"

Claude Code will:
1. Add memoization
2. Implement virtualization if needed
3. Optimize re-renders
4. Add performance metrics
```

---

## 🎯 Next Steps

1. **Run `npm install`** to install dependencies
2. **Run `npm run dev`** to start the dev server
3. **Visit http://localhost:3000** to see the app
4. **Open `claude code .`** to start iterating with AI assistance

---

**Project Status**: ✅ Ready for Claude Code  
**Last Updated**: June 3, 2026  
**Version**: 1.0.0

---

### Need Help?
If Claude Code struggles with a task, be specific:
- "Add a [platform name] to the platform filter list"
- "Fix the skeleton loader animation"
- "Create a mobile-responsive navigation menu"

Claude Code works best with clear, actionable requests.
