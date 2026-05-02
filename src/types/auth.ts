// Separate user types for different platforms
export interface LearnerUser {
  id: string;
  email: string;
  password: string;
  name: string;
  interests: string[];
  enrolledCourses: string[];
  createdAt: Date;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  profile: LearnerProfile;
}

export interface FounderUser {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  profile: FounderProfile;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  emailVerified: boolean;
}

// Union type for all user types
export type User = LearnerUser | FounderUser | AdminUser;

// Type guards
export const isLearnerUser = (user: User): user is LearnerUser => {
  return 'interests' in user && 'enrolledCourses' in user && 'profile' in user && 'learningGoals' in user.profile;
};

export const isFounderUser = (user: User): user is FounderUser => {
  return 'profile' in user && 'companyStage' in user.profile;
};

export const isAdminUser = (user: User): user is AdminUser => {
  return !('interests' in user) && !('profile' in user);
};

export interface LearnerSignupData {
  name: string;
  email: string;
  password: string;
  interests: string[];
  learningGoals: string[];
  experienceLevel: string;
}

export interface FounderSignupData {
  name: string;
  email: string;
  password: string;
  companyStage: string;
  industry: string;
  fundingStatus: string;
  teamSize: string;
}

export interface AdminSignupData {
  name: string;
  email: string;
  password: string;
}

// Auth states for different platforms
export interface LearnerAuthState {
  user: LearnerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FounderAuthState {
  user: FounderUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context types
export interface LearnerAuthContextType extends LearnerAuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: LearnerSignupData) => Promise<boolean>;
  logout: () => void;
  enrollInCourse: (courseSlug: string) => void;
  updateInterests: (interests: string[]) => void;
  clearError: () => void;
}

export interface FounderAuthContextType extends FounderAuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: FounderSignupData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  canAccessIdeaAnalyzer: () => boolean;
}

export interface AdminAuthContextType extends AdminAuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: AdminSignupData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export interface CourseRecommendation {
  slug: string;
  title: string;
  reason: string;
  matchScore: number;
}
