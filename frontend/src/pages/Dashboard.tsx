import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Award, 
  Clock, 
  Target,
  ArrowRight,
  Brain,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import logo from '../assets/aintru-logo.png';

const Dashboard = () => {
  const performanceData = [
    { date: 'Jan', score: 65 },
    { date: 'Feb', score: 72 },
    { date: 'Mar', score: 78 },
    { date: 'Apr', score: 85 },
    { date: 'May', score: 92 },
  ];

  const recentInterviews = [
    { company: 'Google', role: 'Software Engineer', score: 92, date: '2024-01-15' },
    { company: 'Meta', role: 'Product Manager', score: 88, date: '2024-01-10' },
    { company: 'Amazon', role: 'Data Scientist', score: 85, date: '2024-01-05' },
  ];

  const stats = [
    { label: 'Total Interviews', value: '24', icon: Brain, color: 'from-blue-500 to-blue-600' },
    { label: 'Average Score', value: '88%', icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Improvement', value: '+15%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { label: 'Hours Practiced', value: '42', icon: Clock, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Welcome back, Alex! 👋
          </motion.h1>
          <p className="text-gray-600 mt-2">
            You're making great progress. Let's keep building towards your dream job.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <img src={logo} alt="Aintru Logo" className="w-6 h-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Interviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{interview.company}</p>
                    <p className="text-sm text-gray-600">{interview.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{interview.score}%</p>
                    <p className="text-xs text-gray-500">{interview.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <Brain className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Start Mock Interview</h3>
            <p className="text-blue-100 text-sm mb-4">
              Practice with our AI interviewer for your target role
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <span>Start Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Optimize Resume</h3>
            <p className="text-green-100 text-sm mb-4">
              Improve your resume with AI-powered suggestions
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <span>Build Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <Target className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Job Matches</h3>
            <p className="text-purple-100 text-sm mb-4">
              Discover opportunities that match your skills
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <span>View Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;