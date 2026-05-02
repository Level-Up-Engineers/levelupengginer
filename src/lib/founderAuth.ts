import { FounderUser, FounderSignupData } from '@/types/auth';
import { mockFounderUsers } from '@/data/mockFounderData';

const FOUNDER_STORAGE_KEY = 'levelup_founder_auth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const founderAuthAPI = {
  login: async (email: string, password: string): Promise<FounderUser | null> => {
    await delay(500);

    const user = mockFounderUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    return user || null;
  },

  signup: async (data: FounderSignupData): Promise<FounderUser | null> => {
    await delay(500);

    // Check if email already exists
    const existingUser = mockFounderUsers.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      return null;
    }

    // Create new founder user
    const newUser: FounderUser = {
      id: `founder-${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      createdAt: new Date(),
      emailVerified: false,
      onboardingCompleted: false,
      profile: {
        companyStage: data.companyStage as 'idea' | 'mvp' | 'early-stage' | 'growth' | 'scale',
        industry: [data.industry],
        fundingStage: data.fundingStatus as 'pre-seed' | 'seed' | 'series-a' | 'series-b+' | 'bootstrapped',
        technicalBackground: 'non-technical',
        previousStartups: 0,
        ideaSubmissions: [],
        preferredContactMethod: 'email',
        teamSize: data.teamSize as 'solo' | '2-5' | '6-10' | '11-50' | '50+',
      },
    };

    // Add to mock data
    mockFounderUsers.push(newUser);

    return newUser;
  },

  // Save authenticated user to localStorage
  setAuthUser: (user: FounderUser | null) => {
    if (user) {
      localStorage.setItem(FOUNDER_STORAGE_KEY, JSON.stringify({
        ...user,
        createdAt: user.createdAt.toISOString(),
      }));
    } else {
      localStorage.removeItem(FOUNDER_STORAGE_KEY);
    }
  },

  // Get authenticated user from localStorage
  getAuthUser: (): FounderUser | null => {
    const stored = localStorage.getItem(FOUNDER_STORAGE_KEY);
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
export const login = founderAuthAPI.login;
export const signup = founderAuthAPI.signup;
export const setAuthUser = founderAuthAPI.setAuthUser;
export const getAuthUser = founderAuthAPI.getAuthUser;