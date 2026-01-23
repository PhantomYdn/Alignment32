<template>
  <div class="container mx-auto px-4 py-6 sm:py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <button 
          @click="$emit('back')"
          class="mr-3 p-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 shadow-sm"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Association Process</h1>
          <p class="text-base text-gray-500 font-medium">Round {{ currentRound }}</p>
        </div>
      </div>

      <!-- Main content - One pair at a time -->
      <div v-if="currentGroups.length > 1 || (currentGroups.length === 1 && currentGroups[0].words.length > 1)">
        <!-- Overall progress bar -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100 p-5 mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-600">Overall Progress</span>
            <span class="text-sm font-bold text-brand-600">{{ overallProgressPercent }}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-brand-500 to-spiritual-500 h-2.5 rounded-full transition-all duration-500"
              :style="{ width: `${overallProgressPercent}%` }"
            ></div>
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-500">
            <span>{{ totalWordsRemaining }} {{ totalWordsRemaining === 1 ? 'word' : 'words' }} remaining</span>
            <span>{{ pairsLeftText }}</span>
          </div>
        </div>

        <!-- Current pair display -->
        <div class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden mb-6">
          <!-- Pair header -->
          <div class="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4 text-white">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <h2 class="font-bold text-lg">
                {{ totalPairsInRound === 1 ? 'Final Pair' : `Pair ${currentPairIndex + 1} of ${totalPairsInRound}` }}
              </h2>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {{ displayGroupName(currentPair.group1.name) }} + {{ displayGroupName(currentPair.group2.name) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Word pair cards -->
          <div class="p-6">
            <p class="text-center text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
              Create {{ associationCount }} {{ associationCount === 1 ? 'word that combines' : 'words that combine' }} the essence of each pair
            </p>

            <!-- Current word pair being worked on -->
            <div class="space-y-4">
              <div 
                v-for="(wordPair, idx) in currentWordPairs" 
                :key="`word-pair-${idx}`"
                :class="[
                  'rounded-xl border-2 p-4 transition-all duration-300',
                  getWordPairAssociation(idx) 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : idx === currentWordIndex 
                      ? 'border-brand-300 bg-brand-50 shadow-md' 
                      : 'border-gray-200 bg-gray-50'
                ]"
              >
                <!-- Word pair display -->
                <div class="flex items-center justify-center gap-3 mb-3">
                  <div class="flex-1 text-center">
                    <span class="inline-block px-4 py-2 bg-physical-100 text-physical-700 rounded-xl font-semibold text-sm sm:text-base border border-physical-200">
                      {{ wordPair.word1 }}
                    </span>
                  </div>
                  <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span class="text-gray-400 font-bold text-lg">+</span>
                  </div>
                  <div class="flex-1 text-center">
                    <span class="inline-block px-4 py-2 bg-mental-100 text-mental-700 rounded-xl font-semibold text-sm sm:text-base border border-mental-200">
                      {{ wordPair.word2 }}
                    </span>
                  </div>
                </div>

                <!-- Association input -->
                <div class="relative">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <span class="text-brand-600 font-bold">=</span>
                    </div>
                    <input
                      v-model="pairAssociations[`${currentPairIndex}-${idx}`]"
                      type="text"
                      maxlength="30"
                      :placeholder="idx === currentWordIndex ? 'Type your association...' : 'Your association'"
                      class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:shadow-md hover:shadow-sm transition-all text-center font-medium placeholder:text-gray-300"
                      @input="onAssociationInput"
                      @focus="currentWordIndex = idx"
                      @keydown.enter="focusNextInput(idx)"
                    />
                    <transition name="scale">
                      <div 
                        v-if="getWordPairAssociation(idx)" 
                        class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"
                      >
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pair progress -->
            <div class="mt-6 flex items-center justify-between">
              <span class="text-sm text-gray-500">
                {{ completedInCurrentPair }} of {{ associationCount }} associations
              </span>
              <div class="flex gap-1.5">
                <div 
                  v-for="i in associationCount" 
                  :key="`dot-${i}`"
                  :class="[
                    'w-2.5 h-2.5 rounded-full transition-all duration-300',
                    getWordPairAssociation(i - 1) ? 'bg-emerald-500' : 'bg-gray-300'
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation and actions -->
        <div class="flex items-center justify-between gap-4">
          <button
            v-if="currentPairIndex > 0"
            @click="previousPair"
            class="px-5 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors flex items-center gap-2 bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div v-else></div>

          <button
            @click="handleNextAction"
            :disabled="!isCurrentPairComplete"
            :class="[
              'px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2',
              isCurrentPairComplete
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            ]"
          >
            {{ nextButtonText }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Round summary modal -->
        <teleport to="body">
          <transition name="fade">
            <div 
              v-if="showRoundSummary" 
              class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              @click.self="proceedToNextRound"
            >
              <div class="bg-white rounded-2xl shadow-soft-lg max-w-md w-full p-6 sm:p-8 relative z-10 animate-scale-in">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-brand-100 to-spiritual-100 flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Round {{ currentRound }} Complete!</h2>
                  <p class="text-gray-600">
                    {{ roundSummaryText }}
                  </p>
                </div>

                <!-- Summary of merges -->
                <div class="bg-gray-50 rounded-xl p-4 mb-6 max-h-48 overflow-y-auto">
                  <h3 class="font-semibold text-gray-700 mb-3">Created {{ roundAssociationsSummary.length === 1 ? 'association' : 'associations' }}:</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="(assoc, idx) in roundAssociationsSummary" 
                      :key="`summary-${idx}`"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-sm font-medium text-gray-700 border border-gray-200 shadow-sm"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {{ assoc }}
                    </span>
                  </div>
                </div>

                <button
                  @click.stop="proceedToNextRound"
                  class="w-full py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold hover:shadow-glow transition-all active:scale-95"
                >
                  Continue to Round {{ currentRound + 1 }}
                </button>
              </div>
            </div>
          </transition>
        </teleport>
      </div>

      <!-- Final result - shown when we have exactly 1 word remaining -->
      <div v-else-if="finalWord" class="bg-gradient-to-br from-brand-50 via-spiritual-50 to-emotional-50 rounded-3xl shadow-soft-lg border border-brand-100 p-8 sm:p-12 text-center">
        <div class="relative mb-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-spiritual-500 flex items-center justify-center mx-auto shadow-glow animate-celebration-glow">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-32 h-32 bg-brand-200/30 rounded-full animate-ping"></div>
          </div>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Your Final Word</h2>
        <div class="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-soft border border-brand-100 animate-celebration-glow">
          <h3 class="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-brand-600 to-spiritual-600 bg-clip-text text-transparent break-words tracking-tight">
            {{ finalWord }}
          </h3>
        </div>
        <p class="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          This word represents the synthesis of all 32 words you entered across Physical, Mental, Emotional, and Spiritual dimensions.
        </p>
        <button 
          @click="completeProcess"
          class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
        >
          Complete Session
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'

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
      currentRound: 1,
      currentPairIndex: 0,
      currentWordIndex: 0,
      pairAssociations: {},
      finalWord: '',
      wordHistory: [],
      allAssociations: [],
      showRoundSummary: false,
      newGroupsForNextRound: [],
      groupsBeforeRound: 0,
      roundAssociationsSummary: [],
      totalAssociationsCompleted: 0,
      initialTotalWords: 0
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
    },
    currentPair() {
      return this.currentPairs[this.currentPairIndex] || { group1: { words: [] }, group2: { words: [] } }
    },
    totalPairsInRound() {
      return this.currentPairs.length
    },
    currentWordPairs() {
      if (!this.currentPair.group1 || !this.currentPair.group2) return []
      const pairs = []
      const count = Math.min(this.currentPair.group1.words.length, this.currentPair.group2.words.length)
      for (let i = 0; i < count; i++) {
        pairs.push({
          word1: this.currentPair.group1.words[i],
          word2: this.currentPair.group2.words[i]
        })
      }
      return pairs
    },
    associationCount() {
      return this.currentWordPairs.length
    },
    completedInCurrentPair() {
      let count = 0
      for (let i = 0; i < this.associationCount; i++) {
        if (this.getWordPairAssociation(i)) count++
      }
      return count
    },
    isCurrentPairComplete() {
      return this.completedInCurrentPair === this.associationCount && this.associationCount > 0
    },
    isLastPairInRound() {
      return this.currentPairIndex === this.totalPairsInRound - 1
    },
    nextButtonText() {
      if (!this.isCurrentPairComplete) return 'Complete all associations'
      if (this.isLastPairInRound) return 'Finish Round'
      return 'Next Pair'
    },
    overallProgressPercent() {
      if (this.initialTotalWords <= 1) return 100
      const totalReductionsNeeded = this.initialTotalWords - 1
      const percent = Math.round((this.totalAssociationsCompleted / totalReductionsNeeded) * 100)
      return Math.min(percent, 100)
    },
    totalWordsRemaining() {
      return this.currentGroups.reduce((sum, g) => sum + g.words.length, 0)
    },
    pairsLeftText() {
      const remaining = this.totalPairsInRound - this.currentPairIndex
      if (remaining === 1 && this.currentPairIndex === 0) {
        return '1 pair this round'
      }
      return `${remaining} ${remaining === 1 ? 'pair' : 'pairs'} left this round`
    },
    roundSummaryText() {
      const wordsCreated = this.roundAssociationsSummary.length
      if (wordsCreated === 1) {
        return `Created 1 new word from your associations.`
      }
      return `Created ${wordsCreated} new words from your associations.`
    }
  },
  watch: {
    finalWord(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.triggerCelebration()
        })
      }
    }
  },
  mounted() {
    this.initializeProcess()
  },
  methods: {
    triggerCelebration() {
      // Fire confetti from both sides
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Confetti from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#b4a7d6', '#f5c518', '#10b981', '#f43f5e']
        })

        // Confetti from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#b4a7d6', '#f5c518', '#10b981', '#f43f5e']
        })
      }, 250)
    },
    initializeProcess() {
      this.currentGroups = [...this.groups]
      this.wordHistory = [...this.initialWordHistory]
      this.initialTotalWords = this.currentGroups.reduce((sum, g) => sum + g.words.length, 0)
      this.totalAssociationsCompleted = 0
    },
    displayGroupName(name) {
      if (!name) return ''
      const parts = name.split('-')
      if (parts.length <= 2) return name
      if (parts.length > 4) {
        return 'Group ' + (name.endsWith('-A') ? 'A' : name.endsWith('-B') ? 'B' : 'Merged')
      }
      return parts.slice(0, 2).join('-') + '...'
    },
    getWordPairAssociation(idx) {
      const key = `${this.currentPairIndex}-${idx}`
      const value = this.pairAssociations[key]
      return value && value.trim() !== '' ? value.trim() : null
    },
    onAssociationInput() {
      this.$nextTick(() => {
        if (this.getWordPairAssociation(this.currentWordIndex)) {
          this.focusNextInput(this.currentWordIndex)
        }
      })
    },
    focusNextInput(currentIdx) {
      for (let i = currentIdx + 1; i < this.associationCount; i++) {
        if (!this.getWordPairAssociation(i)) {
          this.currentWordIndex = i
          return
        }
      }
      for (let i = 0; i < currentIdx; i++) {
        if (!this.getWordPairAssociation(i)) {
          this.currentWordIndex = i
          return
        }
      }
    },
    previousPair() {
      if (this.currentPairIndex > 0) {
        this.currentPairIndex--
        this.currentWordIndex = 0
      }
    },
    handleNextAction() {
      if (!this.isCurrentPairComplete) return

      if (this.isLastPairInRound) {
        this.finishRound()
      } else {
        this.nextPair()
      }
    },
    nextPair() {
      if (this.currentPairIndex < this.totalPairsInRound - 1) {
        this.currentPairIndex++
        this.currentWordIndex = 0
      }
    },
    finishRound() {
      const roundAssociations = []
      const newGroups = []
      this.roundAssociationsSummary = []
      let associationsThisRound = 0

      this.currentPairs.forEach((pair, pairIndex) => {
        const newWords = []
        const minLength = Math.min(pair.group1.words.length, pair.group2.words.length)

        for (let i = 0; i < minLength; i++) {
          const key = `${pairIndex}-${i}`
          const association = this.pairAssociations[key]
          if (association && association.trim() !== '') {
            newWords.push(association.trim())
            this.roundAssociationsSummary.push(association.trim())
            associationsThisRound++
            roundAssociations.push({
              word1: pair.group1.words[i],
              word2: pair.group2.words[i],
              association: association.trim(),
              group1: pair.group1.name,
              group2: pair.group2.name
            })
          }
        }

        if (newWords.length > 0) {
          const mergedName = this.createMergedGroupName(pair.group1.name, pair.group2.name)
          newGroups.push({
            name: mergedName,
            words: newWords
          })
        }
      })
      
      this.totalAssociationsCompleted += associationsThisRound

      if (this.currentGroups.length % 2 === 1) {
        newGroups.push(this.currentGroups[this.currentGroups.length - 1])
      }

      this.allAssociations.push({
        step: this.currentRound,
        stage: `Round ${this.currentRound}`,
        associations: roundAssociations
      })

      this.wordHistory.push({
        step: this.currentRound,
        stage: `Round ${this.currentRound} - After Association`,
        groups: newGroups.map(g => ({ name: g.name, words: [...g.words] }))
      })

      this.groupsBeforeRound = this.currentGroups.length
      this.newGroupsForNextRound = newGroups

      if (newGroups.length === 1 && newGroups[0].words.length === 1) {
        this.finalWord = newGroups[0].words[0]
        this.currentGroups = []
      } else if (newGroups.length === 1 && newGroups[0].words.length > 1) {
        this.showRoundSummary = true
      } else {
        this.showRoundSummary = true
      }
    },
    proceedToNextRound() {
      this.showRoundSummary = false

      if (this.newGroupsForNextRound.length === 1 && this.newGroupsForNextRound[0].words.length > 1) {
        this.splitFinalGroup()
      } else {
        this.currentGroups = this.newGroupsForNextRound
      }

      this.currentRound++
      this.currentPairIndex = 0
      this.currentWordIndex = 0
      this.pairAssociations = {}
    },
    createMergedGroupName(name1, name2) {
      const getBase = (name) => {
        if (name.startsWith('Group')) return name
        const parts = name.split('-')
        if (['Physical', 'Mental', 'Emotional', 'Spiritual'].includes(parts[0])) {
          return parts[0].charAt(0)
        }
        return parts[0].substring(0, 3)
      }
      
      const base1 = getBase(name1)
      const base2 = getBase(name2)
      
      if (base1.length === 1 && base2.length === 1) {
        return `${base1}${base2}`
      }
      
      return `${base1}-${base2}`
    },
    splitFinalGroup() {
      const finalGroup = this.newGroupsForNextRound[0]
      const midPoint = Math.ceil(finalGroup.words.length / 2)

      const splitGroups = [
        {
          name: 'Group A',
          words: finalGroup.words.slice(0, midPoint)
        },
        {
          name: 'Group B',
          words: finalGroup.words.slice(midPoint)
        }
      ]

      this.wordHistory.push({
        step: this.currentRound,
        stage: `Round ${this.currentRound} - Split Final Group`,
        groups: splitGroups.map(g => ({ name: g.name, words: [...g.words] }))
      })

      this.currentGroups = splitGroups
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
