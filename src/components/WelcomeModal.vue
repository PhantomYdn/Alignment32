<template>
  <teleport to="body">
    <div 
      v-if="isVisible"
      class="fixed inset-0 z-[100] isolate"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="handleBackdropClick"
      ></div>
      
      <!-- Modal Container -->
      <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div class="bg-white rounded-3xl shadow-soft-lg w-full max-w-lg max-h-[90vh] overflow-hidden pointer-events-auto relative animate-scale-in">
          <!-- Slide Content -->
          <div class="relative w-full overflow-hidden">
            <div 
              class="flex transition-transform duration-300 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <!-- Slide 1: What is Alignment32? -->
              <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
                <div class="text-center">
                  <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-100 to-spiritual-100 flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl sm:text-4xl font-extrabold text-brand-600">32</span>
                  </div>
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">What is Alignment32?</h2>
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
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Four Dimensions of You</h2>
                  <div class="grid grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div class="bg-physical-50 rounded-xl p-3 sm:p-4 border border-physical-200">
                      <h3 class="font-bold text-physical-700 mb-1">Physical</h3>
                      <p class="text-xs sm:text-sm text-physical-600">Body, health, environment, actions</p>
                    </div>
                    <div class="bg-mental-50 rounded-xl p-3 sm:p-4 border border-mental-200">
                      <h3 class="font-bold text-mental-700 mb-1">Mental</h3>
                      <p class="text-xs sm:text-sm text-mental-600">Thoughts, knowledge, creativity, logic</p>
                    </div>
                    <div class="bg-emotional-50 rounded-xl p-3 sm:p-4 border border-emotional-200">
                      <h3 class="font-bold text-emotional-700 mb-1">Emotional</h3>
                      <p class="text-xs sm:text-sm text-emotional-600">Feelings, relationships, desires</p>
                    </div>
                    <div class="bg-spiritual-50 rounded-xl p-3 sm:p-4 border border-spiritual-200">
                      <h3 class="font-bold text-spiritual-700 mb-1">Spiritual</h3>
                      <p class="text-xs sm:text-sm text-spiritual-600">Purpose, meaning, connection, values</p>
                    </div>
                  </div>
                  <p class="text-gray-500 text-sm mt-4">You'll enter 8 words for each category</p>
                </div>
              </div>

              <!-- Slide 3: The Process -->
              <div class="w-full min-w-full flex-shrink-0 p-6 sm:p-8">
                <div class="text-center">
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">The Process</h2>
                  <div class="space-y-4">
                    <div class="flex items-center justify-center gap-2 sm:gap-3">
                      <div class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-base sm:text-xl">32</div>
                      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-base sm:text-xl">16</div>
                      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-300 flex items-center justify-center text-brand-800 font-bold text-base sm:text-xl">8</div>
                      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brand-500 to-spiritual-500 flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-glow">1</div>
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
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-spiritual-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">Your Journey Awaits</h2>
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
                  'h-2.5 rounded-full transition-all duration-200',
                  currentSlide === index 
                    ? 'bg-brand-500 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                ]"
                :aria-label="`Go to slide ${index + 1}`"
              ></button>
            </div>

            <!-- Buttons -->
            <div class="flex items-center justify-between gap-3">
              <button
                v-if="currentSlide > 0"
                @click="previousSlide"
                class="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
              >
                Back
              </button>
              <div v-else></div>

              <button
                v-if="currentSlide < slides.length - 1"
                @click="nextSlide"
                class="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all shadow-md hover:shadow-glow"
              >
                Next
              </button>
              <button
                v-else
                @click="complete"
                class="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all shadow-md hover:shadow-glow"
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
                  class="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-400"
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
      slides: [1, 2, 3, 4]
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
      const hasSeenOnboarding = localStorage.getItem(STORAGE_KEY)
      if (hasSeenOnboarding || this.forceShow) {
        this.isVisible = false
        this.$emit('close')
      }
    }
  }
}
</script>
