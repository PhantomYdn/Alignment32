# Alignment32 - Product Requirements Document

## Overview

Alignment32 is a client-side Vue 3 web application that guides users through a structured word alignment process to discover their personal core values. Users enter 32 meaningful words across 4 life categories (Physical, Mental, Emotional, Spiritual), then progressively merge them through guided word association until a single word remains -- representing their core alignment.

The app solves the problem of abstract self-reflection by providing a concrete, step-by-step framework that transforms scattered thoughts into a focused personal insight. All data stays local to the user's browser, ensuring complete privacy.

## Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| Session completion rate | >70% of started sessions reach a final word | Track via in-app analytics |
| Return usage | >30% of users create 2+ sessions within 30 days | Track session creation frequency per device |
| Mobile usability | Equal experience quality on mobile and desktop | Lighthouse mobile score >90 |
| Offline capability | Full functionality without internet connection | PWA audit pass, all features work offline |
| Load performance | Sub-second initial load on 4G connection | Lighthouse performance score >90 |

## Target Audience

### Primary Persona: The Goal-Oriented Improver

**Profile**: Adults (25-55) actively working on personal development. They set goals, track habits, journal, or use self-improvement tools regularly. They value structured approaches over freeform reflection.

**Characteristics**:
- Reads personal development books or listens to related podcasts
- Uses apps for goal tracking, meditation, or journaling
- Wants actionable insights, not just abstract exercises
- Values privacy in self-reflection tools
- Comfortable with web apps on both mobile and desktop
- May revisit the exercise periodically to track how their alignment evolves

**Key Use Cases**:
1. **Initial discovery**: First-time user exploring their core values through the 32-word process
2. **Periodic check-in**: Returning user creating a new session to see how their alignment has shifted
3. **Sharing results**: User sharing their word journey with a friend, coach, or on social media
4. **Comparison**: Reviewing past sessions to observe patterns and personal growth over time

## Features

### Implemented (Current State)

| Feature | Priority | Description | Status |
|---------|----------|-------------|--------|
| Stepper word entry | P0 | One category at a time with progress indicator | Done |
| Auto-save drafts | P0 | Debounced save to localStorage, resume from HomeScreen | Done |
| Word association engine | P0 | Guided pairing and merging across rounds until 1 word | Done |
| Session management | P0 | Create, name, delete, view completed sessions | Done |
| Onboarding modal | P1 | 4-slide introduction for first-time users | Done |
| Category-colored UI | P1 | Physical=Amber, Mental=Blue, Emotional=Rose, Spiritual=Lavender | Done |
| Micro-interactions | P1 | Confetti, glow animations, celebration states | Done |
| PWA / offline support | P1 | Installable app with full offline functionality | Done |
| Mobile optimization | P1 | Sticky headers, 44px touch targets, thumb-reach CTAs | Done |
| Accessibility (WCAG AA) | P1 | ARIA labels, focus trapping, keyboard navigation, screen reader support | Done |

### Planned (Next Phase)

| Feature | Priority | Description | Target |
|---------|----------|-------------|--------|
| Dark mode | P1 | System preference detection + manual toggle | Sprint 5 |
| Export: shareable URL | P1 | Encode full journey in URL (PlantUML-style encoding) | Sprint 5 |
| User-facing word insights | P2 | Word clouds, category trends, pattern analysis across sessions | Sprint 6 |
| Product analytics | P2 | Completion rates, time spent, feature usage tracking | Sprint 6 |
| Export: clipboard copy | P2 | Copy final word or journey summary to clipboard | Sprint 5 |
| Export: image card | P2 | Generate shareable image of final word / journey | Sprint 6 |

### Future Considerations (Backlog)

| Feature | Priority | Description |
|---------|----------|-------------|
| Test framework (Vitest) | P2 | Automated component and unit tests |
| Custom categories | P3 | User-defined categories instead of fixed 4 |
| Multi-language (i18n) | P3 | Support for multiple languages |
| Swipe gestures | P3 | Touch swipe between steps on mobile |
| Session templates | P3 | Pre-defined word sets for guided exercises |
| Session duplication | P3 | Start fresh session with same initial words |
| Undo/redo in associations | P3 | Step back during association phase |

## User Stories

### Word Entry

**US-001**: As a goal-oriented improver, I want to enter 8 words per category one category at a time, so that I can focus deeply on each life area without feeling overwhelmed.
- Acceptance Criteria:
  - [x] Only one category visible at a time with navigation between them
  - [x] Progress indicator shows which category I'm on (1 of 5 including review)
  - [x] Example words shown as placeholders for inspiration
  - [x] Duplicate words within a category trigger a warning
  - [x] Auto-save preserves my progress if I leave

