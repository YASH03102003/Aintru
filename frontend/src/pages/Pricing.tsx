import React from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Footer from '../components/Footer';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      '2 AI mock interviews/month',
      'Basic resume builder',
      'Limited analytics'
    ],
    highlight: false,
    border: 'border-blue-100'
  },
  {
    name: 'Pro',
    price: '₹299/mo',
    features: [
      'Unlimited AI interviews',
      'Advanced resume builder',
      'Full analytics & reports',
      'Job recommendations'
    ],
    highlight: true,
    border: 'border-blue-400'
  },
  {
    name: 'College/Team',
    price: 'Custom',
    features: [
      'Admin dashboard',
      'Batch analytics',
      'Faculty scheduling',
      'Bulk discounts'
    ],
    highlight: false,
    border: 'border-green-200'
  }
];

const bgShapes = [
  { className: 'absolute top-20 left-10 w-24 h-24 bg-purple-100 rounded-full opacity-30 animate-float', style: { animationDelay: '0s' } },
  { className: 'absolute top-40 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-float', style: { animationDelay: '1s' } },
  { className: 'absolute bottom-20 left-1/4 w-12 h-12 bg-green-100 rounded-full opacity-20 animate-float', style: { animationDelay: '2s' } },
];

const Pricing = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-inter relative overflow-hidden">
    <Navigation />
    <div className="relative overflow-hidden">
      {/* Floating background shapes */}
      {bgShapes.map((shape, i) => (
        <div key={i} className={shape.className} style={shape.style} />
      ))}
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-24 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Pricing Plans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Choose the plan that fits your career goals. All plans come with a free trial and no hidden fees.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,120,255,0.10)' }}
              transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border-2 ${plan.border} relative transition-all cursor-pointer`}
            >
              {plan.highlight && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold z-10"
                >
                  <Star className="w-4 h-4 text-yellow-300" /> Most Popular
                </motion.div>
              )}
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>
              <ul className="text-gray-600 mb-6 space-y-2 text-center">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="btn-primary w-full">{plan.highlight ? 'Start Pro' : plan.name === 'Starter' ? 'Start Free' : 'Contact Sales'}</button>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow p-8 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <ul className="space-y-4">
            <li>
              <strong>Is there a free trial?</strong>
              <p className="text-gray-600">Yes! All plans come with a 7-day free trial. No credit card required.</p>
            </li>
            <li>
              <strong>Can I cancel anytime?</strong>
              <p className="text-gray-600">Absolutely. You can cancel or change your plan at any time from your dashboard.</p>
            </li>
            <li>
              <strong>Do you offer college or team discounts?</strong>
              <p className="text-gray-600">Yes, we offer special pricing for colleges and teams. Contact us for details.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Pricing; 