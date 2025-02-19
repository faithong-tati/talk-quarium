# 🚀 Frontend - Next.js 15

This directory contains the **frontend application** built with **Next.js 15**, following a **component-based architecture with Atomic Design**.

---

## 📌 Features
- **Latest Next.js 15**: Utilizing the App Router for improved performance and flexibility.
- **Atomic Design Pattern**: UI components structured for reusability and maintainability.
- **Context API**: Global state management.
- **React Hook Form**: Provides a form generator and validation.
- **Form Generator**: A dynamic form builder leveraging `react-hook-form` and MUI components for effortless form handling.
- **TanStack React Query**: Efficient API data fetching and caching.
- **MUI & Emotion**: Material UI components with Emotion styling.
- **Environment Variables**: `.env` file is included for configuration.

---

## 🛠 Installation

Ensure you have the following installed:
- **Node.js** (>= 20.x)
- **npm** or **Yarn**

### 1️⃣ Clone the repository
```sh
$ git clone https://github.com/faithong-tati/talk-quarium.git
$ cd frontend
```

### 2️⃣ Install dependencies

Using **npm**:
```sh
$ npm install
```
or using **Yarn**:
```sh
$ yarn install
```

### 3️⃣ Set up environment variables
A `.env` file is already included in the project (not ignored in Git). Ensure it has the correct configuration:
```
NEXT_PUBLIC_TALK_QUARIUM_API_BASE_URL=http://127.0.0.1:4000
```

---

## 🚀 Running the Application

### Development Mode

```sh
$ npm run dev
```
Or
```sh
$ yarn dev
```

---

## 🔍 Linting & Formatting
To run ESLint and Prettier checks:

```sh
$ npm run lint
```
Or
```sh
$ yarn lint
```

---

## 📂 Folder Structure
```
frontend/
│-- src/
│   │-- app/          # Next.js App Router
│   │-- components/   # UI components (Atomic Design)
│   │-- constants/    # Shared constants, enums, types
│   │-- contexts/     # Global state management (Context API)
│   │-- decorators/   # Response formatters
│   │-- lib/          # Utility libraries
│   │-- service/      # API integration hooks
│   │-- styles/       # Global and component styles
│   │-- utils/        # General helper functions
│-- .env             # Environment variables (already included)
│-- package.json     # Project dependencies and scripts
```

---

## 📜 Form Generator
The **Form Generator** is a reusable component leveraging **React Hook Form** and MUI components to dynamically render forms. It allows easy form creation by passing an array of field configurations.

### 🛠 How It Works
- Uses `react-hook-form` for form state management and validation.
- Supports different field types: `input`, `textarea`, and `select`.
- Watches for field changes and triggers callbacks for real-time data handling.
- Uses **MUI components** (`AtomInput`, `AtomAutocomplete`) for UI consistency.

### 📄 Example Usage
```tsx
<FormGenerator
  fields=[
    { name: "title", type: InputType.INPUT, placeholder: "Enter title" },
    { name: "content", type: InputType.TEXTAREA, placeholder: "Enter content" },
    { name: "topic", type: InputType.SELECT, options: ["Food", "Health"] }
  ]
  defaultValues={{ title: "", content: "", topic: "Food" }}
  onSubmit={(data) => console.log(data)}
/>
```

---

## 📜 Package.json Highlights
Your **frontend** uses the following key dependencies:

### 🔥 **Core Dependencies**
- **Next.js 15** (`next`, `react`, `react-dom`): Provides SSR, routing, and optimized performance.
- **React Hook Form** (`react-hook-form`): Lightweight and efficient form management with validation.
- **TanStack React Query** (`@tanstack/react-query`): Optimized data fetching and state synchronization.
- **Axios** (`axios`): HTTP client for API communication.
- **Day.js** (`dayjs`): Minimal date/time library for formatting and manipulation.
- **JWT Decode** (`jwt-decode`): Decodes JWT tokens for authentication handling.
- **Lodash** (`lodash`): Utility library for functional programming.
- **MUI & Emotion** (`@mui/material`, `@emotion/react`, `@emotion/styled`): Component-based styling and UI framework.
- **Notistack** (`notistack`): Snackbar notification handling.

### 🔍 **Development & Testing**
- **Linting & Formatting:**
  - `eslint`, `prettier`, `eslint-config-next`, `eslint-plugin-react`, `eslint-plugin-import`
- **TypeScript Support:**
  - `typescript`, `@types/react`, `@types/node`, `@typescript-eslint/eslint-plugin`
- **Performance & Optimization:**
  - `eslint-plugin-sonarjs`, `eslint-plugin-sort-class-members`, `eslint-plugin-unused-imports`

---

## 📬 Contact
Have questions or need support? Reach out! 🚀  
📧 **Email:** [faithong.tati@gmail.com](mailto:faithong.tati@gmail.com)

