import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

export default function ChatBox({ onSend, disabled }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-2">
        <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
          <Mic className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <input
            className="w-full pl-6 pr-24 py-4 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400"
            placeholder="Ask about universities, applications, or study abroad..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}