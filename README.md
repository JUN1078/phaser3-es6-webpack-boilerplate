# Virtual Sales Assistant - AI Role-Play with TTS and Video

An advanced virtual assistant for sales training that combines AI-powered conversations, Text-to-Speech technology, and interactive video features to create realistic role-play scenarios for sales skill development.

## Features

### 🤖 AI-Powered Sales Training
- **Intelligent Conversational AI**: Responds contextually to user inputs with realistic sales scenarios
- **Multiple Role-Play Scenarios**: Cold calls, product demos, objection handling, closing techniques, and follow-ups
- **Dynamic Response Generation**: Adapts responses based on user behavior and conversation flow

### 🎙️ Advanced Text-to-Speech
- **Natural Voice Synthesis**: High-quality TTS with adjustable speech rate and pitch
- **Emotional Voice Modulation**: Different speaking styles (professional, excited, calm)
- **Real-time Audio Feedback**: Visual indicators during speech synthesis

### 📹 Interactive Video Features
- **Animated Avatar**: Responsive virtual assistant with visual feedback
- **Video-like Effects**: Background animations, gradients, and interactive elements
- **Speaking Animations**: Visual cues that sync with speech output

### 🎯 Performance Analytics
- **Real-time Metrics**: Confidence and engagement tracking
- **Session Analytics**: Duration tracking and performance insights
- **Progress Monitoring**: Historical data and improvement suggestions

### 🎮 Interactive Controls
- **Voice Input**: Speech recognition for hands-free interaction
- **Keyboard Shortcuts**: Efficient navigation and control
- **Session Management**: Start, pause, and reset training sessions
- **Scenario Selection**: Choose from various sales training scenarios

## Available Sales Scenarios

1. **Cold Call**: Practice initial prospect outreach and engagement
2. **Product Demo**: Demonstrate features and handle technical questions
3. **Objection Handling**: Address common customer concerns and resistance
4. **Closing Techniques**: Practice various closing strategies and commitment-seeking
5. **Follow-up Call**: Navigate post-meeting conversations and next steps

## Technology Stack

- **Frontend**: Modern JavaScript (ES6+), HTML5, CSS3
- **Build System**: Webpack 5 with hot reload
- **Speech APIs**: Web Speech API for recognition and synthesis
- **Animation**: CSS3 animations and GSAP-ready architecture
- **Responsive Design**: Mobile-first approach with modern UI/UX

## Requirements

[Node.js](https://nodejs.org) (version 14 or higher) is required to install dependencies and run scripts.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Start development server with hot reload (opens browser automatically) |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |

## Usage Instructions

### Getting Started
1. Run `npm start` to launch the application
2. Choose a sales scenario from the dropdown menu
3. Click "Start Session" to begin role-playing
4. Interact using text input or voice recognition
5. Monitor your performance metrics in real-time

### Keyboard Shortcuts
- **Ctrl+Enter**: Send message quickly
- **Ctrl+Space**: Toggle voice recording
- **Escape**: Stop current speech synthesis

### Voice Controls
- Click the microphone button to start/stop voice recording
- Adjust speech rate and pitch using the control sliders
- Select different voice personalities from the dropdown

### Session Management
- **Start Session**: Begin a new training session
- **Pause**: Temporarily halt the current session
- **Reset**: Clear conversation history and restart

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: TTS and basic features (limited voice selection)
- **Edge**: Full support

**Note**: Speech recognition requires HTTPS in production environments.

## Development

### Project Structure
```
src/
├── index.js              # Main application entry
├── index.html            # HTML template
├── styles.css            # Main stylesheet
├── VirtualAssistant.js   # Core assistant logic
├── SalesScenarios.js     # Scenario definitions and AI responses
└── EventHandlers.js      # UI event management
```

### Customization
- **Adding Scenarios**: Modify `SalesScenarios.js` to add new role-play scenarios
- **Voice Customization**: Adjust TTS parameters in `VirtualAssistant.js`
- **UI Styling**: Update `styles.css` for visual customizations
- **AI Responses**: Enhance the response logic in `SalesScenarios.js`

## Deployment

After running `npm run build`, deploy the contents of the `dist` folder to any web server. The application is a static site and requires no backend infrastructure.

### Production Considerations
- Ensure HTTPS for speech recognition functionality
- Configure appropriate CSP headers for security
- Consider CDN deployment for optimal performance

## Future Enhancements

- Integration with real AI/ML models (OpenAI, Google Dialogflow)
- Advanced video avatars with 3D rendering
- Multi-language support
- Advanced analytics dashboard
- Integration with CRM systems
- Mobile app development

## Contributing

This project is designed to be extensible. Key areas for contribution:
- Additional sales scenarios and responses
- Enhanced AI conversation logic
- Improved voice synthesis options
- Advanced analytics features
- Accessibility improvements

## License

MIT License - feel free to use this project for educational and commercial purposes.