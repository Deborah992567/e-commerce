import React from 'react';
import Svg, { Path, Circle, Rect, G, Polyline, Polygon, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B35' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12L12 3l9 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShopIcon: React.FC<IconProps> = ({ size = 24, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth={2} />
    <Path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CartIcon: React.FC<IconProps> = ({ size = 24, color = '#FF5722' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="21" r="1" fill={color} />
    <Circle cx="20" cy="21" r="1" fill={color} />
    <Path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DealsIcon: React.FC<IconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} />
  </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = '#A78BFA' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
  </Svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 24, color = '#FF2D55', filled }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 24, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={2} />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 16, color = '#FFD700', filled }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </Svg>
);

export const FireIcon: React.FC<IconProps> = ({ size = 24, color = '#FF5722' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 23c-3.5 0-7-2.5-7-7 0-3.5 3-6.5 5-9 .5-.5 1.5.2 1.2.8-.5 1.5 1 3 2.5 3 .5 0 1-.2 1.3-.5.3-.3.8-.2 1 .2C18 13 21 16.5 21 17c0 3.5-3.5 6-9 6z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TruckIcon: React.FC<IconProps> = ({ size = 24, color = '#4CAF50' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="1" y="3" width="15" height="13" rx="1" stroke={color} strokeWidth={2} />
    <Path d="M16 8h4l3 3v5h-7V8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth={2} />
    <Circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth={2} />
  </Svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 24, color = '#FF5722' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    <Circle cx="7" cy="7" r="1" fill={color} />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 24, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9H4.5a2.5 2.5 0 010-5H6" stroke={color} strokeWidth={2} />
    <Path d="M18 9h1.5a2.5 2.5 0 000-5H18" stroke={color} strokeWidth={2} />
    <Path d="M4 22h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" stroke={color} strokeWidth={2} />
    <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" stroke={color} strokeWidth={2} />
    <Path d="M18 2H6v7a6 6 0 0012 0V2z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </Svg>
);

export const GiftIcon: React.FC<IconProps> = ({ size = 24, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="20 12 20 22 4 22 4 12" stroke={color} strokeWidth={2} />
    <Rect x="2" y="7" width="20" height="5" rx="1" stroke={color} strokeWidth={2} />
    <Line x1="12" y1="22" x2="12" y2="7" stroke={color} strokeWidth={2} />
    <Path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke={color} strokeWidth={2} />
    <Path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={color} strokeWidth={2} />
  </Svg>
);

export const UsersIcon: React.FC<IconProps> = ({ size = 24, color = '#A78BFA' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth={2} />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2} />
    <Path d="M23 21v-2a4 4 0 00-3-3.87" stroke={color} strokeWidth={2} />
    <Path d="M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth={2} />
  </Svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="15 18 9 12 15 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="9 18 15 12 9 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = '#4CAF50' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="3 6 5 6 21 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={color} strokeWidth={2} />
    <Path d="M10 11v6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M14 11v6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke={color} strokeWidth={2} />
  </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const PackageIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M16.5 9.4l-9-5.19" stroke={color} strokeWidth={2} />
    <Path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={color} strokeWidth={2} />
    <Polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke={color} strokeWidth={2} />
    <Line x1="12" y1="22.08" x2="12" y2="12" stroke={color} strokeWidth={2} />
  </Svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={2} />
    <Polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={2} />
  </Svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = '#4ECDC4' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={2} />
    <Polyline points="9 12 11 14 15 10" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={2} />
  </Svg>
);

export const HelpIcon: React.FC<IconProps> = ({ size = 24, color = '#A78BFA' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Circle cx="12" cy="17" r="0.5" fill={color} />
  </Svg>
);

export const ScaleIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth={2} />
    <Polyline points="1 7 6 7 12 3 18 7 23 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 10l-5 7h10L6 10z" stroke={color} strokeWidth={2} />
    <Path d="M18 10l-5 7h10l-5-7z" stroke={color} strokeWidth={2} />
  </Svg>
);

export const LogOutIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth={2} />
    <Polyline points="16 17 21 12 16 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="1" y="4" width="22" height="16" rx="2" stroke={color} strokeWidth={2} />
    <Line x1="1" y1="10" x2="23" y2="10" stroke={color} strokeWidth={2} />
  </Svg>
);

export const WalletIcon: React.FC<IconProps> = ({ size = 24, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12V7H5a2 2 0 010-4h14v4" stroke={color} strokeWidth={2} />
    <Path d="M3 5v14a2 2 0 002 2h16v-5" stroke={color} strokeWidth={2} />
    <Circle cx="18" cy="16" r="1" fill={color} />
  </Svg>
);

export const SortIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="4" y1="12" x2="16" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="4" y1="18" x2="12" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 24, color = '#A0A0A0' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </Svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ size = 24, color = '#FF5722' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="17 6 23 6 23 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CoinsIcon: React.FC<IconProps> = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth={2} />
    <Line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="2" y1="12" x2="6" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="18" y1="12" x2="22" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const CartBagIcon: React.FC<IconProps> = ({ size = 48, color = '#E8C97A' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path d="M8 8h4l3 22h22l3-18H14" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="18" cy="38" r="3" fill={color} />
    <Circle cx="32" cy="38" r="3" fill={color} />
  </Svg>
);

export const LogoIcon: React.FC<IconProps> = ({ size = 32, color = '#FF5722' }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path d="M16 2L4 8v8c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16V8L16 2z" fill={color} />
    <Path d="M12 16l4 4 8-8" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
