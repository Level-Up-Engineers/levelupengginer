import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState, AuthContextType, SignupData } from '@/types/auth';
import { authAPI } from '@/lib/auth';
import { Course } from '@/lib/courseData';
import { mockUsers } from '@/data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = authAPI.getAuthUser();
    if (storedUser) {
      setState({
        user: storedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await authAPI.login(email, password);

      if (!user) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Invalid email or password',
        }));
        return false;
      }

      // Check role match for admin login
      if (isAdmin && user.role !== 'admin') {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Admin access denied. Please use user login.',
        }));
        return false;
      }

      if (!isAdmin && user.role === 'admin') {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Please use Admin login for admin accounts.',
        }));
        return false;
      }

      authAPI.setAuthUser(user);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred',
      }));
      return false;
    }
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await authAPI.signup(data);

      if (!user) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Email already exists. Please login instead.',
        }));
        return false;
      }

      authAPI.setAuthUser(user);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.setAuthUser(null);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const enrollInCourse = useCallback((courseSlug: string) => {
    setState(prev => {
      if (!prev.user) return prev;

      const updatedUser: User = {
        ...prev.user,
        enrolledCourses: [...prev.user.enrolledCourses, courseSlug],
      };

      authAPI.setAuthUser(updatedUser);

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  const updateInterests = useCallback((interests: string[]) => {
    setState(prev => {
      if (!prev.user) return prev;

      const updatedUser: User = {
        ...prev.user,
        interests,
      };

      authAPI.setAuthUser(updatedUser);

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Role helper methods
  const isLearner = useCallback(() => state.user?.role === 'learner', [state.user]);
  const isFounder = useCallback(() => state.user?.role === 'founder', [state.user]);
  const isAdmin = useCallback(() => state.user?.role === 'admin', [state.user]);
  const canAccessIdeaAnalyzer = useCallback(() => {
    return state.user?.role === 'founder' || state.user?.role === 'admin';
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        enrollInCourse,
        updateInterests,
        clearError,
        isLearner,
        isFounder,
        isAdmin,
        canAccessIdeaAnalyzer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useIsAdmin = (): boolean => {
  const { user } = useAuth();
  return user?.role === 'admin';
};

export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};
