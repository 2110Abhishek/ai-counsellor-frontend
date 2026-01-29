import { useState, useRef, useEffect } from "react";
import api from "../api/api";
import ChatBox from "../components/ChatBox";
import { Bot, User, Sparkles, Send } from "lucide-react";

export default function Counsellor() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    setLoading(true);
    const userMessage = { from: "user", text };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const res = await api.post("/counsellor/chat", { message: text });
      const aiMessage = { from: "ai", text: res.data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { from: "ai", text: "Sorry, I'm having trouble connecting. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Study Abroad Counsellor</h1>
              <p className="text-blue-100">24/7 personalized guidance for your journey</p>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-300 ml-auto" />
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Start Your Conversation
              </h3>
              <p className="text-gray-600 max-w-md">
                Ask me anything about universities, applications, visas, or study abroad planning.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Best universities for Computer Science?",
                  "How to prepare for IELTS?",
                  "Scholarship opportunities in Germany",
                  "Visa requirements for USA"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(suggestion)}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      m.from === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {m.from === "ai" ? (
                        <Bot className="w-5 h-5 text-blue-500 mr-2" />
                      ) : (
                        <User className="w-5 h-5 text-white mr-2" />
                      )}
                      <span className="font-semibold">
                        {m.from === "ai" ? "AI Counsellor" : "You"}
                      </span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                      </div>
                      <span className="text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4">
          <ChatBox onSend={sendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}