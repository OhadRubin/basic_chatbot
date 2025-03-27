# Pirate Coding Assistant

A chatbot application that talks like a pirate while providing coding assistance, built with React and the OpenAI API.

## Features

- ⚛️ React with TypeScript
- 🤖 OpenAI API integration
- 🏴‍☠️ Pirate-themed coding assistant
- 🎨 Tailwind CSS for styling
- 📱 Responsive design

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the development server:
   ```
   npm start
   ```

Your app will be running at http://localhost:3000

## Usage

1. Type your coding question in the input field
2. Press Send or hit Enter
3. The pirate coding assistant will respond with helpful coding advice in pirate-speak!

## Development

- Start the development server:
  ```
  npm start
  ```
- Build for production:
  ```
  npm run build
  ```
- Deploy to GitHub Pages:
  ```
  npm run deploy
  ```

## Customization

- Modify the ChatBot component in `src/components/ChatBot.tsx`
- Change the pirate theme by updating the instructions in the OpenAI API call
- Customize Tailwind CSS in `tailwind.config.js`

## License

MIT