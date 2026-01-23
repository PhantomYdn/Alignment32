<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center mb-6 sm:mb-8">
        <button 
          @click="$emit('back')"
          class="mr-3 sm:mr-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          ← Back
        </button>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Association Process</h1>
      </div>

      <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-800">
            Step {{ currentStep }} of {{ totalSteps }}
          </h2>
          <div class="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
            Groups: {{ currentGroups.length }} → {{ Math.ceil(currentGroups.length / 2) }}
          </div>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner mb-3 sm:mb-4">
          <div 
            class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>

        <p class="text-sm sm:text-base text-gray-700">
          Create associations between word pairs from different groups. Each association will form a new merged group.
        </p>
      </div>

      <div v-if="currentGroups.length > 1" class="space-y-4 sm:space-y-6">
        <div 
          v-for="(pair, index) in currentPairs" 
          :key="`pair-${currentStep}-${index}`"
          class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-4 sm:p-6"
        >
          <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5">
            Pair {{ index + 1 }}: {{ pair.group1.name }} + {{ pair.group2.name }}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-5">
            <div class="text-center bg-red-50 rounded-lg p-3 sm:p-4 border-2 border-red-200">
              <h4 class="text-sm sm:text-base font-bold text-red-700 mb-3">{{ pair.group1.name }}</h4>
              <div class="space-y-1.5">
                <div 
                  v-for="(word, i) in pair.group1.words" 
                  :key="`g1-${i}`"
                  class="px-3 py-1.5 bg-white text-red-800 rounded-lg text-xs sm:text-sm font-medium border border-red-200 break-words"
                >
                  {{ word }}
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-center py-2 md:py-0">
              <div class="text-2xl sm:text-3xl font-bold text-gray-400">+</div>
            </div>
            
            <div class="text-center bg-blue-50 rounded-lg p-3 sm:p-4 border-2 border-blue-200">
              <h4 class="text-sm sm:text-base font-bold text-blue-700 mb-3">{{ pair.group2.name }}</h4>
              <div class="space-y-1.5">
                <div 
                  v-for="(word, i) in pair.group2.words" 
                  :key="`g2-${i}`"
                  class="px-3 py-1.5 bg-white text-blue-800 rounded-lg text-xs sm:text-sm font-medium border border-blue-200 break-words"
                >
                  {{ word }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div 
              v-for="i in Math.min(pair.group1.words.length, pair.group2.words.length)" 
              :key="`association-${i}`"
              class="flex flex-col sm:flex-row sm:items-center gap-2.5 bg-gray-50 rounded-lg p-2.5 border border-gray-200"
            >
              <span class="w-6 sm:w-7 text-xs sm:text-sm text-gray-600 flex-shrink-0 font-bold text-center bg-white rounded px-1 py-1">{{ i }}</span>
              <div class="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <span class="px-2.5 py-1 bg-red-100 text-red-800 rounded-lg text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[100px] lg:max-w-[120px] border border-red-200">
                    {{ pair.group1.words[i-1] }}
                  </span>
                  <span class="text-gray-400 text-sm font-bold">+</span>
                  <span class="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[100px] lg:max-w-[120px] border border-blue-200">
                    {{ pair.group2.words[i-1] }}
                  </span>
                  <span class="text-gray-400 text-sm font-bold">=</span>
                </div>
                <input
                  v-model="associations[`${index}-${i-1}`]"
                  type="text"
                  :placeholder="`Your association ${i}...`"
                  class="flex-1 min-w-0 max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] px-3 py-2 text-sm sm:text-base border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                  @input="updateProgress"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-base sm:text-lg font-bold text-gray-800">Progress</h3>
                <span class="text-base sm:text-lg font-bold text-gray-700">{{ Math.round((filledAssociations / requiredAssociations) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 shadow-inner mb-1">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                  :style="{ width: `${(filledAssociations / requiredAssociations) * 100}%` }"
                ></div>
              </div>
              <p class="text-xs sm:text-sm text-gray-600">{{ filledAssociations }} of {{ requiredAssociations }} associations completed</p>
            </div>
            <button 
              @click="submitAssociations"
              :disabled="filledAssociations < requiredAssociations"
              :class="[
                'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold rounded-lg transition-all duration-200',
                'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
                'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:scale-105',
                'disabled:hover:scale-100 disabled:shadow-none'
              ]"
            >
              {{ currentGroups.length > 2 ? 'Continue →' : 'Complete ✓' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-lg border-2 border-blue-200 p-8 sm:p-12 text-center">
        <div class="text-5xl sm:text-7xl mb-4 sm:mb-6 animate-bounce">🎯</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-5">Final Result</h2>
        <div class="bg-white rounded-xl p-6 sm:p-8 mb-5 sm:mb-6 shadow-md border-2 border-blue-300">
          <h3 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 break-words">{{ finalWord }}</h3>
        </div>
        <p class="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto">
          🎉 Congratulations! You've completed the alignment process. This word represents the synthesis of all your 32 words.
        </p>
        <button 
          @click="completeProcess"
          class="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Return to Home →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Association',
  props: {
    groups: {
      type: Array,
      required: true
    },
    initialWordHistory: {
      type: Array,
      default: () => []
    }
  },
  emits: ['associations-complete', 'back'],
  data() {
    return {
      currentGroups: [],
      currentStep: 1,
      totalSteps: 0,
      associations: {},
      filledAssociations: 0,
      requiredAssociations: 0,
      finalWord: '',
      wordHistory: [],
      allAssociations: []
    }
  },
  computed: {
    currentPairs() {
      const pairs = []
      for (let i = 0; i < this.currentGroups.length; i += 2) {
        if (i + 1 < this.currentGroups.length) {
          pairs.push({
            group1: this.currentGroups[i],
            group2: this.currentGroups[i + 1]
          })
        }
      }
      return pairs
    }
  },
  mounted() {
    this.initializeProcess()
  },
  methods: {
    initializeProcess() {
      this.currentGroups = [...this.groups]
      this.wordHistory = [...this.initialWordHistory]
      this.calculateTotalSteps()
      this.calculateRequiredAssociations()
    },
    calculateTotalSteps() {
      let groupCount = this.currentGroups.length
      let steps = 0
      
      while (groupCount > 1) {
        steps++
        groupCount = Math.ceil(groupCount / 2)
      }
      
      this.totalSteps = steps
    },
    calculateRequiredAssociations() {
      this.requiredAssociations = this.currentPairs.reduce((total, pair) => {
        return total + Math.min(pair.group1.words.length, pair.group2.words.length)
      }, 0)
    },
    updateProgress() {
      this.filledAssociations = Object.values(this.associations).filter(assoc => assoc && assoc.trim() !== '').length
    },
    submitAssociations() {
      if (this.filledAssociations < this.requiredAssociations) return
      
      const stepAssociations = []
      const newGroups = []
      
      this.currentPairs.forEach((pair, pairIndex) => {
        const newWords = []
        const minLength = Math.min(pair.group1.words.length, pair.group2.words.length)
        
        for (let i = 0; i < minLength; i++) {
          const association = this.associations[`${pairIndex}-${i}`]
          if (association && association.trim() !== '') {
            newWords.push(association.trim())
            stepAssociations.push({
              word1: pair.group1.words[i],
              word2: pair.group2.words[i],
              association: association.trim(),
              group1: pair.group1.name,
              group2: pair.group2.name
            })
          }
        }
        
        if (newWords.length > 0) {
          newGroups.push({
            name: `${pair.group1.name}-${pair.group2.name}`,
            words: newWords
          })
        }
      })
      
      if (this.currentGroups.length % 2 === 1) {
        newGroups.push(this.currentGroups[this.currentGroups.length - 1])
      }
      
      this.allAssociations.push({
        step: this.currentStep,
        stage: `Step ${this.currentStep}`,
        associations: stepAssociations
      })
      
      this.wordHistory.push({
        step: this.currentStep,
        stage: `Step ${this.currentStep} - After Association`,
        groups: newGroups.map(g => ({ name: g.name, words: [...g.words] }))
      })
      
      this.currentGroups = newGroups
      this.currentStep++
      
      if (this.currentGroups.length === 1) {
        if (this.currentGroups[0].words.length > 1) {
          this.splitFinalGroup()
        } else {
          this.finalWord = this.currentGroups[0].words[0]
        }
      } else {
        this.associations = {}
        this.filledAssociations = 0
        this.calculateRequiredAssociations()
      }
    },
    splitFinalGroup() {
      const finalGroup = this.currentGroups[0]
      const midPoint = Math.ceil(finalGroup.words.length / 2)
      
      const splitGroups = [
        {
          name: `${finalGroup.name}-A`,
          words: finalGroup.words.slice(0, midPoint)
        },
        {
          name: `${finalGroup.name}-B`,
          words: finalGroup.words.slice(midPoint)
        }
      ]
      
      this.wordHistory.push({
        step: this.currentStep,
        stage: `Step ${this.currentStep} - Split Final Group`,
        groups: splitGroups.map(g => ({ name: g.name, words: [...g.words] }))
      })
      
      this.currentGroups = splitGroups
      this.associations = {}
      this.filledAssociations = 0
      this.calculateRequiredAssociations()
    },
    completeProcess() {
      this.$emit('associations-complete', {
        finalWord: this.finalWord,
        wordHistory: this.wordHistory,
        associations: this.allAssociations
      })
    }
  }
}
</script>