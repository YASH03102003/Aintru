import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import logo from '../assets/aintru-logo.png';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Success Stories', to: '/success-stories' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Contact', to: '/contact' },
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
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              console.log('NAV DEBUG:', location.pathname, link.to, location.pathname === link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1 text-base text-gray-700 hover:text-enteru-600 transition-colors font-medium`}
                  style={{ fontWeight: location.pathname === link.to ? 'bold' : 'normal' }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;