import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { FounderUser, FounderAuthState, FounderAuthContextType, FounderSignupData } from '@/types/auth';
import * as founderAuthAPI from '@/lib/founderAuth';

// Initial state
const initialState: FounderAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Actions
type FounderAuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: FounderUser | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// Reducer
const founderAuthReducer = (state: FounderAuthState, action: FounderAuthAction): FounderAuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context
const FounderAuthContext = createContext<FounderAuthContextType | undefined>(undefined);

// Provider component
export const FounderAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(founderAuthReducer, initialState);

  // Initialize auth state on mount
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const user = founderAuthAPI.getAuthUser();
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize authentication' });
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const user = await founderAuthAPI.login(email, password);
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid email or password' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
      return false;
    }
  }, []);

  const signup = useCallback(async (data: FounderSignupData): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const user = await founderAuthAPI.signup(data);
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Email already exists. Please login instead.' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    founderAuthAPI.setAuthUser(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const canAccessIdeaAnalyzer = useCallback(() => {
    return state.isAuthenticated;
  }, [state.isAuthenticated]);

  const value: FounderAuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
    canAccessIdeaAnalyzer,
  };

  return (
    <FounderAuthContext.Provider value={value}>
      {children}
    </FounderAuthContext.Provider>
  );
};

// Hook to use founder auth
export const useFounderAuth = (): FounderAuthContextType => {
  const context = useContext(FounderAuthContext);
  if (context === undefined) {
    throw new Error('useFounderAuth must be used within a FounderAuthProvider');
  }
  return context;
};

// Additional hooks
export const useFounderIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useFounderAuth();
  return isAuthenticated;
};