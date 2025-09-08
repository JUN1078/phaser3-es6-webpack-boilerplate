// Sales Scenarios and AI Response Logic
export const salesScenarios = {
    'cold-call': {
        name: 'Cold Call',
        context: 'You are making a cold call to a potential customer.',
        responses: [
            "Hello! Thank you for taking my call. I'm Sarah from TechSolutions. I noticed your company has been growing rapidly, and I'd love to discuss how we can help streamline your operations. Do you have a few minutes to chat?",
            "I understand you're busy, but I've helped similar companies in your industry increase efficiency by 30%. Would you be interested in a quick 5-minute overview?",
            "That's a common concern. Let me ask you this - what's your biggest challenge when it comes to managing your current workflow?"
        ]
    },
    'product-demo': {
        name: 'Product Demo',
        context: 'You are demonstrating a product to an interested prospect.',
        responses: [
            "Great! Let me show you our flagship feature. As you can see on the screen, this dashboard gives you real-time insights into your business metrics. What aspects of your current setup would you most like to improve?",
            "This integration capability is what sets us apart from competitors. It connects seamlessly with over 200 business applications. Which tools does your team currently use?",
            "I can see you're impressed! This feature alone has helped our clients save an average of 15 hours per week. How valuable would that time savings be for your team?"
        ]
    },
    'objection-handling': {
        name: 'Objection Handling',
        context: 'The customer has raised objections that you need to address professionally.',
        responses: [
            "I completely understand your concern about the price. Let me put this in perspective - our solution typically pays for itself within 3 months through efficiency gains. Can we discuss what ROI would make this worthwhile for you?",
            "That's a valid point about implementation time. We've actually streamlined our onboarding process, and most clients are up and running within 2 weeks. What specific timeline constraints are you working with?",
            "I hear you saying you need to think about it. What specific information would help you make a confident decision? I'd rather address your concerns now than leave you uncertain."
        ]
    },
    'closing': {
        name: 'Closing Techniques',
        context: 'You are working to close the sale and get a commitment.',
        responses: [
            "Based on everything we've discussed, it sounds like our solution addresses your main challenges perfectly. What would need to happen for us to move forward today?",
            "I can offer you our early adopter pricing if we can get the contract signed this week. This represents a 20% savings. Does that work within your budget?",
            "Let me ask you directly - on a scale of 1-10, how confident are you that this solution will solve your problems? What would it take to get you to a 10?"
        ]
    },
    'follow-up': {
        name: 'Follow-up Call',
        context: 'You are following up after an initial meeting or proposal.',
        responses: [
            "Hi! I wanted to follow up on our conversation last week about streamlining your operations. Have you had a chance to discuss this with your team?",
            "I know you mentioned you needed to review the proposal with your stakeholders. What feedback have you received so far?",
            "I've prepared some additional case studies from companies similar to yours that might address the concerns you raised. When would be a good time to review them together?"
        ]
    }
};

export function generateAIResponse(userMessage, currentScenario) {
    const scenario = salesScenarios[currentScenario];
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
        return "I understand price is a concern. Let me show you the ROI calculation. Our clients typically see a 300% return on investment within the first year. What's your current budget range for solving this problem?";
    } else if (lowerMessage.includes('think') || lowerMessage.includes('consider') || lowerMessage.includes('maybe')) {
        return "I appreciate you being honest about needing time to think. What specific concerns do you have that I can address right now? I'd rather help you make an informed decision than leave you uncertain.";
    } else if (lowerMessage.includes('not interested') || lowerMessage.includes('no thanks')) {
        return "I understand this might not be the right timing. Can I ask what would need to change in your situation for a solution like this to become a priority?";
    } else if (lowerMessage.includes('tell me more') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
        return scenario.responses[Math.floor(Math.random() * scenario.responses.length)];
    } else {
        const responses = [
            "That's a great point. Let me build on that...",
            "I can see why that would be important to you.",
            "Many of our clients have said the same thing initially.",
            "That's exactly the kind of challenge we help solve.",
            ...scenario.responses
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}