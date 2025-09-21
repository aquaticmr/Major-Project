# FinoAddWise: GenAI-Powered Financial Assistant (Frontend)

[![Project Status](https://img.shields.io/badge/Status-deployed-green)](https://shields.io/)

Analyze, Advise, Invest Wise.

## Project Overview

This project aims to develop a revolutionary GenAI-powered financial assistant, FinoAddWise, to empower individuals, especially in India and globally, to make better investment and financial decisions. Recognizing the low financial literacy levels and the growing number of new investors and individuals navigating complex financial information, this platform provides accessible, personalized financial guidance and powerful analysis tools through conversational AI. Our solution bridges the advice gap by offering integrated, on-demand support, from understanding complex documents and answering basic financial questions to providing personalized budget planning and market insights, all at a scale that manual methods cannot achieve.

**Problem Statement:**
The global financial landscape is a labyrinth for billions. A fundamental, pervasive issue is the inability for individuals to easily understand and navigate the complex financial information embedded in critical documents and policies that govern their lives. From deciphering the dense clauses of an insurance policy to ensure a claim, understanding the fine print of a loan agreement, interpreting sections of a will related to inheritance, analyzing investment prospectuses, or keeping up with ever-changing government financial regulations – these tasks require specialized knowledge that most people lack access to or cannot afford. This opacity isn't just inconvenient; it leads to poor decision-making, exposes individuals to financial risk, hinders their ability to leverage opportunities, and creates immense stress and inequality. Furthermore, the problem is amplified by the lack of accessible, personalized financial education and basic planning tools that cater to diverse knowledge levels, languages, and cultural contexts around the world. Existing solutions are fragmented – separate apps for budgeting, platforms just for investing, costly consultations for document review – none offer an integrated, on-demand, and truly inclusive path to financial clarity. The sheer scale of this global need demands an entirely new approach leveraging advanced AI.

**Solution Statement (FinoAddWise - Leveraging IBM AI):**
Our solution is FinoAddWise, a revolutionary GenAI Financial Co-Pilot built upon the robust and trusted IBM AI ecosystem. FinoAddWise is designed to be the ultimate, inclusive financial guide for everyone, everywhere, regardless of their current financial knowledge, preferred language, or specific needs. It's not just a chatbot; it's an intelligent interpreter and assistant for a user's entire financial world.

The cornerstone of FinoAddWise, showcasing a unique application of AI that sets it apart, is its Intelligent Document and Policy Analysis Engine. This is where powerful AI tackles real-world complexity. Users can securely upload or specify sections of their own documents – a specific insurance policy PDF, a loan agreement, a legal notice with financial implications, a rental contract, an investment factsheet, or even a snippet of a new financial regulation. FinoAddWise employs a sophisticated PDF content extractor to pull out the raw text and structure. This data is then fed into IBM Watson Discovery, which performs deep analysis to identify key entities (names, dates, figures), relationships between them, and crucial clauses or terms within the unstructured text. This goes far beyond simple text searching; it understands the meaning and structure of the financial/legal content. The refined output from Watson Discovery is then processed by IBM watsonx.ai, specifically leveraging a foundational model like Granite. Granite's power of synthesis and natural language generation is critical here. It takes the analytical findings and translates them into clear, concise, and contextually relevant explanations, directly answering the user's question about that specific document. Examples: explaining why a particular insurance claim might be denied based on policy wording, summarizing the early repayment penalty clause in a loan agreement, clarifying inheritance distribution as specified in a will, or breaking down the fee structure detailed in an investment document. This on-demand, personalized interpretation of complex, user-specific documents is a transformative capability.

Integrated within FinoAddWise is a Multilingual and Inclusive Conversational Financial Advisor. Powered by IBM watsonx.ai (including Granite for generating conversational responses) and IBM Watson Language Translator, this feature provides accessible, patient, and adaptive financial guidance on a vast array of topics. Users can ask questions about saving, investing (explaining concepts like compounding or diversification), managing debt, retirement planning basics, or understanding different financial products, all in their preferred language. The AI dynamically adjusts its language, pace, and depth of explanation to match the user's existing knowledge level, making foundational and intermediate financial education universally accessible. It acts like a trusted, non-judgmental financial mentor.

Furthermore, FinoAddWise includes comprehensive Personal Budget Planning capabilities. More than just a tracking app, this feature helps users proactively manage their finances. Users can input income, expenses, and financial goals. Leveraging IBM watsonx.ai (using models like Granite for analysis and text generation), FinoAddWise doesn't just show spending; it can analyze spending patterns, proactively suggest personalized budget frameworks based on goals and income, help users build a realistic budget step-by-step through conversation, and provide ongoing insights and nudges to help them stay on track. This integrates personal financial reality with the knowledge gained from the advisor and document analysis features.

FinoAddWise is fundamentally creative and unique through its unparalleled integration of sophisticated AI capabilities: deep, contextual analysis and interpretation of specific, user-provided documents across multiple domains (financial, legal, policy), combined with broad, multilingual, knowledge-level-adaptive conversational financial advising, and proactive, AI-assisted personal budget planning. This unified platform, built on the reliability and power of IBM AI technologies like Watson Discovery, watsonx.ai, Granite, and Watson Language Translator, provides a singular, accessible, and highly scalable solution to democratize complex financial understanding and empower informed decision-making for anyone, anywhere, in a way not previously seen. It moves beyond simple information retrieval to true personalized interpretation and proactive guidance.

**IBM Granite Usage:**
IBM Granite, as a foundational model within IBM watsonx.ai, serves as a core intelligence engine for FinoAddWise across multiple critical functions, significantly contributing to its unique capabilities. Primarily, Granite is leveraged for its powerful language generation and reasoning abilities after data has been processed by other components.

Firstly, in our Intelligent Document and Policy Analysis engine, following the extraction of text via the PDF content extractor and the deep structural and semantic analysis performed by IBM Watson Discovery, Granite synthesizes this complex, derived information. It takes the identified entities, relationships, and clauses and generates coherent, natural-language explanations. This is crucial for translating the technical output from document analysis into clear, understandable answers about the user's specific document (e.g., explaining a complex legal clause, summarizing policy benefits, or outlining loan terms) in a way tailored to their original query and knowledge level.

Secondly, Granite powers the core conversational engine for our Multilingual and Inclusive Financial Advisor. It's responsible for generating patient, informative, and contextually appropriate responses to user queries across a wide range of financial topics. Granite enables the advisor to understand user intent, maintain conversational flow, explain complex financial concepts simply, and adapt its communication style and depth based on the user's interaction and demonstrated financial literacy.

Lastly, in the Personal Budget Planning feature, after user financial data and goals are input and potentially analyzed by other components, Granite contributes by generating the textual output for proactive budget suggestions, explaining spending trends, articulating personalized financial tips, and helping the user refine their budget through natural language conversation.

In essence, Granite provides the critical layer of human-like language processing and generation that makes FinoAddWise feel intelligent, understandable, and conversational, translating complex financial analysis and data into actionable, accessible insights for the user across document interpretation, advising, and planning features.

**Target Audience:**

Primarily aimed at new and existing investors in India and globally, with varying levels of financial literacy, seeking accessible guidance and intelligent tools to understand complex financial information and make informed decisions.

## Project Structure (Frontend - React, Vite, Tailwind CSS)

This repository contains the **frontend code only** for the FinoAddWise application, built using React with Vite and styled using Tailwind CSS. The structure is organized to promote maintainability, scalability, and feature-based development.

```
src/
├── assets/
│ ├── images/
│ ├── icons/
│ └── styles/
│ └── index.css # Global styles, Tailwind directives
│ └── tailwind.css # Tailwind customizations (optional)
├── components/ # Reusable UI components (atoms, molecules, organisms)
│ ├── common/ # Very generic components (Buttons, Inputs, etc.)
│ ├── layout/ # Layout components (Header, Footer, Navbar, etc.)
│ └── ui/ # More specific UI components (Cards, Modals, etc.)
├── contexts/ # React Contexts for state management (if needed)
├── features/ # Feature-based folders (Pages and related components)
│ ├── auth/ # Login, Register features
│ ├── budgetPlanner/ # Budget Planner Feature
│ ├── chatAI/ # AI Chat Features (Question Resolver, Share Analysis)
│ ├── pdfRiskAnalysis/ # PDF Risk Analysis Feature
│ └── home/ # Home Page Feature
├── hooks/ # Custom React Hooks
├── pages/ # Top-level pages (if not feature-grouped)
├── routes/ # Routing configuration (React Router)
├── services/ # Global API service or utilities
│ └── api.js # General API client setup (e.g., using axios or fetch)
├── utils/ # Utility functions (formatters, helpers, etc.)
├── App.jsx # Main App component
├── index.css # Global CSS (if needed beyond Tailwind)
├── index.html # HTML entry point
└── main.jsx # React entry point

```

Generated code
Each folder within `components/` or `features/` typically contains the component's `.jsx` file and potentially `.module.css` for component-specific styles if not solely relying on Tailwind utilities.

## Frontend Setup Instructions

These instructions are specifically for setting up and running the frontend React application locally.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RamharshDandekar/FinTech
    cd FinTech
    ```

2.  **Install dependencies:** Make sure you have Node.js and npm (or yarn/pnpm) installed.

    ```bash
    npm install
    ```

    This will install all the necessary React, Vite, Tailwind CSS, and other frontend libraries.

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server. Open your browser and navigate to the address shown in the console (usually `http://localhost:5173`). The application will automatically hot-reload as you make changes to the source code.

**Note:** This setup only runs the frontend. To have a fully functional application interacting with AI models, live data, and persistence, you will need to set up and run the backend services separately. Refer to the backend documentation for details on setting up the API, AI services, and database.

## Naming Conventions

To maintain code consistency and readability across the frontend codebase, please adhere to the following naming conventions:

*   **Folders:** `lowercase`, `singular`, `kebab-case` (e.g., `components`, `user-profiles`, `pdf-risk-analysis`).
*   **Files:**
    *   **React Components:** `PascalCase` with `.jsx` extension (e.g., `LoginForm.jsx`, `FinancialInfoCard.jsx`).
    *   **React Hooks:** `camelCase` starting with `use` and `.js` extension (e.g., `useAuth.js`, `useFormValidation.js`).
    *   **Services/Utils:** `camelCase` with `.js` extension (e.g., `authService.js`, `helpers.js`).
    *   **Pages:** `PascalCase` followed by `Page` and `.jsx` extension (e.g., `HomePage.jsx`, `FinancialQuestionResolverPage.jsx`).
*   **Variables and Functions:** `camelCase` (e.g., `userName`, `handleSubmit`).
*   **CSS Class Names:** `kebab-case` (e.g., `main-header`, `submit-button`). Use Tailwind CSS utility classes preferably, but for custom component styles within `.module.css`, use kebab-case.

## Contributing Guidelines

We encourage contributions to this project! To ensure a smooth collaborative process and maintain code quality for the frontend, please follow these guidelines:

1.  **Branching:**
    *   Create a new branch for each feature, bug fix, or improvement. Use descriptive branch names: `feature/add-budget-planner-ui`, `fix/login-form-validation`, `refactor/api-service-frontend`.
    *   Base your branch off the `main` branch.

    ```bash
    git checkout main
    git pull origin main
    git checkout -b feature/your-feature-name
    ```

2.  **Code Style:**
    *   Follow the established naming conventions (see above).
    *   Write clean, well-commented code.
    *   Use consistent formatting (Prettier is highly recommended - configure your editor for automatic formatting on save).
    *   Adhere to React best practices and functional components with hooks.
    *   Prefer Tailwind CSS utility classes for styling; use CSS Modules (`.module.css`) for complex component-specific styles when necessary.

3.  **Commits:**
    *   Make small, focused commits.
    *   Write clear and concise commit messages. Use the imperative mood (e.g., "Add login form UI", not "Adding login form UI").
    *   Reference any relevant issue numbers in your commit messages (e.g., `Fix: Resolved frontend issue #123 - Login form validation error`).

4.  **Pull Requests:**
    *   When your frontend feature or fix is ready, create a pull request (PR) from your branch to the `main` branch of the frontend repository.
    *   Provide a clear title and description for your PR, summarizing the changes and their purpose.
    *   Include screenshots or screen recordings if your PR introduces UI changes.
    *   Request reviews from team members responsible for frontend development.
    *   Be responsive to feedback and address review comments.

5.  **Communication:**
    *   Use [Project Communication Channel - e.g., Slack, Discord, etc.] for team communication, discussions, and updates related to both frontend and backend development.
    *   Clearly communicate your progress, any roadblocks you encounter specifically with the frontend, and your plans.

---
