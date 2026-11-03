# Alignment32 - Personal Word Alignment App

A Vue 3 web application that guides users through a systematic word alignment process to discover their personal core values through structured word association.

## About

Alignment32 helps users discover their personal alignment through a structured word reduction process. Starting with 32 meaningful words across 4 life categories, users progressively merge and associate words until they reach a single word that represents their core alignment.

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

## Data Privacy
All your words and sessions are stored locally in your browser. Nothing is sent to external servers, ensuring your personal word journey remains completely private.

## Contributing
This is a personal alignment tool. Feel free to fork and modify for your own use.

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
