/**
 * Haptic feedback utilities for mobile interactions
 * Uses the Vibration API when available
 */

// Check if vibration is supported
const isVibrationSupported = () => {
  return 'vibrate' in navigator
}

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Trigger a vibration pattern
 * Respects user's reduced-motion preference
 * 
 * @param {number|number[]} pattern - Duration in ms or array of [vibrate, pause, vibrate, ...]
 * @returns {boolean} Whether vibration was triggered
 */
export function vibrate(pattern) {
  if (!isVibrationSupported() || prefersReducedMotion()) {
    return false
  }
  
  try {
    return navigator.vibrate(pattern)
  } catch (e) {
    return false
  }
}

/**
 * Short pulse - for small confirmations
 * Use for: slide change, input validation success
 */
export function pulseShort() {
  return vibrate(50)
}

/**
 * Medium pulse - for moderate confirmations
 * Use for: category completion, round completion
 */
export function pulseMedium() {
  return vibrate(100)
}

/**
 * Long pulse - for important confirmations
 * Use for: delete confirmation, major actions
 */
export function pulseLong() {
  return vibrate(200)
}

/**
 * Double tap pattern - for selections
 * Use for: long-press trigger, item selection
 */
export function doubleTap() {
  return vibrate([50, 50, 50])
}

/**
 * Success pattern - for positive outcomes
 * Use for: task completion, successful save
 */
export function success() {
  return vibrate([50, 30, 100])
}

/**
 * Celebration pattern - for major achievements
 * Use for: final word reveal, session completion
 */
export function celebration() {
  return vibrate([100, 50, 100, 50, 200])
}

/**
 * Warning pattern - for destructive actions
 * Use for: delete warning, unsaved changes
 */
export function warning() {
  return vibrate([100, 50, 100])
}

/**
 * Error pattern - for failures
 * Use for: validation errors, failed actions
 */
export function error() {
  return vibrate([200, 100, 200])
}

// Export all patterns as an object for convenience
export const patterns = {
  short: pulseShort,
  medium: pulseMedium,
  long: pulseLong,
  doubleTap,
  success,
  celebration,
  warning,
  error
}

export default {
  vibrate,
  pulseShort,
  pulseMedium,
  pulseLong,
  doubleTap,
  success,
  celebration,
  warning,
  error,
  patterns,
  isSupported: isVibrationSupported
}
