import React from 'react';

export default function GlassPanel({
  children,
  variant = 'standard',
  className = '',
  style = {},
  onClick = null
}) {
  let variantClass = 'glass';
  if (variant === 'soft') variantClass = 'glass-soft';
  else if (variant === 'strong') variantClass = 'glass-strong';
  else if (variant === 'highlight') variantClass = 'glass-highlight';
  else if (variant === 'success') variantClass = 'glass-success';
  else if (variant === 'warning') variantClass = 'glass-warning';
  else if (variant === 'danger') variantClass = 'glass-danger';

  return (
    <div
      className={`${variantClass} ${className}`}
      style={{ padding: '1.5rem', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
