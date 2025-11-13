import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hallo! Ich bin der A+ Bot. Wie kann ich Ihnen bei Fragen zu unseren Produkten oder Projekten helfen?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const systemInstruction = `You are a friendly and professional chatbot assistant for "A+ Urban Design", a company specializing in modular, high-quality concrete and steel elements for public spaces like skateparks, pumptracks, and more. Your name is 'A+ Bot'. You communicate exclusively in German. Your primary goal is to answer questions about the company's products (Grillstelle, Umkleidekabine, Hockey-Banden, Pumptrack), past projects, and the company's philosophy (robust, modular, foundation-free). CRITICAL RULE: Under no circumstances should you invent, discuss, or speculate about prices, costs, or specific contractual details. You are not authorized for sales. If a user asks about prices or contracts, you MUST politely decline and immediately offer to help draft an email to the sales team. Use a phrase like this: "Ich kann Ihnen leider keine Auskunft zu Preisen oder vertraglichen Details geben. Ich kann aber gerne eine E-Mail-Anfrage für Sie an unser Team vorbereiten. Sollen wir das machen?"`;
      
      const contents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: inputValue }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
        }
      });
      
      const botResponse: Message = { text: response.text, sender: 'bot' };
      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error('Error communicating with Gemini:', error);
      const errorMessage: Message = {
        text: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-orange text-white w-16 h-16 rounded-full shadow-2xl shadow-brand-orange/40 flex items-center justify-center hover:bg-opacity-90 transform hover:-translate-y-1 transition-all"
          aria-label="Chatbot öffnen"
        >
          <span className="material-symbols-outlined text-3xl">voice_chat</span>
        </button>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 w-[calc(100%-4rem)] max-w-md h-[70vh] bg-brand-surface rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center">
             <span className="text-xl font-black font-heading text-brand-heading tracking-tighter">A+<span className="text-brand-orange"> Bot</span></span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-white" aria-label="Chat schließen">
             <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={chatMessagesRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-brand-orange text-white rounded-br-lg'
                    : 'bg-brand-bg text-brand-text rounded-bl-lg'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-[80%] p-3 rounded-2xl bg-brand-bg text-brand-text rounded-bl-lg">
                   <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-brand-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-brand-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-brand-muted rounded-full animate-bounce"></span>
                   </div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Stellen Sie eine Frage..."
              className="w-full px-4 py-2 bg-brand-bg border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-brand-orange text-white rounded-full p-2 disabled:bg-brand-muted"
              aria-label="Nachricht senden"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
