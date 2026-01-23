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
          + Create New Session
        </button>
      </div>

      <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-5 sm:p-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">Your Sessions</h2>
        <div v-if="sortedSessions.length === 0" class="text-gray-500 text-center py-8 sm:py-12 text-sm sm:text-base">
          <div class="text-5xl mb-4 opacity-50">
            <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="font-medium">No sessions yet</p>
          <p class="text-sm text-gray-400 mt-1">Create your first alignment session above.</p>
        </div>
        <div v-else class="space-y-3 sm:space-y-4">
          <div 
            v-for="session in sortedSessions" 
            :key="session.id"
            :class="[
              'bg-white border-2 rounded-xl p-4 sm:p-5 transition-all duration-200 relative group',
              session.isDraft 
                ? 'border-amber-200 hover:border-amber-300' 
                : session.finalWord 
                  ? 'border-green-200 hover:border-green-300' 
                  : 'border-gray-200 hover:border-blue-300',
              'hover:shadow-md cursor-pointer'
            ]"
            @click="$emit('open-session', session)"
          >
            <!-- Delete button -->
            <button
              @click.stop="confirmDelete(session)"
              class="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="Delete session"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 pr-8">
              <div class="flex-1 min-w-0">
                <!-- Session title and status -->
                <div class="flex items-center gap-2 mb-1.5">
                  <h3 class="font-bold text-gray-800 text-sm sm:text-base">
                    Session {{ formatDate(session.createdAt) }}
                  </h3>
                  <span :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    getStatusClasses(session)
                  ]">
                    {{ getStatusText(session) }}
                  </span>
                </div>
                
                <!-- Timestamps -->
                <p class="text-xs text-gray-400 mb-3">
                  <span v-if="session.isDraft && session.lastModified">
                    Last edited {{ formatRelativeTime(session.lastModified) }}
                  </span>
                  <span v-else>
                    Created {{ formatDateTime(session.createdAt) }}
                  </span>
                </p>

                <!-- Draft progress -->
                <div v-if="session.isDraft" class="mb-3">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-xs font-medium text-gray-600">Progress:</span>
                    <span class="text-xs font-bold text-amber-600">{{ getDraftProgress(session) }}/32 words</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      class="bg-gradient-to-r from-amber-400 to-amber-500 h-1.5 rounded-full transition-all duration-300"
                      :style="{ width: `${(getDraftProgress(session) / 32) * 100}%` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Final word (completed sessions) -->
                <div v-if="session.finalWord" class="mt-2">
                  <span class="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-green-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Final Word:</span>
                    <span class="font-bold">{{ session.finalWord }}</span>
                  </span>
                </div>

                <!-- Word history info (non-draft, non-completed) -->
                <div v-else-if="!session.isDraft && session.wordHistory && session.wordHistory.length > 0" class="mt-2">
                  <p class="text-xs text-gray-500">
                    {{ getTotalWordsCount(session) }} words through {{ session.wordHistory.length }} stages
                  </p>
                </div>
              </div>

              <!-- Action hint -->
              <div class="text-right flex-shrink-0 hidden sm:block">
                <span class="text-xs text-gray-400 group-hover:text-indigo-500 transition-colors">
                  {{ session.isDraft ? 'Continue editing' : session.finalWord ? 'View details' : 'Continue' }} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <transition name="fade">
      <div 
        v-if="sessionToDelete" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="sessionToDelete = null"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-2">Delete Session?</h3>
          <p class="text-sm text-gray-600 mb-4">
            This will permanently delete this session and all its data. This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button
              @click="sessionToDelete = null"
              class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteSession"
              class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
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
  emits: ['create-session', 'open-session', 'delete-session'],
  data() {
    return {
      sessionToDelete: null
    }
  },
  computed: {
    sortedSessions() {
      return [...this.sessions].sort((a, b) => {
        // Sort by lastModified or createdAt, newest first
        const dateA = new Date(a.lastModified || a.createdAt)
        const dateB = new Date(b.lastModified || b.createdAt)
        return dateB - dateA
      })
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString()
    },
    formatDateTime(dateStr) {
      return new Date(dateStr).toLocaleString()
    },
    formatRelativeTime(dateStr) {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      
      if (diffMins < 1) return 'just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return this.formatDate(dateStr)
    },
    getTotalWordsCount(session) {
      if (!session.wordHistory || session.wordHistory.length === 0) return 0
      return session.wordHistory[0].groups.reduce((total, group) => total + group.words.length, 0)
    },
    getDraftProgress(session) {
      if (!session.initialWords) return 0
      return Object.values(session.initialWords)
        .flat()
        .filter(word => word && word.trim() !== '').length
    },
    getStatusClasses(session) {
      if (session.isDraft) {
        return 'bg-amber-100 text-amber-700 border border-amber-200'
      } else if (session.finalWord) {
        return 'bg-green-100 text-green-700 border border-green-200'
      } else {
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      }
    },
    getStatusText(session) {
      if (session.isDraft) return 'Draft'
      if (session.finalWord) return 'Completed'
      return 'In Progress'
    },
    confirmDelete(session) {
      this.sessionToDelete = session
    },
    deleteSession() {
      if (this.sessionToDelete) {
        this.$emit('delete-session', this.sessionToDelete.id)
        this.sessionToDelete = null
      }
    }
  }
}
</script>
