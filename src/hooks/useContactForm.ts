import { useState, useCallback, FormEvent } from 'react';
import { ContactFormData } from '../types/portfolio';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate async transmission
    const timer = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      const resetTimer = setTimeout(() => {
        setIsSubmitted(false);
      }, 4500);

      return () => clearTimeout(resetTimer);
    }, 600);

    return () => clearTimeout(timer);
  }, [formData]);

  return {
    formData,
    isSubmitted,
    isSubmitting,
    updateField,
    handleSubmit
  };
}

