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

## GA4 Configuration Guide

After setup, configure these items in GA4 to unlock meaningful reporting. Without this, event parameters are collected but invisible in reports.

### 1. Register Custom Definitions (Do This First)

Go to **Admin > Custom definitions > Create custom dimensions/metrics**.

**Custom Dimensions** (text/categorical):

| Name | Event parameter | Scope |
|------|----------------|-------|
| Category Name | `category_name` | Event |
| Session Status | `session_status` | Event |
| From Screen | `from_screen` | Event |

**Custom Metrics** (numeric):

| Name | Event parameter | Unit |
|------|----------------|------|
| Duration Seconds | `duration_seconds` | Standard |
| Total Rounds | `total_rounds` | Standard |
| Time Spent Seconds | `time_spent_seconds` | Standard |
| Total Time Seconds | `total_time_seconds` | Standard |
| Words Remaining | `words_remaining` | Standard |
| Associations Created | `associations_created` | Standard |
| Round Number | `round_number` | Standard |
| Slide Number | `slide_number` | Standard |
| Word Count | `word_count` | Standard |
| Session Duration Seconds | `session_duration_seconds` | Standard |

GA4 allows up to 50 custom dimensions and 50 custom metrics per property.

### 2. Mark Key Events (Conversions)

Go to **Admin > Events**, find these events, and toggle them as **Key Events**:

| Event | Why |
|-------|-----|
| `session_complete` | Primary conversion — user finished the entire journey |
| `final_word_reached` | Core value moment — the moment of insight |
| `word_entry_complete` | Major milestone — user committed all 32 words |

This enables GA4 to attribute conversions to traffic sources and calculate conversion rates automatically.

### 3. Build Explorations

#### Main Journey Funnel

Go to **Explore > Blank > Funnel exploration** and add these steps:

1. `session_start` — "Started"
2. `category_complete` — "First Category Done"
3. `word_entry_complete` — "All Words Entered"
4. `round_start` — "Began Associations"
5. `final_word_reached` — "Reached Final Word"
6. `session_complete` — "Completed Session"

This reveals exactly where people drop off. The gap between steps 1 and 2 shows if people are intimidated by the first category. The gap between steps 3 and 4 reveals if the transition from word entry to associations is confusing.

#### Onboarding Funnel

Separate funnel exploration:

1. `onboarding_view` (slide_number = 1) — "Saw Welcome"
2. `onboarding_complete` — "Finished Onboarding"

Combine with `onboarding_skip` + `slide_number` dimension to see which slide loses people.

#### Category Comparison (Free Form)

Go to **Explore > Free form**:

- **Rows:** `category_name` dimension
- **Values:** `time_spent_seconds` metric (average), Event count
- **Filter:** Event name = `category_complete`

This shows which category (Physical, Mental, Emotional, Spiritual) takes the longest and which has the lowest completion count — revealing which dimension of life is hardest for people to articulate.

#### Session Depth Analysis (Free Form)

- **Rows:** `total_rounds` dimension
- **Values:** Event count, `session_duration_seconds` (average)
- **Filter:** Event name = `final_word_reached`

Shows the distribution of how many rounds it takes people to reach their final word, and how long different depths take.

### 4. Audiences (Optional)

Go to **Admin > Audiences > New audience**:

| Audience | Condition | Purpose |
|----------|-----------|---------|
| Completers | `session_complete` event fired | Understand your engaged users |
| Abandoners | `session_start` fired AND NOT `session_complete` within 7 days | Understand drop-off patterns |
| Returners | `session_resume` event fired | Users who come back to finish |

---

## Key Metrics & Formulas

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
