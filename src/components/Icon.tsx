import React from 'react';

/**
 * Ícones em SVG inline — elimina a necessidade do Material Symbols (CSS externo bloqueante).
 * Cada ícone é ~200-400 bytes. Total de todos: ~5KB vs 14KB+ do Google Fonts.
 */

const ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
  ),
  verified: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
  ),
  database: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.79 8 4s-3.58 4-8 4-8-1.79-8-4 3.58-4 8-4zm0 14c-4.42 0-8-1.79-8-4v-2.55c1.74 1.67 4.82 2.55 8 2.55s6.26-.88 8-2.55V14c0 2.21-3.58 4-8 4zm0 2c-4.42 0-8-1.79-8-4v-2.55c1.74 1.67 4.82 2.55 8 2.55s6.26-.88 8-2.55V18c0 2.21-3.58 4-8 4z"/></svg>
  ),
  menu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
  ),
  close: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  ),
  groups: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
  ),
  leaderboard: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/></svg>
  ),
  bookmark: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
  ),
  delete: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
  ),
  filter_off: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.79 5.61A.996.996 0 0019 5H6.83l.88.88c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L3.71 4.29a.996.996 0 010-1.41L6.29.29a.996.996 0 011.41 0c.39.39.39 1.02 0 1.41L6.83 3H19c.55 0 1 .45 1 1 0 .21-.08.39-.19.55L14 10.83V16c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-2.17l-4.55 4.55c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l11.3-11.3zM20 20l-2-2H6l8.38-8.38L20 15.17V20z"/></svg>
  ),
  search_off: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 009.5 3 6.47 6.47 0 004.73 5.55l-2.1-2.1L1.39 4.73 4.73 8.07C4.26 8.97 4 9.95 4 11c0 3.87 3.13 7 7 7 1.05 0 2.03-.26 2.93-.73l5.97 5.97 1.41-1.41-5.97-5.97c.18-.36.35-.73.46-1.11zM6.5 11c0-1.66 1.34-3 3-3 .36 0 .71.07 1.03.19L6.69 13.03A2.97 2.97 0 016.5 11z"/></svg>
  ),
  arrow_up: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
  ),
  check_circle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  ),
  error: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
  ),
  info: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  ),
  error_outline: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
  ),
  warning: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  ),
  share: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
  ),
  spinner: ({ className }) => (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5 0 1.64-.8 3.09-2.03 4.03l1.43 1.43C17.97 17.18 19 15.66 19 14c0-3.86-3.14-7-7-7z"/></svg>
  ),
  heart: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  ),
};

interface IconProps {
  name: keyof typeof ICONS;
  className?: string;
}

export default function Icon({ name, className = 'w-6 h-6' }: IconProps) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component className={className} />;
}
