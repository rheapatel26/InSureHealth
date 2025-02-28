import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Shield, Heart, Brain, Notebook as Robot, Clock, Users, Send } from 'lucide-react';

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showTerms, setShowTerms] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const stats = [
    { icon: Shield, title: '98%', description: 'Claims Settlement Ratio' },
    { icon: Clock, title: '24/7', description: 'Customer Support' },
    { icon: Users, title: '1M+', description: 'Happy Customers' },
  ];

  const features = [
    {
      icon: Robot,
      title: 'AI-Powered Assessment',
      description: 'Virtual medical examiner assistant for preliminary health assessment'
    },
    {
      icon: Brain,
      title: 'Smart Recommendations',
      description: 'Personalized policy recommendations based on your profile'
    },
    {
      icon: Heart,
      title: 'Cashless Claims',
      description: 'Network of 5000+ hospitals for hassle-free treatment'
    },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: inputMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Thank you for your message. Our AI is processing your request and will assist you shortly.' 
      }]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="pt-16" style={{backgroundImage: "url('https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg?t=st=1740275271~exp=1740278871~hmac=e8f511029b59c573ad174185451a643dc85555354612245a0be9c07003d1263e&w=2000')"}}>
      {/* Terms and Conditions Popup */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <p className="text-sm mb-4">
              <strong>Effective Date: 22nd February 2025</strong>
              <br /><br />
              Welcome to Virtual Medical Examiner Assistant (VMEA). By accessing or using our services, you agree to comply with and be bound by these terms.
              <br /><br />
              1. The VMEA platform provides preliminary medical assessments for insurance purposes but does not offer medical diagnoses.
              <br />
              2. Users authorize VMEA to retrieve medical records where applicable.
              <br />
              3. Data is securely stored and shared only with authorized parties.
              <br />
              4. Users must provide accurate information and consult professionals for health-related decisions.
              <br />
              5. VMEA is not liable for errors in AI-generated reports.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="accept-terms"
                className="mr-2"
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="accept-terms" className="text-sm">I agree to the Terms and Conditions</label>
            </div>
            <button
              onClick={handleAcceptTerms}
              disabled={!termsAccepted}
              className={`mt-4 px-4 py-2 text-white rounded ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {/* Main Content */}
      {!showTerms && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flow-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-5xl font-bold mb-6"
              >
                Protect What Matters Most
              </motion.h1>
              <p className="text-xl text-gray-600 mb-12">
                Innovative insurance solutions powered by AI for a secure tomorrow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="stat-card"
                >
                  <stat.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-3xl font-sigmar text-primary mb-2">{stat.title}</h3>
                  <p className="font-lora text-gray-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.3 }}
                  className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-merriweather font-bold mb-3">{feature.title}</h3>
                  <p className="font-lora text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Chatbot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className="chatbot-window"
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-merriweather font-bold text-primary">AI Assistant</h3>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="font-lora text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;