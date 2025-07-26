# Aintru – AI-Powered Interview Platform

Aintru is a modern, full-stack web app for students and job seekers to practice AI-powered mock interviews, build ATS-optimized resumes, and get personalized job/company suggestions. This README will help anyone clone, set up, and run the app.

---

## 🚀 Features
- AI-powered mock interviews (voice/video)
- Real-time scoring and feedback
- ATS-optimized resume builder
- Analytics dashboard and progress tracking
- Google & GitHub OAuth and email/password login
- Email verification and secure JWT authentication
- Professional, responsive UI/UX

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Zustand, Framer Motion, React Router, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, Passport.js, Nodemailer

---

## ⚡ Quick Start (Anyone Can Run!)

### 1. **Clone the Repo**
```bash
git clone https://github.com/yourusername/aintru.git
cd aintru
```

### 2. **Setup Environment Variables**
- Go to the `backend` folder:
  ```bash
  cd backend
  ```
- Copy the provided `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- **No need to change anything!** All real credentials are included for easy testing.

### 3. **Install Dependencies**
- **Backend:**
  ```bash
  npm install
  ```
- **Frontend:**
  ```bash
  cd ../frontend
  npm install
  ```

### 4. **Run the App**
- **Start Backend:**
  ```bash
  cd ../backend
  node index.js
  ```
- **Start Frontend:**
  ```bash
  cd ../frontend
  npm run dev
  ```

### 5. **Open in Browser**
- Go to [http://localhost:5173](http://localhost:5173)
- Sign up, log in, or use Google/GitHub OAuth
- **No MongoDB IP whitelist needed!**

---

## 🧑‍💻 Project Structure
```
aintru/
├── backend/
│   ├── config/           # Passport.js config
│   ├── models/           # Mongoose models (User, Interview, Resume, etc.)
│   ├── routes/           # Express routes (auth, interview, resume, etc.)
│   ├── .env.example      # All real credentials for easy setup
│   ├── index.js          # Main server file
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/        # All main app pages
│   │   ├── components/   # UI components
│   │   ├── stores/       # Zustand state
│   │   └── ...
│   └── ...
└── README.md
```

---

## 🔐 Authentication & Testing
- **Email/Password:** Sign up and verify via email (check spam if needed)
- **Google/GitHub OAuth:** Works out of the box with provided credentials
- **No IP whitelist needed for MongoDB Atlas**
- **All environment variables are pre-filled for you**

---

## 📝 How to Push Your Code to GitHub

1. **Check your status:**
   ```bash
   git status
   ```
2. **Add all changes:**
   ```bash
   git add .
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Update project: add .env.example, ready for public testing"
   ```
4. **Set your remote (if not already):**
   ```bash
   git remote add origin https://github.com/yourusername/aintru.git
   # (Skip if already set)
   ```
5. **Push to GitHub:**
   ```bash
   git push origin main
   # or, if your branch is called master:
   git push origin master
   ```

---

## 🆘 Need Help?
- If you have any issues, check the browser console and backend terminal for errors.
- Make sure you run both backend and frontend servers.
- For email verification, check your spam folder.
- For MongoDB errors, make sure you have internet access.

---

**Enjoy Aintru! Anyone can test and run this app instantly.** 