**US-002**: As a returning user, I want to resume an incomplete session, so that I don't lose my progress if I'm interrupted.
- Acceptance Criteria:
  - [x] Draft sessions appear on HomeScreen with visual "draft" indicator
  - [x] Clicking a draft session resumes where I left off
  - [x] "Draft saved" indicator confirms auto-save is working

### Association Phase

**US-003**: As a user in the association phase, I want to see one word pair at a time with clear instructions, so that I can thoughtfully create each association.
- Acceptance Criteria:
  - [x] One pair displayed at a time with both words prominently shown
  - [x] Clear instruction text: "Create a word that represents both concepts"
  - [x] Progress indicator shows pair N of M and overall round progress
  - [x] Visual celebration when a pair is completed

**US-004**: As a user completing the final round, I want a satisfying reveal of my alignment word, so that the experience feels meaningful and conclusive.
- Acceptance Criteria:
  - [x] Confetti animation on final word reveal
  - [x] Final word displayed prominently with glow effect
  - [x] Session automatically saved as completed

### Session Management

**US-005**: As a user with multiple sessions, I want to name, view, and delete sessions, so that I can organize and revisit my alignment journeys.
- Acceptance Criteria:
  - [x] Sessions have editable names (default: date-based)
  - [x] Session cards show word preview (sample of initial words)
  - [x] Delete with confirmation dialog
  - [x] Completed sessions open in read-only detail view

### Dark Mode (Planned)

**US-006**: As a user who prefers dark interfaces, I want the app to support dark mode, so that I can use it comfortably in low-light environments.
- Acceptance Criteria:
  - [ ] App detects system dark/light preference on load
  - [ ] Manual toggle available to override system preference
  - [ ] Preference persisted to localStorage
  - [ ] All components render correctly in both themes
  - [ ] Category colors remain distinguishable in dark mode

### Sharing (Planned)

**US-007**: As a user who completed a session, I want to share my full word journey via a URL, so that others can see my alignment process without needing an account.
- Acceptance Criteria:
  - [ ] "Share" button generates a URL with encoded session data
  - [ ] URL contains all 32 initial words, all associations, and the final word
  - [ ] Encoding uses compression (like PlantUML's deflate+base64 URL encoding)
  - [ ] Shared URL opens a read-only view of the session
  - [ ] No backend required -- all data encoded in the URL itself
  - [ ] URL length stays reasonable (<2000 chars for most sessions)

### Analytics (Planned)

**US-008**: As a returning user with multiple sessions, I want to see insights about my word patterns, so that I can track how my values evolve over time.
- Acceptance Criteria:
  - [ ] Dashboard or insights view accessible from HomeScreen
  - [ ] Shows word frequency across sessions (which words recur)
  - [ ] Category-level analysis (which category produces the most final-round words)
  - [ ] Visual representations (word cloud, bar charts, or similar)

**US-009**: As a product owner, I want to understand usage patterns, so that I can prioritize features and improve the experience.
- Acceptance Criteria:
  - [ ] Track session start, completion, and abandonment rates
  - [ ] Track time spent per phase (word entry, association, review)
  - [ ] Privacy-respecting: no PII collected, opt-in or anonymized
  - [ ] Analytics data exportable for analysis

## Functional Requirements

### Core (Implemented)

- **FR-001**: The app shall present a stepper interface showing one word category at a time (Physical, Mental, Emotional, Spiritual) with 8 input fields per category.
- **FR-002**: The app shall auto-save session state to localStorage on every input change, debounced by 500ms.
- **FR-003**: The app shall pair word groups (Physical+Mental, Emotional+Spiritual) and present one pair at a time for user-created associations.
- **FR-004**: The app shall continue the reduction algorithm until exactly one word remains, handling odd group sizes by splitting and re-pairing.
- **FR-005**: The app shall persist all sessions as a JSON array under the `alignment32-sessions` localStorage key with fields: id, createdAt, name, initialWords, wordHistory, associations, finalWord.
- **FR-006**: The app shall display a 4-slide onboarding modal for first-time users, with a "Don't show again" option persisted to localStorage.
- **FR-007**: The app shall provide session CRUD: create (with auto-generated date name), read (detail view), update (rename), delete (with confirmation).

### Dark Mode (Planned)

- **FR-008**: The app shall detect the user's OS color scheme preference via `prefers-color-scheme` media query.
- **FR-009**: The app shall provide a visible toggle to switch between light and dark themes.
- **FR-010**: The app shall persist the user's theme preference to localStorage and apply it on subsequent visits, overriding OS preference if explicitly set.

### Sharing (Planned)

- **FR-011**: The app shall encode a complete session (initial words, associations, final word) into a URL-safe string using deflate compression and base64 encoding.
- **FR-012**: The app shall decode shared URLs and render a read-only session view without requiring localStorage data.
- **FR-013**: The app shall validate decoded URL data and show an error state for malformed or corrupted share links.

### Analytics (Planned)

- **FR-014**: The app shall provide a user-facing insights view showing word frequency analysis across all completed sessions.
- **FR-015**: The app shall track anonymized usage events (session start, phase transitions, completion, abandonment) in localStorage.
- **FR-016**: The app shall provide category-level analysis showing which categories contribute most to later association rounds.

## Non-functional Requirements

### Performance
- Initial page load under 1 second on a 4G mobile connection
- Lighthouse Performance score >90
- Bundle size under 200KB gzipped (excluding PWA cache assets)
- All interactions respond within 100ms (input, navigation, transitions)

### Security & Privacy
- Zero data transmission to external servers (fully client-side)
- No cookies, no tracking pixels, no third-party scripts (unless analytics is opt-in)
- All data stored in browser localStorage only
- Shared URLs contain only the session data the user explicitly chooses to share

### Accessibility
- WCAG AA compliance across all components
- Full keyboard navigation (tab order, Enter to submit, Escape to close modals)
- Screen reader support via ARIA labels, live regions, and semantic HTML
- Focus trapping in modal dialogs
- Color contrast ratios meet AA minimum (4.5:1 for normal text, 3:1 for large text)
- Touch targets minimum 44x44px on mobile

### Browser Compatibility
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 15+)
- Chrome for Android (last 2 versions)

