# Alignment32 - Implementation Plan

A phased implementation plan for Alignment32, aligned with the [PRD](PRD.md). Sprints 1-4 covered UX redesign, mobile optimization, accessibility, and PWA support. Sprints 5-8 cover dark mode, sharing, analytics, testing, and launch prep.

---

## Incoming

> Unscheduled items. Add new work here; next plan run will triage.

- [ ] Update AGENTS.md to document BottomSheet.vue, analytics.js, gestures.js, haptics.js, storage.js

---

## Phase 1: Critical UX Fixes - COMPLETED (Sprint 1)

### 1.1 Onboarding & Welcome Experience
- [x] Create `WelcomeModal.vue` component with 3-4 slide introduction
  - Slide 1: What is Alignment32? (purpose explanation)
  - Slide 2: The 4 categories explained (Physical, Mental, Emotional, Spiritual)
  - Slide 3: How the process works (32 → merge → 1 word)
  - Slide 4: What you'll discover (benefits/outcome)
- [x] Add "Don't show again" checkbox with localStorage persistence
- [x] Add "Learn More" link on HomeScreen for returning users
- [x] Write compelling, concise copy for each slide

### 1.2 Stepper-Based Word Entry
- [x] Redesign `WordEntry.vue` with tabbed/stepper interface
  - [x] Create step indicator component (dots/progress bar)
  - [x] Show ONE category at a time (not all 32 inputs)
  - [x] Add "Next" / "Previous" navigation between categories
  - [x] Add category description/explanation for each step
  - [x] Include 3-4 example words as inspiration (subtle, optional)
- [x] Sticky progress indicator at top (always visible)
- [x] Sticky "Continue" button at bottom on mobile
- [x] Add transition animations between steps

### 1.3 Auto-Save Functionality
- [x] Implement auto-save on every input change (debounced 500ms)
- [x] Save incomplete sessions to localStorage
- [x] Show "Draft saved" indicator (in header, near step indicator)
- [x] Add "Resume" option on HomeScreen for incomplete sessions
- [x] Add visual indicator for draft vs completed sessions

### 1.4 Word Input Improvements
- [x] Add character limit indicator (prevent overly long words) - maxlength="30" on inputs
- [x] Add subtle validation (no empty, no duplicates within category) - duplicate warning shown
- [x] Show completion checkmark when category is done (8/8) - green completion message
- [ ] ~~Add optional "Get Inspiration" button per category~~ - SKIPPED (placeholders sufficient)
- [x] Improve placeholder text with actual example words

---

## Phase 2: Association Screen Redesign - COMPLETED (Sprint 2)

### 2.1 Simplify Information Architecture
- [x] Show ONE pair at a time (not all pairs simultaneously)
- [x] Clear step indicator: "Pair 1 of 2" with visual progress
- [x] Larger, more readable word cards (no truncation!)
- [x] Clearer instruction: "Create a word that represents both concepts"

### 2.2 Interactive Pairing (Future Enhancement)
- [ ] Consider drag-and-drop word pairing (user chooses matches)
- [ ] Or: Keep fixed pairing but make it feel more intentional
- [ ] Add "Why these words?" optional explanation

### 2.3 Better Association Input
- [x] Larger input field for association word
- [x] Show the two source words prominently above input
- [ ] Add "Stuck? Get a hint" feature (optional AI suggestion placeholder) - DEFERRED
- [x] Visual "merge" animation when association is entered (checkmark appears)

### 2.4 Progress & Completion
- [x] Animated progress visualization (overall + per-pair progress bars)
- [x] Celebration micro-interaction when pair is complete (green checkmarks, dot indicators)
- [x] Summary view before proceeding to next round (round summary modal)

---

## Phase 3: Visual Design Overhaul - COMPLETED (Sprint 3)

