import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import base_url from '../../config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create authenticated axios instance
  const authAxios = useMemo(() => {
    const instance = axios.create();
    
    // Add authorization header to all requests
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Handle token refresh on 401 errors
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${base_url}/api/auth/refresh-token`, {
                refreshToken
              });

              if (response.data.success) {
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                
                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Use the logout function defined below
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        }

        return Promise.reject(error);
      }
    );
    
    return instance;
  }, []);

  // Set up axios interceptor for automatic token attachment
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${base_url}/api/auth/refresh-token`, {
                refreshToken
              });

              if (response.data.success) {
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                
                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        // Verify token is still valid by making a request to get profile
        const response = await axios.get(`${base_url}/api/auth/profile`);
        
        if (response.data.success) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${base_url}/api/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        const userData = response.data.data.user;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed. Please try again.';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 401) {
        message = 'Invalid admin credentials. Please check your email and password.';
      } else if (error.response?.status === 500) {
        message = 'Server error. Please try again later.';
      }

      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear refresh token from server
      await axios.post(`${base_url}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of server response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${base_url}/api/auth/profile`, profileData);
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.put(`${base_url}/api/auth/change-password`, {
        currentPassword,
        newPassword
      });
      
      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Password change error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to change password' 
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    changePassword,
    checkAuthStatus,
    authAxios
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
