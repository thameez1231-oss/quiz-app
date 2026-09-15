# QuizKids — EdTech Quiz Application for Classes 1 to 5

> **A joyful, curriculum-aligned learning and quiz web application for children aged 6–11, designed to the visual and pedagogical standards of products like Duolingo and Khan Academy Kids.**

---

## 🌟 Highlights & Visual Identity

- **Design System**: Established color palette (primary indigo brand + subject accents: Math blue, English green, Science purple, GK orange), rounded geometric display typography (**Fredoka** paired with **Nunito** and **Inter**), consistent spacing scale, and soft colored shadows.
- **Real Vector Assets**: Bespoke Storyset/unDraw style vector SVG illustrations for the public hero section and empty states.
- **Mascot Kip the Curious Owl**: Appears with intentional purpose during welcome moments, thinking states, and celebrations.
- **8 Custom Animal Avatars**: Leo the Lion, Oliver the Owl, Felix the Fox, Penny the Panda, Benny the Bunny, Cosmo the Astronaut, Dizzy the Dino, and Pip the Dolphin.
- **Audio Synthesizer (Web Audio API)**: Zero mp3 assets; synthesizes delightful ascending chimes for correct answers, gentle warm low tones for mistakes (no harsh buzzers!), fanfare chords for victories, and soft ambient background music with mute toggles.
- **Curriculum Bank**: 200 hand-curated questions across 4 subjects and 5 grade levels with hints and kid-friendly explanations.
- **Two Play Modes**: Relaxed Untimed Mode (stress-free learning) and Timed Challenge Mode (30-second countdown for older kids).
- **Parent & Teacher Portal**: Protected with a security gate; displays subject accuracy diagnostics, attempt history, and printable report cards.
- **Accessibility**: Includes **Larger Text Mode** and **High-Contrast Mode** toggles.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js LTS (v20+ or v24 LTS)
- npm (v10+)

### Running the App

1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\USER\.gemini\antigravity\scratch\quizkids"
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open the displayed URL (typically `http://localhost:5173`) in your web browser.

### Building for Production

```bash
npm run build
```
This bundles the optimized production build into the `dist/` directory.

---

## 📁 Architecture & Folder Structure

```
quizkids/
├── index.html                   # Google Fonts (Fredoka & Nunito), Page metadata
├── package.json                 # Dependencies (framer-motion, lucide-react, canvas-confetti)
├── tailwind.config.js           # Design tokens: brand, math, english, science, gk colors & fonts
├── postcss.config.js
├── scripts/
│   └── generateQuestions.js     # Script to generate 200 questions across Classes 1–5
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Route definitions & global context providers
│   ├── index.css                # Base typography & accessibility modes (large-text, high-contrast)
│   ├── context/
│   │   ├── UserContext.jsx      # Auth state, guest mode, streak, history & localStorage sync
│   │   └── AudioContext.jsx     # Web Audio API sound synthesizer
│   ├── data/
│   │   └── questions.json       # 200 curriculum questions
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.jsx         # SVG emblem and corporate wordmark
│   │   │   ├── Mascot.jsx       # Kip the Curious Owl vector character
│   │   │   ├── Avatars.jsx      # 8 SVG animal avatars
│   │   │   ├── SoundToggle.jsx  # Sound effect & background music switches
│   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   └── Footer.jsx       # Educational footer
│   │   └── landing/
│   │       ├── HeroIllustration.jsx # Storyset-style vector illustration
│   │       ├── HowItWorks.jsx   # 3-step feature cards
│   │       └── SubjectCards.jsx # 4 subject preview cards
│   └── pages/
│       ├── LandingPage.jsx      # Public product homepage
│       ├── LoginPage.jsx        # Student login, avatar picker, PIN, and guest play
│       ├── DashboardPage.jsx    # Student home, streak counter, recommended quest
│       ├── SubjectsPage.jsx     # Subject & grade selection
│       ├── QuizOverviewPage.jsx # Topic briefing & mode toggle
│       ├── QuizPlayPage.jsx     # Interactive quiz player with instant feedback
│       ├── QuizResultsPage.jsx  # Score, star trophies & question explanations
│       └── ParentPortalPage.jsx # Parent gate, subject mastery diagnostics & report card
```

---

## 🔌 Connecting to a Real Backend or API (v2 Extension)

The application is structured to easily replace `localStorage` with a REST or GraphQL API:
1. In `src/context/UserContext.jsx`, replace the `localStorage` getters and setters with asynchronous API calls to endpoints like `/api/auth/login`, `/api/quizzes/history`, and `/api/progress`.
2. In `src/pages/QuizPlayPage.jsx`, questions can be fetched dynamically from `/api/questions?subject=${subjectId}&class=${classLevel}` instead of importing `questions.json`.