### 3.1 Color System & Theme
- [x] Define custom color palette (calming, spiritual aesthetic)
  - Primary: Deep indigo/purple spectrum (brand colors)
  - Category colors: Physical=Amber, Mental=Blue, Emotional=Rose, Spiritual=Lavender (pastel)
  - Review/Gold color for step indicator completion
  - Backgrounds: Soft gradients, not flat gray
- [x] Add to `tailwind.config.js` as custom colors
- [x] Consistent color usage across all components
- [x] StepIndicator uses category-specific colors (completed steps show their category color)

### 3.2 Typography & Spacing
- [x] Add custom font (Inter) via Google Fonts
- [x] Improve text hierarchy (sizes, weights)
- [x] Increase whitespace for breathing room
- [x] Better line-height for readability

### 3.3 Component Styling
- [x] Redesign cards with subtle shadows (shadow-soft, shadow-soft-lg) and rounded corners (2xl, 3xl)
- [x] Add hover states with smooth transitions
- [x] Updated gradient buttons with glow effects on hover
- [x] Consistent border-radius across components

### 3.4 Micro-interactions & Animations
- [x] Input focus animations (focus:ring, focus:shadow-md, scale transitions)
- [x] Category completion celebration (celebration-glow animation)
- [x] Page transition animations (page transition, step-slide, fade)
- [x] Progress bar animations (transition-all duration-500)
- [x] Final word reveal animation (confetti burst + pulsing glow)
- [x] Button click feedback (active:scale-95)

---

## Phase 4: Mobile, Sessions, Accessibility & PWA - COMPLETED (Sprint 4)

### 4.1 Layout Improvements
- [x] Collapsible sections for word entry review
- [ ] ~~Bottom sheet patterns for mobile inputs~~ - DEFERRED (see Future)
- [x] Larger touch targets (min 44x44px)
- [x] Proper spacing for thumb reach zones

### 4.2 Navigation
- [x] Sticky header with context (current step) - Added to Association & SessionDetail
- [x] Sticky bottom CTA button - WordEntry + Association mobile footer
- [ ] ~~Swipe gestures between steps~~ - DEFERRED (see Future)
- [ ] ~~Pull-to-refresh for session list~~ - DEFERRED (see Future)

### 4.3 Performance
- [x] Lazy load components (confetti library - dynamic import)
- [x] Smooth scrolling (CSS scroll-behavior: smooth)
- [ ] ~~Optimize re-renders~~ - NOT NEEDED (Vue handles this well)
- [ ] ~~Reduce layout shifts~~ - NOT NEEDED (no significant CLS issues)

### 4.4 Session Identity
- [x] Allow naming sessions (inline editable, with default date-based name)
- [ ] ~~Add session icon/color picker~~ - DEFERRED (low value)
- [x] Show preview of initial words on session card

### 4.5 Session Actions
- [x] Delete session with confirmation
- [ ] ~~Duplicate session (start fresh with same words)~~ - DEFERRED (see Future)
- [ ] ~~Edit completed session (restart from associations)~~ - DEFERRED (see Future)

### 4.6 Accessibility
- [x] Add proper ARIA labels to all interactive elements
- [x] Keyboard navigation support (focus trapping in modals, tab navigation)
- [x] Screen reader announcements for progress (aria-live regions)
- [x] Color contrast compliance (WCAG AA) - uses Tailwind standard colors
- [x] Focus indicators (focus:ring styles)

### 4.7 Error Handling
- [x] Graceful localStorage errors (storage.js utilities)
- [x] Form validation messages (duplicate word warnings)
- [x] Empty state improvements (HomeScreen empty state)

### 4.8 PWA & Branding
- [x] PWA support (installable app) - vite-plugin-pwa configured
- [x] Create SVG logo (mandala design with 4-fold symmetry, category colors)
- [x] Generate PWA icons (192x192, 512x512, apple-touch-icon)
- [x] Update favicon and index.html with new logo
- [x] Mobile gesture support (gestures.js - swipe, long-press detection)
- [x] Haptic feedback (haptics.js - Vibration API wrapper)
- [x] Google Analytics integration (analytics.js - GA4 event tracking across all components)