### Scalability
- localStorage limit (~5MB) supports approximately 50-100 full sessions
- URL-encoded sessions must stay under 2000 characters for broad compatibility
- No backend infrastructure required for any current or planned feature

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Session completion rate | >70% of started sessions | In-app analytics: sessions with finalWord / total sessions |
| Return usage rate | >30% create 2+ sessions in 30 days | localStorage session timestamps analysis |
| Mobile Lighthouse score | >90 (Performance + Accessibility) | Lighthouse CI or manual audit |
| PWA installability | Passes all PWA audit checks | Lighthouse PWA audit |
| Load time (4G) | <1 second first contentful paint | Lighthouse or WebPageTest |
| Share URL adoption | >10% of completed sessions generate a share URL | In-app event tracking |
| Dark mode usage | >25% of users toggle or use dark mode | Theme preference in localStorage |

## Timeline

| Milestone | Target | Dependencies | Description |
|-----------|--------|--------------|-------------|
| Sprint 5: Dark Mode + Sharing | Weeks 1-2 | None | FR-008 through FR-013. Dark mode implementation and shareable URL encoding/decoding. |
| Sprint 6: Analytics + Export | Weeks 3-4 | Sprint 5 (share URL view reuse) | FR-014 through FR-016. User insights dashboard and product analytics. Image export. |
| Sprint 7: Polish + Testing | Weeks 5-6 | Sprint 6 | Vitest setup, component tests for critical paths, bug fixes, performance optimization. |
| Sprint 8: Launch Prep | Weeks 7-8 | Sprint 7 | Final QA, Lighthouse audits, documentation updates, production deployment. |

---

## Appendix: Architecture Reference

### Tech Stack
- **Framework**: Vue 3 (Options API)
- **Styling**: Tailwind CSS v4 with custom theme (tailwind.config.js)
- **Build**: Vite with vite-plugin-pwa
- **Font**: Inter (Google Fonts)
- **Storage**: Browser localStorage

### View Routing (App.vue state machine)
- `'home'` -> HomeScreen
- `'word-entry'` -> WordEntry
- `'association'` -> Association
- `'session-detail'` -> SessionDetail

### Component Map
| Component | Purpose |
|-----------|---------|
| App.vue | Root: session state, view routing, welcome modal |
| HomeScreen.vue | Session list, create new, resume draft |
| WordEntry.vue | Stepper-based 32-word input (8 per category) |
| Association.vue | Word pairing and merging, one pair at a time |
| SessionDetail.vue | Read-only completed session view |
| StepIndicator.vue | Progress stepper with category colors |
| WelcomeModal.vue | First-time onboarding (4 slides) |

### Data Model (localStorage)
```json
{
  "id": "uuid",
  "createdAt": "ISO-8601",
  "name": "Session Mar 3, 2026",
  "initialWords": {
    "physical": ["word1", "..."],
    "mental": ["..."],
    "emotional": ["..."],
    "spiritual": ["..."]
  },
  "wordHistory": [["round1 words"], ["round2 words"]],
  "associations": [{"word1": "x", "word2": "y", "result": "z"}],
  "finalWord": "alignment"
}
```
