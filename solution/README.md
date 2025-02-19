
---

## 📌 Overview

This folder consists of **two main directories**:

---

## 1️⃣ API Specification (`api-spec/`)

This folder contains **API definitions** in **PlantUML**, showing how users interact with the system.

### 🔐 **User Authentication**
1. `sign-in.plantuml` → User must **sign in with only a username**.

### 📝 **Post APIs**
1. `create-post.plantuml` → User creates a post **with a topic** (`Food, Pets, Health, Fashion, Exercise, Others`).
2. `get-public-posts.plantuml` → Fetch **all public posts sorted from newest to oldest**.
3. `get-private-posts.plantuml` → Fetch **all personalized posts sorted from newest to oldest**.
4. `get-post-by-id.plantuml` → Fetch **a specific post by ID**.
5. `update-post.plantuml` → User **can edit only their own post**.
6. `delete-post.plantuml` → User **can delete only their own post**.

### 💬 **Comment APIs**
1. `create-comment.plantuml` → User adds **a 1-level comment** (no nested replies).
2. `get-comments-by-post-id.plantuml` → Fetch **all comments for a post (newest first)**.

### 👤 **User APIs**
1. `get-user.plantuml` → Fetch user profile.

---

## 2️⃣ Schema (`schema/`)

This folder contains **data model definitions** in **PlantUML**, representing the structure of users, posts, and comments.

### 📄 **Data Models**
1. `index.plantuml` → **Overview** of the database relationships.
2. `users.plantuml` → Defines **user structure**.
3. `posts.plantuml` → Defines **post structure**.
4. `comments.plantuml` → Defines **comment structure**.

---

## 🛠 How to Use  

1. **View API Diagrams**  
   - Open `.plantuml` files with [PlantText](https://www.planttext.com/) or a PlantUML plugin.

2. **Understand the System**  
   - Check **schema diagrams** to see how data is structured.

---

## 👥 Contact  
Any questions? Let me know! 🚀  

📧 Email: [faithong.tati@gmail.com](mailto:faithong.tati@gmail.com)
