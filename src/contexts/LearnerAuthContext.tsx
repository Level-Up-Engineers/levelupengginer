import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { LearnerUser, LearnerAuthState, LearnerAuthContextType, LearnerSignupData } from '@/types/auth';
import * as learnerAuthAPI from '@/lib/learnerAuth';

// Initial state
const initialState: LearnerAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Actions
type LearnerAuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: LearnerUser | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// Reducer
const learnerAuthReducer = (state: LearnerAuthState, action: LearnerAuthAction): LearnerAuthState => {
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
const LearnerAuthContext = createContext<LearnerAuthContextType | undefined>(undefined);

// Provider component
export const LearnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(learnerAuthReducer, initialState);

  // Initialize auth state on mount
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const user = learnerAuthAPI.getAuthUser();
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
      const user = await learnerAuthAPI.login(email, password);
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

  const signup = useCallback(async (data: LearnerSignupData): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const user = await learnerAuthAPI.signup(data);
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
    learnerAuthAPI.setAuthUser(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const enrollInCourse = useCallback((courseSlug: string) => {
    if (!state.user) return;

    const updatedUser: LearnerUser = {
      ...state.user,
      enrolledCourses: [...state.user.enrolledCourses, courseSlug],
    };

    learnerAuthAPI.setAuthUser(updatedUser);
    dispatch({ type: 'SET_USER', payload: updatedUser });
  }, [state.user]);

  const updateInterests = useCallback((interests: string[]) => {
    if (!state.user) return;

    const updatedUser: LearnerUser = {
      ...state.user,
      interests,
    };

    learnerAuthAPI.setAuthUser(updatedUser);
    dispatch({ type: 'SET_USER', payload: updatedUser });
  }, [state.user]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const value: LearnerAuthContextType = {
    ...state,
    login,
    signup,
    logout,
    enrollInCourse,
    updateInterests,
    clearError,
  };

  return (
    <LearnerAuthContext.Provider value={value}>
      {children}
    </LearnerAuthContext.Provider>
  );
};

// Hook to use learner auth
export const useLearnerAuth = (): LearnerAuthContextType => {
  const context = useContext(LearnerAuthContext);
  if (context === undefined) {
    throw new Error('useLearnerAuth must be used within a LearnerAuthProvider');
  }
  return context;
};

// Additional hooks
export const useLearnerIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useLearnerAuth();
  return isAuthenticated;
};