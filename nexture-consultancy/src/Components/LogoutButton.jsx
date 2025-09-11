import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '', style = {} }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setShowConfirmation(false);
    }
  };

  const confirmLogout = () => {
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={confirmLogout}
        disabled={isLoggingOut}
        className={`logout-button ${className}`}
        style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoggingOut ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: isLoggingOut ? 0.7 : 1,
          transition: 'all 0.2s ease',
          ...style
        }}
        onMouseOver={(e) => {
          if (!isLoggingOut) {
            e.target.style.backgroundColor = '#c82333';
          }
        }}
        onMouseOut={(e) => {
          if (!isLoggingOut) {
            e.target.style.backgroundColor = '#dc3545';
          }
        }}
      >
        {isLoggingOut ? (
          <>
            <span style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></span>
            Logging out...
          </>
        ) : (
          <>
            <span>🚪</span>
            Logout
          </>
        )}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              color: '#333',
              fontSize: '18px'
            }}>
              Confirm Logout
            </h3>
            <p style={{
              margin: '0 0 24px 0',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Are you sure you want to logout, {user?.username}?
              <br />
              You will need to login again to access the admin panel.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={cancelLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  opacity: isLoggingOut ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!isLoggingOut) {
                    e.target.style.backgroundColor = '#c82333';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoggingOut) {
                    e.target.style.backgroundColor = '#dc3545';
                  }
                }}
              >
                {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default LogoutButton;
