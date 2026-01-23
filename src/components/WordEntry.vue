<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sticky Header -->
    <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4">
        <!-- Back button and title row -->
        <div class="flex items-center justify-between py-3">
          <button 
            @click="handleBack"
            class="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-lg sm:text-xl font-bold text-gray-800">Enter Your Words</h1>
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <transition name="fade">
              <span v-if="showDraftSaved" class="text-green-600 font-medium draft-saved-pulse">
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
                <h2 :class="['text-2xl sm:text-3xl font-bold', currentCategoryConfig.color]">
                  {{ currentCategoryName }}
                </h2>
                <div :class="['text-sm font-semibold px-3 py-1.5 rounded-full', currentCategoryConfig.badgeClass]">
                  {{ currentCategoryProgress }}/8
                </div>
              </div>
              
              <!-- Progress bar -->
              <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  :class="['h-2 rounded-full transition-all duration-300', currentCategoryConfig.progressClass]"
                  :style="{ width: `${(currentCategoryProgress / 8) * 100}%` }"
                ></div>
              </div>
              
              <!-- Category description -->
              <p class="text-gray-600 text-sm sm:text-base mb-2">
                {{ categoryDescriptions[currentCategoryName].description }}
              </p>
              <p class="text-xs sm:text-sm text-gray-400 italic">
                Examples: {{ categoryDescriptions[currentCategoryName].examples }}
              </p>
            </div>

            <!-- Word Inputs -->
            <div :class="['rounded-xl border-2 p-4 sm:p-6', currentCategoryConfig.bgClass, currentCategoryConfig.borderClass]">
              <div class="space-y-3">
                <div 
                  v-for="i in 8" 
                  :key="i"
                  class="space-y-1"
                >
                  <div class="flex items-center gap-3">
                    <span :class="['w-7 h-7 flex items-center justify-center text-sm font-bold rounded-full', 
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
                        'focus:outline-none focus:ring-2 focus:ring-offset-1',
                        'bg-white',
                        currentCategoryConfig.focusClass,
                        getDuplicateIndex(currentCategoryName, i-1) !== -1 
                          ? 'border-amber-400 bg-amber-50' 
                          : words[currentCategoryName][i-1] && words[currentCategoryName][i-1].trim() 
                            ? currentCategoryConfig.filledBorderClass 
                            : 'border-gray-200'
                      ]"
                      @input="onWordInput"
                      @keydown.enter="focusNextInput(i)"
                    />
                  </div>
                  <!-- Duplicate warning -->
                  <div 
                    v-if="getDuplicateIndex(currentCategoryName, i-1) !== -1" 
                    class="flex items-center gap-1.5 ml-10 text-xs text-amber-600"
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
            <transition name="fade">
              <div 
                v-if="currentCategoryProgress === 8" 
                class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center"
              >
                <span class="text-green-700 font-medium">
                  Category complete! Continue to the next step.
                </span>
              </div>
            </transition>
          </div>

          <!-- Review Step (4) -->
          <div v-else key="review">
            <div class="mb-6">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Review Your Words</h2>
              <p class="text-gray-600">
                Review all 32 words before continuing to the association phase.
              </p>
            </div>

            <!-- Collapsible category sections -->
            <div class="space-y-3">
              <div 
                v-for="(category, categoryName) in categories" 
                :key="categoryName"
                :class="['rounded-xl border-2 overflow-hidden transition-all duration-200', category.borderClass, category.bgClass]"
              >
                <!-- Category header (clickable) -->
                <button
                  @click="toggleCategory(categoryName)"
                  class="w-full px-4 py-3 flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <span :class="['font-bold text-lg', category.color]">{{ categoryName }}</span>
                    <span :class="['text-xs font-medium px-2 py-1 rounded-full', category.badgeClass]">
                      {{ getCategoryProgress(categoryName) }}/8
                    </span>
                  </div>
                  <svg 
                    :class="['w-5 h-5 transition-transform duration-200', expandedCategories[categoryName] ? 'rotate-180' : '']"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Expanded content -->
                <transition name="expand">
                  <div v-if="expandedCategories[categoryName]" class="px-4 pb-4">
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="(word, index) in words[categoryName]" 
                        :key="index"
                        :class="[
                          'px-3 py-1.5 rounded-lg text-sm font-medium',
                          word && word.trim() 
                            ? 'bg-white border ' + category.borderClass + ' ' + category.color
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        ]"
                      >
                        {{ word && word.trim() ? word : `Word ${index + 1}` }}
                      </span>
                    </div>
                    <!-- Edit button -->
                    <button
                      @click="goToCategory(categoryName)"
                      class="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit {{ categoryName }} words
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Overall progress summary -->
            <div class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-gray-700">Total Progress</span>
                <span class="font-bold text-gray-800">{{ filledWords }}/32</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${(filledWords / 32) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Sticky Footer Navigation -->
    <div class="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <!-- Previous button -->
          <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
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
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg' 
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
          color: 'text-red-700',
          bgClass: 'bg-red-50',
          borderClass: 'border-red-200',
          badgeClass: 'bg-red-100 text-red-700',
          progressClass: 'bg-gradient-to-r from-red-400 to-red-600',
          focusClass: 'focus:ring-red-400 focus:border-red-400',
          filledBorderClass: 'border-red-300'
        },
        Mental: {
          color: 'text-blue-700',
          bgClass: 'bg-blue-50',
          borderClass: 'border-blue-200',
          badgeClass: 'bg-blue-100 text-blue-700',
          progressClass: 'bg-gradient-to-r from-blue-400 to-blue-600',
          focusClass: 'focus:ring-blue-400 focus:border-blue-400',
          filledBorderClass: 'border-blue-300'
        },
        Emotional: {
          color: 'text-amber-700',
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-200',
          badgeClass: 'bg-amber-100 text-amber-700',
          progressClass: 'bg-gradient-to-r from-amber-400 to-amber-600',
          focusClass: 'focus:ring-amber-400 focus:border-amber-400',
          filledBorderClass: 'border-amber-300'
        },
        Spiritual: {
          color: 'text-purple-700',
          bgClass: 'bg-purple-50',
          borderClass: 'border-purple-200',
          badgeClass: 'bg-purple-100 text-purple-700',
          progressClass: 'bg-gradient-to-r from-purple-400 to-purple-600',
          focusClass: 'focus:ring-purple-400 focus:border-purple-400',
          filledBorderClass: 'border-purple-300'
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
    nextStep() {
      if (!this.canProceed) return
      
      if (this.currentStep < 4) {
        this.transitionDirection = 'forward'
        this.currentStep++
      } else {
        this.submitWords()
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.transitionDirection = 'backward'
        this.currentStep--
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
