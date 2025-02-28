import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' },
];

const LoginForm = ({ onClose, isAdmin = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      // ✅ Allow any admin credentials and redirect
      navigate('/admin'); // Redirect to Admin Dashboard
    } else {
      alert('Only admin login is enabled for now.');
    }
    
    onClose(); // Close the login modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-lg p-8 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-merriweather font-bold text-primary mb-6">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-lora font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-lora font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="ml-2 text-sm font-lora text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm font-lora text-primary hover:text-primary/80">
              Forgot password?
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-lora"
          >
            Sign In
          </button>
          
          {!isAdmin && (
            <p className="text-center text-sm font-lora text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80">
                Sign up
              </Link>
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-md fixed w-full z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-sigmar text-xl text-primary">InSureHealth</span>
            </Link>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/verify')}
                className="navbar-link font-lora"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="navbar-link font-lora"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setShowAdminLogin(true)}
                className="navbar-link font-lora"
              >
                Admin Login
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 navbar-link"
                >
                  <Globe className="h-5 w-5" />
                  <span className="font-lora">{languages.find(l => l.code === currentLang)?.name}</span>
                </button>

                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showUserLogin && <LoginForm onClose={() => setShowUserLogin(false)} />}
        {showAdminLogin && <LoginForm onClose={() => setShowAdminLogin(false)} isAdmin={true} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;