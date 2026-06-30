import { useState, useRef, useEffect } from 'react';
import { Send, Loader, AlertCircle } from 'lucide-react';
import { Lang, tr } from '../translations';

interface Props {
  lang: Lang;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

interface ErrorState {
  show: boolean;
  message: string;
}

const suggestedQuestions = {
  en: [
    'Tell me about your professional IT background and career journey',
    'What are the most significant projects you have worked on?',
    'How do you design and manage network infrastructure?',
    'How do you approach troubleshooting complex IT issues?',
    'How do you support multi-site hospitality operations?',
    'What technologies and platforms are you most experienced with?',
  ],
  id: [
    'Ceritakan tentang latar belakang profesional IT dan perjalanan karier Anda',
    'Apa saja proyek paling signifikan yang pernah Anda kerjakan?',
    'Bagaimana Anda merancang dan mengelola infrastruktur jaringan?',
    'Bagaimana pendekatan Anda dalam menangani dan menyelesaikan masalah IT yang kompleks?',
    'Bagaimana Anda mendukung operasional bisnis hospitality yang memiliki banyak lokasi/cabang?',
    'Teknologi dan platform apa yang paling Anda kuasai dan gunakan?',
  ],
};

export default function AskMe({ lang }: Props) {
  const t = tr[lang];
  const questions = suggestedQuestions[lang];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);
  const [error, setError] = useState<ErrorState>({ show: false, message: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setError({ show: false, message: '' });

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.type as 'user' | 'assistant',
        content: msg.content,
      }));

      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversationHistory: conversationHistory,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch from backend');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.content[0].text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';

      setError({
        show: true,
        message: errorMessage,
      });

      const errorAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
      };

      setMessages((prev) => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const showChat = messages.length > 0;

  return (
    <div className="py-10 min-h-[calc(100vh-100px)] flex flex-col">
      {!showChat && (
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white">
            {t.askMeTitle}
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t.askMeSubtitle}
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {error.show && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800 dark:text-red-200">{error.message}</p>
            </div>
            <button
              onClick={() => setError({ show: false, message: '' })}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-lg flex-shrink-0"
            >
              ×
            </button>
          </div>
        )}

        {showChat && (
          <div className="mb-6 flex-1 overflow-y-auto pr-2 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-none border border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded-lg rounded-bl-none border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="mb-8 relative">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.askMePrompt}
              disabled={isLoading}
              className="flex-1 px-4 py-3 md:py-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 md:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Send size={18} />
              <span className="hidden md:inline">Send</span>
            </button>
          </div>
        </div>

        {!showChat && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
            <p className="text-xs md:text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wide">
              Suggested questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {questions.map((question, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setHoveredQuestion(index)}
                  onMouseLeave={() => setHoveredQuestion(null)}
                  onClick={() => handleQuestionClick(question)}
                  className={`p-3 md:p-4 rounded-lg text-left text-sm md:text-base transition-all duration-200 border text-zinc-900 dark:text-white font-medium ${
                    hoveredQuestion === index
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-300 dark:border-blue-700 shadow-lg shadow-blue-500/10'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs md:text-sm font-semibold transition-colors duration-200 ${
                        hoveredQuestion === index
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    >
                      →
                    </span>
                    <span className="flex-1">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}