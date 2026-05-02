import { LearnerUser, LearnerSignupData } from '@/types/auth';
import { mockLearnerUsers } from '@/data/mockLearnerData';

const LEARNER_STORAGE_KEY = 'levelup_learner_auth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const learnerAuthAPI = {
  login: async (email: string, password: string): Promise<LearnerUser | null> => {
    await delay(500);

    const user = mockLearnerUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    return user || null;
  },

  signup: async (data: LearnerSignupData): Promise<LearnerUser | null> => {
    await delay(500);

    // Check if email already exists
    const existingUser = mockLearnerUsers.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      return null;
    }

    // Create new learner user
    const newUser: LearnerUser = {
      id: `learner-${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      interests: data.interests,
      enrolledCourses: [],
      createdAt: new Date(),
      emailVerified: false,
      onboardingCompleted: false,
      profile: {
        learningGoals: data.learningGoals,
        skillLevel: data.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
        preferredLearningStyle: 'video',
        completedCourses: [],
        currentProgress: {},
        certifications: [],
      },
    };

    // Add to mock data
    mockLearnerUsers.push(newUser);

    return newUser;
  },

  // Save authenticated user to localStorage
  setAuthUser: (user: LearnerUser | null) => {
    if (user) {
      localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify({
        ...user,
        createdAt: user.createdAt.toISOString(),
      }));
    } else {
      localStorage.removeItem(LEARNER_STORAGE_KEY);
    }
  },

  // Get authenticated user from localStorage
  getAuthUser: (): LearnerUser | null => {
    const stored = localStorage.getItem(LEARNER_STORAGE_KEY);
    if (!stored) return null;

    try {
      const data = JSON.parse(stored);
      return {
        ...data,
        createdAt: new Date(data.createdAt),
      };
    } catch {
      return null;
    }
  },
};

// Export individual functions for backward compatibility
export const login = learnerAuthAPI.login;
export const signup = learnerAuthAPI.signup;
export const setAuthUser = learnerAuthAPI.setAuthUser;
export const getAuthUser = learnerAuthAPI.getAuthUser;