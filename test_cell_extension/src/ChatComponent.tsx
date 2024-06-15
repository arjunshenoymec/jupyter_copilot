import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const inp = input;
    setInput('');
    // Append user message
    setMessages([...messages, { text: inp, isUser: true }]);

    const response = await axios.post("http://localhost:8000/invoke", {
        'text': inp
    });

    console.log(response);

    setMessages([...messages, { text: inp, isUser: true }, { text: response.data.output, isUser: false }]);

  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Assistant</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user-message' : 'server-message'}`}>
            {msg.isUser ? msg.text : <ReactMarkdown>{msg.text}</ReactMarkdown>}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
