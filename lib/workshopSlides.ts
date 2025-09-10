// Workshop slide content for Big Marble Farms AI Training
// Total duration: 60 minutes (3 sections)

export interface WorkshopSlide {
  id: number
  sectionId: 1 | 2 | 3
  sectionName: string
  title: string
  subtitle?: string
  content: string
  type: 'slide' | 'quiz' | 'visualization' | 'discussion' | 'demo' | 'section-header' | 'team-intro'
  estimatedTime: number // in seconds
  speakerNotes?: string
  visualizationType?: 'temperature' | 'context-window' | 'roi-calculator' | 'greenhouse-control' | 'resource-dashboard' | 'digital-twin' | 'ai-taxonomy-flowchart' | 'generative-ai-modalities-flowchart' | 'implementation-flowchart' | 'prompt-examples' | 'ai-greenhouse-demo' | 'document-processing-demo' | 'digital-twin-ai-demo'
  discussionPrompts?: string[]
  resources?: { title: string; url: string }[]
  options?: string[]
  correctAnswer?: number
  bulletPoints?: string[]
  imageUrl?: string
  presenter?: string
  teamMembers?: { name: string; role: string; image?: string }[]
}

export const workshopSlides: WorkshopSlide[] = [
  // ============= SECTION 1: AI BASICS - CONCEPTS & MODALITIES (15 minutes) =============
  {
    id: 1,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Welcome to AI for Enterprise Operations",
    content: "Today we'll explore the fundamentals of artificial intelligence and how different AI technologies can transform modern business operations.",
    type: 'section-header',
    estimatedTime: 60,
    speakerNotes: "Welcome participants, set expectations for comprehensive AI overview covering all modalities",
    imageUrl: "/bmf-logo.png",
    presenter: "Presented by New Era Intelligence"
  },
  {
    id: 2,
    sectionId: 1,
    sectionName: "Introduction to AI",
    title: "Meet Your Facilitators",
    content: "The New Era Intelligence team bringing AI expertise to greenhouse operations",
    type: 'team-intro',
    estimatedTime: 90,
    teamMembers: [
      { 
        name: "Deji Erinle", 
        role: "Lorem ipsum dolor sit amet consectetur",
        image: "/Deji.png"
      },
      { 
        name: "Simon Loewen", 
        role: "Lorem ipsum dolor sit amet consectetur",
        image: "/Simon.png"
      },
      { 
        name: "Calvin Leung", 
        role: "Lorem ipsum dolor sit amet consectetur",
        image: "/Cal.png"
      }
    ],
    speakerNotes: "Brief introduction of each team member, their expertise, and role in today's workshop"
  },
  {
    id: 3,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Session Overview",
    subtitle: "From AI Fundamentals to Business Applications",
    content: "Today's focused training covers the essential AI knowledge every business leader needs. We'll explore different types of AI, how they work, and practical applications across industries.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Section 1: AI Ecosystem & Generative AI Fundamentals (15 min)",
      "Section 2: Business Applications & Implementation (15 min)",
      "Section 3: Industry-Specific Applications (30 min)",
      "Interactive demos and real-world examples",
      "Actionable insights for immediate implementation"
    ],
    speakerNotes: "Set expectations for comprehensive coverage of AI landscape, not just one technology"
  },
  {
    id: 4,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "What is Artificial Intelligence?",
    content: "AI is technology that enables machines to simulate human intelligence - learning from experience, adapting to new inputs, and performing human-like tasks.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Pattern recognition at massive scale",
      "Learning from data without explicit programming",
      "Making predictions based on past examples",
      "Automating complex decision-making",
      "Foundation for all modern AI applications"
    ],
    speakerNotes: "Set foundation before diving into specific AI types and applications"
  },
  {
    id: 5,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "AI Technology Hierarchy",
    content: "Understanding how different AI technologies relate to each other helps you navigate the landscape and choose the right solutions.",
    type: 'visualization',
    visualizationType: 'ai-taxonomy-flowchart',
    estimatedTime: 120,
    speakerNotes: "Walk through the flowchart: AI → Machine Learning → Generative AI → Modalities. Each level builds on the previous. Emphasize that Generative AI is a subset of ML."
  },
  {
    id: 6,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Machine Learning Stack",
    content: "Machine Learning is the foundation that enables most modern AI capabilities, with specialized applications built on top.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Computer Vision: ML applied to images and video",
      "Natural Language Processing (NLP): ML applied to text and speech",
      "Generative AI: Advanced ML that creates new content",
      "Robotics: ML combined with physical automation"
    ],
    speakerNotes: "Emphasize that ML is the foundation technology that enables the others. This helps clarify the relationships."
  },
  {
    id: 7,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "AI Maturity Levels",
    content: "Understanding how AI capabilities progress from basic automation to advanced intelligence helps set realistic expectations.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Level 1: Rule-based automation (if-then logic)",
      "Level 2: Pattern recognition (classify and predict)",
      "Level 3: Adaptive learning (improve over time)",
      "Level 4: Generative creation (produce new content)",
      "Level 5: General intelligence (human-like reasoning)"
    ],
    speakerNotes: "Emphasize we're currently at levels 2-4. Level 5 is still theoretical. Help set realistic expectations."
  },
  {
    id: 8,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "What is Generative AI?",
    content: "Generative AI represents the creative revolution in artificial intelligence - AI that doesn't just analyze, but creates new content.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Creates new content rather than just analyzing existing data",
      "Trained on massive datasets to understand patterns",
      "Generates human-like text, images, video, audio, and code",
      "Transforming how businesses create and communicate",
      "Think of it as an infinitely creative digital assistant"
    ],
    speakerNotes: "Position generative AI as the umbrella term, not just LLMs"
  },
  {
    id: 9,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Generative AI Modalities & Platforms",
    content: "Generative AI spans multiple content types, each with specific business applications and leading platforms.",
    type: 'visualization',
    visualizationType: 'generative-ai-modalities-flowchart',
    estimatedTime: 150,
    speakerNotes: "Show how each modality serves different business needs. Highlight cross-modal workflows and multimodal integration possibilities."
  },
  {
    id: 10,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Text Generation (LLMs)",
    content: "Large Language Models like ChatGPT, Claude, and Gemini excel at understanding and generating human-like text for business applications.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Document processing and analysis",
      "Business communication and documentation",
      "Technical writing and procedure creation",
      "Customer service and support responses",
      "Data analysis and report generation",
      "Content creation and marketing materials"
    ],
    speakerNotes: "Focus on business applications rather than technical details"
  },
  {
    id: 11,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Visual & Audio Generation",
    content: "Visual and audio AI creates professional-quality content for marketing, training, and communication needs.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Image Generation: DALL-E, Midjourney, Stable Diffusion",
      "Video Generation: Sora, Runway ML for training content",
      "Audio Generation: ElevenLabs, Murf for voiceovers",
      "Marketing materials and social media content",
      "Training videos and instructional materials"
    ],
    speakerNotes: "Show examples relevant to their industry and use cases"
  },
  {
    id: 12,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Interactive: AI Temperature Control",
    content: "Experience how AI 'temperature' affects creativity vs. precision across all types of generative AI - text, images, and video.",
    type: 'visualization',
    visualizationType: 'temperature',
    estimatedTime: 180,
    speakerNotes: "Demonstrate temperature effects across modalities - conservative for technical docs, creative for marketing"
  },
  {
    id: 13,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Interactive: Context Window Limitations",
    content: "See how AI's 'attention span' works - like a flashlight that can only illuminate part of a document at once.",
    type: 'visualization',
    visualizationType: 'context-window',
    estimatedTime: 180,
    speakerNotes: "Have participants interact with the flashlight metaphor, explain implications for document processing"
  },
  {
    id: 14,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Prompting Fundamentals",
    content: "Learning to communicate effectively with generative AI is essential for getting high-quality, consistent results.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Clear instructions: Be specific about what you want",
      "Context setting: Provide relevant background information",
      "Output format: Specify how you want the response structured",
      "Role definition: Tell the AI what perspective to take",
      "Examples: Show the AI what good output looks like"
    ],
    speakerNotes: "Use business examples to demonstrate effective prompting techniques"
  },
  {
    id: 15,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Prompt Engineering & Context Management",
    content: "Advanced techniques for getting consistent, high-quality results from generative AI across all modalities.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Chain-of-thought: Break complex tasks into steps",
      "Few-shot learning: Provide examples for better results",
      "Context engineering: Manage information flow effectively",
      "Cross-modal prompting: Text to image, image to text workflows",
      "Iterative refinement: Improve outputs through feedback"
    ],
    speakerNotes: "Explain how these techniques apply across text, image, and video generation"
  },
  {
    id: 16,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "AI Integration with Business Systems",
    content: "Modern AI can connect to your existing business systems to provide more accurate, up-to-date responses based on your actual data.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Connect AI to your databases and business systems",
      "Get answers based on your real data, not just training data",
      "Secure access controls protect sensitive information",
      "Works across different AI platforms and tools",
      "Note: Vector databases convert text/data into mathematical vectors for semantic search by meaning"
    ],
    speakerNotes: "Simplified from MCPs - focus on business value, not technical details. **Footnote: Vector databases enable semantic search by converting text/data into mathematical vectors, allowing AI to find conceptually related information by meaning rather than keywords.**"
  },
  {
    id: 17,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Understanding AI Limitations",
    content: "Understanding AI limitations is crucial for responsible implementation and setting realistic expectations.",
    type: 'slide',
    estimatedTime: 150,
    bulletPoints: [
      "Hallucinations: AI generates confident-sounding but false information",
      "Context window limits: Can't process unlimited amounts of information",
      "No structured repeatability: Same input may produce different outputs",
      "Training data bias: Only knows what it was taught",
      "No real-world understanding: Lacks common sense and consequences",
      "Note: Modern AI reliability improved through fine-tuning, human feedback (RLHF), and safety filtering"
    ],
    speakerNotes: "Emphasize these affect ALL generative AI modalities, not just text. Use concrete examples. **Footnote: Modern AI reliability comes from post-training techniques like fine-tuning for specific domains, RLHF (human feedback), and safety filtering.**"
  },
  {
    id: 18,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Hybrid Systems: The Smart Approach",
    content: "The most successful AI implementations combine AI capabilities with traditional systems and human oversight.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "AI for creativity and pattern recognition",
      "Traditional systems for reliability and consistency",
      "Human oversight for critical decisions",
      "Validation frameworks to catch errors",
      "Failsafe mechanisms for mission-critical operations"
    ],
    imageUrl: "/hybrid-systems-cycle.png",
    speakerNotes: "Show how this creates more reliable and trustworthy systems than AI alone"
  },
  {
    id: 19,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Mitigation Strategies for AI Risks",
    content: "Practical techniques to minimize AI risks while maximizing benefits in business applications.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "RAG (Retrieval-Augmented Generation): Ground AI in verified information",
      "Prompt engineering: Structure requests for consistent results",
      "Human validation: Always verify critical AI outputs",
      "Guardrails: Set boundaries on AI behavior",
      "Version control: Track and audit AI decision-making",
      "Note: RAG retrieves relevant data before generating responses, dramatically reducing hallucinations"
    ],
    speakerNotes: "These strategies apply across all generative AI modalities and use cases. **Footnote: RAG (Retrieval-Augmented Generation) grounds AI in verified data by retrieving relevant information before generating responses, dramatically reducing hallucinations.**"
  },
  {
    id: 20,
    sectionId: 1,
    sectionName: "AI Basics - Concepts & Modalities",
    title: "Knowledge Check: AI Fundamentals",
    content: "What's the biggest risk when using generative AI for critical business decisions?",
    type: 'quiz',
    estimatedTime: 60,
    options: [
      "AI is too slow for real-time decisions",
      "AI may generate false information that sounds credible (hallucinations)",
      "AI is too expensive for most businesses",
      "AI requires too much technical expertise"
    ],
    correctAnswer: 1,
    speakerNotes: "Reinforce the importance of validation and hybrid approaches"
  },

  // ============= SECTION 2: AI FOR BUSINESS APPLICATIONS (15 minutes) =============
  {
    id: 21,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "General Business AI Applications",
    content: "From startups to Fortune 500 companies, AI is transforming how businesses operate, compete, and grow.",
    type: 'section-header',
    estimatedTime: 60,
    speakerNotes: "Transition to practical business applications"
  },
  {
    id: 22,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Enterprise AI Solutions Landscape",
    content: "Major players offer different strengths - choosing the right one depends on your specific needs.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "OpenAI (ChatGPT): General purpose, strong language capabilities",
      "Google (Gemini): Integration with Google Workspace",
      "Microsoft (Copilot): Deep Office 365 integration",
      "Salesforce (Einstein): CRM and customer insights",
      "Specialized solutions for agriculture and operations"
    ],
    imageUrl: "/chatgpt-logo.jpg",
    speakerNotes: "Show logos, discuss how each might apply to greenhouse operations"
  },
  {
    id: 23,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "ROI and Value Creation",
    content: "AI investments must deliver measurable returns. Let's explore how to calculate and maximize ROI.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Average ROI: 3.5x investment within 18 months",
      "Time savings: 20-40% reduction in repetitive tasks",
      "Error reduction: 60-80% fewer manual errors",
      "Customer satisfaction: 25% improvement typical",
      "Key: Start small, measure results, scale what works"
    ],
    speakerNotes: "Emphasize importance of metrics and starting with pilot projects"
  },
  {
    id: 24,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Understanding ROI Factors",
    content: "Explore the key variables that impact AI implementation success and how to measure realistic returns.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Time savings: Measure hours saved vs. hourly labor costs",
      "Error reduction: Calculate cost of errors prevented", 
      "Quality improvements: Value of consistency and accuracy",
      "Efficiency gains: Output increase per employee",
      "Implementation costs: Software, training, integration time"
    ],
    speakerNotes: "Focus on measurement methodology rather than selling. Help participants understand what to track for their specific situation."
  },
  {
    id: 25,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Common Current Business Use Cases",
    content: "These proven applications deliver immediate value across industries.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Document processing and analysis",
      "Customer service automation",
      "Data analytics and reporting",
      "Content creation and marketing",
      "Process optimization and automation"
    ],
    speakerNotes: "Ask participants which resonates most with their current challenges"
  },
  {
    id: 26,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Document Processing Revolution",
    content: "AI can read, understand, and extract insights from documents at superhuman speed.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Invoice processing: 90% faster",
      "Contract review: Identify risks in minutes",
      "Compliance checking: Automatic regulatory updates",
      "Report generation: From days to hours",
      "Knowledge management: Instant answers from documents"
    ],
    speakerNotes: "Relate to greenhouse documentation: certifications, compliance, reports"
  },
  {
    id: 27,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Customer Service Transformation",
    content: "AI enables 24/7 customer support while freeing your team for high-value interactions.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Chatbots handle 70% of routine inquiries",
      "Instant response times improve satisfaction",
      "Multilingual support without translators",
      "Sentiment analysis for priority routing",
      "Your team focuses on complex, valuable conversations"
    ],
    speakerNotes: "Discuss B2B applications for greenhouse operations"
  },
  {
    id: 28,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Data Analytics Made Simple",
    content: "Transform raw data into actionable insights without a data science degree.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Natural language queries: 'Show me last month's energy costs'",
      "Automatic pattern detection and anomalies",
      "Predictive analytics for planning",
      "Visual dashboards generated automatically",
      "Real-time alerts for critical metrics",
      "Create entirely new data slices to compare different data and reveal hidden connections",
      "    ◦ *Show me water usage pattern when outside temperature drops below 25°C in sections with high-yield plants*"
    ],
    imageUrl: "/ai-data-analytics.png",
    speakerNotes: "Connect to greenhouse metrics: yield, energy, labor efficiency"
  },
  {
    id: 29,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Implementation Best Practices",
    content: "Success with AI requires thoughtful implementation and change management.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Start with a pilot project (low risk, high visibility)",
      "Ensure data quality and accessibility",
      "Train your team early and often",
      "Measure everything: time, cost, quality",
      "Iterate based on feedback and results"
    ],
    speakerNotes: "Emphasize the human element - AI augments, not replaces, people"
  },
  {
    id: 30,
    sectionId: 2,
    sectionName: "AI for Business Applications",
    title: "Business Applications Quiz",
    content: "What is typically the FIRST step in successful AI implementation?",
    type: 'quiz',
    estimatedTime: 60,
    options: [
      "Purchasing the most advanced AI technology available",
      "Starting with a small pilot project to prove value",
      "Training all employees on AI simultaneously",
      "Replacing existing systems completely"
    ],
    correctAnswer: 1,
    speakerNotes: "Reinforce the importance of starting small and scaling"
  },

  // ============= SECTION 3: AI IN GREENHOUSE & CUSTOM SOLUTIONS (30 minutes) =============
  {
    id: 31,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "AI in Greenhouse & Custom Solutions",
    content: "Now let's explore specific applications for greenhouse operations and how to develop custom solutions for your unique needs.",
    type: 'section-header',
    estimatedTime: 60,
    speakerNotes: "This is the main section - relate everything to their specific context",
    imageUrl: "/greenhouse-emoji.png"
  },
  {
    id: 32,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Greenhouse Industry Challenges",
    content: "Understanding your unique challenges helps identify where AI can deliver the most value.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Labor shortages and rising costs",
      "Energy optimization requirements",
      "Yield maximization pressure",
      "Quality consistency demands",
      "Regulatory compliance complexity",
      "Supply chain unpredictability"
    ],
    speakerNotes: "Ask participants to share their top challenges"
  },
  {
    id: 33,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "AI Solutions for Modern Agriculture",
    content: "Proven AI applications that are transforming greenhouse operations today.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Climate control optimization",
      "Disease and pest detection",
      "Yield prediction and planning",
      "Resource optimization (water, nutrients, energy)",
      "Labor planning and task automation",
      "Quality grading and sorting"
    ],
    speakerNotes: "These are not future concepts - they're being used today"
  },
  {
    id: 34,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Climate Control Optimization",
    content: "AI learns optimal growing conditions and adjusts in real-time for maximum yield and quality.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Predictive temperature and humidity control",
      "Energy cost optimization",
      "Weather forecast integration",
      "Crop-specific microclimate management",
      "15-20% energy savings typical"
    ],
    speakerNotes: "Prepare for interactive demonstration"
  },
  {
    id: 35,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Interactive: Greenhouse Control System",
    content: "Experience how AI manages multiple variables simultaneously to optimize growing conditions.",
    type: 'visualization',
    visualizationType: 'greenhouse-control',
    estimatedTime: 180,
    speakerNotes: "Let participants adjust parameters and see AI optimization in action"
  },
  {
    id: 36,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Predictive Maintenance",
    content: "Prevent equipment failures before they happen, reducing downtime and repair costs.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Monitor equipment patterns for anomalies",
      "Predict failure 2-4 weeks in advance",
      "Optimize maintenance schedules",
      "Reduce unplanned downtime by 50%",
      "Extend equipment lifespan by 20-30%"
    ],
    speakerNotes: "Share examples of costly equipment failures that could be prevented"
  },
  {
    id: 37,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Crop Yield Forecasting",
    content: "Accurate predictions enable better planning, pricing, and customer commitments.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "95%+ accuracy 2-4 weeks out",
      "Factor in weather, disease risk, market conditions",
      "Optimize harvest timing and labor planning",
      "Improve customer satisfaction with reliable delivery",
      "Better pricing negotiations with buyers"
    ],
    speakerNotes: "Ask about current forecasting methods and accuracy"
  },
  {
    id: 38,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Resource Optimization",
    content: "Every drop of water, unit of energy, and gram of nutrients optimized for maximum efficiency.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Water usage: 20-30% reduction",
      "Nutrient optimization: 15% less waste",
      "Energy efficiency: 15-25% savings",
      "Labor allocation: 30% more efficient",
      "ROI typically within 12 months"
    ],
    speakerNotes: "These savings go straight to the bottom line"
  },
  {
    id: 39,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Interactive: Resource Dashboard",
    content: "See how AI monitors and optimizes multiple resources simultaneously in real-time.",
    type: 'visualization',
    visualizationType: 'resource-dashboard',
    estimatedTime: 180,
    speakerNotes: "Show how dashboard provides actionable insights at a glance"
  },
  {
    id: 40,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Labor Efficiency Tools",
    content: "AI helps you do more with your existing team while reducing repetitive tasks.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Task scheduling and route optimization",
      "Skill-based assignment matching",
      "Training and knowledge management",
      "Performance tracking and coaching",
      "Reduce overtime by 25-35%"
    ],
    speakerNotes: "Emphasize AI augments workers, doesn't replace them"
  },
  {
    id: 31,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Quality Control & Sorting",
    content: "Computer vision AI ensures consistent quality and reduces manual inspection time.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Real-time quality grading",
      "Defect detection at 99%+ accuracy",
      "Size and ripeness sorting",
      "Reduce labor costs by 40%",
      "Improve customer satisfaction with consistency"
    ],
    speakerNotes: "Show examples of what AI can detect that humans might miss"
  },
  {
    id: 32,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Supply Chain Optimization",
    content: "AI predicts demand, optimizes logistics, and reduces waste throughout the supply chain.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Demand forecasting with 90%+ accuracy",
      "Optimal delivery route planning",
      "Inventory management and reduction",
      "Supplier performance tracking",
      "Reduce transportation costs by 15-20%"
    ],
    speakerNotes: "Connect to current supply chain challenges"
  },
  {
    id: 33,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Digital Twin Technology",
    content: "Create a virtual replica of your greenhouse to test scenarios without risk.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Virtual testing of changes before implementation",
      "What-if scenario planning",
      "Risk-free optimization experiments",
      "Training tool for new employees",
      "Continuous improvement insights"
    ],
    speakerNotes: "Explain this is like a flight simulator for your greenhouse"
  },
  {
    id: 34,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Interactive: Digital Twin Visualization",
    content: "Explore how a digital twin mirrors and predicts real greenhouse behavior.",
    type: 'visualization',
    visualizationType: 'digital-twin',
    estimatedTime: 180,
    speakerNotes: "Show how changes in the digital twin predict real-world outcomes"
  },
  {
    id: 35,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Custom Solution Development Process",
    content: "How to develop AI solutions tailored to your specific needs and constraints.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "1. Identify specific pain points and opportunities",
      "2. Assess data availability and quality",
      "3. Start with proof of concept (4-6 weeks)",
      "4. Measure results and refine",
      "5. Scale successful solutions gradually"
    ],
    speakerNotes: "Emphasize importance of starting small and proving value"
  },
  {
    id: 36,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Big Marble Specific Opportunities",
    content: "Based on your operations, here are high-impact AI opportunities to consider.",
    type: 'discussion',
    estimatedTime: 180,
    discussionPrompts: [
      "Which of your current processes takes the most time?",
      "Where do you see the most variability in outcomes?",
      "What decisions require the most expertise?",
      "Which problems cost you the most when they occur?"
    ],
    bulletPoints: [
      "Tomato yield optimization",
      "Energy cost reduction during peak seasons",
      "Labor scheduling during harvest",
      "Quality consistency for key customers",
      "Predictive maintenance for critical systems"
    ],
    speakerNotes: "Facilitate discussion about their specific opportunities"
  },
  {
    id: 37,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Implementation Roadmap",
    content: "A phased approach ensures successful AI adoption with minimal risk.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Phase 1 (Months 1-3): Data assessment and pilot selection",
      "Phase 2 (Months 4-6): Pilot implementation and testing",
      "Phase 3 (Months 7-9): Refinement and scaling",
      "Phase 4 (Months 10-12): Full deployment and optimization",
      "Continuous: Monitoring, learning, and improvement"
    ],
    speakerNotes: "Emphasize this is a journey, not a destination"
  },
  {
    id: 46,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Demo: AI-Powered Operations Dashboard",
    content: "Experience how generative AI transforms raw data into conversational business intelligence.",
    type: 'visualization',
    visualizationType: 'ai-greenhouse-demo',
    estimatedTime: 300,
    speakerNotes: "Demonstrate natural language querying, smart alerts, predictive insights. Let participants ask questions and see AI responses in real-time."
  },
  {
    id: 47,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Demo: Intelligent Document Processing",
    content: "See how AI automatically processes invoices, compliance forms, and generates business insights.",
    type: 'visualization',
    visualizationType: 'document-processing-demo',
    estimatedTime: 240,
    speakerNotes: "Process a sample invoice, show AI extraction, analysis, and recommendations. Highlight time savings and compliance automation."
  },
  {
    id: 48,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Demo: Digital Twin AI Optimization",
    content: "Explore how AI analyzes your digital twin to generate optimization recommendations with real ROI calculations.",
    type: 'visualization',
    visualizationType: 'digital-twin-ai-demo',
    estimatedTime: 300,
    speakerNotes: "Show AI analyzing greenhouse conditions, generating recommendations, and explaining optimization strategies. Demonstrate the simulation-to-action workflow."
  },
  {
    id: 49,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Cost-Benefit Analysis",
    content: "Understanding the full picture of costs and benefits ensures sound investment decisions.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Initial costs: Software, integration, training",
      "Ongoing costs: Subscriptions, maintenance, updates",
      "Tangible benefits: Cost savings, yield increase, quality improvement",
      "Intangible benefits: Competitive advantage, employee satisfaction",
      "Typical payback period: 12-18 months"
    ],
    speakerNotes: "Be transparent about costs while emphasizing long-term value"
  },
  {
    id: 50,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Success Metrics & KPIs",
    content: "Define clear metrics to track AI impact and ensure continuous improvement.",
    type: 'slide',
    estimatedTime: 90,
    bulletPoints: [
      "Operational: Energy use, water consumption, labor hours",
      "Quality: Consistency scores, defect rates, customer complaints",
      "Financial: Cost per unit, revenue per square foot, ROI",
      "Strategic: Time to market, innovation rate, market share",
      "Set baselines before implementation for comparison"
    ],
    speakerNotes: "Help them think about which metrics matter most to their business"
  },
  {
    id: 51,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Next Steps & Resources",
    content: "Your journey to AI-powered greenhouse operations starts here.",
    type: 'slide',
    estimatedTime: 120,
    bulletPoints: [
      "Schedule follow-up consultation for specific use cases",
      "Access online portal for continued learning",
      "Connect with AI solution providers",
      "Join greenhouse AI community for peer learning",
      "Start with one pilot project in next 30 days"
    ],
    resources: [
      { title: "AI Tools Directory", url: "/tools" },
      { title: "Implementation Guide", url: "/resources/implementation" },
      { title: "ROI Calculator", url: "/resources/roi-calculator" },
      { title: "Case Studies", url: "/resources/case-studies" }
    ],
    speakerNotes: "End with clear action items and enthusiasm for the journey ahead"
  },
  {
    id: 52,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Final Assessment",
    content: "Which AI application would likely provide the fastest ROI for a greenhouse operation?",
    type: 'quiz',
    estimatedTime: 60,
    options: [
      "Complete automation of all processes",
      "Energy optimization and climate control",
      "Replacing all human workers with robots",
      "Building a custom AI from scratch"
    ],
    correctAnswer: 1,
    speakerNotes: "Use this to reinforce practical, achievable starting points"
  },
  {
    id: 53,
    sectionId: 3,
    sectionName: "AI in Greenhouse Operations",
    title: "Thank You & Q&A",
    content: "Thank you for joining us today. Let's discuss your specific questions and explore how AI can transform your operations.",
    type: 'discussion',
    estimatedTime: 300,
    discussionPrompts: [
      "What resonated most with you today?",
      "What's your biggest concern about implementing AI?",
      "Which use case would you like to explore first?",
      "How can we support your AI journey?"
    ],
    speakerNotes: "Open floor for questions, capture follow-up items, schedule next steps"
  }
];

// Helper function to get slides by section
export function getSlidesBySection(sectionId: 1 | 2 | 3): WorkshopSlide[] {
  return workshopSlides.filter(slide => slide.sectionId === sectionId);
}

// Helper function to calculate section duration
export function getSectionDuration(sectionId: 1 | 2 | 3): number {
  return getSlidesBySection(sectionId).reduce((total, slide) => total + slide.estimatedTime, 0);
}

// Helper function to get total workshop duration
export function getTotalDuration(): number {
  return workshopSlides.reduce((total, slide) => total + slide.estimatedTime, 0);
}

// Section metadata
export const sections = [
  {
    id: 1,
    name: "Introduction to AI",
    targetDuration: 900, // 15 minutes in seconds
    color: "blue",
    icon: "🤖"
  },
  {
    id: 2,
    name: "AI for Business Applications",
    targetDuration: 900, // 15 minutes
    color: "green",
    icon: "💼"
  },
  {
    id: 3,
    name: "AI in Greenhouse Operations",
    targetDuration: 1800, // 30 minutes
    color: "orange",
    icon: "🌱"
  }
];