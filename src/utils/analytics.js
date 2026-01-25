/**
 * Google Analytics 4 integration for Alignment32
 * See ANALYTICS.md for event documentation and setup instructions
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const DEBUG_MODE = import.meta.env.DEV && window.location.search.includes('debug=analytics')

/**
 * Initialize Google Analytics
 * Called automatically on module load if measurement ID is configured
 */
function initGA() {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.info('[Analytics] No measurement ID configured. Set VITE_GA_MEASUREMENT_ID to enable.')
    }
    return
  }

  // Load gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_views: false // We'll handle page views manually for SPA
  })

  if (DEBUG_MODE) {
    console.info('[Analytics] Initialized with ID:', GA_MEASUREMENT_ID)
  }
}

// Initialize on module load
initGA()

/**
 * Send event to Google Analytics
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
function trackEvent(eventName, params = {}) {
  if (DEBUG_MODE) {
    console.log('[Analytics]', eventName, params)
  }

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, params)
  }
}

/**
 * Session timing helper
 * Tracks start time for duration calculations
 */
const sessionTimers = new Map()

function startTimer(key) {
  sessionTimers.set(key, Date.now())
}

function getElapsedSeconds(key) {
  const startTime = sessionTimers.get(key)
  if (!startTime) return 0
  return Math.round((Date.now() - startTime) / 1000)
}

function clearTimer(key) {
  sessionTimers.delete(key)
}

// ============================================================================
// Analytics API - Session Lifecycle
// ============================================================================

/**
 * Track new session creation
 * @param {string|number} sessionId - Session ID
 */
function sessionStart(sessionId) {
  startTimer(`session-${sessionId}`)
  startTimer('word-entry')
  trackEvent('session_start', {
    session_id: String(sessionId)
  })
}

/**
 * Track resuming an existing session
 * @param {string|number} sessionId - Session ID
 * @param {string} sessionStatus - 'draft' or 'in_progress'
 */
function sessionResume(sessionId, sessionStatus) {
  startTimer(`session-${sessionId}`)
  trackEvent('session_resume', {
    session_id: String(sessionId),
    session_status: sessionStatus
  })
}

/**
 * Track session completion
 * @param {string|number} sessionId - Session ID
 * @param {number} totalRounds - Total association rounds
 */
function sessionComplete(sessionId, totalRounds) {
  const durationSeconds = getElapsedSeconds(`session-${sessionId}`)
  clearTimer(`session-${sessionId}`)
  trackEvent('session_complete', {
    session_id: String(sessionId),
    duration_seconds: durationSeconds,
    total_rounds: totalRounds
  })
}

/**
 * Track session deletion
 * @param {string} sessionStatus - 'draft', 'in_progress', or 'completed'
 */
function sessionDelete(sessionStatus) {
  trackEvent('session_delete', {
    session_status: sessionStatus
  })
}

/**
 * Track session rename
 */
function sessionRename() {
  trackEvent('session_rename')
}

// ============================================================================
// Analytics API - Word Entry
// ============================================================================

/**
 * Track category step entry
 * @param {string} categoryName - Physical, Mental, Emotional, or Spiritual
 * @param {number} stepNumber - Step number (0-3)
 */
function categoryStart(categoryName, stepNumber) {
  startTimer(`category-${categoryName}`)
  trackEvent('category_start', {
    category_name: categoryName,
    step_number: stepNumber
  })
}

/**
 * Track category completion (all 8 words filled)
 * @param {string} categoryName - Physical, Mental, Emotional, or Spiritual
 */
function categoryComplete(categoryName) {
  const timeSpentSeconds = getElapsedSeconds(`category-${categoryName}`)
  clearTimer(`category-${categoryName}`)
  trackEvent('category_complete', {
    category_name: categoryName,
    time_spent_seconds: timeSpentSeconds
  })
}

/**
 * Track all 32 words entered
 */
function wordEntryComplete() {
  const totalTimeSeconds = getElapsedSeconds('word-entry')
  clearTimer('word-entry')
  trackEvent('word_entry_complete', {
    total_time_seconds: totalTimeSeconds
  })
}

/**
 * Track draft auto-save
 * @param {number} wordCount - Number of words entered
 */
function draftSaved(wordCount) {
  trackEvent('draft_saved', {
    word_count: wordCount
  })
}

// ============================================================================
// Analytics API - Association Phase
// ============================================================================

/**
 * Track association round start
 * @param {number} roundNumber - Current round number
 * @param {number} wordsRemaining - Words remaining to process
 */
function roundStart(roundNumber, wordsRemaining) {
  startTimer(`round-${roundNumber}`)
  trackEvent('round_start', {
    round_number: roundNumber,
    words_remaining: wordsRemaining
  })
}

/**
 * Track association round completion
 * @param {number} roundNumber - Current round number
 * @param {number} associationsCreated - Number of associations made this round
 */
function roundComplete(roundNumber, associationsCreated) {
  clearTimer(`round-${roundNumber}`)
  trackEvent('round_complete', {
    round_number: roundNumber,
    associations_created: associationsCreated
  })
}

/**
 * Track final word reached
 * @param {number} totalRounds - Total rounds completed
 * @param {string|number} sessionId - Session ID for duration calculation
 */
function finalWordReached(totalRounds, sessionId) {
  const sessionDurationSeconds = getElapsedSeconds(`session-${sessionId}`)
  trackEvent('final_word_reached', {
    total_rounds: totalRounds,
    session_duration_seconds: sessionDurationSeconds
  })
}

// ============================================================================
// Analytics API - Onboarding
// ============================================================================

/**
 * Track onboarding slide view
 * @param {number} slideNumber - Current slide (1-indexed)
 */
function onboardingView(slideNumber) {
  trackEvent('onboarding_view', {
    slide_number: slideNumber
  })
}

/**
 * Track onboarding completion
 * @param {boolean} dontShowAgain - Whether user opted out of future displays
 */
function onboardingComplete(dontShowAgain) {
  trackEvent('onboarding_complete', {
    dont_show_again: dontShowAgain
  })
}

/**
 * Track onboarding skip/dismiss
 * @param {number} slideNumber - Slide number when dismissed
 */
function onboardingSkip(slideNumber) {
  trackEvent('onboarding_skip', {
    slide_number: slideNumber
  })
}

/**
 * Track "How It Works" button click
 */
function howItWorksClick() {
  trackEvent('how_it_works_click')
}

// ============================================================================
// Analytics API - Engagement
// ============================================================================

/**
 * Track viewing a completed session's details
 * @param {string|number} sessionId - Session ID
 */
function viewSessionDetail(sessionId) {
  trackEvent('view_session_detail', {
    session_id: String(sessionId)
  })
}

/**
 * Track navigation back action
 * @param {string} fromScreen - Screen navigating from
 */
function navigationBack(fromScreen) {
  trackEvent('navigation_back', {
    from_screen: fromScreen
  })
}

// ============================================================================
// Export
// ============================================================================

export default {
  // Session lifecycle
  sessionStart,
  sessionResume,
  sessionComplete,
  sessionDelete,
  sessionRename,
  
  // Word entry
  categoryStart,
  categoryComplete,
  wordEntryComplete,
  draftSaved,
  
  // Association
  roundStart,
  roundComplete,
  finalWordReached,
  
  // Onboarding
  onboardingView,
  onboardingComplete,
  onboardingSkip,
  howItWorksClick,
  
  // Engagement
  viewSessionDetail,
  navigationBack,
  
  // Timer utilities (for components that need manual timing)
  startTimer,
  getElapsedSeconds,
  clearTimer
}
