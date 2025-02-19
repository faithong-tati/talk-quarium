# 📌 Solution - Overview

This directory consists of **two main directories**:

---

## 1️⃣ API Specification (`api-spec/`)

This directory contains **API definitions** in **PlantUML**, detailing how users interact with the system.

### 🔐 **User Authentication**
1. `sign-in.plantuml` → Users must **sign in using only a username** (no registration or email confirmation).

### 📝 **Post APIs**  
Posts are **user-generated content** that belong to a specific category (`Food, Pets, Health, Fashion, Exercise, Others`). Users can **create, read, update, and delete** posts, but they can only modify or delete their own posts.

1. `create-post.plantuml` → Users can **create a post** by selecting a topic.
2. `get-public-posts.plantuml` → Fetch **all public posts** sorted **newest to oldest**.
3. `get-private-posts.plantuml` → Fetch **personalized posts** for a signed-in user (sorted newest to oldest).
4. `get-post-by-id.plantuml` → Fetch **a specific post by ID**, including its comments.
5. `update-post.plantuml` → Users **can edit only their own posts**.
6. `delete-post.plantuml` → Users **can delete only their own posts**.

### 💬 **Comment APIs**  
Each post can have **multiple comments**, but **only one level of comments is supported** (no nested replies).

1. `create-comment.plantuml` → Users can **add a comment** under a post.
2. `get-comments-by-post-id.plantuml` → Fetch **all comments for a post**, sorted **newest to oldest**.

### 👤 **User APIs**  
Users are **identified only by a username** and **an optional profile image**.

1. `get-user.plantuml` → Fetch **user profile details** (includes `username`, `userImageUrl`).

---

## 2️⃣ Schema (`schema/`)

This directory contains **data model definitions** in **PlantUML**, representing the relationships between **users, posts, and comments**.

### 📄 **Data Models**
1. `index.plantuml` → **System-wide overview** of the database relationships.
2. `users.plantuml` → Defines **user structure**:
   - Users **own** posts and comments.
   - Users can create **multiple posts** and **multiple comments**.
3. `posts.plantuml` → Defines **post structure**:
   - Each post **belongs to one user** (`user_id` foreign key).
   - Each post **can have multiple comments**.
4. `comments.plantuml` → Defines **comment structure**:
   - Each comment **belongs to one user** (`user_id` foreign key).
   - Each comment **belongs to one post** (`post_id` foreign key).
   - Comments **do not support nested replies**.

---

## 🔗 **Entity Relationships**
| Entity  | Relationship |
|---------|-------------|
| User → Post | **One-to-Many** (A user can create multiple posts) |
| User → Comment | **One-to-Many** (A user can post multiple comments) |
| Post → Comment | **One-to-Many** (A post can have multiple comments) |

---

## 🛠 How to Use  

### 1️⃣ **View API Diagrams**  
   - Open `.plantuml` files using:
     - [PlantText](https://www.planttext.com/)
     - A PlantUML plugin for **VS Code**

### 2️⃣ **Understand the Data Model**  
   - Check **schema diagrams** (`schema/`) to see how data is structured.
   - Explore **entity relationships** (`index.plantuml`) for database logic.

---

## 📬 Contact  
Have questions or suggestions? Let's connect! 🚀  

📧 **Email:** [faithong.tati@gmail.com](mailto:faithong.tati@gmail.com)  