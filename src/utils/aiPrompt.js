/**
 * Builds the "ask an AI" prompt for a completed session.
 * The template lives here (not in any URL) so it can be revised later
 * without breaking anything already shared.
 */

export const PROMPT_VERSION = 1

const CATEGORIES = ['Physical', 'Mental', 'Emotional', 'Spiritual']

const INTRO = `You are a thoughtful, grounded reflection partner. I have just completed an Alignment32 session and want your help understanding the result.

## How Alignment32 works
I wrote 32 words that matter to me: 8 in each of 4 dimensions — Physical (body, health, environment, actions), Mental (thoughts, knowledge, creativity, logic), Emotional (feelings, relationships, desires), Spiritual (purpose, meaning, connection, values). Then, round by round, groups were paired and I merged each pair of words into one new word that connects them for me. This repeated until a single word remained. Every association is my own choice, so the path matters as much as the destination. Group names after round 1 are abbreviations of the merged dimensions (for example PM = Physical + Mental).`

const ASKS = `## What I'd like from you
1. Reflect the final word back to me: what it seems to carry, given the words it grew from. Keep this short.
2. Trace the path: which original words and themes survived to the end, which dropped out early, and what that pattern may say about my current priorities.
3. Notice tensions and gaps: dimensions that faded fast, merges that look like a stretch, words that sound like "should" rather than "want".
4. Ask me 3–5 open questions that would help me go deeper.
5. Suggest 2–3 small, concrete practices or experiments for the coming weeks that express the final word.

Guidelines: Reply in the language my words are written in unless I ask otherwise. Be warm but direct; no flattery, no diagnoses, no clinical or esoteric labels. Treat your reading as a hypothesis for me to confirm or correct, not a verdict. If a word is ambiguous, ask what it means to me before building on it. Keep the whole reply under about 500 words, then offer to go deeper on any part.`

function formatDate(createdAt) {
  if (!createdAt) return ''
  const d = new Date(createdAt)
  if (isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

/**
 * Derive the category -> words map from the first word-history step
 * when a session object lacks initialWords (e.g. on the final-word screen).
 */
export function initialWordsFromHistory(wordHistory) {
  const first = wordHistory && wordHistory[0]
  if (!first || !first.groups) return {}
  const result = {}
  first.groups.forEach(g => {
    result[g.name] = [...g.words]
  })
  return result
}

function formatRound(round) {
  const lines = []
  const pairs = new Map()
  ;(round.associations || []).forEach(a => {
    const key = `${a.group1} + ${a.group2}`
    if (!pairs.has(key)) pairs.set(key, [])
    pairs.get(key).push(`- ${a.word1} + ${a.word2} = ${a.association}`)
  })
  const pairNames = [...pairs.keys()]
  lines.push(`${round.stage || `Round ${round.step}`} — ${pairNames.join(', ')}`)
  if (pairNames.length === 1) {
    lines.push(...pairs.get(pairNames[0]))
  } else {
    pairNames.forEach(name => {
      lines.push(`${name}:`)
      lines.push(...pairs.get(name))
    })
  }
  return lines.join('\n')
}

/**
 * @param {Object} session - { initialWords, associations, finalWord, createdAt }
 * @returns {string} Plain-text prompt ready to paste into any AI chat
 */
export function buildAiPrompt(session) {
  const date = formatDate(session.createdAt)
  const words = session.initialWords || {}
  const wordLines = CATEGORIES
    .map(c => `- ${c}: ${(words[c] || []).join(', ')}`)
    .join('\n')
  const rounds = (session.associations || []).map(formatRound).join('\n\n')

  return [
    INTRO,
    `## My session${date ? ` (${date})` : ''}\nFinal word: **${session.finalWord}**`,
    `### My 32 words\n${wordLines}`,
    `### My associations (word + word = the word I chose)\n${rounds}`,
    ASKS
  ].join('\n\n')
}

/**
 * Deep links that prefill the prompt into a chat composer.
 */
export const AI_PROVIDERS = [
  { id: 'chatgpt', label: 'ChatGPT', url: p => `https://chatgpt.com/?q=${encodeURIComponent(p)}` },
  { id: 'claude', label: 'Claude', url: p => `https://claude.ai/new?q=${encodeURIComponent(p)}` }
]
