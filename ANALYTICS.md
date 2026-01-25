# Alignment32 Analytics

Google Analytics 4 (GA4) integration for tracking user engagement and funnel conversion.

## Setup

### 1. Get Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Go to Admin > Data Streams > Web
4. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Set the measurement ID in your environment:

```bash
# .env.local (for development)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Production: Set in your hosting platform's environment variables
```

### 3. Verify Installation

1. Open your app in browser
2. Open browser DevTools > Network tab
3. Filter by "google" or "gtag"
4. You should see requests to `www.google-analytics.com`

Or use [GA4 DebugView](https://support.google.com/analytics/answer/7201382):
1. Install Google Analytics Debugger Chrome extension
2. Enable debug mode
3. View real-time events in GA4 Admin > DebugView

---

## Events Reference

### Session Lifecycle

| Event | Trigger | Parameters |
|-------|---------|------------|
| `session_start` | User clicks "Create New Session" | `session_id` |
| `session_resume` | User opens existing incomplete session | `session_id`, `session_status` |
| `session_complete` | User finishes with final word | `session_id`, `duration_seconds`, `total_rounds` |
| `session_delete` | User deletes a session | `session_status` |
| `session_rename` | User renames a session | - |

### Word Entry

| Event | Trigger | Parameters |
|-------|---------|------------|
| `category_start` | User enters a category step | `category_name`, `step_number` |
| `category_complete` | User fills all 8 words | `category_name`, `time_spent_seconds` |
| `word_entry_complete` | User finishes all 32 words | `total_time_seconds` |
| `draft_saved` | Auto-save triggers | `word_count` |

### Association Phase

| Event | Trigger | Parameters |
|-------|---------|------------|
| `round_start` | User begins a new round | `round_number`, `words_remaining` |
| `round_complete` | User finishes a round | `round_number`, `associations_created` |
| `final_word_reached` | User gets final word | `total_rounds`, `session_duration_seconds` |

### Onboarding

| Event | Trigger | Parameters |
|-------|---------|------------|
| `onboarding_view` | Welcome modal shown | `slide_number` |
| `onboarding_complete` | User clicks "Get Started" | `dont_show_again` |
| `onboarding_skip` | User dismisses modal early | `slide_number` |
| `how_it_works_click` | User clicks "How It Works" | - |

### Engagement

| Event | Trigger | Parameters |
|-------|---------|------------|
| `view_session_detail` | User views completed session | `session_id` |
| `navigation_back` | User navigates back | `from_screen` |

---

## Key Metrics & Reports

### Funnel Analysis

Create a funnel in GA4 Explore:
1. `session_start` - Started
2. `word_entry_complete` - Entered all words
3. `round_start` (round 1) - Started associations
4. `final_word_reached` - Completed

### Engagement Metrics

- **Completion Rate**: `final_word_reached` / `session_start`
- **Draft Abandonment**: `session_start` - `session_complete` where status = draft
- **Return Rate**: Users with `session_resume` events
- **Avg Session Duration**: Mean of `duration_seconds` from `session_complete`

### Category Analysis

Compare `category_complete` events by `category_name` to see:
- Which category takes longest (`time_spent_seconds`)
- Which category has highest drop-off

---

## Privacy

This implementation does NOT track:
- Actual words entered by users
- Final word content
- Any personally identifiable information

All tracking complies with standard GA4 data collection practices.

---

## Development

### Disable in Development

Analytics only loads when `VITE_GA_MEASUREMENT_ID` is set. For local development without tracking, simply don't set this variable.

### Debug Mode

Add `?debug=analytics` to URL to enable console logging of all analytics events (development only).

### Module Location

Analytics module: `src/utils/analytics.js`

Usage in components:
```js
import analytics from '../utils/analytics.js'

// Fire events
analytics.sessionStart(sessionId)
analytics.categoryComplete('Physical', 45)
analytics.finalWordReached(5, 1800)
```
