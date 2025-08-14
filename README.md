# AI Chatbot

A modern, intelligent chatbot that can have conversations like ChatGPT using real AI APIs.

## Features

- 🤖 **Real AI Integration**: Powered by advanced language models
- 💬 **Intelligent Conversations**: Context-aware responses
- 🎨 **Modern UI**: Beautiful, responsive design
- 📱 **Mobile Friendly**: Works on all devices
- ⚡ **Fast Responses**: Quick AI-powered replies
- 🔄 **Fallback System**: Smart responses when API is unavailable
- Live Link : https://chatbot-ri1bovvit-pranavs-projects-094f6776.vercel.app/

## Setup Instructions

### Option 1: Hugging Face API (Free)

1. Go to [Hugging Face](https://huggingface.co/)
2. Create a free account
3. Go to your profile → Access Tokens
4. Create a new token
5. Replace `hf_xxx` in `script.js` with your actual token

### Option 2: OpenAI API (Paid but more powerful)

1. Go to [OpenAI](https://platform.openai.com/)
2. Create an account and get an API key
3. Replace the API configuration in `script.js` with:

```javascript
const API_URL = "https://api.openai.com/v1/chat/completions";
const response = await fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userMessage}],
        max_tokens: 150
    })
});
```

### Option 3: Use Without API (Current Setup)

The chatbot currently works with intelligent keyword-based responses. It will:
- Respond to greetings, questions, and common phrases
- Provide helpful information
- Engage in meaningful conversations
- Work offline without any API keys

## How to Use

1. Open `index.html` in your web browser
2. Click the chat button in the bottom right
3. Type your message and press Enter or click Send
4. The AI will respond intelligently to your input

## Customization

- **Responses**: Edit the `getIntelligentResponse()` function to add custom responses
- **Styling**: Modify `style.css` to change colors, fonts, and layout
- **Behavior**: Adjust timing and animations in `script.js`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

- **Chatbot not opening**: Check if JavaScript is enabled
- **No responses**: Check browser console for errors
- **API errors**: Verify your API key and internet connection

## License

Free to use and modify for personal and commercial projects. 
