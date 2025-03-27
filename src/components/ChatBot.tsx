import React, { useState } from 'react';
import OpenAI from 'openai';

const ChatBot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const client = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: 'You are a coding assistant that talks like a pirate',
        input: input,
      });

      // Add assistant message
      const assistantMessage = { role: 'assistant', content: response.output_text };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Yarrr! There be an error reaching the OpenAI seas!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg p-6 max-w-xl mx-auto bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pirate Coding Assistant</h2>
      
      <div className="mb-4">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
          OpenAI API Key
        </label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your OpenAI API key"
        />
      </div>
      
      <div className="mb-4 h-72 overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 italic">Ask the pirate coder a question to get started!</p>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200'} max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        
        {loading && (
          <div className="bg-gray-200 p-2 rounded max-w-[80%] mr-auto">
            <p className="animate-pulse">The pirate is thinking...</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask about coding..."
          disabled={loading}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading || !input.trim() || !apiKey.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;