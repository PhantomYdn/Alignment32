/**
 * Gesture utilities for mobile-friendly interactions
 * Wrapper functions for VueUse composables compatible with Options API
 */

/**
 * Sets up swipe detection on an element
 * Call in mounted(), returns cleanup function for beforeUnmount()
 * 
 * @param {HTMLElement} element - The element to detect swipes on
 * @param {Object} options - Configuration options
 * @param {Function} options.onSwipeLeft - Callback when swiped left
 * @param {Function} options.onSwipeRight - Callback when swiped right
 * @param {number} options.threshold - Minimum swipe distance (default: 50)
 * @returns {Function} Cleanup function
 */
export function setupSwipe(element, options = {}) {
  const {
    onSwipeLeft = () => {},
    onSwipeRight = () => {},
    threshold = 50
  } = options

  let startX = 0
  let startY = 0
  let isSwiping = false

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    isSwiping = true
  }

  const handleTouchMove = (e) => {
    if (!isSwiping) return
    
    const touch = e.touches[0]
    const diffX = touch.clientX - startX
    const diffY = touch.clientY - startY
    
    // If vertical scroll is greater, don't interfere
    if (Math.abs(diffY) > Math.abs(diffX)) {
      isSwiping = false
    }
  }

  const handleTouchEnd = (e) => {
    if (!isSwiping) return
    
    const touch = e.changedTouches[0]
    const diffX = touch.clientX - startX
    const diffY = touch.clientY - startY
    
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) >= threshold) {
      if (diffX > 0) {
        onSwipeRight(e)
      } else {
        onSwipeLeft(e)
      }
    }
    
    isSwiping = false
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchmove', handleTouchMove, { passive: true })
  element.addEventListener('touchend', handleTouchEnd, { passive: true })

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

/**
 * Sets up long-press detection on an element
 * Call in mounted(), returns cleanup function for beforeUnmount()
 * 
 * @param {HTMLElement} element - The element to detect long-press on
 * @param {Function} callback - Called when long-press is triggered
 * @param {Object} options - Configuration options
 * @param {number} options.delay - Delay in ms before triggering (default: 500)
 * @returns {Function} Cleanup function
 */
export function setupLongPress(element, callback, options = {}) {
  const { delay = 500 } = options
  
  let timeoutId = null
  let isLongPress = false
  let startX = 0
  let startY = 0

  const handleStart = (e) => {
    // Get coordinates from touch or mouse event
    const event = e.touches ? e.touches[0] : e
    startX = event.clientX
    startY = event.clientY
    isLongPress = false
    
    timeoutId = setTimeout(() => {
      isLongPress = true
      callback(e)
    }, delay)
  }

  const handleMove = (e) => {
    if (!timeoutId) return
    
    // Get coordinates from touch or mouse event
    const event = e.touches ? e.touches[0] : e
    const diffX = Math.abs(event.clientX - startX)
    const diffY = Math.abs(event.clientY - startY)
    
    // Cancel if moved too much (10px threshold)
    if (diffX > 10 || diffY > 10) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const handleEnd = (e) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    
    // Prevent click if long-press was triggered
    if (isLongPress) {
      e.preventDefault()
      e.stopPropagation()
      isLongPress = false
    }
  }

  const handleCancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    isLongPress = false
  }

  // Touch events
  element.addEventListener('touchstart', handleStart, { passive: true })
  element.addEventListener('touchmove', handleMove, { passive: true })
  element.addEventListener('touchend', handleEnd)
  element.addEventListener('touchcancel', handleCancel)
  
  // Mouse events for desktop testing
  element.addEventListener('mousedown', handleStart)
  element.addEventListener('mousemove', handleMove)
  element.addEventListener('mouseup', handleEnd)
  element.addEventListener('mouseleave', handleCancel)

  // Return cleanup function
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
    element.removeEventListener('touchstart', handleStart)
    element.removeEventListener('touchmove', handleMove)
    element.removeEventListener('touchend', handleEnd)
    element.removeEventListener('touchcancel', handleCancel)
    element.removeEventListener('mousedown', handleStart)
    element.removeEventListener('mousemove', handleMove)
    element.removeEventListener('mouseup', handleEnd)
    element.removeEventListener('mouseleave', handleCancel)
  }
}
