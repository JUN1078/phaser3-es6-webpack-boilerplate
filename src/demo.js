// Demo script to showcase Virtual Sales Assistant features
export function runDemo(assistant) {
    console.log('Starting Virtual Sales Assistant Demo...');
    
    // Demo sequence
    const demoSequence = [
        {
            delay: 2000,
            action: () => {
                assistant.addMessage('ai', 'Welcome to the demo! Let me show you what I can do.');
                if (assistant.videoAvatar) {
                    assistant.videoAvatar.showEmotion('happy');
                }
            }
        },
        {
            delay: 4000,
            action: () => {
                assistant.addMessage('ai', 'I can help you practice different sales scenarios with realistic conversations.');
            }
        },
        {
            delay: 6000,
            action: () => {
                // Change scenario automatically
                const scenarioSelect = document.getElementById('scenario-select');
                if (scenarioSelect) {
                    scenarioSelect.value = 'product-demo';
                    scenarioSelect.dispatchEvent(new Event('change'));
                }
            }
        },
        {
            delay: 8000,
            action: () => {
                assistant.addMessage('ai', 'I have multiple facial expressions and can show emotions while speaking!');
                if (assistant.videoAvatar) {
                    assistant.videoAvatar.showEmotion('excited');
                }
            }
        },
        {
            delay: 10000,
            action: () => {
                assistant.addMessage('ai', 'Try clicking on me, using voice input, or typing a message to interact!');
                if (assistant.videoAvatar) {
                    assistant.videoAvatar.showEmotion('thinking');
                }
            }
        },
        {
            delay: 12000,
            action: () => {
                console.log('Demo completed! The assistant is now ready for interaction.');
            }
        }
    ];
    
    // Execute demo sequence
    demoSequence.forEach(step => {
        setTimeout(step.action, step.delay);
    });
}

// Add demo button to UI
export function addDemoButton(assistant) {
    const controlsPanel = document.querySelector('.controls-panel');
    if (!controlsPanel) return;
    
    const demoGroup = document.createElement('div');
    demoGroup.className = 'control-group';
    demoGroup.innerHTML = `
        <label>Demo</label>
        <div class="session-controls">
            <button id="demo-btn" class="control-btn">
                <i class="fas fa-play-circle"></i> Run Demo
            </button>
        </div>
    `;
    
    controlsPanel.appendChild(demoGroup);
    
    document.getElementById('demo-btn').addEventListener('click', () => {
        runDemo(assistant);
    });
}