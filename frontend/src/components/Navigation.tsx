import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import logo from '../assets/aintru-logo.png';
import { useAuthStore } from '../stores/authStore';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Success Stories', to: '/success-stories' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Contact', to: '/contact' },
];

const appLinks = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Mock Interview', to: '/mock-interview' },
  { name: 'Resume Builder', to: '/resume-builder' },
  { name: 'Analytics', to: '/analytics' },
  { name: 'Job Matches', to: '/job-matches' },
  { name: 'Settings', to: '/settings' },
];

const AintruLogo = () => (
  <svg width="32" height="64" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,0 90,0 75,30 45,30" fill="#3498db"/>
    <polygon points="45,30 75,30 70,60 50,60" fill="#3498db"/>
    <polygon points="50,60 70,60 65,90 55,90" fill="#3498db"/>
    <polygon points="55,90 65,90 60,120 60,120" fill="#3498db"/>
    <polygon points="60,120 60,120 55,150 65,150" fill="#3498db"/>
    <polygon points="55,150 65,150 60,180 60,180" fill="#3498db"/>
    <polygon points="60,180 60,180 55,210 65,210" fill="#3498db"/>
    <polygon points="55,210 65,210 60,240 60,240" fill="#3498db"/>
    <polygon points="60,240 60,240 55,270 65,270" fill="#3498db"/>
    <polygon points="55,270 65,270 60,300 60,300" fill="#3498db"/>
    <polygon points="60,300 60,300 50,320 70,320" fill="#3498db"/>
    <circle cx="60" cy="340" r="20" fill="#3498db"/>
  </svg>
);

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Aintru Logo" className="h-14 w-auto" />
            <span className="text-2xl font-bold bg-gradient-to-r from-enteru-600 to-enteru-800 bg-clip-text text-transparent">
              Aintru
            </span>
          </div>
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {appLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-1 text-base text-gray-700 hover:text-enteru-600 transition-colors font-medium`}
                    style={{ fontWeight: location.pathname === link.to ? 'bold' : 'normal' }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="relative flex items-center ml-4">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full border-2 border-enteru-500" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-enteru-500 to-enteru-700 flex items-center justify-center text-white font-bold text-lg">
                      {user?.name ? user.name[0] : user?.email[0]}
                    </div>
                  )}
                  <span className="hidden sm:inline text-gray-700 font-medium">{user?.name || user?.email}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => { navigate('/profile'); setDropdownOpen(false); }}>Profile</button>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => { navigate('/settings'); setDropdownOpen(false); }}>Settings</button>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50" onClick={() => { logout(); setDropdownOpen(false); }}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1 text-base text-gray-700 hover:text-enteru-600 transition-colors font-medium`}
                  style={{ fontWeight: location.pathname === link.to ? 'bold' : 'normal' }}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="hidden sm:flex"
              >
                Log In
              </Button>
              <Button
                variant="gradient"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;