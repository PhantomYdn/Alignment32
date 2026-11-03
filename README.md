# Alignment32 - Personal Word Alignment App

Distill 32 words that matter to you into the one word that matters most. A private, offline-capable self-reflection practice for the browser and phone.

**Try it:** https://alignment32.orienteer.org/

## About

Alignment32 is a structured alternative to freeform journaling. You write 8 words for each of 4 dimensions of your life: Physical, Mental, Emotional and Spiritual. The app then pairs the groups and asks you to merge each pair of words into a new word that connects them for you. Round by round the 32 words shrink to 16, 8, 4, 2 and finally 1. That final word, and the path that led to it, is a snapshot of what you are aligned around right now.

It is built for people who like concrete exercises over abstract reflection: run it once for a first discovery, then again every few months to see how your alignment shifts. Every merge is your own choice, so the journey says as much as the result.

When a session is complete you can hand the whole journey to an AI of your choice. The app builds a ready-made prompt with your 32 words, every association and the final word, and lets you copy it or open it directly in ChatGPT or Claude for a reflection, open questions and small practices to try.

Everything stays on your device. There is no account, no backend and nothing is sent anywhere unless you choose to paste the prompt somewhere.

## Demo

https://github.com/user-attachments/assets/db45ce17-b311-4ad9-ab45-84333e42e8ba

## How It Works

### The Process
1. **Word Entry**: Begin by entering 8 words for each of the 4 categories:
   - **Physical**: Words related to your body, health, and physical presence
   - **Mental**: Words related to your mind, thoughts, and intellectual pursuits
   - **Emotional**: Words related to your feelings, relationships, and emotional well-being
   - **Spiritual**: Words related to your purpose, values, and deeper meaning

2. **Association Phase**: The app guides you through multiple rounds of word association:
   - Round 1: Associate Physical words with Mental words, Emotional words with Spiritual words
   - Round 2: Merge the resulting groups
   - Round 3: If needed, continue until you reach a single final word

3. **Session Management**: 
   - All sessions are automatically saved to your browser's local storage
   - You can pause and resume sessions at any time
   - View completed sessions to see your full word journey

### Using the App

#### Starting a New Session
1. Click "Create New Session" from the home screen
2. Fill in all 32 words across the 4 categories (8 words each)
3. Click "Start Association Process" when all words are entered

#### During Association
1. You'll see word pairs from different categories
2. For each pair, create a new word or phrase that represents the connection between them
3. Continue through each round until you reach your final alignment word

#### Viewing Past Sessions
- Completed sessions appear on the home screen
- Click on any session to view the complete word journey
- See all associations and the progression from 32 words to your final alignment word

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd Alignment32
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Tech Stack
- **Frontend**: Vue 3 with Composition API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Storage**: Browser localStorage for session persistence

## Features
- ✅ Progressive word reduction from 32 to 1 word
- ✅ Session persistence and resume capability
- ✅ Complete word history tracking
- ✅ Read-only viewing of completed sessions
- ✅ Responsive design for desktop and mobile
- ✅ Intuitive step-by-step guidance
- ✅ "Ask an AI" prompt: copy or open your full journey in ChatGPT / Claude
- ✅ Installable PWA, works offline

## Data Privacy
All your words and sessions are stored locally in your browser. Nothing is sent to external servers, ensuring your personal word journey remains completely private.

## Contributing
This is a personal alignment tool. Feel free to fork and modify for your own use.

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
