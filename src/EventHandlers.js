// Event Handlers for Virtual Assistant
import { salesScenarios, generateAIResponse } from './SalesScenarios.js';

export function setupEventListeners(assistant) {
    // Chat input and send button
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const scenarioSelect = document.getElementById('scenario-select');
    
    // Session controls
    const startBtn = document.getElementById('start-session');
    const pauseBtn = document.getElementById('pause-session');
    const resetBtn = document.getElementById('reset-session');
    
    // Voice controls
    const speechRate = document.getElementById('speech-rate');
    const speechPitch = document.getElementById('speech-pitch');

    // Send message
    sendBtn.addEventListener('click', () => sendMessage(assistant));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(assistant);
        }
    });

    // Voice recording
    voiceBtn.addEventListener('click', () => toggleRecording(assistant));

    // Scenario selection
    scenarioSelect.addEventListener('change', (e) => {
        assistant.currentScenario = e.target.value;
        updateScenario(assistant);
    });

    // Session controls
    startBtn.addEventListener('click', () => startSession(assistant));
    pauseBtn.addEventListener('click', () => pauseSession(assistant));
    resetBtn.addEventListener('click', () => resetSession(assistant));

    // Voice settings
    speechRate.addEventListener('input', (e) => {
        assistant.speechRate = parseFloat(e.target.value);
    });

    speechPitch.addEventListener('input', (e) => {
        assistant.speechPitch = parseFloat(e.target.value);
    });

    // Avatar interaction
    const avatarCanvas = document.getElementById('avatar-canvas');
    avatarCanvas.addEventListener('click', () => playGreeting(assistant));
}

function sendMessage(assistant) {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    assistant.addMessage('user', message);
    input.value = '';

    setTimeout(() => {
        const response = generateAIResponse(message, assistant.currentScenario);
        assistant.addMessage('ai', response);
        updateMetrics(assistant);
    }, 500 + Math.random() * 1000);
}

function toggleRecording(assistant) {
    if (!assistant.speechRecognition) {
        alert('Speech recognition is not supported in your browser.');
        return;
    }

    if (assistant.isRecording) {
        stopRecording(assistant);
    } else {
        startRecording(assistant);
    }
}

function startRecording(assistant) {
    assistant.isRecording = true;
    const voiceBtn = document.getElementById('voice-btn');
    voiceBtn.classList.add('recording');
    voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    
    assistant.speechRecognition.start();
}

function stopRecording(assistant) {
    assistant.isRecording = false;
    const voiceBtn = document.getElementById('voice-btn');
    voiceBtn.classList.remove('recording');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    
    if (assistant.speechRecognition) {
        assistant.speechRecognition.stop();
    }
}

function updateScenario(assistant) {
    const scenario = salesScenarios[assistant.currentScenario];
    const contextMessage = `Great! Let's practice ${scenario.name}. ${scenario.context} I'll play the role of your prospect. Ready when you are!`;
    
    assistant.addMessage('ai', contextMessage);
}

function startSession(assistant) {
    assistant.sessionActive = true;
    const startBtn = document.getElementById('start-session');
    startBtn.innerHTML = '<i class="fas fa-play"></i> Session Active';
    startBtn.disabled = true;
    
    assistant.addMessage('ai', `Perfect! Let's begin our ${salesScenarios[assistant.currentScenario].name} practice session. Remember, I'm your prospect now. Go ahead and start!`);
    
    assistant.sessionStartTime = Date.now();
}

function pauseSession(assistant) {
    assistant.sessionActive = false;
    assistant.addMessage('ai', "Session paused. Take a moment to review your approach. Click 'Start Session' when you're ready to continue.");
    
    const startBtn = document.getElementById('start-session');
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume Session';
    startBtn.disabled = false;
}

function resetSession(assistant) {
    assistant.sessionActive = false;
    assistant.conversationHistory = [];
    
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Session reset! Choose a scenario above and click 'Start Session' when you're ready to practice.</p>
            </div>
        </div>
    `;
    
    const startBtn = document.getElementById('start-session');
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start Session';
    startBtn.disabled = false;
    
    assistant.metrics = {
        confidence: 75,
        engagement: 82,
        responseTime: 0,
        sessionDuration: 0
    };
    updateMetricsDisplay(assistant);
}

function updateMetrics(assistant) {
    assistant.metrics.confidence = Math.min(100, assistant.metrics.confidence + Math.random() * 10 - 3);
    assistant.metrics.engagement = Math.min(100, assistant.metrics.engagement + Math.random() * 8 - 2);
    
    if (assistant.sessionStartTime) {
        assistant.metrics.sessionDuration = (Date.now() - assistant.sessionStartTime) / 1000 / 60;
    }
    
    updateMetricsDisplay(assistant);
}

function updateMetricsDisplay(assistant) {
    const confidenceFill = document.querySelector('.metric:nth-child(1) .metric-fill');
    const confidenceValue = document.querySelector('.metric:nth-child(1) .metric-value');
    const engagementFill = document.querySelector('.metric:nth-child(2) .metric-fill');
    const engagementValue = document.querySelector('.metric:nth-child(2) .metric-value');
    
    if (confidenceFill && confidenceValue) {
        confidenceFill.style.width = `${assistant.metrics.confidence}%`;
        confidenceValue.textContent = `${Math.round(assistant.metrics.confidence)}%`;
    }
    
    if (engagementFill && engagementValue) {
        engagementFill.style.width = `${assistant.metrics.engagement}%`;
        engagementValue.textContent = `${Math.round(assistant.metrics.engagement)}%`;
    }
}

function playGreeting(assistant) {
    const greetings = [
        "Hello! Ready to practice your sales skills?",
        "Hi there! Let's work on your sales technique together.",
        "Welcome! I'm excited to help you improve your sales performance.",
        "Great to see you! Which sales scenario would you like to practice today?"
    ];
    
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    assistant.speak(greeting);
}