import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Upload, ArrowRight } from 'lucide-react';

const AI_AVATAR = 'https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png'; // Placeholder avatar

const MockInterview = () => {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [mode, setMode] = useState<'voice' | 'video' | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

  // Step 1: Resume Upload
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  // Step 2: Mode Selection
  const handleModeSelect = (selectedMode: 'voice' | 'video') => {
    setMode(selectedMode);
    setStep(3);
  };

  // Step 3: Start Interview
  const startInterview = () => {
    setInterviewStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
        >
          AI Mock Interview
        </motion.h1>
        {/* Step 1: Resume Upload */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-gray-600 mb-4 text-center">Please upload your latest resume to personalize your interview experience.</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="mb-4"
              onChange={handleResumeUpload}
            />
            {resume && (
              <div className="mb-4 text-green-600 font-medium">{resume.name} selected</div>
            )}
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-colors"
              disabled={!resume}
              onClick={() => setStep(2)}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        {/* Step 2: Mode Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-6">Choose Interview Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <button
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
                onClick={() => handleModeSelect('voice')}
              >
                <Mic className="w-10 h-10 mb-3" />
                <span className="font-bold text-lg mb-1">Voice Mock Interview</span>
                <span className="text-blue-100 text-sm">Start with voice if you feel nervous about video. Practice answering with confidence.</span>
              </button>
              <button
                className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
                onClick={() => handleModeSelect('video')}
              >
                <Video className="w-10 h-10 mb-3" />
                <span className="font-bold text-lg mb-1">Video Mock Interview</span>
                <span className="text-pink-100 text-sm">Face our AI HR visually, just like a real interview. Get feedback on your presence and confidence.</span>
              </button>
            </div>
          </motion.div>
        )}
        {/* Step 3: Interview UI */}
        {step === 3 && mode && !interviewStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-6">Ready to Start?</h2>
            <p className="text-gray-600 mb-6">You chose <span className="font-bold">{mode === 'voice' ? 'Voice' : 'Video'} Mock Interview</span>. Click below to begin.</p>
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-colors"
              onClick={startInterview}
            >
              <span>Start Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        {/* Step 4: Interview Experience */}
        {step === 3 && mode && interviewStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            {mode === 'voice' ? (
              <div className="w-full flex flex-col items-center">
                <Mic className="w-12 h-12 text-blue-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Voice Mock Interview</h2>
                <p className="text-gray-600 mb-4">(Voice interview UI and logic will go here: record answers, play questions, show progress, timer, and feedback.)</p>
                {/* TODO: Integrate voice recording and AI Q&A logic */}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                <div className="mb-4 flex flex-col items-center">
                  <img src={AI_AVATAR} alt="AI HR" className="w-20 h-20 rounded-full border-4 border-purple-500 mb-2" />
                  <span className="font-semibold text-purple-700">AI HR Interviewer</span>
                </div>
                <Video className="w-12 h-12 text-purple-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Video Mock Interview</h2>
                <p className="text-gray-600 mb-4">(Video interview UI and logic will go here: webcam, record answers, show progress, timer, and feedback.)</p>
                {/* TODO: Integrate webcam recording and AI Q&A logic */}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;