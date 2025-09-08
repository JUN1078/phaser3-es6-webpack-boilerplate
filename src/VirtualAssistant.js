// Virtual Assistant Core Class
export default class VirtualSalesAssistant {
    constructor() {
        this.isInitialized = false;
        this.isRecording = false;
        this.currentScenario = 'cold-call';
        this.sessionActive = false;
        this.speechSynthesis = window.speechSynthesis;
        this.speechRecognition = null;
        this.currentVoice = null;
        this.conversationHistory = [];
        this.speechRate = 1;
        this.speechPitch = 1;
        this.sessionStartTime = null;
        
        // Performance metrics
        this.metrics = {
            confidence: 75,
            engagement: 82,
            responseTime: 0,
            sessionDuration: 0
        };
        
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.initializeVoices();
            this.initializeSpeechRecognition();
            this.initializeAvatar();
            this.hideLoading();
            
            this.isInitialized = true;
            console.log('Virtual Sales Assistant initialized successfully');
            
            this.addMessage('ai', "Hello! I'm Sarah, your AI sales training assistant. I'm here to help you practice your sales skills through realistic role-play scenarios. Choose a scenario above and let's begin!");
            
        } catch (error) {
            console.error('Failed to initialize Virtual Sales Assistant:', error);
            this.hideLoading();
        }
    }

    initializeAvatar() {
        // Avatar interaction will be handled by event handlers
    }

    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'flex';
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
    }

    async initializeVoices() {
        return new Promise((resolve) => {
            const loadVoices = () => {
                const voices = this.speechSynthesis.getVoices();
                if (voices.length > 0) {
                    this.currentVoice = voices.find(voice => 
                        voice.name.includes('Female') || 
                        voice.name.includes('Samantha') ||
                        voice.name.includes('Karen') ||
                        voice.name.includes('Susan')
                    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
                    
                    resolve();
                } else {
                    setTimeout(loadVoices, 100);
                }
            };

            if (this.speechSynthesis.getVoices().length > 0) {
                loadVoices();
            } else {
                this.speechSynthesis.addEventListener('voiceschanged', loadVoices);
            }
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.speechRecognition = new SpeechRecognition();
            this.speechRecognition.continuous = false;
            this.speechRecognition.interimResults = false;
            this.speechRecognition.lang = 'en-US';

            this.speechRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chat-input').value = transcript;
                this.stopRecording();
            };

            this.speechRecognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopRecording();
            };

            this.speechRecognition.onend = () => {
                this.stopRecording();
            };
        }
    }

    speak(text) {
        if (!this.speechSynthesis || !this.currentVoice) return;
        
        this.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.currentVoice;
        utterance.rate = this.speechRate || 1;
        utterance.pitch = this.speechPitch || 1;
        utterance.volume = 0.8;
        
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) statusDot.style.background = '#FF6B6B';
        
        utterance.onend = () => {
            if (statusDot) statusDot.style.background = '#4CAF50';
        };
        
        this.speechSynthesis.speak(utterance);
    }

    addMessage(type, content) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        if (type === 'ai') {
            this.speak(content);
        }
        
        this.conversationHistory.push({ type, content, timestamp: Date.now() });
    }
}