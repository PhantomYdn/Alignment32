/**
 * Storage utilities for Alignment32
 * Provides debounce helper and localStorage wrappers with error handling
 */

/**
 * Debounce function - delays execution until after wait ms have elapsed
 * since the last time the debounced function was invoked
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay = 500) {
  let timeoutId = null
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Storage wrapper with error handling
 * Gracefully handles localStorage errors (quota exceeded, private browsing, etc.)
 */
export const storage = {
  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist or error occurs
   * @returns {*} Parsed value or default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.warn(`[Storage] Error reading "${key}":`, error)
      return defaultValue
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   * @returns {boolean} Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn(`[Storage] Error writing "${key}":`, error)
      return false
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`[Storage] Error removing "${key}":`, error)
      return false
    }
  }
}

/**
 * Draft-specific storage helpers
 * Manages session drafts separately from completed sessions
 */
const DRAFT_KEY_PREFIX = 'alignment32-draft-'

export const drafts = {
  /**
   * Generate storage key for a draft
   * @param {string|number} sessionId - Session ID
   * @returns {string} Storage key
   */
  _key(sessionId) {
    return `${DRAFT_KEY_PREFIX}${sessionId}`
  },

  /**
   * Save draft data for a session
   * @param {string|number} sessionId - Session ID
   * @param {Object} data - Draft data to save
   * @returns {boolean} Success status
   */
  save(sessionId, data) {
    const draftData = {
      ...data,
      lastModified: new Date().toISOString()
    }
    return storage.set(this._key(sessionId), draftData)
  },

  /**
   * Load draft data for a session
   * @param {string|number} sessionId - Session ID
   * @returns {Object|null} Draft data or null if not found
   */
  load(sessionId) {
    return storage.get(this._key(sessionId), null)
  },

  /**
   * Clear draft for a session
   * @param {string|number} sessionId - Session ID
   * @returns {boolean} Success status
   */
  clear(sessionId) {
    return storage.remove(this._key(sessionId))
  },

  /**
   * Check if a draft exists for a session
   * @param {string|number} sessionId - Session ID
   * @returns {boolean} True if draft exists
   */
  hasDraft(sessionId) {
    return this.load(sessionId) !== null
  },

  /**
   * Get all draft session IDs
   * @returns {Array<string>} Array of session IDs with drafts
   */
  getAllDraftIds() {
    const draftIds = []
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(DRAFT_KEY_PREFIX)) {
          draftIds.push(key.replace(DRAFT_KEY_PREFIX, ''))
        }
      }
    } catch (error) {
      console.warn('[Storage] Error getting draft IDs:', error)
    }
    return draftIds
  }
}
