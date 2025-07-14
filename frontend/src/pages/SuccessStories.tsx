import React from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    content: 'Aintru helped me land my dream job at Google. The AI interviews were incredibly realistic and the feedback was spot-on!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    highlight: true
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager at Meta',
    content: 'The resume builder increased my response rate by 300%. The ATS optimization is game-changing!',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    highlight: false
  },
  {
    name: 'Emily Johnson',
    role: 'Data Scientist at Amazon',
    content: 'The interview feedback was incredibly detailed. I felt confident going into my real interviews after practicing here.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    highlight: false
  }
];

const bgSparkles = [
  { className: 'absolute top-10 left-10 w-10 h-10 bg-yellow-200 rounded-full opacity-30 animate-float', style: { animationDelay: '0s' } },
  { className: 'absolute top-32 right-20 w-8 h-8 bg-pink-200 rounded-full opacity-20 animate-float', style: { animationDelay: '1s' } },
  { className: 'absolute bottom-20 left-1/3 w-6 h-6 bg-blue-200 rounded-full opacity-20 animate-float', style: { animationDelay: '2s' } },
];

const SuccessStories = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-inter relative overflow-hidden">
    <Navigation />
    <div className="relative overflow-hidden">
      {/* Floating sparkles/confetti */}
      {bgSparkles.map((shape, i) => (
        <div key={i} className={shape.className} style={shape.style} />
      ))}
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-24 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Success Stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Real users. Real results. See how Aintru has helped students and professionals land their dream jobs and internships.
        </motion.p>
        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(80,120,255,0.10)' }}
              transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6 transition-all cursor-pointer border-2 ${t.highlight ? 'border-blue-200' : 'border-gray-100'}`}
            >
              <motion.img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover shadow-lg mb-4 md:mb-0"
                whileHover={{ rotateY: 12, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{t.name}</h2>
                <div className="text-sm text-gray-500 mb-2">{t.role}</div>
                <p className="text-gray-700 mb-2">“{t.content}”</p>
                {t.highlight && <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Top Success</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default SuccessStories; 