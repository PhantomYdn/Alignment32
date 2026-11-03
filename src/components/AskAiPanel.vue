<template>
  <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6">
    <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-1 tracking-tight">Ask an AI about this</h2>
    <p class="text-sm text-gray-500 mb-4 leading-relaxed">
      Get a reflection on your final word and the path to it. The prompt includes your 32 words and every association. Nothing is sent anywhere until you paste it.
    </p>

    <div class="flex flex-col sm:flex-row gap-3">
      <button
        ref="copyButton"
        @click="copyPrompt"
        class="flex-1 min-h-[44px] px-5 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold shadow-md hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
      >
        {{ copied ? 'Copied!' : 'Copy prompt' }}
      </button>
      <a
        v-for="provider in providers"
        :key="provider.id"
        :href="provider.url(prompt)"
        target="_blank"
        rel="noopener"
        @click="trackOpen(provider.id)"
        class="flex-1 min-h-[44px] px-5 py-3 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 hover:border-brand-200 transition-all duration-200 flex items-center justify-center gap-2"
      >
        Open in {{ provider.label }}
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <button
      @click="showPrompt = !showPrompt"
      class="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
      :aria-expanded="showPrompt"
    >
      {{ showPrompt ? 'Hide prompt' : 'Show prompt' }}
    </button>
    <pre
      v-if="showPrompt"
      class="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto font-mono"
    >{{ prompt }}</pre>
  </div>
</template>

<script>
import analytics from '../utils/analytics.js'
import { buildAiPrompt, AI_PROVIDERS } from '../utils/aiPrompt.js'

export default {
  name: 'AskAiPanel',
  props: {
    session: {
      type: Object,
      required: true
    },
    fromScreen: {
      type: String,
      default: 'session-detail'
    }
  },
  data() {
    return {
      copied: false,
      showPrompt: false,
      providers: AI_PROVIDERS
    }
  },
  computed: {
    prompt() {
      return buildAiPrompt(this.session)
    }
  },
  methods: {
    async copyPrompt() {
      try {
        await navigator.clipboard.writeText(this.prompt)
      } catch (e) {
        const el = document.createElement('textarea')
        el.value = this.prompt
        el.setAttribute('readonly', '')
        el.style.position = 'fixed'
        el.style.opacity = '0'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      this.copied = true
      analytics.aiPromptCopied(this.fromScreen)
      setTimeout(() => { this.copied = false }, 2000)
    },
    trackOpen(provider) {
      analytics.aiOpened(provider, this.fromScreen)
    }
  }
}
</script>
