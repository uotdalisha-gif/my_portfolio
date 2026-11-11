import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name.toLowerCase()) {
    case 'html5':
    case 'html':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L5.8 20.2L12 22L18.2 20.2L20 2H4Z" fill="#E44D26"/>
          <path d="M12 3.8V20.2L16.8 18.8L18.3 3.8H12Z" fill="#F16529"/>
          <path d="M8.2 7.2H15.8L15.6 9.4H10.6L10.9 12.2H15.3L15 15.6L12 16.4L9 15.6L8.8 13.8H6.7L7.1 17.5L12 18.8L16.9 17.5L17.5 7.2H8.2Z" fill="white"/>
        </svg>
      );
    case 'css3':
    case 'css':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L5.8 20.2L12 22L18.2 20.2L20 2H4Z" fill="#1572B6"/>
          <path d="M12 3.8V20.2L16.8 18.8L18.3 3.8H12Z" fill="#33A9DC"/>
          <path d="M8.2 7.2H15.8L15.6 9.4H10.6L10.9 12.2H15.3L15 15.6L12 16.4L9 15.6L8.8 13.8H6.7L7.1 17.5L12 18.8L16.9 17.5L17.5 7.2H8.2Z" fill="white"/>
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path d="M6 18.5C6.5 19.3 7.3 20 8.5 20C10.2 20 11.2 19 11.2 17.2V11H9.2V17.1C9.2 17.9 8.8 18.3 8.1 18.3C7.5 18.3 7.1 18 6.7 17.3L6 18.5ZM13.8 19.5C14.8 20.1 16 20.5 17.3 20.5C20.3 20.5 21.8 19 21.8 16.7C21.8 14.6 20.5 13.7 18.7 12.9L18 12.6C16.8 12.1 16.2 11.7 16.2 10.9C16.2 10.1 16.9 9.5 18 9.5C19 9.5 19.8 9.9 20.4 10.5L21.3 9.3C20.4 8.4 19.3 8 18 8C15.3 8 14 9.5 14 11.5C14 13.5 15.2 14.4 17 15.1L17.7 15.4C19 16 19.7 16.5 19.7 17.5C19.7 18.5 18.8 19.1 17.4 19.1C16.1 19.1 15 18.5 14.3 17.6L13.8 19.5Z" fill="#000000"/>
        </svg>
      );
    case 'react':
    case 'react & ts':
    case 'react.js':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9 2C8.7 2 6.8 3.4 6.8 5.7V7.8H12V8.9H4.4C2.5 8.9 1 10.4 1 12.3C1 14.2 2.5 15.7 4.4 15.7H6.1V13.8C6.1 11.8 7.7 10.2 9.7 10.2H14.9C16.4 10.2 17.6 9 17.6 7.5V5.7C17.6 3.4 15.1 2 11.9 2ZM9.5 3.8C10.1 3.8 10.6 4.3 10.6 4.9C10.6 5.5 10.1 6 9.5 6C8.9 6 8.4 5.5 8.4 4.9C8.4 4.3 8.9 3.8 9.5 3.8Z" fill="#3776AB"/>
          <path d="M12.1 22C15.3 22 17.2 20.6 17.2 18.3V16.2H12V15.1H19.6C21.5 15.1 23 13.6 23 11.7C23 9.8 21.5 8.3 19.6 8.3H17.9V10.2C17.9 12.2 16.3 13.8 14.3 13.8H9.1C7.6 13.8 6.4 15 6.4 16.5V18.3C6.4 20.6 8.9 22 12.1 22ZM14.5 20.2C13.9 20.2 13.4 19.7 13.4 19.1C13.4 18.5 13.9 18 14.5 18C15.1 18 15.6 18.5 15.6 19.1C15.6 19.7 15.1 20.2 14.5 20.2Z" fill="#FFD43B"/>
        </svg>
      );
    case 'php':
    case 'php & mysql':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="7" fill="#777BB4"/>
          <path d="M6 14.5V9.5H8.2C9.4 9.5 10.1 10.1 10.1 11.1C10.1 12.1 9.3 12.7 8.1 12.7H7.3V14.5H6ZM7.3 11.5H8C8.6 11.5 9 11.4 9 11C9 10.6 8.6 10.5 8.1 10.5H7.3V11.5ZM11 14.5V9.5H12.3V11.3H14V9.5H15.3V14.5H14V12.4H12.3V14.5H11ZM16.3 14.5V9.5H18.5C19.7 9.5 20.4 10.1 20.4 11.1C20.4 12.1 19.6 12.7 18.4 12.7H17.6V14.5H16.3ZM17.6 11.5H18.3C18.9 11.5 19.3 11.4 19.3 11C19.3 10.6 18.9 10.5 18.4 10.5H17.6V11.5Z" fill="white"/>
        </svg>
      );
    case 'tailwind':
    case 'tailwind css':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6C9 6 7.5 7.5 7.5 10.5C8.25 9.75 9.15 9.3 10.2 9.15C11.4 9 12.3 9.9 13.5 11.1C15 12.6 17.1 13.5 19.5 13.5C22.5 13.5 24 12 24 9C23.25 9.75 22.35 10.2 21.3 10.35C20.1 10.5 19.2 9.6 18 8.4C16.5 6.9 14.4 6 12 6ZM4.5 13.5C1.5 13.5 0 15 0 18C0.75 17.25 1.65 16.8 2.7 16.65C3.9 16.5 4.8 17.4 6 18.6C7.5 20.1 9.6 21 12 21C15 21 16.5 19.5 16.5 16.5C15.75 17.25 14.85 17.7 13.8 17.85C12.6 18 11.7 17.1 10.5 15.9C9 14.4 6.9 13.5 4.5 13.5Z" fill="#38BDF8"/>
        </svg>
      );
    case 'figma':
    case 'ui / ux design':
    case 'poster & branding':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M8 24C10.2 24 12 22.2 12 20V16H8C5.8 16 4 17.8 4 20C4 22.2 5.8 24 8 24Z" fill="#0ACF83"/>
          <path d="M4 12C4 9.8 5.8 8 8 8H12V16H8C5.8 16 4 14.2 4 12Z" fill="#A259FF"/>
          <path d="M4 4C4 1.8 5.8 0 8 0H12V8H8C5.8 8 4 6.2 4 4Z" fill="#F24E1E"/>
          <path d="M12 0H16C18.2 0 20 1.8 20 4C20 6.2 18.2 8 16 8H12V0Z" fill="#FF7262"/>
          <path d="M20 12C20 14.2 18.2 16 16 16C13.8 16 12 14.2 12 12C12 9.8 13.8 8 16 8C18.2 8 20 9.8 20 12Z" fill="#1ABCFE"/>
        </svg>
      );
    case 'git':
    case 'git & github':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 10.8L13.2 1.5C12.5 0.8 11.5 0.8 10.8 1.5L8.7 3.6L11.4 6.3C12.1 6 12.9 6.2 13.5 6.8C14.1 7.4 14.3 8.3 13.9 9L16.5 11.6C17.2 11.2 18.1 11.4 18.7 12C19.5 12.8 19.5 14.1 18.7 14.9C17.9 15.7 16.6 15.7 15.8 14.9C15.2 14.3 15 13.4 15.4 12.7L12.9 10.2V16.3C13.3 16.6 13.6 17.1 13.6 17.7C13.6 18.8 12.7 19.7 11.6 19.7C10.5 19.7 9.6 18.8 9.6 17.7C9.6 17 10 16.4 10.6 16.1V9.9C10 9.6 9.6 9 9.6 8.3C9.6 7.6 9.9 7 10.5 6.6L7.8 3.9L1.5 10.2C0.8 10.9 0.8 11.9 1.5 12.6L10.8 21.9C11.5 22.6 12.5 22.6 13.2 21.9L22.5 12.6C23.2 11.9 23.2 10.8 22.5 10.8Z" fill="#F05032"/>
        </svg>
      );
    case 'notion':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 4L16.5 2.5L20 4.5V19.5L12 21.5L4 20V4.5L4.5 4Z" fill="white"/>
          <path d="M8 8V16L12 10V16L15 8" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'meta':
    case 'active directory':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9 4C14.7 4 13.2 5.5 12 7.1C10.8 5.5 9.3 4 7.1 4C3.2 4 0 7.3 0 11.8C0 17 4.1 20 7.8 20C10.2 20 11.4 18.6 12 17.5C12.6 18.6 13.8 20 16.2 20C19.9 20 24 17 24 11.8C24 7.3 20.8 4 16.9 4ZM7.7 16.7C5.5 16.7 3.2 14.8 3.2 11.8C3.2 8.9 5.4 7.3 7.6 7.3C9.9 7.3 11.1 9.4 12 11.1C11.1 12.9 9.8 16.7 7.7 16.7ZM16.3 16.7C14.2 16.7 12.9 12.9 12 11.1C12.9 9.4 14.1 7.3 16.4 7.3C18.6 7.3 20.8 8.9 20.8 11.8C20.8 14.8 18.5 16.7 16.3 16.7Z" fill="#0081FB"/>
        </svg>
      );
    case 'google':
    case 'ai productivity':
    case 'ai':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 12.3C22.5 11.5 22.4 10.7 22.3 10H12V14.3H17.9C17.6 15.7 16.8 16.9 15.6 17.7V20.5H19.2C21.3 18.6 22.5 15.7 22.5 12.3Z" fill="#4285F4"/>
          <path d="M12 23C15 23 17.5 22 19.2 20.5L15.6 17.7C14.6 18.4 13.4 18.8 12 18.8C9.1 18.8 6.7 16.8 5.8 14.2H2.1V17.1C3.9 20.6 7.7 23 12 23Z" fill="#34A853"/>
          <path d="M5.8 14.2C5.6 13.4 5.5 12.5 5.5 11.6C5.5 10.7 5.6 9.8 5.8 9H2.1V11.9C1.4 13.3 1 14.9 1 16.6C1 18.3 1.4 19.9 2.1 21.3L5.8 14.2Z" fill="#FBBC05"/>
          <path d="M12 4.4C13.6 4.4 15.1 5 16.3 6.1L19.3 3.1C17.5 1.4 15 0.2 12 0.2C7.7 0.2 3.9 2.6 2.1 6.1L5.8 9C6.7 6.4 9.1 4.4 12 4.4Z" fill="#EA4335"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#3b82f6"/>
          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
};

