import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

interface ContactFormProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onCursorEnter,
  onCursorLeave
}) => {
  const { formData, isSubmitted, isSubmitting, updateField, handleSubmit } = useContactForm();

  if (isSubmitted) {
    return (
      <div className="p-6 bg-[#3b66f5]/15 border border-[#3b66f5] rounded-xl flex items-center gap-4 text-slate-200">
        <CheckCircle2 className="w-8 h-8 text-[#3b66f5] shrink-0" />
        <div>
          <h4 className="font-bold text-white">Message dispatched!</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Thank you for reaching out. I'll review your inquiry and reply promptly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Sokha"
            className="w-full px-4 py-2.5 rounded-xl bg-[#05050a] border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3b66f5] focus-visible:ring-2 focus-visible:ring-[#3b66f5] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5">
            Your Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#05050a] border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3b66f5] focus-visible:ring-2 focus-visible:ring-[#3b66f5] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me about your project, idea, or questions..."
          className="w-full px-4 py-2.5 rounded-xl bg-[#05050a] border border-slate-800 text-white text-sm focus:outline-none focus:border-[#3b66f5] focus-visible:ring-2 focus-visible:ring-[#3b66f5] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onMouseEnter={() => onCursorEnter?.('SEND', 'hover')}
        onMouseLeave={onCursorLeave}
        className="w-full py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] active:scale-[0.99] disabled:opacity-50 text-white font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] border border-blue-400/30 hover:border-blue-300/60 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
};

