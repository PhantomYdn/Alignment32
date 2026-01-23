<template>
  <teleport to="body">
    <div 
      v-if="isVisible"
      class="fixed inset-0 z-[100] isolate"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="handleBackdropClick"
      ></div>
      
      <!-- Modal Container -->
      <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden pointer-events-auto relative">
          <!-- Slide Content -->
          <div class="relative w-full overflow-hidden">
            <div 
              class="flex transition-transform duration-300 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
          <!-- Slide 1: What is Alignment32? -->
          <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
            <div class="text-center">
              <div class="text-4xl sm:text-5xl font-bold text-indigo-600 mb-4">32</div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">What is Alignment32?</h2>
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed">
                Alignment32 is a reflective practice that helps you discover your core values 
                and priorities through word association.
              </p>
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
                By distilling 32 meaningful words down to a single word, you'll uncover 
                what truly matters to you.
              </p>
            </div>
          </div>

          <!-- Slide 2: The 4 Categories -->
          <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
            <div class="text-center">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Four Dimensions of You</h2>
              <div class="grid grid-cols-2 gap-3 sm:gap-4 text-left">
                <div class="bg-red-50 rounded-xl p-3 sm:p-4 border border-red-200">
                  <h3 class="font-bold text-red-700 mb-1">Physical</h3>
                  <p class="text-xs sm:text-sm text-red-600">Body, health, environment, actions</p>
                </div>
                <div class="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
                  <h3 class="font-bold text-blue-700 mb-1">Mental</h3>
                  <p class="text-xs sm:text-sm text-blue-600">Thoughts, knowledge, creativity, logic</p>
                </div>
                <div class="bg-amber-50 rounded-xl p-3 sm:p-4 border border-amber-200">
                  <h3 class="font-bold text-amber-700 mb-1">Emotional</h3>
                  <p class="text-xs sm:text-sm text-amber-600">Feelings, relationships, desires</p>
                </div>
                <div class="bg-purple-50 rounded-xl p-3 sm:p-4 border border-purple-200">
                  <h3 class="font-bold text-purple-700 mb-1">Spiritual</h3>
                  <p class="text-xs sm:text-sm text-purple-600">Purpose, meaning, connection, values</p>
                </div>
              </div>
              <p class="text-gray-500 text-sm mt-4">You'll enter 8 words for each category</p>
            </div>
          </div>

          <!-- Slide 3: The Process -->
          <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
            <div class="text-center">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">The Process</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-center gap-3">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg sm:text-xl">32</div>
                  <div class="text-gray-400 text-2xl">...</div>
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg sm:text-xl">16</div>
                  <div class="text-gray-400 text-2xl">...</div>
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold text-lg sm:text-xl">8</div>
                  <div class="text-gray-400 text-2xl">...</div>
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">1</div>
                </div>
                <p class="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
                  Pair words from different categories and create associations 
                  that capture the essence of both.
                </p>
                <p class="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Each round merges your words until only one remains.
                </p>
              </div>
            </div>
          </div>

          <!-- Slide 4: What You'll Discover -->
          <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
            <div class="text-center">
              <div class="text-4xl sm:text-5xl text-indigo-500 mb-4">&#10022;</div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Your Journey Awaits</h2>
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed">
                The final word isn't just a word - it's a reflection of your 
                integrated self across all four dimensions.
              </p>
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
                Take your time. Be honest. Trust the process.
              </p>
              <div class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p class="text-gray-500 text-sm">
                  Sessions are saved automatically, so you can return anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="px-6 sm:px-8 pb-6 sm:pb-8">
        <!-- Dot indicators -->
        <div class="flex justify-center gap-2 mb-6">
          <button
            v-for="(_, index) in slides"
            :key="index"
            @click="currentSlide = index"
            :class="[
              'w-2.5 h-2.5 rounded-full transition-all duration-200',
              currentSlide === index 
                ? 'bg-indigo-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-between gap-3">
          <button
            v-if="currentSlide > 0"
            @click="previousSlide"
            class="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Back
          </button>
          <div v-else></div>

          <button
            v-if="currentSlide < slides.length - 1"
            @click="nextSlide"
            class="px-6 py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
          >
            Next
          </button>
          <button
            v-else
            @click="complete"
            class="px-6 py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
          >
            Get Started
          </button>
        </div>

        <!-- Don't show again -->
        <div class="mt-4 flex items-center justify-center">
          <label class="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              v-model="dontShowAgain"
              class="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-400"
            />
            Don't show this again
          </label>
        </div>
      </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
const STORAGE_KEY = 'alignment32-onboarding-complete'

export default {
  name: 'WelcomeModal',
  props: {
    forceShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      isVisible: false,
      currentSlide: 0,
      dontShowAgain: false,
      slides: [1, 2, 3, 4] // Just for iteration
    }
  },
  mounted() {
    if (this.forceShow) {
      this.isVisible = true
    } else {
      this.checkShouldShow()
    }
  },
  watch: {
    forceShow(newVal) {
      if (newVal) {
        this.isVisible = true
        this.currentSlide = 0
      }
    }
  },
  methods: {
    checkShouldShow() {
      const hasSeenOnboarding = localStorage.getItem(STORAGE_KEY)
      if (!hasSeenOnboarding) {
        this.isVisible = true
      }
    },
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++
      }
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    complete() {
      if (this.dontShowAgain) {
        localStorage.setItem(STORAGE_KEY, 'true')
      }
      this.isVisible = false
      this.$emit('close')
    },
    handleBackdropClick() {
      // Allow closing by clicking backdrop only if not first-time user
      const hasSeenOnboarding = localStorage.getItem(STORAGE_KEY)
      if (hasSeenOnboarding || this.forceShow) {
        this.isVisible = false
        this.$emit('close')
      }
    }
  }
}
</script>
