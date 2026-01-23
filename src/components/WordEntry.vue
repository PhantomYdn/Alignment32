<template>
  <div class="container mx-auto px-4 py-6 sm:py-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center mb-5 sm:mb-6">
        <button 
          @click="$emit('back')"
          class="mr-3 sm:mr-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          ← Back
        </button>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Enter Your 32 Words</h1>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 mb-5 sm:mb-6">
        <p class="text-sm sm:text-base text-gray-700 mb-3">
          Enter 8 words for each category. These words should represent different aspects of your life in each dimension.
        </p>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-3 sm:p-4">
          <p class="text-xs sm:text-sm text-blue-900">
            <strong class="font-semibold">💡 Tip:</strong> Choose words that resonate with you personally. They can be nouns, adjectives, or concepts that represent your values, goals, or current state in each area.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div 
          v-for="(category, categoryName) in categories" 
          :key="categoryName"
          :class="[
            'rounded-xl shadow-sm border-2 transition-all duration-200 p-4 sm:p-5',
            category.bgClass,
            category.borderClass,
            category.hoverClass
          ]"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 :class="['text-xl sm:text-2xl font-bold', category.color]">
              {{ categoryName }}
            </h2>
            <div class="flex items-center gap-2">
              <span :class="['text-xs font-medium px-2 py-1 rounded-full', category.badgeClass]">
                {{ getCategoryProgress(categoryName) }}/8
              </span>
            </div>
          </div>
          
          <div class="mb-3">
            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div 
                :class="['h-1.5 rounded-full transition-all duration-300', category.progressClass]"
                :style="{ width: `${(getCategoryProgress(categoryName) / 8) * 100}%` }"
              ></div>
            </div>
          </div>

          <div class="space-y-2.5">
            <div 
              v-for="i in 8" 
              :key="i"
              class="flex items-center gap-2.5 group"
            >
              <span :class="['w-6 sm:w-7 text-xs sm:text-sm font-semibold flex-shrink-0 text-center', category.numberClass]">
                {{ i }}
              </span>
              <input
                v-model="words[categoryName][i-1]"
                type="text"
                :placeholder="`Enter ${categoryName.toLowerCase()} word ${i}...`"
                :class="[
                  'flex-1 px-3 py-2.5 text-sm sm:text-base border-2 rounded-lg transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-1',
                  category.inputClass,
                  category.focusClass,
                  words[categoryName][i-1] && words[categoryName][i-1].trim() ? category.filledClass : ''
                ]"
                @input="updateProgress"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg sm:text-xl font-bold text-gray-800">Overall Progress</h3>
              <span class="text-lg sm:text-xl font-bold text-gray-700">{{ Math.round((filledWords / 32) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                :style="{ width: `${(filledWords / 32) * 100}%` }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              {{ filledWords }} of 32 words completed
            </p>
          </div>
          <button 
            @click="submitWords"
            :disabled="filledWords < 32"
            :class="[
              'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all duration-200',
              'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
              'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-105',
              'disabled:hover:scale-100 disabled:shadow-none'
            ]"
          >
            Continue to Association →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordEntry',
  props: {
    existingWords: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['words-complete', 'back'],
  data() {
    return {
      categories: {
        Physical: {
          color: 'text-red-700',
          bgClass: 'bg-red-50',
          borderClass: 'border-red-200',
          hoverClass: 'hover:border-red-300 hover:shadow-md',
          badgeClass: 'bg-red-100 text-red-700',
          progressClass: 'bg-gradient-to-r from-red-400 to-red-600',
          numberClass: 'text-red-600',
          inputClass: 'border-gray-300 bg-white',
          focusClass: 'focus:ring-red-400 focus:border-red-400',
          filledClass: 'border-red-300 bg-red-50'
        },
        Mental: {
          color: 'text-blue-700',
          bgClass: 'bg-blue-50',
          borderClass: 'border-blue-200',
          hoverClass: 'hover:border-blue-300 hover:shadow-md',
          badgeClass: 'bg-blue-100 text-blue-700',
          progressClass: 'bg-gradient-to-r from-blue-400 to-blue-600',
          numberClass: 'text-blue-600',
          inputClass: 'border-gray-300 bg-white',
          focusClass: 'focus:ring-blue-400 focus:border-blue-400',
          filledClass: 'border-blue-300 bg-blue-50'
        },
        Emotional: {
          color: 'text-amber-700',
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-200',
          hoverClass: 'hover:border-amber-300 hover:shadow-md',
          badgeClass: 'bg-amber-100 text-amber-700',
          progressClass: 'bg-gradient-to-r from-amber-400 to-amber-600',
          numberClass: 'text-amber-600',
          inputClass: 'border-gray-300 bg-white',
          focusClass: 'focus:ring-amber-400 focus:border-amber-400',
          filledClass: 'border-amber-300 bg-amber-50'
        },
        Spiritual: {
          color: 'text-purple-700',
          bgClass: 'bg-purple-50',
          borderClass: 'border-purple-200',
          hoverClass: 'hover:border-purple-300 hover:shadow-md',
          badgeClass: 'bg-purple-100 text-purple-700',
          progressClass: 'bg-gradient-to-r from-purple-400 to-purple-600',
          numberClass: 'text-purple-600',
          inputClass: 'border-gray-300 bg-white',
          focusClass: 'focus:ring-purple-400 focus:border-purple-400',
          filledClass: 'border-purple-300 bg-purple-50'
        }
      },
      words: {
        Physical: this.existingWords.Physical || Array(8).fill(''),
        Mental: this.existingWords.Mental || Array(8).fill(''),
        Emotional: this.existingWords.Emotional || Array(8).fill(''),
        Spiritual: this.existingWords.Spiritual || Array(8).fill('')
      },
      filledWords: 0
    }
  },
  mounted() {
    this.updateProgress()
  },
  methods: {
    getCategoryProgress(categoryName) {
      return this.words[categoryName].filter(word => word && word.trim() !== '').length
    },
    updateProgress() {
      this.filledWords = Object.values(this.words).flat().filter(word => word.trim() !== '').length
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