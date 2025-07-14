import React from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Footer from '../components/Footer';

const bgShapes = [
  { className: 'absolute top-20 left-10 w-24 h-24 bg-blue-100 rounded-full opacity-30 animate-float', style: { animationDelay: '0s' } },
  { className: 'absolute top-40 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-float', style: { animationDelay: '1s' } },
  { className: 'absolute bottom-20 left-1/4 w-12 h-12 bg-green-100 rounded-full opacity-20 animate-float', style: { animationDelay: '2s' } },
];

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-inter relative overflow-hidden">
    <Navigation />
    <div className="relative overflow-hidden">
      {/* Floating background shapes */}
      {bgShapes.map((shape, i) => (
        <div key={i} className={shape.className} style={shape.style} />
      ))}
      <div className="max-w-2xl mx-auto pt-20 px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 text-center mb-12 max-w-xl mx-auto"
        >
          Have questions, need support, or want to partner with Aintru? Fill out the form below or reach us directly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'loop' }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-full shadow-lg"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="bg-white rounded-2xl shadow p-8 space-y-6"
        >
          <motion.div whileFocus={{ scale: 1.03 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" className="input-field" placeholder="Your Name" required />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.03 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="input-field" placeholder="you@email.com" required />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.03 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea className="input-field" rows={4} placeholder="How can we help you?" required />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="btn-primary w-full"
            type="submit"
          >
            Send Message
          </motion.button>
        </motion.form>
        <div className="mt-12 text-center text-gray-600">
          <div>Email: <a href="mailto:support@aintru.com" className="text-blue-600 underline">support@aintru.com</a></div>
          <div>Phone: <a href="tel:+911234567890" className="text-blue-600 underline">+91 12345 67890</a></div>
          <div className="mt-2">Aintru, India</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Contact; 