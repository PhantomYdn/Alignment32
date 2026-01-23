<template>
  <div class="container mx-auto px-4 py-6 sm:py-10">
    <div class="max-w-4xl mx-auto">
      <!-- Header with logo -->
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-brand-600 via-brand-500 to-spiritual-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Alignment32
        </h1>
        <p class="text-gray-500 text-base sm:text-lg font-medium">Discover your core essence through word alignment</p>
      </div>
      
      <!-- Start New Session Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-brand-100/50 p-6 sm:p-8 mb-6 sm:mb-8 hover:shadow-soft-lg transition-shadow duration-300">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 tracking-tight">Start New Session</h2>
        <p class="text-base text-gray-600 mb-5 sm:mb-6 leading-relaxed">Begin a new alignment session by entering 32 words across 4 categories.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button 
            @click="$emit('create-session')"
            class="w-full sm:w-auto bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-95"
          >
            + Create New Session
          </button>
          <button 
            @click="$emit('show-welcome')"
            class="w-full sm:w-auto bg-white hover:bg-brand-50 text-brand-600 font-medium py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-200 text-sm sm:text-base border-2 border-brand-200 hover:border-brand-300"
          >
            How It Works
          </button>
        </div>
      </div>

      <!-- Sessions List Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100 p-6 sm:p-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-5 tracking-tight">Your Sessions</h2>
        
        <!-- Empty State -->
        <div v-if="sortedSessions.length === 0" class="text-center py-10 sm:py-14">
          <div class="mb-4 flex justify-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-brand-100 to-spiritual-100 flex items-center justify-center">
              <svg class="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p class="font-bold text-gray-700 mb-1 text-lg">No sessions yet</p>
          <p class="text-base text-gray-400">Create your first alignment session above</p>
        </div>
        
        <!-- Sessions List -->
        <div v-else class="space-y-3 sm:space-y-4">
          <div 
            v-for="session in sortedSessions" 
            :key="session.id"
            :class="[
              'bg-white rounded-xl p-4 sm:p-5 transition-all duration-200 relative group cursor-pointer',
              'border-2 hover:shadow-soft',
              getSessionBorderClass(session)
            ]"
            @click="$emit('open-session', session)"
          >
            <!-- Delete button -->
            <button
              @click.stop="confirmDelete(session)"
              class="absolute top-2 right-2 min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
              aria-label="Delete session"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 pr-8">
              <div class="flex-1 min-w-0">
                <!-- Session title (inline editable) and status -->
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="flex items-center gap-1.5 flex-1 min-w-0">
                    <input
                      v-if="editingSessionId === session.id"
                      ref="nameInput"
                      v-model="editingName"
                      type="text"
                      maxlength="50"
                      class="font-bold text-gray-800 text-sm sm:text-base bg-white border-2 border-brand-300 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-brand-200 min-w-0 flex-1"
                      @click.stop
                      @blur="saveSessionName(session)"
                      @keydown.enter="saveSessionName(session)"
                      @keydown.escape="cancelEditing"
                    />
                    <h3 
                      v-else
                      class="font-bold text-gray-800 text-sm sm:text-base truncate cursor-text hover:text-brand-600 transition-colors"
                      @click.stop="startEditingName(session)"
                      :title="session.name || `Session ${formatDate(session.createdAt)}`"
                    >
                      {{ session.name || `Session ${formatDate(session.createdAt)}` }}
                    </h3>
                    <button
                      v-if="editingSessionId !== session.id"
                      @click.stop="startEditingName(session)"
                      class="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                      aria-label="Edit session name"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0', getStatusClasses(session)]">
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

                <!-- Word preview (show first few words from session) -->
                <div v-if="getWordPreview(session).length > 0" class="mb-3">
                  <div class="flex flex-wrap gap-1.5">
                    <span 
                      v-for="(word, idx) in getWordPreview(session)" 
                      :key="idx"
                      class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                    >
                      {{ word }}
                    </span>
                    <span v-if="getWordCount(session) > 4" class="text-xs text-gray-400 self-center">
                      +{{ getWordCount(session) - 4 }} more
                    </span>
                  </div>
                </div>

                <!-- Draft progress -->
                <div v-if="session.isDraft" class="mb-3">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-xs font-medium text-gray-500">Progress:</span>
                    <span class="text-xs font-bold text-physical-600">{{ getDraftProgress(session) }}/32 words</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-physical-400 to-physical-500 h-1.5 rounded-full transition-all duration-500"
                      :style="{ width: `${(getDraftProgress(session) / 32) * 100}%` }"
                    ></div>
                  </div>
                </div>
                
                <!-- Final word (completed sessions) -->
                <div v-if="session.finalWord" class="mt-2">
                  <span class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-200/50">
                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-emerald-600">Final Word:</span>
                    <span class="font-bold text-emerald-700">{{ session.finalWord }}</span>
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
                <span class="text-xs text-gray-400 group-hover:text-brand-500 transition-colors font-medium">
                  {{ session.isDraft ? 'Continue editing' : session.finalWord ? 'View details' : 'Continue' }} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <teleport to="body">
      <transition name="fade">
        <div 
          v-if="sessionToDelete" 
          class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="sessionToDelete = null"
        >
          <div class="bg-white rounded-2xl shadow-soft-lg max-w-sm w-full p-6 animate-scale-in">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2 text-center">Delete Session?</h3>
            <p class="text-sm text-gray-600 mb-6 text-center">
              This will permanently delete this session and all its data. This action cannot be undone.
            </p>
            <div class="flex gap-3">
              <button
                @click="sessionToDelete = null"
                class="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                @click="deleteSession"
                class="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
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
  emits: ['create-session', 'open-session', 'delete-session', 'update-session-name', 'show-welcome'],
  data() {
    return {
      sessionToDelete: null,
      editingSessionId: null,
      editingName: ''
    }
  },
  computed: {
    sortedSessions() {
      return [...this.sessions].sort((a, b) => {
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
    getSessionBorderClass(session) {
      if (session.isDraft) {
        return 'border-physical-200 hover:border-physical-300'
      } else if (session.finalWord) {
        return 'border-emerald-200 hover:border-emerald-300'
      } else {
        return 'border-gray-200 hover:border-brand-300'
      }
    },
    getStatusClasses(session) {
      if (session.isDraft) {
        return 'bg-physical-100 text-physical-700'
      } else if (session.finalWord) {
        return 'bg-emerald-100 text-emerald-700'
      } else {
        return 'bg-brand-100 text-brand-700'
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
    },
    startEditingName(session) {
      this.editingSessionId = session.id
      this.editingName = session.name || `Session ${this.formatDate(session.createdAt)}`
      this.$nextTick(() => {
        if (this.$refs.nameInput) {
          this.$refs.nameInput.focus()
          this.$refs.nameInput.select()
        }
      })
    },
    saveSessionName(session) {
      const trimmedName = this.editingName.trim()
      if (trimmedName && trimmedName !== session.name) {
        this.$emit('update-session-name', session.id, trimmedName)
      }
      this.editingSessionId = null
      this.editingName = ''
    },
    cancelEditing() {
      this.editingSessionId = null
      this.editingName = ''
    },
    getWordPreview(session) {
      if (!session.initialWords) return []
      const allWords = Object.values(session.initialWords)
        .flat()
        .filter(word => word && word.trim())
      return allWords.slice(0, 4)
    },
    getWordCount(session) {
      if (!session.initialWords) return 0
      return Object.values(session.initialWords)
        .flat()
        .filter(word => word && word.trim()).length
    }
  }
}
</script>