---

## Phase 5: Dark Mode - Sprint 5 (Weeks 1-2)

> PRD: FR-008, FR-009, FR-010 | US-006

### 5.1 Theme Infrastructure
- [ ] Add `darkMode: 'class'` to `tailwind.config.js`
- [ ] Create `src/utils/theme.js` utility for theme detection and persistence
- [ ] Detect OS color scheme via `prefers-color-scheme` media query on load
- [ ] Persist user preference to localStorage key `alignment32-theme`
- [ ] Apply `dark` class to `<html>` element based on resolved preference

### 5.2 Theme Toggle UI
- [ ] Add theme toggle button to app header (sun/moon icon)
- [ ] Toggle cycles: system default → light → dark → system default
- [ ] Show current mode indicator (icon changes to reflect active theme)
- [ ] Ensure toggle is accessible (ARIA label, keyboard operable)

### 5.3 Component Dark Variants
- [ ] Update `style.css` with dark mode base styles (background, text colors)
- [ ] HomeScreen: dark card backgrounds, adjusted shadows, readable text
- [ ] WordEntry: dark input fields, category color adjustments for dark backgrounds
- [ ] Association: dark word cards, input field contrast
- [ ] SessionDetail: dark read-only view styling
- [ ] WelcomeModal: dark modal backdrop and content
- [ ] StepIndicator: ensure category colors remain distinguishable on dark backgrounds
- [ ] BottomSheet: dark variant styling

### 5.4 Dark Mode Validation
- [ ] Verify all category colors (Amber, Blue, Rose, Lavender) pass WCAG AA contrast on dark backgrounds
- [ ] Test gradient buttons and glow effects in dark mode
- [ ] Verify confetti animation visibility on dark background
- [ ] Test on mobile (both iOS dark mode and Android dark mode)

---

## Phase 6: Session Sharing & Export - Sprint 5 (Weeks 1-2)

> PRD: FR-011, FR-012, FR-013 | US-007

### 6.1 URL Encoding Engine
- [ ] Create `src/utils/share.js` with encode/decode functions
- [ ] Implement session data → JSON → deflate → base64url encoding pipeline
- [ ] Implement reverse: base64url → inflate → JSON → session data
- [ ] Add data validation on decode (handle malformed/corrupted URLs gracefully)
- [ ] Verify encoded URL stays under 2000 characters for typical sessions
- [ ] Unit-test encode/decode round-trip with sample session data

### 6.2 Share UI
- [ ] Add "Share" button to SessionDetail.vue (completed sessions only)
- [ ] Generate shareable URL on button click
- [ ] Copy generated URL to clipboard automatically (with feedback toast)
- [ ] Show URL preview / "Link copied!" confirmation
- [ ] Add `navigator.share()` Web Share API as progressive enhancement (mobile)

