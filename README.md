# Project Manifesto: AI Content Lab

This document defines the strategic purpose, technical approach, feature set, and development roadmap for the "AI Content Lab" project. It serves as a central reference point for everyone involved in the project.

## 1. Strategic Purpose of the Project (The "WHY")

While powerful AI tools like ChatGPT exist, the purpose of developing our own API is not to reinvent artificial intelligence. Our goal is to transform a raw and powerful AI engine into a **professional service** that is manageable, reliable, and operates according to specific business rules.

Our reasons for developing this project are:

*   **Abstracting Expertise:** To enable users to get the best results with simple commands like "summarize this text" without needing to know expert "prompt engineering." The expertise will be embedded within our back-end code.
*   **Standardizing Output:** To guarantee that other applications can seamlessly use the data by always processing the variable and sometimes messy responses from the AI into a predictable, clean, and structured **JSON format**.
*   **Security and Centralization:** To eliminate security risks and uncontrolled spending by managing valuable and costly API keys in a single, secure location (our back-end).
*   **Cost and Performance Control:** To create a basis for usage analysis and cost optimization by logging all requests made to the AI services.

In summary, we are not offering the user a raw engine, but a reliable, key-in-hand tool designed with that engine to perform specific tasks perfectly.

## 2. Platform Vision and Core Capabilities

The platform is built on logical modules that allow users to perform different analyses based on their needs.

### Module 1: Text Lab 📝 **(Primary Focus)**
The entire focus of the project in this phase will be on this module. The goal is to build a powerful and flexible text-processing engine.

*   **Text Generation:**
    *   **In-depth Summarization:** Summarizes the given text at various levels of length and detail.
    *   **Creative Headline Generation:** Suggests catchy headlines and slogans appropriate to the content and tone of the text.
*   **Text Analysis:**
    *   **Conceptual Keyword Extraction:** Identifies the abstract themes and concepts underlying the text, rather than just simple words.
    *   **Multi-layered Sentiment Analysis:** Detects not only the positive/negative tone of the text but also specific emotions like `[Excitement, Trust, Curiosity, Anxiety]`.
*   **Text Transformation:**
    *   **Text Improvement:** Rewrites the text to make it more fluent, professional, or suitable for a specific target audience.

### Module 2: Visual Lab 🖼️ **(Secondary Priority / Future Vision)**
These are features that can be added after the Text Lab is complete.

*   Intelligent Scene and Object Recognition
*   Automatic Text Caption Generation from Images
*   Text Recognition from Images (OCR)

## 3. Technical Approach and Architecture

### Technology Stack
*   **Backend:** Node.js
*   **Web Framework:** Express.js
*   **AI Service:** OpenAI API (GPT-4 / GPT-3.5-Turbo)
*   **Required Libraries:** `openai`, `express`, `dotenv`, `cors`

### API Architecture: Task-Oriented and Grouped Structure
A multi-endpoint REST API structure that logically groups tasks will be adopted to increase the project's manageability and readability. This structure prevents complexity as the project grows and simplifies adding new features. Actions (like `analysis`, `generation`, `transformation`) will be presented in self-consistent groups.

### Key Concept: System Prompt
A "System Prompt" is a preliminary instruction given to the AI model before assigning it a task, teaching it who it is and how it should behave.

*   **Example:** For a text summarization task, we send the AI a system prompt like, "You are a professional editor who analyzes long texts and extracts the most important points. Your response should only contain the summary text, with no additional explanations."
*   **Benefit:** This ensures the AI produces consistent, reliable, and properly formatted outputs. This approach forms the foundation of our project's professionalism.

## 4. Development Process and Phased Roadmap

The project will be developed using a **"back-end-first"** approach. All API logic and features will be tested and validated with tools like Postman before being connected to a user interface.

### Phase 1: Foundation Setup and Infrastructure
This phase lays the groundwork for the project and creates the first working version.

*   [ ] Set up a Git repository and a Node.js/Express project skeleton.
*   [ ] Create the folder structure according to the architecture (`src`, `api`, `config`, etc.).
*   [ ] Configure the API key and environment variables using a `.env` file.
*   [ ] Create the basic structure for the first endpoint (text summarization task).
*   [ ] Write the basic service function to communicate with the OpenAI service.
*   [ ] Make the first successful text summarization request using Postman.

### Phase 2: First Features (The Text-to-Text Core)
This phase involves implementing the first usable feature set of the project.

*   [ ] **Feature: Text Summarization**
    *   Add parameter support (`length`) to get short, medium, and long summaries.
*   [ ] **Feature: Keyword Extraction**
    *   Complete the relevant endpoint and service logic.
*   [ ] **Feature: Sentiment Analysis**
    *   Complete the relevant endpoint and service logic.

### Phase 3: Expanding Capabilities and Refinement
Adding new capabilities on top of the core features and strengthening the existing system.

*   [ ] **Feature: Creative Headline Generation**
*   [ ] **Feature: Text Rewriting**
*   [ ] Implement a centralized error-handling mechanism.
*   [ ] Add a basic validation layer for incoming requests.

## 5. Project Management and Tracking
Project tasks and progress will be transparently tracked using **Trello**.

*   **Board:** `AI API Project`
*   **Lists (Columns):** `Backlog` (All Ideas), `To-Do`, `In Progress`, `Done`.
*   **Cards:** Each `[ ]` item in the roadmap will be created as a card in Trello with detailed descriptions and sub-tasks (checklists). This will both structure the development process and allow mentors to easily track project progress.

## 6. Technology Stack and Core Tools

### Backend Technologies
*   **Platform:** Node.js
*   **Web Framework:** Express.js
*   **Database:** Not Required for Initial Stage (Stateless)

### AI Services
*   **Primary Service Provider:** OpenAI
*   **Models to be Used:** GPT-4 / GPT-3.5-Turbo

### Development and Management Tools
*   **Package Manager:** NPM
*   **API Testing Tool:** Postman
*   **Version Control System:** Git
*   **Project Management Platform:** Trello
