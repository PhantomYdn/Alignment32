# Alignment32 - Product Requirements Document

## Overview

Alignment32 is a client-side Vue 3 web application that guides users through a structured word alignment process to discover their personal core values. Users enter 32 meaningful words across 4 life categories (Physical, Mental, Emotional, Spiritual), then progressively merge them through guided word association until a single word remains -- representing their core alignment.

The app solves the problem of abstract self-reflection by providing a concrete, step-by-step framework that transforms scattered thoughts into a focused personal insight. All data stays local to the user's device, ensuring complete privacy.

The app is distributed as a PWA for web browsers and as native mobile applications for iOS and Android via Capacitor, with listings on the Apple App Store and Google Play Store.

## Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| Session completion rate | >70% of started sessions reach a final word | Track via in-app analytics |
| Return usage | >30% of users create 2+ sessions within 30 days | Track session creation frequency per device |
| Mobile usability | Equal experience quality on mobile and desktop | Lighthouse mobile score >90 |
| Offline capability | Full functionality without internet connection | PWA audit pass, all features work offline |
| Load performance | Sub-second initial load on 4G connection | Lighthouse performance score >90 |
| App store presence | Published on Google Play and Apple App Store | Store listing live and approved |
| Native install rate | >500 installs within 3 months of store launch | App store analytics dashboards |

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
| Capacitor native wrapper | P1 | Package web app as native iOS and Android apps via Capacitor | Sprint 9 |
| Native share sheet | P1 | Use OS-level share dialog for session sharing (Capacitor Share plugin) | Sprint 9 |
| Push notifications | P2 | Check-in reminders and update notifications (Capacitor Push Notifications) | Sprint 9 |
| Native haptic feedback | P2 | Replace Web Vibration API with Capacitor Haptics for richer tactile response | Sprint 9 |
| Biometric app lock | P2 | Optional fingerprint/Face ID unlock to protect private session data | Sprint 9 |
| App icon badge | P2 | Show badge count on app icon for draft sessions pending completion | Sprint 9 |
| Native status bar styling | P2 | Match status bar color/style to app theme and dark mode (Capacitor Status Bar) | Sprint 9 |
| App store submission | P1 | Publish to Google Play Store and Apple App Store with listings | Sprint 10 |

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

### Native Mobile App (Planned)

**US-010**: As a mobile user, I want to install Alignment32 from the App Store or Google Play, so that I get a native app experience with reliable storage and OS integration.
- Acceptance Criteria:
  - [ ] App installable from Apple App Store (iOS 15+)
  - [ ] App installable from Google Play Store (Android 8+)
  - [ ] All web features work identically in native shell
  - [ ] Session data persists reliably via Capacitor Preferences API
  - [ ] Status bar matches app theme (light/dark)

**US-011**: As a privacy-conscious user, I want to lock the app with biometrics, so that my personal word data is protected if someone else accesses my phone.
- Acceptance Criteria:
  - [ ] Optional biometric lock toggle in app settings
  - [ ] Supports Face ID, Touch ID (iOS) and fingerprint/face unlock (Android)
  - [ ] App prompts for biometric on launch when enabled
  - [ ] Graceful fallback if biometrics unavailable (skip lock, not block access)

**US-012**: As a returning user, I want to receive occasional reminders to do a check-in session, so that I maintain my alignment practice over time.
- Acceptance Criteria:
  - [ ] Opt-in push notification for periodic check-in reminders
  - [ ] User can configure frequency (weekly, monthly) or disable
  - [ ] Notification taps open the app to the create-session flow
  - [ ] No notifications sent without explicit user permission

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

### Native Mobile App (Planned)

- **FR-017**: The app shall be packaged as native iOS and Android applications using Capacitor, wrapping the existing Vue 3 web app in a native WebView shell.
- **FR-018**: The app shall abstract data persistence behind a unified storage API that uses Capacitor Preferences API on native platforms and localStorage on web, with transparent read/write for all existing session data.
- **FR-019**: The app shall integrate the Capacitor Share plugin to invoke the native OS share sheet when sharing session URLs, falling back to clipboard copy on web.
- **FR-020**: The app shall support opt-in push notifications via Capacitor Push Notifications plugin, with configurable reminder frequency (weekly, monthly, off) persisted in app settings.
- **FR-021**: The app shall replace the Web Vibration API with Capacitor Haptics plugin on native platforms for richer tactile feedback during celebrations and interactions.
- **FR-022**: The app shall provide an optional biometric lock via Capacitor Biometrics plugin, prompting for Face ID / Touch ID / fingerprint on app launch when enabled.
- **FR-023**: The app shall display a badge count on the native app icon reflecting the number of incomplete draft sessions, using the Capacitor Badge plugin.
- **FR-024**: The app shall control the native status bar appearance via the Capacitor Status Bar plugin, matching the bar color and style to the active theme (light/dark).
- **FR-025**: The app shall handle deep links for shared session URLs, opening the app directly to the shared session view when a share URL is tapped on a device with the native app installed.

