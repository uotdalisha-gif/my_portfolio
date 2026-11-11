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
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-display text-white">Message Sent Successfully!</h3>
        <p className="text-base text-slate-300 max-w-sm">
          Thank you for reaching out. I will respond to your inquiry via email as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Sokha"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0e] border border-white/10 text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-[#60a5fa] focus-visible:ring-2 focus-visible:ring-[#60a5fa] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
            Your Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0e] border border-white/10 text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-[#60a5fa] focus-visible:ring-2 focus-visible:ring-[#60a5fa] transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me about your project, idea, or questions..."
          className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0e] border border-white/10 text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-[#60a5fa] focus-visible:ring-2 focus-visible:ring-[#60a5fa] transition-colors resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onMouseEnter={() => onCursorEnter?.('SEND', 'hover')}
        onMouseLeave={onCursorLeave}
        className="w-full py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] active:scale-[0.99] disabled:opacity-50 text-white font-bold font-mono text-base flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.65)] border border-blue-400/40 hover:border-blue-300/70 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
      >
        <Send className="w-5 h-5" />
        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
};
