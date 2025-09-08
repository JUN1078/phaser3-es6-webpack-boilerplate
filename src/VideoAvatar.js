// Video Avatar Enhancement for Virtual Assistant
export class VideoAvatar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isInitialized = false;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Create video-like avatar interface
        this.createAvatarInterface();
        this.setupAnimations();
        
        this.isInitialized = true;
    }
    
    createAvatarInterface() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create main avatar display
        const avatarDisplay = document.createElement('div');
        avatarDisplay.className = 'avatar-display';
        avatarDisplay.innerHTML = `
            <div class="avatar-face">
                <div class="avatar-eyes">
                    <div class="eye left-eye">
                        <div class="pupil"></div>
                    </div>
                    <div class="eye right-eye">
                        <div class="pupil"></div>
                    </div>
                </div>
                <div class="avatar-mouth">
                    <div class="mouth-shape"></div>
                </div>
            </div>
            <div class="avatar-background">
                <div class="bg-particle"></div>
                <div class="bg-particle"></div>
                <div class="bg-particle"></div>
                <div class="bg-particle"></div>
                <div class="bg-particle"></div>
            </div>
        `;
        
        this.container.appendChild(avatarDisplay);
        
        // Add avatar-specific styles
        this.addAvatarStyles();
    }
    
    addAvatarStyles() {
        if (document.getElementById('avatar-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'avatar-styles';
        styles.textContent = `
            .avatar-display {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .avatar-face {
                position: relative;
                width: 120px;
                height: 140px;
                background: linear-gradient(145deg, #f0f2f5, #e1e8ed);
                border-radius: 50% 50% 45% 45%;
                box-shadow: 
                    inset 5px 5px 10px rgba(0,0,0,0.1),
                    inset -5px -5px 10px rgba(255,255,255,0.8);
                z-index: 2;
            }
            
            .avatar-eyes {
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 20px;
            }
            
            .eye {
                width: 16px;
                height: 16px;
                background: white;
                border-radius: 50%;
                position: relative;
                box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            }
            
            .pupil {
                width: 8px;
                height: 8px;
                background: #333;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: all 0.3s ease;
            }
            
            .avatar-mouth {
                position: absolute;
                bottom: 35%;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .mouth-shape {
                width: 20px;
                height: 10px;
                background: #ff6b6b;
                border-radius: 0 0 20px 20px;
                transition: all 0.3s ease;
            }
            
            .avatar-background {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 1;
            }
            
            .bg-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: float-particle 6s ease-in-out infinite;
            }
            
            .bg-particle:nth-child(1) {
                top: 20%;
                left: 15%;
                animation-delay: 0s;
            }
            
            .bg-particle:nth-child(2) {
                top: 60%;
                left: 80%;
                animation-delay: 1.5s;
            }
            
            .bg-particle:nth-child(3) {
                top: 80%;
                left: 25%;
                animation-delay: 3s;
            }
            
            .bg-particle:nth-child(4) {
                top: 30%;
                left: 70%;
                animation-delay: 4.5s;
            }
            
            .bg-particle:nth-child(5) {
                top: 50%;
                left: 50%;
                animation-delay: 2s;
            }
            
            @keyframes float-particle {
                0%, 100% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-20px) scale(1.2);
                    opacity: 0.8;
                }
            }
            
            .speaking .mouth-shape {
                animation: speak 0.5s ease-in-out infinite alternate;
            }
            
            @keyframes speak {
                0% {
                    height: 10px;
                    width: 20px;
                }
                100% {
                    height: 15px;
                    width: 25px;
                }
            }
            
            .blinking .eye {
                animation: blink 3s ease-in-out infinite;
            }
            
            @keyframes blink {
                0%, 90%, 100% {
                    height: 16px;
                }
                95% {
                    height: 2px;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    setupAnimations() {
        // Auto-blink animation
        setInterval(() => {
            this.blink();
        }, 3000 + Math.random() * 2000);
        
        // Random eye movements
        setInterval(() => {
            this.moveEyes();
        }, 2000 + Math.random() * 3000);
    }
    
    blink() {
        const face = this.container.querySelector('.avatar-face');
        if (face) {
            face.classList.add('blinking');
            setTimeout(() => {
                face.classList.remove('blinking');
            }, 200);
        }
    }
    
    moveEyes() {
        const pupils = this.container.querySelectorAll('.pupil');
        const movements = [
            { x: -2, y: -2 },
            { x: 2, y: -2 },
            { x: 0, y: 2 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 }
        ];
        
        const movement = movements[Math.floor(Math.random() * movements.length)];
        
        pupils.forEach(pupil => {
            pupil.style.transform = `translate(calc(-50% + ${movement.x}px), calc(-50% + ${movement.y}px))`;
        });
        
        // Return to center after a moment
        setTimeout(() => {
            pupils.forEach(pupil => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
        }, 1000);
    }
    
    startSpeaking() {
        const face = this.container.querySelector('.avatar-face');
        if (face) {
            face.classList.add('speaking');
            this.isAnimating = true;
        }
    }
    
    stopSpeaking() {
        const face = this.container.querySelector('.avatar-face');
        if (face) {
            face.classList.remove('speaking');
            this.isAnimating = false;
        }
    }
    
    showEmotion(emotion) {
        const mouth = this.container.querySelector('.mouth-shape');
        const eyes = this.container.querySelectorAll('.eye');
        
        if (!mouth || !eyes.length) return;
        
        // Reset previous emotions
        mouth.style.borderRadius = '0 0 20px 20px';
        mouth.style.transform = 'none';
        eyes.forEach(eye => {
            eye.style.transform = 'none';
        });
        
        switch (emotion) {
            case 'happy':
                mouth.style.borderRadius = '20px 20px 0 0';
                mouth.style.transform = 'rotate(180deg)';
                break;
            case 'surprised':
                mouth.style.borderRadius = '50%';
                mouth.style.width = '15px';
                mouth.style.height = '15px';
                eyes.forEach(eye => {
                    eye.style.transform = 'scale(1.3)';
                });
                break;
            case 'thinking':
                mouth.style.transform = 'rotate(-10deg)';
                eyes.forEach((eye, index) => {
                    if (index === 0) eye.style.transform = 'translateY(-2px)';
                });
                break;
            default:
                // neutral expression
                break;
        }
        
        // Return to neutral after 2 seconds
        setTimeout(() => {
            mouth.style.borderRadius = '0 0 20px 20px';
            mouth.style.transform = 'none';
            mouth.style.width = '20px';
            mouth.style.height = '10px';
            eyes.forEach(eye => {
                eye.style.transform = 'none';
            });
        }, 2000);
    }
    
    // Simulate video call effects
    addVideoEffects() {
        const display = this.container.querySelector('.avatar-display');
        if (display) {
            display.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
            display.style.background = 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
        }
    }
    
    removeVideoEffects() {
        const display = this.container.querySelector('.avatar-display');
        if (display) {
            display.style.filter = 'none';
            display.style.background = 'none';
        }
    }
}

export default VideoAvatar;