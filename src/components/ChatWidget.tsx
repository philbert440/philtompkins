'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type WidgetView = 'chat' | 'contact' | 'contact-sent';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<WidgetView>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [contactDetail, setContactDetail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSending, setContactSending] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setStreaming(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          };
          return updated;
        });
        setStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  async function handleContactSubmit(e: FormEvent) {
    e.preventDefault();
    setContactError('');
    setContactSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          contact_method: contactMethod,
          contact_detail: contactDetail,
          message: contactMessage,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Something went wrong.' }));
        setContactError(data.error || 'Something went wrong.');
        return;
      }

      setView('contact-sent');
      setContactName('');
      setContactMethod('email');
      setContactDetail('');
      setContactMessage('');
    } catch {
      setContactError('Network error. Please try again.');
    } finally {
      setContactSending(false);
    }
  }

  function renderChat() {
    return (
      <>
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-gray-500 text-sm text-center mt-8 space-y-2">
              <p>👋 Hi! Ask me anything about Phil.</p>
              <p className="text-xs text-gray-600">
                Want to get in touch?{' '}
                <button
                  onClick={() => setView('contact')}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  Leave a message
                </button>
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/20'
                }`}
              >
                {msg.content}
                {msg.role === 'assistant' && msg.content === '' && streaming && (
                  <span className="inline-flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="px-3 pt-2 text-center">
          <span className="text-[10px] text-gray-600">Powered by AI · Answers may not be perfect</span>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-emerald-500/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Phil..."
              className="flex-1 bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-gray-500"
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </>
    );
  }

  function renderContactForm() {
    return (
      <form onSubmit={handleContactSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center space-y-1 mb-2">
          <p className="text-sm text-gray-300">Leave Phil a message</p>
          <p className="text-xs text-gray-500">He'll get back to you as soon as he can.</p>
        </div>

        <div>
          <label htmlFor="contact-name" className="block text-xs text-gray-400 mb-1">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={100}
            className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-gray-500"
          />
        </div>

        <div>
          <label htmlFor="contact-method" className="block text-xs text-gray-400 mb-1">
            Best way to reach you
          </label>
          <select
            id="contact-method"
            value={contactMethod}
            onChange={(e) => { setContactMethod(e.target.value); setContactDetail(''); }}
            className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50"
          >
            <option value="email">Email</option>
            <option value="phone">Phone call</option>
            <option value="text">Text message</option>
            <option value="twitter">Twitter / X</option>
            <option value="discord">Discord</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-detail" className="block text-xs text-gray-400 mb-1">
            {contactMethod === 'email' ? 'Email address' :
             contactMethod === 'phone' || contactMethod === 'text' ? 'Phone number' :
             contactMethod === 'twitter' ? '@handle' :
             contactMethod === 'discord' ? 'Username' :
             contactMethod === 'linkedin' ? 'Profile URL or name' :
             'How should Phil reach you?'}
          </label>
          <input
            id="contact-detail"
            type={contactMethod === 'email' ? 'email' : 'text'}
            value={contactDetail}
            onChange={(e) => setContactDetail(e.target.value)}
            placeholder={
              contactMethod === 'email' ? 'you@example.com' :
              contactMethod === 'phone' || contactMethod === 'text' ? '(555) 123-4567' :
              contactMethod === 'twitter' ? '@yourhandle' :
              contactMethod === 'discord' ? 'username' :
              contactMethod === 'linkedin' ? 'linkedin.com/in/you' :
              'Your handle, number, or link'
            }
            required
            maxLength={200}
            className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-gray-500"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs text-gray-400 mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            placeholder="What would you like to discuss?"
            required
            maxLength={2000}
            rows={4}
            className="w-full bg-gray-800 text-gray-100 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-gray-500 resize-none"
          />
        </div>

        {contactError && (
          <p className="text-red-400 text-xs text-center">{contactError}</p>
        )}

        <button
          type="submit"
          disabled={contactSending || !contactName.trim() || !contactDetail.trim() || !contactMessage.trim()}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
        >
          {contactSending ? 'Sending...' : 'Send Message'}
        </button>

        <button
          type="button"
          onClick={() => setView('chat')}
          className="w-full text-gray-500 hover:text-gray-300 text-xs transition-colors"
        >
          ← Back to chat
        </button>
      </form>
    );
  }

  function renderContactSent() {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-200 font-medium">Message sent!</p>
        <p className="text-gray-500 text-sm">
          Phil will get back to you soon. Thanks for reaching out.
        </p>
        <button
          onClick={() => setView('chat')}
          className="text-emerald-400 hover:text-emerald-300 text-sm underline underline-offset-2 transition-colors"
        >
          Back to chat
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label="Ask Philbot"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-emerald-500/20"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold text-sm">
                {view === 'chat' ? 'Ask Philbot' : 'Contact Phil'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {view === 'chat' && (
                <button
                  onClick={() => setView('contact')}
                  className="text-gray-500 hover:text-emerald-400 transition-colors text-xs"
                  title="Leave a message for Phil"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* View content */}
          {view === 'chat' && renderChat()}
          {view === 'contact' && renderContactForm()}
          {view === 'contact-sent' && renderContactSent()}
        </div>
      )}
    </>
  );
}
