<template>
  <div class="container mx-auto px-4 py-6 sm:py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
        Alignment32
      </h1>
      
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-5 sm:p-6 mb-6 sm:mb-8">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Start New Session</h2>
        <p class="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">Begin a new alignment session by entering 32 words across 4 categories.</p>
        <button 
          @click="$emit('create-session')"
          class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105"
        >
          ✨ Create New Session
        </button>
      </div>

      <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-5 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">Previous Sessions</h2>
        <div v-if="sessions.length === 0" class="text-gray-500 text-center py-8 sm:py-12 text-sm sm:text-base">
          <div class="text-4xl mb-3">📝</div>
          <p>No previous sessions found. Create your first session above.</p>
        </div>
        <div v-else class="space-y-3 sm:space-y-4">
          <div 
            v-for="session in sessions" 
            :key="session.id"
            class="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200"
            @click="$emit('open-session', session)"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-sm sm:text-base mb-1">
                  Session {{ new Date(session.createdAt).toLocaleDateString() }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-500 mb-2">
                  Created {{ new Date(session.createdAt).toLocaleString() }}
                </p>
                <div v-if="session.finalWord" class="mt-3">
                  <span class="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-green-200">
                    <span>🎯</span>
                    <span class="font-bold">Final Word:</span> {{ session.finalWord }}
                  </span>
                </div>
                <div v-if="session.wordHistory && session.wordHistory.length > 0" class="mt-2">
                  <p class="text-xs text-gray-500">
                    {{ getTotalWordsCount(session) }} words processed through {{ session.wordHistory.length }} stages
                  </p>
                </div>
              </div>
              <div class="text-left sm:text-right flex-shrink-0">
                <span :class="[
                  'inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold',
                  session.finalWord 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                ]">
                  {{ session.finalWord ? '✓ Completed' : '⟳ In Progress' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen',
  props: {
    sessions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['create-session', 'open-session'],
  methods: {
    getTotalWordsCount(session) {
      if (!session.wordHistory || session.wordHistory.length === 0) return 0
      return session.wordHistory[0].groups.reduce((total, group) => total + group.words.length, 0)
    }
  }
}
</script>