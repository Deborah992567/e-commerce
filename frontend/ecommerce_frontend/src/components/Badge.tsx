import React from 'react';

type BadgeColor = 'accent' | 'success' | 'error' | 'gold' | 'muted';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const colorMap: Record<BadgeColor, string> = {
  accent: '#FF5722',
  success: '#4ECDC4',
  error: '#FF2D55',
  gold: '#FFD700',
  muted: '#A0A0A0',
};

const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: { fontSize: '11px', padding: '2px 8px', gap: '4px' },
  md: { fontSize: '13px', padding: '4px 12px', gap: '6px' },
  lg: { fontSize: '15px', padding: '6px 16px', gap: '8px' },
};

const Badge: React.FC<BadgeProps> = ({
  label,
  color = 'accent',
  size = 'md',
  icon,
}) => {
  const bg = colorMap[color];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        backgroundColor: bg,
        color: '#fff',
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;
