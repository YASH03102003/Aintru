import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Analytics & Progress
        </motion.h1>
        <p className="text-gray-600 mb-8">Track your interview performance, confidence, and improvement over time.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><BarChart3 className="w-6 h-6 mr-2 text-blue-500" />Performance Overview</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><TrendingUp className="w-6 h-6 mr-2 text-purple-500" />Improvement Suggestions</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Practice more behavioral questions for confidence.</li>
              <li>Review technical concepts in your target role.</li>
              <li>Focus on clear, structured answers (use STAR method).</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 