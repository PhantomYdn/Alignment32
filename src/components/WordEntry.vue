<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sticky Header -->
    <div class="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div class="container mx-auto px-4">
        <!-- Back button and title row -->
        <div class="flex items-center justify-between py-3">
          <button 
            @click="handleBack"
            class="min-w-[44px] min-h-[44px] p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 flex items-center justify-center"
            aria-label="Go back"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Enter Your Words</h1>
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500" aria-live="polite" aria-atomic="true">
            <transition name="fade">
              <span v-if="showDraftSaved" class="text-emerald-600 font-medium draft-saved-pulse flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            </transition>
          </div>
        </div>
        
        <!-- Step Indicator -->
        <StepIndicator 
          :steps="stepConfig" 
          :currentStep="currentStep"
        />
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 container mx-auto px-4 py-6">
      <div class="max-w-2xl mx-auto">
        <!-- Category Steps (0-3) -->
        <transition :name="transitionName" mode="out-in">
          <div v-if="currentStep < 4" :key="currentCategoryName">
            <!-- Category Header -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <h2 :class="['text-3xl sm:text-4xl font-extrabold tracking-tight', currentCategoryConfig.color]">
                  {{ currentCategoryName }}
                </h2>
                <div :class="['text-sm font-bold px-3 py-1.5 rounded-full', currentCategoryConfig.badgeClass]">
                  {{ currentCategoryProgress }}/8
                </div>
              </div>
              
              <!-- Progress bar -->
              <div class="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div 
                  :class="['h-2 rounded-full transition-all duration-500', currentCategoryConfig.progressClass]"
                  :style="{ width: `${(currentCategoryProgress / 8) * 100}%` }"
                ></div>
              </div>
              
              <!-- Category description -->
              <p class="text-gray-600 text-base sm:text-lg mb-2 leading-relaxed">
                {{ categoryDescriptions[currentCategoryName].description }}
              </p>
              <p class="text-sm text-gray-400 italic">
                Examples: {{ categoryDescriptions[currentCategoryName].examples }}
              </p>
            </div>

            <!-- Word Inputs -->
            <div :class="['rounded-2xl border-2 p-4 sm:p-6 shadow-soft', currentCategoryConfig.bgClass, currentCategoryConfig.borderClass]">
              <div class="space-y-3">
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="space-y-1"
                >
                  <div class="flex items-center gap-3">
                    <span :class="['w-7 h-7 flex items-center justify-center text-sm font-bold rounded-full transition-all duration-200', 
                      words[currentCategoryName][i-1] && words[currentCategoryName][i-1].trim() 
                        ? currentCategoryConfig.badgeClass 
                        : 'bg-gray-200 text-gray-400'
                    ]">
                      {{ i }}
                    </span>
                    <input
                      :ref="el => { if (i === 1) firstInput = el }"
                      v-model="words[currentCategoryName][i-1]"
                      type="text"
                      maxlength="30"
                      :placeholder="getPlaceholder(i)"
                      :class="[
                        'flex-1 px-4 py-3 text-base border-2 rounded-xl transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:shadow-md',
                        'bg-white placeholder:text-gray-300 hover:shadow-sm',
                        currentCategoryConfig.focusClass,
                        getDuplicateIndex(currentCategoryName, i-1) !== -1 
                          ? 'border-orange-400 bg-orange-50' 
                          : words[currentCategoryName][i-1] && words[currentCategoryName][i-1].trim() 
                            ? currentCategoryConfig.filledBorderClass 
                            : 'border-gray-200 hover:border-gray-300'
                      ]"
                      @input="onWordInput"
                      @keydown.enter="focusNextInput(i)"
                    />
                  </div>
                  <!-- Duplicate warning -->
                  <div 
                    v-if="getDuplicateIndex(currentCategoryName, i-1) !== -1" 
                    class="flex items-center gap-1.5 ml-10 text-xs text-orange-600"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Same as word #{{ getDuplicateIndex(currentCategoryName, i-1) + 1 }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Completion message -->
            <transition name="scale">
              <div 
                v-if="currentCategoryProgress === 8" 
                class="mt-4 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-center shadow-md animate-celebration-glow"
              >
                <span class="text-emerald-700 font-bold flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Category complete! Continue to the next step.
                </span>
              </div>
            </transition>
          </div>

          <!-- Review Step (4) -->
          <div v-else key="review">
            <div class="mb-6">
              <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">Review Your Words</h2>
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed">
                Review all 32 words before continuing to the association phase.
              </p>
            </div>

            <!-- Collapsible category sections -->
            <div class="space-y-3">
              <div 
                v-for="(category, categoryName) in categories" 
                :key="categoryName"
                :class="['rounded-2xl border-2 overflow-hidden transition-all duration-200 bg-white', category.borderClass]"
              >
                <!-- Category header (clickable) -->
                <button
                  @click="toggleCategory(categoryName)"
                  class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <span :class="['font-bold text-lg', category.color]">{{ categoryName }}</span>
                    <span :class="['text-xs font-bold px-2.5 py-1 rounded-full', category.badgeClass]">
                      {{ getCategoryProgress(categoryName) }}/8
                    </span>
                  </div>
                  <svg 
                    :class="['w-5 h-5 transition-transform duration-200 text-gray-400', expandedCategories[categoryName] ? 'rotate-180' : '']"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Expanded content -->
                <transition name="expand">
                  <div v-if="expandedCategories[categoryName]" :class="['px-4 pb-4', category.bgClass]">
                    <div class="flex flex-wrap gap-2 pt-2">
                      <span 
                        v-for="(word, index) in words[categoryName]" 
                        :key="index"
                        :class="[
                          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                          word && word.trim() 
                            ? 'bg-white border shadow-sm ' + category.borderClass + ' ' + category.color
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        ]"
                      >
                        {{ word && word.trim() ? word : `Word ${index + 1}` }}
                      </span>
                    </div>
                    <!-- Edit button -->
                    <button
                      @click="goToCategory(categoryName)"
                      :class="['mt-3 text-sm font-semibold hover:underline', category.color]"
                    >
                      Edit {{ categoryName }} words
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Overall progress summary -->
            <div class="mt-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-soft">
              <div class="flex items-center justify-between mb-3">
                <span class="font-semibold text-gray-700">Total Progress</span>
                <span class="font-bold text-gray-800">{{ filledWords }}/32</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-brand-500 to-spiritual-500 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${(filledWords / 32) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Sticky Footer Navigation -->
    <div class="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <!-- Previous button -->
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
          >
            <span class="hidden sm:inline">Previous:</span>
            <span class="sm:hidden">&larr;</span>
            {{ prevStepName }}
          </button>
          <div v-else></div>

          <!-- Next/Continue button -->
          <button
            @click="nextStep"
            :disabled="!canProceed"
            :class="[
              'flex-1 sm:flex-none px-6 sm:px-8 py-3 text-sm sm:text-base font-bold rounded-xl transition-all duration-200',
              canProceed 
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            <span v-if="currentStep < 4">
              Next: {{ nextStepName }}
              <span v-if="!canProceed" class="text-xs opacity-75 ml-1">({{ currentCategoryProgress }}/8)</span>
            </span>
            <span v-else>Continue to Associations</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StepIndicator from './StepIndicator.vue'
import { debounce } from '../utils/storage.js'

export default {
  name: 'WordEntry',
  components: {
    StepIndicator
  },
  props: {
    existingWords: {
      type: Object,
      default: () => ({})
    },
    sessionId: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['words-complete', 'back', 'draft-update'],
  data() {
    return {
      currentStep: 0,
      transitionDirection: 'forward',
      showDraftSaved: false,
      expandedCategories: {
        Physical: true,
        Mental: false,
        Emotional: false,
        Spiritual: false
      },
      categoryOrder: ['Physical', 'Mental', 'Emotional', 'Spiritual'],
      categories: {
        Physical: {
          color: 'text-physical-600',
          bgClass: 'bg-physical-50',
          borderClass: 'border-physical-200',
          badgeClass: 'bg-physical-100 text-physical-700',
          progressClass: 'bg-gradient-to-r from-physical-400 to-physical-500',
          focusClass: 'focus:ring-physical-400 focus:border-physical-400',
          filledBorderClass: 'border-physical-300'
        },
        Mental: {
          color: 'text-mental-600',
          bgClass: 'bg-mental-50',
          borderClass: 'border-mental-200',
          badgeClass: 'bg-mental-100 text-mental-700',
          progressClass: 'bg-gradient-to-r from-mental-400 to-mental-500',
          focusClass: 'focus:ring-mental-400 focus:border-mental-400',
          filledBorderClass: 'border-mental-300'
        },
        Emotional: {
          color: 'text-emotional-600',
          bgClass: 'bg-emotional-50',
          borderClass: 'border-emotional-200',
          badgeClass: 'bg-emotional-100 text-emotional-700',
          progressClass: 'bg-gradient-to-r from-emotional-400 to-emotional-500',
          focusClass: 'focus:ring-emotional-400 focus:border-emotional-400',
          filledBorderClass: 'border-emotional-300'
        },
        Spiritual: {
          color: 'text-spiritual-600',
          bgClass: 'bg-spiritual-50',
          borderClass: 'border-spiritual-200',
          badgeClass: 'bg-spiritual-100 text-spiritual-700',
          progressClass: 'bg-gradient-to-r from-spiritual-400 to-spiritual-500',
          focusClass: 'focus:ring-spiritual-400 focus:border-spiritual-400',
          filledBorderClass: 'border-spiritual-300'
        }
      },
      categoryDescriptions: {
        Physical: {
          description: 'Words related to your body, health, environment, and material world.',
          examples: 'health, strength, energy, rest, home, nature, body, movement'
        },
        Mental: {
          description: 'Words related to thinking, learning, knowledge, and problem-solving.',
          examples: 'focus, clarity, creativity, wisdom, learning, logic, insight, knowledge'
        },
        Emotional: {
          description: 'Words related to feelings, relationships, and emotional states.',
          examples: 'joy, love, peace, calm, hope, trust, connection, gratitude'
        },
        Spiritual: {
          description: 'Words related to purpose, meaning, beliefs, and transcendence.',
          examples: 'purpose, meaning, faith, presence, awareness, soul, peace, gratitude'
        }
      },
      words: {
        Physical: this.existingWords.Physical ? [...this.existingWords.Physical] : Array(8).fill(''),
        Mental: this.existingWords.Mental ? [...this.existingWords.Mental] : Array(8).fill(''),
        Emotional: this.existingWords.Emotional ? [...this.existingWords.Emotional] : Array(8).fill(''),
        Spiritual: this.existingWords.Spiritual ? [...this.existingWords.Spiritual] : Array(8).fill('')
      },
      filledWords: 0,
      firstInput: null,
      debouncedSaveDraft: null
    }
  },
  computed: {
    stepConfig() {
      return [
        { name: 'Physical' },
        { name: 'Mental' },
        { name: 'Emotional' },
        { name: 'Spiritual' },
        { name: 'Review' }
      ]
    },
    currentCategoryName() {
      return this.categoryOrder[this.currentStep] || null
    },
    currentCategoryConfig() {
      return this.categories[this.currentCategoryName] || {}
    },
    currentCategoryProgress() {
      if (!this.currentCategoryName) return 0
      return this.getCategoryProgress(this.currentCategoryName)
    },
    canProceed() {
      if (this.currentStep < 4) {
        return this.currentCategoryProgress === 8
      }
      return this.filledWords === 32
    },
    nextStepName() {
      if (this.currentStep < 3) {
        return this.categoryOrder[this.currentStep + 1]
      } else if (this.currentStep === 3) {
        return 'Review'
      }
      return ''
    },
    prevStepName() {
      if (this.currentStep === 4) {
        return 'Spiritual'
      } else if (this.currentStep > 0) {
        return this.categoryOrder[this.currentStep - 1]
      }
      return ''
    },
    transitionName() {
      return this.transitionDirection === 'forward' ? 'step-slide' : 'step-slide-reverse'
    }
  },
  mounted() {
    this.updateProgress()
    this.debouncedSaveDraft = debounce(this.emitDraftUpdate, 500)
    // Ensure arrays have 8 elements each
    this.categoryOrder.forEach(cat => {
      while (this.words[cat].length < 8) {
        this.words[cat].push('')
      }
    })
  },
  methods: {
    getCategoryProgress(categoryName) {
      return this.words[categoryName].filter(word => word && word.trim() !== '').length
    },
    getDuplicateIndex(categoryName, currentIndex) {
      const currentWord = this.words[categoryName][currentIndex]
      if (!currentWord || !currentWord.trim()) return -1
      
      const normalizedCurrent = currentWord.trim().toLowerCase()
      
      // Find the first occurrence of this word before the current index
      for (let i = 0; i < currentIndex; i++) {
        const word = this.words[categoryName][i]
        if (word && word.trim().toLowerCase() === normalizedCurrent) {
          return i
        }
      }
      return -1
    },
    updateProgress() {
      this.filledWords = Object.values(this.words).flat().filter(word => word && word.trim() !== '').length
    },
    getPlaceholder(index) {
      const examples = {
        Physical: ['health', 'strength', 'energy', 'rest', 'home', 'nature', 'body', 'movement'],
        Mental: ['focus', 'clarity', 'creativity', 'wisdom', 'learning', 'logic', 'insight', 'knowledge'],
        Emotional: ['joy', 'love', 'peace', 'calm', 'hope', 'trust', 'connection', 'gratitude'],
        Spiritual: ['purpose', 'meaning', 'faith', 'presence', 'awareness', 'soul', 'unity', 'transcendence']
      }
      const categoryExamples = examples[this.currentCategoryName] || []
      return `e.g., ${categoryExamples[index - 1] || 'word'}`
    },
    onWordInput() {
      this.updateProgress()
      this.debouncedSaveDraft()
    },
    emitDraftUpdate() {
      this.$emit('draft-update', {
        words: this.words,
        currentStep: this.currentStep
      })
      this.showDraftSaved = true
      setTimeout(() => {
        this.showDraftSaved = false
      }, 2000)
    },
    focusNextInput(currentIndex) {
      if (currentIndex < 8) {
        const inputs = this.$el.querySelectorAll('input[type="text"]')
        if (inputs[currentIndex]) {
          inputs[currentIndex].focus()
        }
      } else if (this.canProceed) {
        this.nextStep()
      }
    },
    focusFirstInput() {
      // Wait for transition to complete (300ms animation + buffer)
      setTimeout(() => {
        const inputs = this.$el.querySelectorAll('input[type="text"]')
        if (inputs[0]) {
          inputs[0].focus()
        }
      }, 350)
    },
    nextStep() {
      if (!this.canProceed) return
      
      if (this.currentStep < 4) {
        this.transitionDirection = 'forward'
        this.currentStep++
        this.$nextTick(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          this.focusFirstInput()
        })
      } else {
        this.submitWords()
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.transitionDirection = 'backward'
        this.currentStep--
        this.$nextTick(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          this.focusFirstInput()
        })
      }
    },
    goToCategory(categoryName) {
      const index = this.categoryOrder.indexOf(categoryName)
      if (index !== -1) {
        this.transitionDirection = index < this.currentStep ? 'backward' : 'forward'
        this.currentStep = index
      }
    },
    toggleCategory(categoryName) {
      this.expandedCategories[categoryName] = !this.expandedCategories[categoryName]
    },
    handleBack() {
      if (this.currentStep > 0) {
        this.prevStep()
      } else {
        this.$emit('back')
      }
    },
    submitWords() {
      if (this.filledWords === 32) {
        const cleanWords = {}
        Object.keys(this.words).forEach(category => {
          cleanWords[category] = this.words[category].map(word => word.trim()).filter(word => word !== '')
        })
        this.$emit('words-complete', cleanWords)
      }
    }
  }
}
</script>
