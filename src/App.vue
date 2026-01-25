<template>
  <div class="min-h-screen bg-gradient-to-br from-brand-50 via-white to-spiritual-50">
    <WelcomeModal 
      :force-show="showWelcomeModal"
      @close="showWelcomeModal = false"
    />
    <transition name="page" mode="out-in">
      <HomeScreen 
        v-if="currentView === 'home'"
        key="home"
        @create-session="startNewSession"
        @open-session="openSession"
        @delete-session="deleteSession"
        @update-session-name="updateSessionName"
        @show-welcome="showWelcomeModal = true"
        :sessions="sessions"
      />
      <WordEntry
        v-else-if="currentView === 'word-entry'"
        key="word-entry"
        :existing-words="currentSession ? currentSession.initialWords : {}"
        :session-id="currentSession ? currentSession.id : null"
        @words-complete="onWordsComplete"
        @draft-update="onDraftUpdate"
        @back="handleWordEntryBack"
      />
      <Association
        v-else-if="currentView === 'association'"
        key="association"
        :groups="currentGroups"
        :initial-word-history="currentSession.wordHistory"
        :session-id="currentSession ? currentSession.id : null"
        @associations-complete="onAssociationsComplete"
        @back="handleAssociationBack"
      />
      <SessionDetail
        v-else-if="currentView === 'session-detail'"
        key="session-detail"
        :session="currentSession"
        @back="currentView = 'home'"
      />
    </transition>
  </div>
</template>

<script>
import HomeScreen from './components/HomeScreen.vue'
import WordEntry from './components/WordEntry.vue'
import Association from './components/Association.vue'
import SessionDetail from './components/SessionDetail.vue'
import WelcomeModal from './components/WelcomeModal.vue'
import { drafts } from './utils/storage.js'
import analytics from './utils/analytics.js'

