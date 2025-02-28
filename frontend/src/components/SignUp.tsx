import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, FileText, Send, Shield } from 'lucide-react';

const SignUp = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Welcome! I'll help you sign up for SecureLife insurance. I'll ask you a few questions to understand your needs better. Ready to begin?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  // Handle sending a message
  const handleSendMessage = async (message:string) => {
    if (!message.trim()) return;
    try {
      // Send the user's message to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.botMessage) {
        // Add the bot's response to the chat
        setMessages((prev) => [...prev, { type: 'bot', text: data.botMessage }]);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = "An error occurred while fetching the response";
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      // Fallback message in case of an error
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: errorMessage,
        },
      ]);
    }

    setInputMessage('');

  };
  const handleTypeMessage = async () => {
    if (!inputMessage.trim()) return;
    try {
      setMessages((prev) => [...prev, { type: 'user', text: inputMessage }]);
      // Send the user's message to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.botMessage) {
        // Add the bot's response to the chat
        setMessages((prev) => [...prev, { type: 'bot', text: data.botMessage }]);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = "An error occurred while fetching the response";
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      // Fallback message in case of an error
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: errorMessage,
        },
      ]);
    }

    setInputMessage('');

  };

  // Handle key press for sending a message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTypeMessage();
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages(prev => [...prev, {
        type: 'user',
        text: `Uploaded document: ${file.name}`,
        isFile: true
      }]);
    }
  };

  // Start/stop recording
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        // Initialize Web Speech API
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false; // Only final results
        recognition.continuous = true; // Keep recording until stopped

        recognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setInputMessage(transcript);

          // Send the transcribed message to the backend

          setMessages((prev) => [...prev, { type: 'user', text: transcript }]);
          handleSendMessage(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          stopRecording();
        };

        recognition.start();
        recognitionRef.current = recognition;

        setIsRecording(true);
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    } else {
      stopRecording();
    }
  };

  // Stop recording and clean up
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop speech recognition
    }
    if (timerRef.current) {
      clearInterval(timerRef.current); // Stop the recording timer
    }
    setIsRecording(false);
  };

  return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-merriweather font-bold text-gray-900">Sign Up</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Chat Interface */}
            <div className="bg-white rounded-xl shadow-lg h-[70vh] flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                          className={`max-w-[70%] p-4 rounded-2xl ${
                              message.type === 'user'
                                  ? 'bg-primary text-white ml-auto'
                                  : 'bg-gray-100 text-gray-800'
                          } ${message.isFile ? 'border border-primary/20' : ''}`}
                      >
                        {message.isFile && <FileText className="h-5 w-5 mb-2" />}
                        <p className="font-lora text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-gray-50 rounded-2xl p-2">
                  <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full bg-transparent border-0 focus:ring-0 resize-none font-lora text-gray-800 min-h-[44px] max-h-32 py-2 px-3"
                      rows={1}
                  />
                    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <button
                            onClick={toggleRecording}
                            className={`p-2 rounded-full transition-colors ${
                                isRecording ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'
                            }`}
                        >
                          {isRecording ? (
                              <MicOff className="h-5 w-5" />
                          ) : (
                              <Mic className="h-5 w-5" />
                          )}
                        </button>
                        {isRecording && (
                            <span className="text-sm text-gray-600">{recordingTime}s</span>
                        )}
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <FileText className="h-5 w-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                      onClick={() => handleTypeMessage()}
                      className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Audio Player */}
              {/* <div className="p-4">
                <audio ref={audioRef} controls>
                  <source src="backend/speech_output.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignUp;