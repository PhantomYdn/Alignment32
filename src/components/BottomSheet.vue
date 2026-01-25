<template>
  <teleport to="body">
    <transition name="bottom-sheet">
      <div 
        v-if="isVisible"
        class="fixed inset-0 z-[100]"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @keydown.escape="close"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="close"
          aria-hidden="true"
        ></div>
        
        <!-- Sheet -->
        <div 
          ref="sheet"
          class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden animate-slide-up"
        >
          <!-- Drag handle -->
          <div class="flex justify-center pt-3 pb-2">
            <div class="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          <!-- Header -->
          <div v-if="title" class="px-6 pb-3 border-b border-gray-100">
            <h2 
              :id="titleId"
              class="text-lg font-bold text-gray-800 text-center"
            >
              {{ title }}
            </h2>
            <p v-if="subtitle" class="text-sm text-gray-500 text-center mt-1">
              {{ subtitle }}
            </p>
          </div>
          
          <!-- Content -->
          <div class="px-4 py-4">
            <slot></slot>
          </div>
          
          <!-- Actions -->
          <div v-if="$slots.actions" class="px-4 pb-6 pt-2 border-t border-gray-100">
            <slot name="actions"></slot>
          </div>
          
          <!-- Safe area padding for iOS -->
          <div class="h-safe-area-bottom"></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'BottomSheet',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  computed: {
    titleId() {
      return `bottom-sheet-title-${this._uid || Math.random().toString(36).substr(2, 9)}`
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // Lock body scroll
        document.body.style.overflow = 'hidden'
        this.$nextTick(() => {
          this.focusFirstElement()
        })
      } else {
        // Restore body scroll
        document.body.style.overflow = ''
      }
    }
  },
  beforeUnmount() {
    // Ensure body scroll is restored
    document.body.style.overflow = ''
  },
  methods: {
    close() {
      this.$emit('close')
    },
    focusFirstElement() {
      if (!this.$refs.sheet) return
      const focusable = this.$refs.sheet.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }
  }
}
</script>