## Non-functional Requirements

### Performance
- Initial page load under 1 second on a 4G mobile connection
- Lighthouse Performance score >90
- Bundle size under 200KB gzipped (excluding PWA cache assets)
- All interactions respond within 100ms (input, navigation, transitions)

### Storage
- Web: browser localStorage (current behavior, unchanged)
- Native (iOS/Android): Capacitor Preferences API for reliable persistent storage
- Unified storage abstraction layer so all app code uses one API regardless of platform
- Data format identical across platforms (JSON session objects)

### Security & Privacy
- Zero data transmission to external servers (fully client-side) except opt-in push notification registration
- No cookies, no tracking pixels, no third-party scripts (unless analytics is opt-in)
- All data stored locally: browser localStorage (web) or Capacitor Preferences (native)
- Shared URLs contain only the session data the user explicitly chooses to share
- Optional biometric lock for native apps (Face ID, Touch ID, fingerprint)
- App store privacy policy required for store submission

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

### Native Platform Compatibility
- iOS 15+ (Capacitor minimum: iOS 14, targeting 15+ for broader API support)
- Android 8.0+ (API level 26+, Capacitor minimum)
- Xcode 15+ required for iOS builds
- Android Studio with SDK 34+ required for Android builds
- App Store compliance: privacy nutrition labels, app review guidelines
- Google Play compliance: target API level requirements, privacy policy

### Scalability
- localStorage limit (~5MB) supports approximately 50-100 full sessions
- Capacitor Preferences has no practical size limit on native (device storage bound)
- URL-encoded sessions must stay under 2000 characters for broad compatibility
- No backend infrastructure required except push notification delivery service (e.g., Firebase Cloud Messaging)

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
| App store installs | >500 combined installs within 3 months of launch | App Store Connect + Google Play Console analytics |
| Native feature adoption | >40% of native users enable biometric lock | In-app settings preference tracking |
| Push notification opt-in | >30% of native users enable reminders | Push notification permission grant rate |

## Timeline

| Milestone | Target | Dependencies | Description |
|-----------|--------|--------------|-------------|
| Sprint 5: Dark Mode + Sharing | Weeks 1-2 | None | FR-008 through FR-013. Dark mode implementation and shareable URL encoding/decoding. |
| Sprint 6: Analytics + Export | Weeks 3-4 | Sprint 5 (share URL view reuse) | FR-014 through FR-016. User insights dashboard and product analytics. Image export. |
| Sprint 7: Polish + Testing | Weeks 5-6 | Sprint 6 | Vitest setup, component tests for critical paths, bug fixes, performance optimization. |
| Sprint 8: Launch Prep | Weeks 7-8 | Sprint 7 | Final QA, Lighthouse audits, documentation updates, production deployment. |
| Sprint 9: Capacitor Integration & Native Features | Weeks 9-11 | Sprint 8 (web feature-complete) | FR-017 through FR-025. Capacitor setup, storage abstraction, native share, haptics, biometrics, push notifications, status bar, app badge, deep links. |
| Sprint 10: App Store Submission & Native Polish | Weeks 12-13 | Sprint 9 | App store listings, screenshots, privacy policies, TestFlight/internal testing, store review submission, post-launch monitoring. |

---

## Appendix: Architecture Reference

### Tech Stack
- **Framework**: Vue 3 (Options API)
- **Styling**: Tailwind CSS v4 with custom theme (tailwind.config.js)
- **Build**: Vite with vite-plugin-pwa
- **Native**: Capacitor 6+ (iOS + Android)
- **Font**: Inter (Google Fonts)
- **Storage**: Browser localStorage (web), Capacitor Preferences (native)

### Capacitor Plugins
| Plugin | Purpose |
|--------|---------|
| @capacitor/preferences | Persistent key-value storage on native |
| @capacitor/share | Native OS share sheet |
| @capacitor/push-notifications | Check-in reminder notifications |
| @capacitor/haptics | Native haptic feedback |
| @capacitor/status-bar | Status bar color/style control |
| @capacitor/app | Deep link and app state handling |
| @capacitor-community/biometric-auth | Fingerprint / Face ID app lock |
| @capawesome/capacitor-badge | App icon badge count |

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