### 6.3 Shared Session View
- [ ] Add URL hash/query parameter route handling in App.vue
- [ ] Parse encoded session from URL on app load
- [ ] Render shared session in read-only SessionDetail view
- [ ] Show "Shared Session" indicator (distinct from user's own sessions)
- [ ] Show error state for invalid/corrupted share links with clear messaging
- [ ] Add "Try Alignment32" CTA on shared view (link to create own session)

### 6.4 Clipboard Copy
- [ ] Add "Copy Final Word" button to SessionDetail.vue
- [ ] Add "Copy Journey Summary" option (formatted text with all rounds)
- [ ] Use `navigator.clipboard.writeText()` with fallback for older browsers
- [ ] Show toast confirmation on successful copy

---

## Phase 7: Insights & Analytics Dashboard - Sprint 6 (Weeks 3-4)

> PRD: FR-014, FR-015, FR-016 | US-008, US-009

### 7.1 User-Facing Word Insights
- [ ] Create `src/components/InsightsView.vue` component
- [ ] Add "Insights" navigation option on HomeScreen (visible when 2+ completed sessions)
- [ ] Add `'insights'` view state to App.vue routing
- [ ] Word frequency analysis: show most-used words across all sessions
- [ ] Category contribution analysis: which categories produce final-round words most often
- [ ] Visual representations (simple bar charts or word cloud using CSS/canvas)
- [ ] Session-over-time view: show final words chronologically to reveal evolution

### 7.2 Product Analytics Enhancement
- [ ] Extend existing `analytics.js` to track share URL generation events
- [ ] Track dark mode toggle events and preference distribution
- [ ] Track insights view engagement (page views, time spent)
- [ ] Add session abandonment tracking (started but never completed, with phase info)
- [ ] Ensure all analytics respect privacy (no PII, anonymized identifiers)

### 7.3 Image Export
- [ ] Add "Export as Image" button to SessionDetail.vue
- [ ] Generate shareable card image (final word + journey summary)
- [ ] Use Canvas API or html2canvas library for image generation
- [ ] Support PNG download with branded styling (logo, colors)
- [ ] Optimize for social media sharing dimensions (1200x630 or square)

---

## Phase 8: Testing & Launch Preparation - Sprints 7-8 (Weeks 5-8)

> PRD: NFRs (Performance, Browser Compatibility) | Backlog: Test Framework

### 8.1 Test Framework Setup
- [ ] Install Vitest and @vue/test-utils as dev dependencies
- [ ] Configure Vitest in `vite.config.js`
- [ ] Add `npm run test` and `npm run test:watch` scripts to package.json
- [ ] Create test directory structure matching `src/` layout

### 8.2 Critical Path Tests
- [ ] Test word entry validation (duplicates, empty, character limits)
- [ ] Test association pairing algorithm (correct pairs, round progression, final word)
- [ ] Test session CRUD (create, read, update name, delete)
- [ ] Test auto-save and draft resume flow
- [ ] Test share URL encode/decode round-trip
- [ ] Test theme detection and toggle persistence

### 8.3 Performance Optimization
- [ ] Run Lighthouse audit and address any scores below 90
- [ ] Verify bundle size under 200KB gzipped
- [ ] Test First Contentful Paint < 1 second on throttled 4G
- [ ] Optimize any large dependencies (tree-shaking, lazy loading)

### 8.4 Cross-Browser QA
- [ ] Test on Chrome (desktop + Android)
- [ ] Test on Safari (desktop + iOS)
- [ ] Test on Firefox (desktop)
- [ ] Test on Edge (desktop)
- [ ] Verify PWA installation on Android and iOS
- [ ] Verify offline functionality across browsers

### 8.5 Launch Checklist
- [ ] Final WCAG AA accessibility audit
- [ ] Update README.md with new features (dark mode, sharing, insights)
- [ ] Update AGENTS.md with new components and utilities
- [ ] Verify all analytics events firing correctly
- [ ] Address any npm audit security vulnerabilities
- [ ] Production build and deployment verification

---

## Future

> Nice-to-have items outside current scope. Revisit after Sprint 8.

### UX Enhancements
- [ ] Drag-and-drop word pairing (user chooses which words to associate)
- [ ] "Stuck? Get a hint" AI suggestion for associations
- [ ] Swipe gestures between steps (Hammer.js or VueUse integration)
- [ ] Pull-to-refresh for session list
- [ ] Bottom sheet patterns for mobile inputs
- [ ] Undo/redo during association phase

### Session Features
- [ ] Session duplication (start fresh with same initial words)
- [ ] Edit/restart completed sessions from association phase
- [ ] Session templates (pre-defined word sets for guided exercises)
- [ ] Export/import sessions as JSON (backup/restore)
- [ ] Export full journey as PDF

### Platform
- [ ] Custom category definitions (user-defined instead of fixed 4)
- [ ] Multi-language support (i18n)
- [ ] Error boundaries for graceful component failure recovery
- [ ] Advanced word pattern analytics across sessions
