# AI Content Lab - An Intelligent & Scalable AI API Project

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

This project is an **"AI Capability Factory"**, designed to transform powerful, raw AI models like Google's Gemini and OpenAI's GPT into a manageable, scalable, and flexible professional backend service.

The core strength of this project lies in its ability to introduce new AI capabilities to the system **without changing the application code**, simply by adding a new **template** to the database. This provides incredible development speed and architectural flexibility.

---

## 🚀 Strategic Purpose of the Project (The "Why")

The goal is not to reinvent artificial intelligence but to build a professional service that wraps raw AI engines with specific business rules, security, and reliability.

-   **Abstracting Expertise:** Enables users to achieve optimal results with simple commands, eliminating the need for expert "prompt engineering." The expertise is embedded within our backend logic.
-   **Standardizing Output:** Guarantees that the variable and sometimes unstructured responses from the AI are always processed into a predictable, clean, and structured JSON format, making it easy for other applications to consume.
-   **Security & Centralization:** Manages valuable and costly API keys in a single, secure backend location, eliminating security risks and uncontrolled spending.
-   **Flexibility & Scalability:** Avoids vendor lock-in by allowing the integration of any AI provider (Gemini, OpenAI, etc.) without altering the core business logic of the application.

---

## 🏛️ Architecture and Technical Approach

The project is built on a layered architecture that adheres to the **Separation of Concerns** principle. The lifecycle of a request follows the **Router -> Validator -> Controller -> Service** flow.

### Key Concepts

-   **Dynamic Template Engine:** Core tasks like "text summarization" or "translation" are not hard-coded. They are managed as dynamic templates stored in a `Template` table in the database. Each template contains a `system_prompt`, a `default_model`, and a list of `allowed_models`.
-   **Abstracted AI Providers (Strategy Pattern):** Different AI services (`GeminiService`, `OpenAIService`) are abstracted behind a common `AIProvider` interface. A central `AIManager` service acts as a factory, dynamically selecting the correct provider based on the requested model name (e.g., any model starting with 'gpt' is routed to `OpenAIService`). This makes the system incredibly extensible.
-   **Centralized Error Handling:** All errors thrown within the application are standardized using a custom `AppError` class. Errors from the service layer are propagated up to the controller, which then passes them to a single Global Error Handler middleware using `next(error)`. This ensures consistent and secure error responses.
-   **Type-Safe Validation:** Incoming request bodies are rigorously validated against strict rules defined in DTO (Data Transfer Object) classes using the `class-validator` library. Invalid requests are rejected at the entry point before they can reach the core business logic.

---

## 🛠️ Technology Stack & Tools

### Backend Technologies
-   **Platform:** [Node.js](https://nodejs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Web Framework:** [Express.js](https://expressjs.com/)
-   **Database ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **Validation:** [class-validator](https://github.com/typestack/class-validator)

### AI Services Integrated
-   **Google Gemini:** `gemini-1.5-flash`, `gemini-1.5-pro`, etc.
-   **OpenAI:** `gpt-4o`, `gpt-4`, `gpt-3.5-turbo`, etc.

### Development & Management Tools
-   **Package Manager:** NPM
-   **API Testing Tool:** [Postman](https://www.postman.com/)
-   **Version Control:** Git
-   **Project Management:** Trello

---

## ⚙️ Setting Up and Running the Project Locally

### Prerequisites
-   Node.js (v18+ recommended)
-   A running PostgreSQL database instance

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    -   Create a `.env` file in the project's root directory.
    -   Copy the contents of `.env.example` and fill in your own credentials:
    ```env
    # --- Database Configuration ---
    DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
    
    # --- Server Configuration ---
    PORT=3000
    
    # --- API Keys ---
    GEMINI_API_KEY="..."
    OPENAI_API_KEY="..."
    ```

4.  **Set Up and Seed the Database:**
    -   This command creates the database schema based on `prisma/schema.prisma` and runs the `prisma/seed.ts` script to populate the `Template` table with initial capabilities.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the Development Server:**
    -   The server will start on `http://localhost:3000`.
    ```bash
    npm run dev
    ```
---

## 📖 API Usage

All capabilities of the project are accessed through a single, intelligent endpoint.

### Primary Endpoint

-   `POST /api/v1/templates/:id/execute`

#### Request Body
-   **`placeholders` (required):** An object used to fill in the dynamic variables within the template's `system_prompt`.
-   **`model` (optional):** A string specifying which AI model to use for the task. If omitted, the template's `default_model` from the database will be used. The specified model must be in the template's `allowed_models` list.

#### Example Request (Using OpenAI's GPT-4o for a summarization task)
```json
{
  "placeholders": {
    "text_to_process": "This is a long text that needs to be summarized by the AI.",
    "language": "English"
  },
  "model": "gpt-4o"
}
