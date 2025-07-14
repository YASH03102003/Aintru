import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import Onboarding from './pages/Onboarding';
import MockInterview from './pages/MockInterview';
import ResumeBuilder from './pages/ResumeBuilder';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import { useAuthStore } from './stores/authStore';
import Features from './pages/Features';
import SuccessStories from './pages/SuccessStories';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VerifyPage';
import OAuthSuccess from './pages/OAuthSuccess';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navigation />}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
            <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/verify" element={<VerifyPage />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;