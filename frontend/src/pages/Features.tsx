import React from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import { Sparkles, FileText, TrendingUp, Users, Video, Target } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
  {
    icon: <Sparkles className="w-10 h-10 text-blue-500" />, // 3D/animated look
    title: 'AI-Powered Mock Interviews',
    description: 'Practice with realistic AI interviewers tailored to your dream company and role.'
  },
  {
    icon: <FileText className="w-10 h-10 text-green-500" />,
    title: 'ATS-Optimized Resume Builder',
    description: 'Build resumes that pass through ATS systems and impress hiring managers.'
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed analytics and personalized improvement suggestions.'
  },
  {
    icon: <Users className="w-10 h-10 text-orange-500" />,
    title: 'Company-Specific Prep',
    description: 'Get insights into specific companies and their interview processes.'
  },
  {
    icon: <Video className="w-10 h-10 text-pink-500" />,
    title: 'Video Interview Practice',
    description: 'Practice with video interviews and get feedback on body language and confidence.'
  },
  {
    icon: <Target className="w-10 h-10 text-indigo-500" />,
    title: 'Smart Job Matching',
    description: 'Get personalized job recommendations based on your skills and performance.'
  }
];

const bgShapes = [
  { className: 'absolute top-20 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30 animate-float', style: { animationDelay: '0s' } },
  { className: 'absolute top-40 right-20 w-16 h-16 bg-green-100 rounded-full opacity-20 animate-float', style: { animationDelay: '1s' } },
  { className: 'absolute bottom-20 left-1/4 w-12 h-12 bg-purple-100 rounded-full opacity-20 animate-float', style: { animationDelay: '2s' } },
];

const Features = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-inter relative overflow-hidden">
    <Navigation />
    <div className="relative overflow-hidden">
      {/* Floating background shapes */}
      {bgShapes.map((shape, i) => (
        <div key={i} className={shape.className} style={shape.style} />
      ))}
      <div className="max-w-5xl mx-auto pt-20 px-4 pb-24 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Aintru Features
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Discover all the powerful tools and AI-driven features Aintru offers to help you land your dream job with confidence and grow your career.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(80,120,255,0.10)' }}
              transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition-all cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'loop', delay: i * 0.2 }}
                className="mb-4"
              >
                {feature.icon}
              </motion.div>
              <h2 className="text-xl font-semibold mb-2 text-center">{feature.title}</h2>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Features; 