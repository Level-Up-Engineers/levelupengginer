import { StartupStudioActivity } from '@/types/startupStudio';

const STORAGE_KEY = 'startupStudioActivityLog';

export const mockStartupStudioActivity: StartupStudioActivity[] = [
  {
    id: 'studio-1',
    userId: 'user-1',
    name: 'Rahul Kumar',
    email: 'rahul@levelup.com',
    ideaSummary: 'AI-powered customer support assistant for small e-commerce stores that automates order tracking and returns with conversational responses.',
    status: 'new',
    recommendedAction: 'Schedule a discovery call to understand their product roadmap and tailor a pilot package.',
    source: 'AI Analyzer',
    createdAt: '2025-04-01T10:20:00.000Z',
  },
  {
    id: 'studio-2',
    userId: 'user-2',
    name: 'Priya Sharma',
    email: 'priya@levelup.com',
    ideaSummary: 'A marketplace for hyperlocal home services with AI-based matching and review analytics for customer trust.',
    status: 'contacted',
    recommendedAction: 'Send a case study on marketplace MVPs and emphasize our growth execution process.',
    source: 'Studio Contact',
    createdAt: '2025-04-11T14:30:00.000Z',
  },
  {
    id: 'studio-3',
    userId: 'user-3',
    name: 'Amit Patel',
    email: 'amit@levelup.com',
    ideaSummary: 'Product-led CRM platform that automatically summarizes lead activity and suggests outreach actions using AI.',
    status: 'qualified',
    recommendedAction: 'Offer an architecture review call and share a phased MVP plan focused on quick validation.',
    source: 'Landing Page',
    createdAt: '2025-04-18T09:10:00.000Z',
  },
];

const normalize = (entry: StartupStudioActivity): StartupStudioActivity => ({
  ...entry,
  createdAt: typeof entry.createdAt === 'string' ? entry.createdAt : entry.createdAt.toISOString(),
});

export const startupStudioActivityAPI = {
  getActivityLog: (): StartupStudioActivity[] => {
    if (typeof window === 'undefined') {
      return mockStartupStudioActivity;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return mockStartupStudioActivity;
      }
      const parsed = JSON.parse(stored) as StartupStudioActivity[];
      return parsed.map(normalize);
    } catch (error) {
      console.error('Failed to load startup studio activity log:', error);
      return mockStartupStudioActivity;
    }
  },

  addActivity: (activity: Omit<StartupStudioActivity, 'id' | 'createdAt'>): StartupStudioActivity[] => {
    const existing = startupStudioActivityAPI.getActivityLog();
    const newEntry: StartupStudioActivity = normalize({
      ...activity,
      id: `studio-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
    const updated = [newEntry, ...existing];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save startup studio activity log:', error);
    }

    return updated;
  },
};
