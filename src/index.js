// Import styles and modules
import './styles.css';
import VirtualSalesAssistant from './VirtualAssistant.js';
import { setupEventListeners } from './EventHandlers.js';
import VideoAvatar from './VideoAvatar.js';
import { addDemoButton } from './demo.js';

// Enhanced Virtual Assistant with full functionality
class EnhancedVirtualAssistant extends VirtualSalesAssistant {
    constructor() {
        super();
    }

    async init() {
        await super.init();
        
        // Setup event listeners after initialization
        setupEventListeners(this);
        
        // Add additional features
        this.initializeAdvancedFeatures();
    }

    initializeAdvancedFeatures() {
        // Initialize video avatar
        this.videoAvatar = new VideoAvatar('avatar-canvas');
        
        // Initialize video background or avatar
        this.initializeVideoAvatar();
        
        // Setup performance analytics
        this.initializeAnalytics();
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    initializeVideoAvatar() {
        const avatarCanvas = document.getElementById('avatar-canvas');
        
        // Add animated background
        avatarCanvas.style.background = `
            linear-gradient(-45deg, #667eea, #764ba2, #667eea, #764ba2),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')
        `;
        avatarCanvas.style.backgroundSize = '400% 400%, 20px 20px';
        avatarCanvas.style.animation = 'gradientShift 15s ease infinite';
        
        // Add CSS animation for gradient
        if (!document.getElementById('avatar-animations')) {
            const style = document.createElement('style');
            style.id = 'avatar-animations';
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%, 0 0; }
                    50% { background-position: 100% 50%, 10px 10px; }
                    100% { background-position: 0% 50%, 0 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeAnalytics() {
        // Track conversation metrics
        this.analytics = {
            totalSessions: 0,
            averageSessionLength: 0,
            mostPracticedScenario: 'cold-call',
            improvementAreas: []
        };
        
        // Load analytics from localStorage if available
        const savedAnalytics = localStorage.getItem('salesAssistantAnalytics');
        if (savedAnalytics) {
            this.analytics = { ...this.analytics, ...JSON.parse(savedAnalytics) };
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to send message
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                const sendBtn = document.getElementById('send-btn');
                if (sendBtn) sendBtn.click();
            }
            
            // Ctrl/Cmd + Space to toggle recording
            if ((e.ctrlKey || e.metaKey) && e.key === ' ') {
                e.preventDefault();
                const voiceBtn = document.getElementById('voice-btn');
                if (voiceBtn) voiceBtn.click();
            }
            
            // Escape to stop speech
            if (e.key === 'Escape') {
                this.speechSynthesis.cancel();
            }
        });
    }

    // Override addMessage to include analytics
    addMessage(type, content) {
        super.addMessage(type, content);
        
        // Track analytics
        if (type === 'user') {
            this.trackUserEngagement(content);
        }
    }

    trackUserEngagement(message) {
        // Simple sentiment analysis
        const positiveWords = ['yes', 'great', 'excellent', 'perfect', 'love', 'amazing', 'fantastic'];
        const negativeWords = ['no', 'bad', 'terrible', 'hate', 'awful', 'horrible'];
        
        const lowerMessage = message.toLowerCase();
        const positiveScore = positiveWords.filter(word => lowerMessage.includes(word)).length;
        const negativeScore = negativeWords.filter(word => lowerMessage.includes(word)).length;
        
        // Update engagement metric based on sentiment
        if (positiveScore > negativeScore) {
            this.metrics.engagement = Math.min(100, this.metrics.engagement + 2);
        } else if (negativeScore > positiveScore) {
            this.metrics.engagement = Math.max(0, this.metrics.engagement - 1);
        }
        
        // Save analytics
        this.saveAnalytics();
    }

    saveAnalytics() {
        localStorage.setItem('salesAssistantAnalytics', JSON.stringify(this.analytics));
    }

    // Enhanced speech with emotion
    speak(text, emotion = 'neutral') {
        if (!this.speechSynthesis || !this.currentVoice) return;
        
        this.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.currentVoice;
        
        // Adjust voice parameters based on emotion
        switch (emotion) {
            case 'excited':
                utterance.rate = this.speechRate * 1.1;
                utterance.pitch = this.speechPitch * 1.2;
                break;
            case 'calm':
                utterance.rate = this.speechRate * 0.9;
                utterance.pitch = this.speechPitch * 0.9;
                break;
            case 'professional':
                utterance.rate = this.speechRate;
                utterance.pitch = this.speechPitch;
                break;
            default:
                utterance.rate = this.speechRate || 1;
                utterance.pitch = this.speechPitch || 1;
        }
        
        utterance.volume = 0.8;
        
        // Visual feedback
        const statusDot = document.querySelector('.status-dot');
        
        if (statusDot) statusDot.style.background = '#FF6B6B';
        
        // Start video avatar speaking animation
        if (this.videoAvatar) {
            this.videoAvatar.startSpeaking();
            this.videoAvatar.showEmotion(emotion);
        }
        
        utterance.onend = () => {
            if (statusDot) statusDot.style.background = '#4CAF50';
            
            // Stop video avatar speaking animation
            if (this.videoAvatar) {
                this.videoAvatar.stopSpeaking();
            }
        };
        
        this.speechSynthesis.speak(utterance);
    }


    // Method to simulate video call features
    toggleVideoMode() {
        const avatarContainer = document.querySelector('.avatar-container');
        const isVideoMode = avatarContainer.classList.contains('video-mode');
        
        if (isVideoMode) {
            avatarContainer.classList.remove('video-mode');
        } else {
            avatarContainer.classList.add('video-mode');
            this.initializeVideoFeatures();
        }
    }

    initializeVideoFeatures() {
        // Simulate video features like background blur, filters, etc.
        const avatarCanvas = document.getElementById('avatar-canvas');
        
        // Add video-like effects
        avatarCanvas.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
        avatarCanvas.style.boxShadow = 'inset 0 0 50px rgba(102, 126, 234, 0.1)';
        
        // Add subtle movement simulation
        let moveCount = 0;
        const moveInterval = setInterval(() => {
            const x = Math.sin(moveCount * 0.1) * 2;
            const y = Math.cos(moveCount * 0.15) * 1;
            avatarCanvas.style.transform = `translate(${x}px, ${y}px)`;
            moveCount++;
            
            if (moveCount > 1000) {
                clearInterval(moveInterval);
                avatarCanvas.style.transform = 'translate(0, 0)';
            }
        }, 100);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add some additional UI enhancements
    addUIEnhancements();
    
    // Initialize the enhanced virtual assistant
    window.virtualAssistant = new EnhancedVirtualAssistant();
    
    console.log('Virtual Sales Assistant with TTS and Video features loaded successfully!');
});

function addUIEnhancements() {
    // Add tooltips
    const tooltips = [
        { selector: '#voice-btn', text: 'Click to start/stop voice recording (Ctrl+Space)' },
        { selector: '#send-btn', text: 'Send message (Ctrl+Enter)' },
        { selector: '#avatar-canvas', text: 'Click to hear a greeting' },
        { selector: '#scenario-select', text: 'Choose different sales scenarios to practice' }
    ];
    
    tooltips.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.title = text;
        }
    });
    
    // Add demo button
    setTimeout(() => {
        if (window.virtualAssistant) {
            addDemoButton(window.virtualAssistant);
        }
    }, 1000);
    
    // Add keyboard shortcuts info
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-size: 12px; z-index: 1000;">
            <strong>Keyboard Shortcuts:</strong><br>
            Ctrl+Enter: Send message<br>
            Ctrl+Space: Toggle recording<br>
            Escape: Stop speech<br><br>
            <strong>Features:</strong><br>
            • AI Sales Role-Play<br>
            • Text-to-Speech<br>
            • Voice Recognition<br>
            • Animated Avatar<br>
            • Performance Metrics
        </div>
    `;
    document.body.appendChild(shortcutsInfo);
    
    // Hide shortcuts info after 8 seconds
    setTimeout(() => {
        shortcutsInfo.style.opacity = '0';
        shortcutsInfo.style.transition = 'opacity 1s';
        setTimeout(() => shortcutsInfo.remove(), 1000);
    }, 8000);
}

// Export for potential module use
export default EnhancedVirtualAssistant;