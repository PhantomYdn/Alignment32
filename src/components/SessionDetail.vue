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
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Session Details</h1>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-4">
          <div class="flex-1 min-w-0">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">
              Session {{ new Date(session.createdAt).toLocaleDateString() }}
            </h2>
            <p class="text-sm sm:text-base text-gray-600">
              Created {{ new Date(session.createdAt).toLocaleString() }}
            </p>
          </div>
          <div class="text-left sm:text-right flex-shrink-0">
            <span 
              class="inline-block px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium"
              :class="session.finalWord ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
              {{ session.finalWord ? 'Completed' : 'In Progress' }}
            </span>
          </div>
        </div>
        
        <div v-if="session.finalWord" class="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <h3 class="text-base sm:text-lg font-semibold text-blue-800 mb-2">Final Result</h3>
          <p class="text-xl sm:text-2xl font-bold text-blue-600 break-words">{{ session.finalWord }}</p>
        </div>
      </div>

      <div v-if="session.wordHistory && session.wordHistory.length > 0" class="space-y-4 sm:space-y-6">
        <div 
          v-for="(step, index) in session.wordHistory" 
          :key="`step-${index}`"
          class="bg-white rounded-lg shadow-md p-4 sm:p-6"
        >
          <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            {{ step.stage }}
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div 
              v-for="group in step.groups" 
              :key="group.name"
              class="border border-gray-200 rounded-lg p-3 sm:p-4"
            >
              <h4 class="text-sm sm:text-base font-semibold text-gray-700 mb-2">{{ group.name }}</h4>
              <div class="space-y-1">
                <div 
                  v-for="(word, wordIndex) in group.words" 
                  :key="`${group.name}-${wordIndex}`"
                  class="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs sm:text-sm break-words"
                >
                  {{ word }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="session.associations && session.associations.length > 0" class="mt-6 sm:mt-8">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Association History</h2>
        <div class="space-y-3 sm:space-y-4">
          <div 
            v-for="(assocStep, index) in session.associations" 
            :key="`assoc-${index}`"
            class="bg-white rounded-lg shadow-md p-4 sm:p-6"
          >
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">{{ assocStep.stage }}</h3>
            <div class="space-y-2">
              <div 
                v-for="(assoc, assocIndex) in assocStep.associations" 
                :key="`assoc-${index}-${assocIndex}`"
                class="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm"
              >
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-1 bg-red-100 text-red-800 rounded break-words">{{ assoc.word1 }}</span>
                  <span class="text-gray-400">+</span>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded break-words">{{ assoc.word2 }}</span>
                  <span class="text-gray-400">=</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded font-medium break-words">{{ assoc.association }}</span>
                </div>
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
  name: 'SessionDetail',
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  emits: ['back']
}
</script>