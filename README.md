# ⏳ Hourvest

**Hourvest** is a time-based help exchange platform where users trade **minutes (minits)** instead of money. Whether it's offering a service or requesting help, the value is time, and trust is built one task at a time.

---

## 🔧 Features

- 👥 **User Authentication**
  - Google OAuth login
  - JWT-based session management

- 🔁 **Proposals**
  - Send, accept, or reject task proposals
  - Time (minits) transfer on acceptance

- 📦 **Task Management**
  - Create tasks with descriptions and tags
  - View tasks by other users

- 💬 **Conversations**
  - Real-time chat system
  - One conversation per task interaction

- 🎯 **Time Economy**
  - Every user starts with a time balance
  - Tasks and proposals affect balances

---

## 🚀 Tech Stack

**Frontend** :
- React


**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT for protected routes

---

## 🛠️ Getting Started

### 📁 Clone the repository
```bash
git clone https://github.com/your-username/hourvest.git
cd hourvest
```
⚙️ Backend Setup
Go to the backend folder
```bash
cd backend
```
Install dependencies
```bash
npm install
```
Create .env file in /backend
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```


🔒 Auth Flow Summary
Google login handled via Passport.js.

Backend generates a JWT and returns it to the frontend.

All protected routes use:

```bash
Authorization: Bearer <your_token>
```


🔜 Upcoming: Notifications, Profile Management, UI polish

🧠 Team

Backend: Vansh Wadhwa, Guransh Arora, Abhishek Srivastva

Frontend: Aaditya Bansal, Tannu Sharma 



📜 License
MIT License

"Because time is the real currency."