export default {
  name: 'App',
  components: {
    HomeScreen,
    WordEntry,
    Association,
    SessionDetail,
    WelcomeModal
  },
  data() {
    return {
      currentView: 'home',
      sessions: [],
      currentSession: null,
      currentGroups: [],
      showWelcomeModal: false
    }
  },
  mounted() {
    this.loadSessions()
  },
  methods: {
    startNewSession() {
      const sessionId = Date.now()
      const createdAt = new Date().toISOString()
      this.currentSession = {
        id: sessionId,
        name: `Session ${new Date(createdAt).toLocaleDateString()}`,
        createdAt: createdAt,
        initialWords: {},
        wordHistory: [],
        associations: [],
        finalWord: null,
        lastModified: new Date().toISOString(),
        isDraft: true
      }
      // Check if there's an existing draft for any reason
      const existingDraft = drafts.load(sessionId)
      if (existingDraft && existingDraft.words) {
        this.currentSession.initialWords = existingDraft.words
      }
      analytics.sessionStart(sessionId)
      this.currentView = 'word-entry'
    },
    openSession(session) {
      this.currentSession = { ...session }
      
      if (session.finalWord) {
        // Completed session - show read-only detail view
        analytics.viewSessionDetail(session.id)
        this.currentView = 'session-detail'
      } else {
        // Check for draft data
        const draftData = drafts.load(session.id)
        if (draftData && draftData.words) {
          this.currentSession.initialWords = draftData.words
        }
        
        // Check if we have complete initial words to continue to association
        const hasCompleteWords = this.currentSession.initialWords && 
          Object.keys(this.currentSession.initialWords).length === 4 &&
          Object.values(this.currentSession.initialWords).every(arr => arr && arr.length === 8)
        
        // Track session resume
        const sessionStatus = session.isDraft ? 'draft' : 'in_progress'
        analytics.sessionResume(session.id, sessionStatus)
        
        if (hasCompleteWords && !session.isDraft) {
          // Has complete initial words, continue with association
          this.currentGroups = [
            { name: 'Physical', words: this.currentSession.initialWords.Physical || [] },
            { name: 'Mental', words: this.currentSession.initialWords.Mental || [] },
            { name: 'Emotional', words: this.currentSession.initialWords.Emotional || [] },
            { name: 'Spiritual', words: this.currentSession.initialWords.Spiritual || [] }
          ]
          this.currentView = 'association'
        } else {
          // Incomplete or draft - go to word entry
          this.currentView = 'word-entry'
        }
      }
    },
    handleWordEntryBack() {
      // Save current session as draft before going back
      if (this.currentSession && this.currentSession.isDraft) {
        this.saveDraftSession()
      }
      this.currentView = 'home'
    },
    handleAssociationBack() {
      analytics.navigationBack('association')
      this.currentView = 'home'
    },
    onDraftUpdate(draftData) {
      if (!this.currentSession) return
      
      // Update session with draft data
      this.currentSession.initialWords = draftData.words
      this.currentSession.lastModified = new Date().toISOString()
      this.currentSession.isDraft = true
      
      // Save to draft storage
      drafts.save(this.currentSession.id, {
        words: draftData.words,
        currentStep: draftData.currentStep
      })
      
      // Also save to sessions list
      this.saveDraftSession()
    },
    saveDraftSession() {
      const existingIndex = this.sessions.findIndex(s => s.id === this.currentSession.id)
      if (existingIndex >= 0) {
        this.sessions[existingIndex] = { ...this.currentSession }
      } else {
        this.sessions.push({ ...this.currentSession })
      }
      localStorage.setItem('alignment32-sessions', JSON.stringify(this.sessions))
    },
    onWordsComplete(words) {
      this.currentSession.initialWords = words
      this.currentSession.isDraft = false
      this.currentSession.lastModified = new Date().toISOString()
      this.currentSession.wordHistory = [{
        step: 0,
        stage: 'Initial Words',
        groups: [
          { name: 'Physical', words: words.Physical },
          { name: 'Mental', words: words.Mental },
          { name: 'Emotional', words: words.Emotional },
          { name: 'Spiritual', words: words.Spiritual }
        ]
      }]
      this.currentGroups = [
        { name: 'Physical', words: words.Physical },
        { name: 'Mental', words: words.Mental },
        { name: 'Emotional', words: words.Emotional },
        { name: 'Spiritual', words: words.Spiritual }
      ]
      
      // Clear draft since words are complete
      drafts.clear(this.currentSession.id)
      
      // Save session
      this.saveSession()
      
      this.currentView = 'association'
    },
    onAssociationsComplete(result) {
      this.currentSession.finalWord = result.finalWord
      this.currentSession.wordHistory = result.wordHistory
      this.currentSession.associations = result.associations
      this.currentSession.isDraft = false
      this.currentSession.lastModified = new Date().toISOString()
      
      // Clear any remaining draft
      drafts.clear(this.currentSession.id)
      
      // Track session completion
      const totalRounds = result.associations ? result.associations.length : 0
      analytics.sessionComplete(this.currentSession.id, totalRounds)
      
      this.saveSession()
      this.currentView = 'home'
    },
    saveSession() {
      const existingIndex = this.sessions.findIndex(s => s.id === this.currentSession.id)
      if (existingIndex >= 0) {
        this.sessions[existingIndex] = { ...this.currentSession }
      } else {
        this.sessions.push({ ...this.currentSession })
      }
      localStorage.setItem('alignment32-sessions', JSON.stringify(this.sessions))
    },
    deleteSession(sessionId) {
      const session = this.sessions.find(s => s.id === sessionId)
      const sessionStatus = session?.finalWord ? 'completed' : session?.isDraft ? 'draft' : 'in_progress'
      analytics.sessionDelete(sessionStatus)
      
      this.sessions = this.sessions.filter(s => s.id !== sessionId)
      localStorage.setItem('alignment32-sessions', JSON.stringify(this.sessions))
      // Also clear any draft
      drafts.clear(sessionId)
    },
    updateSessionName(sessionId, newName) {
      const session = this.sessions.find(s => s.id === sessionId)
      if (session) {
        session.name = newName
        session.lastModified = new Date().toISOString()
        localStorage.setItem('alignment32-sessions', JSON.stringify(this.sessions))
        analytics.sessionRename()
      }
    },
    loadSessions() {
      const saved = localStorage.getItem('alignment32-sessions')
      if (saved) {
        try {
          this.sessions = JSON.parse(saved)
        } catch (e) {
          console.warn('Failed to parse sessions:', e)
          this.sessions = []
        }
      }
    }
  }
}
</script>
