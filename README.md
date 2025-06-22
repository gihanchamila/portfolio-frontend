## Portfolio Website Documentation

This documentation covers both the frontend and backend repositories for your portfolio website.

---

## **Overview**

Your portfolio website is a full stack application, with the frontend built using React and Vite, and the backend hosted in a separate repository. The project is structured for maintainability and scalability, following modern web development best practices.

---

## **Repositories**

- **Frontend:** [portfolio-frontend](https://github.com/gihanchamila/portfolio-frontend)
- **Backend:** [portfolio-backend](https://github.com/gihanchamila/portfolio-backend)

---

## **Frontend**

**Repository:** [portfolio-frontend](https://github.com/gihanchamila/portfolio-frontend)

### **Tech Stack**

- React (with Vite for fast development and HMR)
- ESLint for code linting
- Babel or SWC for fast refresh and transpilation

### **Features**

- Minimal setup for React with Vite
- Hot Module Replacement (HMR) for a smooth development experience
- ESLint integration for code quality
- Easily extensible to TypeScript for type safety

### **Getting Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gihanchamila/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### **Configuration**

- You can expand the ESLint configuration for production use.
- To add TypeScript support, follow the Vite and `typescript-eslint` integration guides.

### **Customizing**

- Update the `src` directory with your portfolio components and assets.
- Adjust Vite and ESLint config files as needed for your workflow.

---

## **Backend**

**Repository:** [portfolio-backend](https://github.com/gihanchamila/portfolio-backend)

### **Purpose**

- Handles all API requests and manages server-side logic for your portfolio website.

### **Getting Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gihanchamila/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the backend server:**
   ```bash
   npm start
   ```

### **Configuration**

- Update environment variables as needed (e.g., database URIs, API keys).
- Ensure the backend server URL is correctly set in your frontend for API communication.

---

## **Connecting Frontend and Backend**

- The frontend communicates with the backend via RESTful APIs.
- Update the API base URL in your frontend configuration to point to your backend server.

---

## **Contact**

For questions or support, please open an issue in the relevant repository.

---
