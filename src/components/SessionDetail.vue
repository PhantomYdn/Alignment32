<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sticky Header -->
    <div class="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto flex items-center justify-between py-3">
          <div class="flex items-center">
            <button 
              @click="$emit('back')"
              class="mr-3 sm:mr-4 min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 shadow-sm flex items-center justify-center"
              aria-label="Go back"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">Session Details</h1>
          </div>
          <span 
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
            :class="session.finalWord ? 'bg-emerald-100 text-emerald-700' : 'bg-physical-100 text-physical-700'"
          >
            <span :class="session.finalWord ? 'w-1.5 h-1.5 rounded-full bg-emerald-500' : 'w-1.5 h-1.5 rounded-full bg-physical-500'"></span>
            {{ session.finalWord ? 'Completed' : 'In Progress' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-6 sm:py-8">
      <div class="max-w-4xl mx-auto">

      <!-- Session Overview Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6 mb-6">
        <div class="mb-2">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
            {{ session.name || `Session ${new Date(session.createdAt).toLocaleDateString()}` }}
          </h2>
          <p class="text-sm text-gray-500 mt-1">
            Created {{ new Date(session.createdAt).toLocaleString() }}
          </p>
        </div>
        
        <!-- Final Word Display -->
        <div v-if="session.finalWord" class="mt-4 p-5 bg-gradient-to-br from-brand-50 to-spiritual-50 rounded-xl border border-brand-100">
          <h3 class="text-sm font-semibold text-brand-600 mb-2 uppercase tracking-wide">Final Word</h3>
          <p class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-spiritual-600 bg-clip-text text-transparent break-words tracking-tight">
            {{ session.finalWord }}
          </p>
        </div>
      </div>

      <!-- Word History -->
      <div v-if="session.wordHistory && session.wordHistory.length > 0" class="space-y-4 sm:space-y-5">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4 tracking-tight">Word Journey</h2>
        <div 
          v-for="(step, index) in session.wordHistory" 
          :key="`step-${index}`"
          class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6"
        >
          <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold">
              {{ index + 1 }}
            </span>
            {{ step.stage }}
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div 
              v-for="group in step.groups" 
              :key="group.name"
              class="rounded-xl p-4"
              :class="getGroupClasses(group.name)"
            >
              <h4 class="text-sm font-bold mb-2" :class="getGroupTextClass(group.name)">
                {{ group.name }}
              </h4>
              <div class="flex flex-wrap gap-1.5">
                <span 
                  v-for="(word, wordIndex) in group.words" 
                  :key="`${group.name}-${wordIndex}`"
                  class="px-2.5 py-1 bg-white text-gray-700 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 shadow-sm break-words"
                >
                  {{ word }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Association History -->
      <div v-if="session.associations && session.associations.length > 0" class="mt-6 sm:mt-8">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4 tracking-tight">Association History</h2>
        <div class="space-y-4">
          <div 
            v-for="(assocStep, index) in session.associations" 
            :key="`assoc-${index}`"
            class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6"
          >
            <h3 class="text-base sm:text-lg font-bold text-gray-800 mb-4">{{ assocStep.stage }}</h3>
            <div class="space-y-3">
              <div 
                v-for="(assoc, assocIndex) in assocStep.associations" 
                :key="`assoc-${index}-${assocIndex}`"
                class="flex flex-col sm:flex-row sm:items-center gap-2 text-sm p-3 bg-gray-50 rounded-xl"
              >
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-3 py-1.5 bg-physical-100 text-physical-700 rounded-lg font-medium break-words border border-physical-200">{{ assoc.word1 }}</span>
                  <span class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500 text-xs">+</span>
                  </span>
                  <span class="px-3 py-1.5 bg-mental-100 text-mental-700 rounded-lg font-medium break-words border border-mental-200">{{ assoc.word2 }}</span>
                  <span class="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <span class="text-brand-600 text-xs">=</span>
                  </span>
                  <span class="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg font-semibold break-words border border-emerald-200">{{ assoc.association }}</span>
                </div>
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
  emits: ['back'],
  methods: {
    getGroupClasses(name) {
      const baseClasses = {
        'Physical': 'bg-physical-50 border border-physical-200',
        'Mental': 'bg-mental-50 border border-mental-200',
        'Emotional': 'bg-emotional-50 border border-emotional-200',
        'Spiritual': 'bg-spiritual-50 border border-spiritual-200'
      }
      return baseClasses[name] || 'bg-gray-50 border border-gray-200'
    },
    getGroupTextClass(name) {
      const textClasses = {
        'Physical': 'text-physical-700',
        'Mental': 'text-mental-700',
        'Emotional': 'text-emotional-700',
        'Spiritual': 'text-spiritual-700'
      }
      return textClasses[name] || 'text-gray-700'
    }
  }
}
</script>
