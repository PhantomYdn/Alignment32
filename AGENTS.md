# Alignment32

Vue 3 word alignment app. Users enter 32 words across 4 categories, then progressively merge them through associations until one final word remains.

## Commands

```bash
npm run dev      # Vite dev server (hot reload)
npm run build    # Production build
npm run preview  # Preview production build
```

No test framework configured.

## Project Structure

```
src/
├── App.vue              # Root component, session state, view routing
├── main.js              # Vue app entry point
├── style.css            # Tailwind imports
└── components/
    ├── HomeScreen.vue   # Session list, create new session
    ├── WordEntry.vue    # 32-word input form (8 per category)
    ├── Association.vue  # Word pairing and merging logic
    ├── SessionDetail.vue # Read-only completed session view
    ├── StepIndicator.vue # Progress stepper with category colors
    └── WelcomeModal.vue  # First-time user onboarding modal
```

## Code Standards

### Vue Components
- Options API (not Composition API)
- Single File Components: `<template>`, `<script>`, no `<style>` block
- PascalCase component names matching filename
- Props: type + default/required
- Events: declare in `emits` array

### Formatting
- 2-space indentation
- No semicolons (except in object literals)
- Single quotes for strings
- Tailwind utility classes inline (no custom CSS)

### Naming
- camelCase: variables, methods, props
- PascalCase: components, filenames
- kebab-case: custom events, HTML attributes

### Tailwind Patterns
- Responsive: mobile-first with sm:, md:, lg: prefixes
- Gradients: `bg-gradient-to-r from-X to-Y` pattern
- State: hover:, focus:, disabled: prefixes

## Architecture

### View Routing
App.vue manages `currentView` state:
- `'home'` → HomeScreen
- `'word-entry'` → WordEntry
- `'association'` → Association
- `'session-detail'` → SessionDetail

### Data Flow
1. HomeScreen emits `create-session` or `open-session`
2. WordEntry emits `words-complete` with 32 words
3. Association emits `associations-complete` with final result
4. App.vue persists to localStorage

### Persistence
- Key: `alignment32-sessions`
- Format: JSON array of session objects
- Sessions have: id, createdAt, initialWords, wordHistory, associations, finalWord

## Domain Logic

### Categories (8 words each)
Physical, Mental, Emotional, Spiritual

### Reduction Algorithm
1. Pair groups: Physical+Mental, Emotional+Spiritual
2. User creates word associations for each pair
3. Merged groups continue pairing until 1 group remains
4. If final group has multiple words, split and repeat
5. Process ends with single final word

## UX Patterns

### Keyboard Navigation
Standard pattern for all screens:
1. Auto-focus first input in `mounted()` using `$nextTick` + `$refs`
2. Enter key on inputs advances to next input
3. Enter on last input triggers primary action (same as button click)
4. Enter on modals proceeds to next step
5. Scroll to top and focus first input when navigating between sections

### Focus Management
- Focus actual interactive elements (buttons, inputs), not container divs
- `tabindex` on containers creates visual issues (focus rings) and accessibility problems
- Use `ref` on the actual button/input element, then call `.focus()` on it

## Debugging

- **Session not loading**: Check localStorage key, JSON structure
- **Words not saving**: Verify all 32 filled, check trim() logic
- **Association stuck**: Check currentPairs computed, group lengths
- **View not changing**: Check currentView state in App.vue
- **Styles not applying**: Tailwind v4 uses `@import "tailwindcss"` not `@tailwind` directives
- **Visual issues**: Take real screenshots (not PDF) — PDF flattens fixed/absolute elements incorrectly
- **Focus ring on wrong element**: If focus outline appears on container instead of button, check that `ref` and `tabindex` are on the actual interactive element, not a wrapper div
