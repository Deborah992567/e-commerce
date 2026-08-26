import React from 'react';
import { TruckIcon } from './Icons';

interface DeliveryMapProps {
  currentLocation: string;
  eta: string;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({ currentLocation, eta }) => {
  return (
    <div style={{
      width: '100%',
      height: 300,
      backgroundColor: '#23232B',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,87,34,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        animation: 'pulse 2s ease-in-out infinite',
        marginBottom: 16,
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,87,34,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TruckIcon size={36} color="#FF5722" />
        </div>
      </div>

      <p style={{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 600,
        margin: '8px 0 4px',
      }}>
        Tracking your delivery
      </p>

      <p style={{
        color: '#8E8E93',
        fontSize: 13,
        margin: '0 0 12px',
      }}>
        {currentLocation}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 16px',
        backgroundColor: 'rgba(255,87,34,0.12)',
        borderRadius: 20,
      }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#FF5722',
        }} />
        <span style={{
          color: '#FF5722',
          fontSize: 14,
          fontWeight: 600,
        }}>
          ETA: {eta}
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default DeliveryMap;
