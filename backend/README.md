# 🚀 Backend - NestJS

This directory contains the **backend API** built using **NestJS**, following a **modular folder structure**.

---

## 📌 Features
- **Authentication:** Simple username-based sign-in.
- **CRUD Operations:** Users can create, read, update, and delete posts and comments.
- **Role-Based Restrictions:** Users can only modify or delete their own posts/comments.
- **Database Integration:** Uses TypeORM with **SQLite** (no need for a database port).
- **SQLite Database is Synced:** The database schema is automatically synchronized without requiring migrations.
- **Environment Variables:** `.env` file is already included in the project.
- **Swagger API Documentation:** Available at **[http://127.0.0.1:4000/api](http://127.0.0.1:4000/api)**.
- **Unit Testing:** Includes Jest test coverage for all services, ensuring stability and correctness of features.

---

## 🛠 Installation

Ensure you have the following installed:
- **Node.js** (>= 20.x)
- **npm** or **Yarn**

### 1️⃣ Clone the repository
```sh
$ git clone https://github.com/faithong-tati/talk-quarium.git
$ cd backend
```

### 2️⃣ Install dependencies

Using **npm**:
```sh
$ npm install
```
Or using **Yarn**:
```sh
$ yarn install
```

### 3️⃣ Set up environment variables
A `.env` file is already included in the project (not ignored in Git). Ensure it has the correct configuration:
```
APP_HOSTNAME=127.0.0.1
APP_PORT=4000
JWT_SECRET=<jwt-secret-key>
```

### 4️⃣ Database Configuration
Since **SQLite is synchronized automatically**, you don’t need to run migrations. The schema will be generated automatically based on your entities.

---

## 🚀 Running the Server

### Development Mode
```sh
$ npm run start:dev
```
Or
```sh
$ yarn start:dev
```

---

## 🧪 Unit Testing
Unit tests are implemented using **Jest** to ensure the reliability and correctness of core services. 
- **Service Tests:** Cover business logic and edge cases.
- **Repository Mocks:** Uses in-memory mock repositories for testing without affecting the real database.
- **Error Handling:** Validates responses for expected and unexpected errors.
- **Test Coverage:** Can be checked using:

```sh
$ npm run test:cov
```
Or
```sh
$ yarn test:cov
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
backend/
│-- src/
│   │-- modules/   # Modular feature-based folders (auth, users, posts, comments)
│   │-- common/    # Shared constants, decorators, base dtos, base entities, base examples
│   │-- utils/     # Provide exceptions, filters, guards, helpers
│   │-- main.ts    # Entry point of the application
│-- .env           # Environment variables (already included)
│-- package.json   # Project dependencies and scripts
```

---

### 🔥 **Essential Backend Packages**
- **NestJS Modules:** 
  - `@nestjs/core`, `@nestjs/common`, `@nestjs/typeorm`, `@nestjs/jwt`, `@nestjs/passport` for building modular backend services.
- **Database & ORM:**
  - `typeorm`, `sqlite3` for handling database interactions with SQLite.
- **Validation & Transformation:**
  - `class-validator`, `class-transformer` for data validation and transformation.
- **API Documentation:**
  - `@nestjs/swagger`, `swagger-ui-express` for generating interactive API documentation.

### 🔍 **Development & Testing Packages**
- **Testing:**
  - `jest`, `supertest`, `ts-jest` for writing unit and integration tests.
- **Linting & Formatting:**
  - `eslint`, `prettier`, `eslint-plugin-import` for code quality enforcement.
- **TypeScript & Build Tools:**
  - `typescript`, `ts-node`, `tsconfig-paths` for TypeScript support.
- **Debugger & Utilities:**
  - `source-map-support`, `dotenv` for better debugging and environment configuration.


---

## 📬 Contact
Have questions or need support? Reach out! 🚀  
📧 **Email:** [faithong.tati@gmail.com](mailto:faithong.tati@gmail.com)

