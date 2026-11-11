---
name: clean-code
description: Enforce Clean Code principles for React and TypeScript (.tsx) files. Use when refactoring large AI-generated components, typing props, or organizing portfolio code.
---

# Clean Code Guidelines for React & TypeScript (.tsx)

## Component Architecture
- Break monolithic `.tsx` files into small, single-responsibility components (e.g., `Navbar`, `Hero`, `ProjectCard`, `ContactForm`) inside a `src/components/` folder.
- Keep individual component files under 150 lines whenever possible.
- Separate business logic and state management into custom hooks (e.g., `useScrollAnimation.ts`) inside `src/hooks/`.

## TypeScript & Data Hygiene
- Define explicit `interface` or `type` definitions for all component props and data structures; never use `any`.
- Extract hardcoded portfolio content (projects, skills, experience, social links) out of JSX and into a dedicated `src/data/portfolioData.ts` file.

## Naming & Readability
- Use PascalCase for component names and files (`ProjectCard.tsx`) and camelCase for variables, functions, and hooks.
- Name boolean variables and props with clear prefixes like `is`, `has`, or `should` (e.g., `isMenuOpen`, `hasError`).
- Keep JSX clean by avoiding deeply nested ternary operators; extract complex conditional rendering into helper variables or subcomponents.

## Styling & Boy Scout Rule
- Avoid bloated inline `style={{ ... }}` objects; use consistent Tailwind utility classes or modular CSS files.
- Remove unused imports, dead code, and redundant comments that only restate what the JSX does.

## Accessibility & Semantic HTML
- Replace generic `<div>` wrappers with semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Add descriptive `alt` text to every `<img>` and `aria-label` attributes to icon-only buttons (like social links or mobile menu toggles).
- Ensure interactive elements use `<button>` or `<a>` tags rather than `<div onClick={...}>`.

## Performance & Media Hygiene
- Add `loading="lazy"` to project images and media below the hero fold.
- Clean up `useEffect` hooks by always returning a cleanup function for event listeners (`window.addEventListener`) or intervals.
- Move static constants and helper functions outside the component body so they are not recreated on every render.

## Security & Link Safety
- Add `target="_blank" rel="noopener noreferrer"` to all external project and social links.
- Remove any placeholder API keys, dummy tracking IDs, or unused `console.log()` statements.
## Motion & Reduced-Motion Safety
- Respect user accessibility settings by supporting `prefers-reduced-motion` (e.g., using Tailwind's `motion-reduce:` modifiers or Framer Motion's `useReducedMotion` hook).
- Animate only GPU-friendly properties (`transform` and `opacity`) rather than layout properties like `width`, `height`, or `top`.

## SEO & Portfolio Polish
- Ensure every page has a single, clear `<h1>` heading for the hero title and logical heading hierarchy (`<h2>`, `<h3>`) below it.
- Keep interactive states consistent by adding visible `focus-visible:` outline rings to all buttons, links, and form inputs.
