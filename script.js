const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Add welcome message when chatbot is opened
const addWelcomeMessage = () => {
    const welcomeMessages = [
        "Hello! I'm your AI assistant powered by advanced language models. How can I help you today?",
        "Hi there! I'm an AI chatbot that can answer questions, help with tasks, and have intelligent conversations. What would you like to know?",
        "Welcome! I'm your AI companion ready to assist you with any questions, explanations, or creative tasks."
    ];
    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    // Replace the default message with a random welcome message
    const firstMessage = chatbox.querySelector(".chat.incoming p");
    if (firstMessage) {
        firstMessage.textContent = randomWelcome;
    }
};

// Call welcome message function when page loads
document.addEventListener("DOMContentLoaded", addWelcomeMessage);

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    
    try {
        // Using a free AI API service (Hugging Face Inference API)
        const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer hf_xxx" // This is a placeholder - you'll need to get a free token
            },
            body: JSON.stringify({
                inputs: userMessage,
                options: {
                    wait_for_model: true
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0].generated_text) {
                messageElement.classList.remove("thinking");
                messageElement.textContent = data[0].generated_text;
            } else {
                throw new Error("Invalid response format");
            }
        } else {
            throw new Error("API request failed");
        }
    } catch (error) {
        console.error("AI API Error:", error);
        
        // Fallback to intelligent responses based on keywords
        messageElement.classList.remove("thinking");
        const intelligentResponse = getIntelligentResponse(userMessage);
        messageElement.textContent = intelligentResponse;
    }
    
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const getIntelligentResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        return "Hello! It's great to meet you. How can I assist you today?";
    }
    
    // Question responses
    if (message.includes("how are you")) {
        return "I'm doing well, thank you for asking! I'm here and ready to help you with whatever you need.";
    }
    
    if (message.includes("what is your name")) {
        return "I'm an AI assistant, you can call me ChatBot! I'm here to help you with questions and tasks.";
    }
    
    if (message.includes("help")) {
        return "I'm here to help! I can answer questions, explain concepts, help with writing, solve problems, and much more. What do you need assistance with?";
    }
    
    if (message.includes("weather")) {
        return "I can't check real-time weather, but I can help you understand weather concepts or help you find weather information online!";
    }
    
    if (message.includes("time")) {
        return "I can't tell you the exact current time, but I can help you with time-related calculations or explain time concepts!";
    }
    
    if (message.includes("thank")) {
        return "You're very welcome! I'm glad I could help. Is there anything else you'd like to know or discuss?";
    }
    
    if (message.includes("bye") || message.includes("goodbye")) {
        return "Goodbye! It was nice chatting with you. Feel free to come back anytime if you have more questions!";
    }
    
    // Educational responses
    if (message.includes("explain") || message.includes("what is") || message.includes("define")) {
        return "I'd be happy to explain that! Could you provide more specific details about what you'd like me to explain?";
    }
    
    if (message.includes("how to") || message.includes("steps")) {
        return "I can help you with step-by-step instructions! Please let me know what specific process or task you need help with.";
    }
    
    if (message.includes("example")) {
        return "I'd be glad to provide examples! What concept or topic would you like me to give examples for?";
    }
    
    // Creative responses
    if (message.includes("story") || message.includes("write")) {
        return "I'd love to help you with creative writing! What kind of story or content would you like me to help you create?";
    }
    
    if (message.includes("joke") || message.includes("funny")) {
        return "I'd be happy to share some humor! What type of jokes do you enjoy?";
    }
    
    // Default intelligent responses
    const defaultResponses = [
        "That's an interesting topic! I'd love to learn more about what you're thinking.",
        "I understand what you're saying. Could you elaborate a bit more so I can provide a better response?",
        "That's a great point! What aspects of this would you like to explore further?",
        "I'm curious about your thoughts on this. Can you tell me more?",
        "This is fascinating! I'd like to understand your perspective better.",
        "I appreciate you sharing that with me. How can I best assist you with this topic?",
        "That's a thoughtful question! Let me help you explore this further.",
        "I'm here to help you dive deeper into this subject. What specific aspects interest you most?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) {
        // Add visual feedback for empty message
        chatInput.style.border = "2px solid #ff4444";
        setTimeout(() => {
            chatInput.style.border = "none";
        }, 1000);
        return;
    }

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        const thinkingP = incomingChatLi.querySelector("p");
        thinkingP.classList.add("thinking");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));