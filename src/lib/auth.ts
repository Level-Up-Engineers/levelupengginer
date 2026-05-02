import { User, SignupData } from '@/types/auth';
import { mockUsers } from '@/data/mockData';

const STORAGE_KEY = 'levelup_auth_user';

export const authAPI = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    return user || null;
  },

  signup: async (data: SignupData): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = mockUsers.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      return null;
    }

    // Create new user with role-specific profile
    const newUser: User = {
      id: `${data.role}-${Date.now()}`,
      email: data.email,
      password: data.password, // In production, hash this
      name: data.name,
      role: data.role,
      interests: data.interests,
      enrolledCourses: [],
      createdAt: new Date(),
      emailVerified: false,
      onboardingCompleted: false,
      ...(data.role === 'learner' && {
        learnerProfile: {
          learningGoals: data.learningGoals || [],
          skillLevel: data.experienceLevel || 'beginner',
          preferredLearningStyle: 'video', // Default
          completedCourses: [],
          currentProgress: {},
          certifications: [],
        },
      }),
      ...(data.role === 'founder' && {
        founderProfile: {
          companyStage: data.companyStage || 'idea',
          industry: data.industry ? [data.industry] : [],
          fundingStage: data.fundingStatus || 'pre-seed',
          technicalBackground: 'non-technical', // Default
          previousStartups: 0, // Default
          ideaSubmissions: [],
          preferredContactMethod: 'email', // Default
          teamSize: data.teamSize || 'solo',
        },
      }),
    };

    // In production, send to backend API
    // For demo, add to mock users array
    mockUsers.push(newUser);

    return newUser;
  },

  // Save authenticated user to localStorage
  setAuthUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...user,
        createdAt: user.createdAt.toISOString(),
      }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  // Get authenticated user from localStorage
  getAuthUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
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

  // Check if user is admin
  isAdmin: (user: User | null): boolean => {
    return user?.role === 'admin';
  },
};
