// Track all user activities (learners and founders)

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: 'learner' | 'founder';
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

const ACTIVITY_STORAGE_KEY = 'userActivityLog';

// Mock activity data
export const mockActivityLog: ActivityLog[] = [
  {
    id: 'activity-1',
    userId: 'learner-1',
    userName: 'Rahul Kumar',
    userEmail: 'rahul@levelup.com',
    userType: 'learner',
    action: 'enrolled_course',
    description: 'Enrolled in Backend Engineering course',
    timestamp: '2025-04-20T10:30:00Z',
    metadata: { courseSlug: 'backend-engineering', courseName: 'Backend Engineering' },
  },
  {
    id: 'activity-2',
    userId: 'founder-1',
    userName: 'Priya Sharma',
    userEmail: 'priya@levelup.com',
    userType: 'founder',
    action: 'submitted_idea',
    description: 'Submitted startup idea: E-commerce Marketplace',
    timestamp: '2025-04-19T14:15:00Z',
    metadata: { ideaTitle: 'E-commerce Marketplace', ideaCategory: 'marketplace' },
  },
  {
    id: 'activity-3',
    userId: 'learner-2',
    userName: 'Amit Patel',
    userEmail: 'amit@levelup.com',
    userType: 'learner',
    action: 'completed_course',
    description: 'Completed Frontend Development course',
    timestamp: '2025-04-18T09:45:00Z',
    metadata: { courseSlug: 'full-stack', courseName: 'Full Stack Development', certificateId: 'cert-001' },
  },
  {
    id: 'activity-4',
    userId: 'founder-1',
    userName: 'Priya Sharma',
    userEmail: 'priya@levelup.com',
    userType: 'founder',
    action: 'updated_profile',
    description: 'Updated founder profile information',
    timestamp: '2025-04-17T11:20:00Z',
    metadata: { companyStage: 'mvp', fundingStage: 'seed' },
  },
  {
    id: 'activity-5',
    userId: 'learner-1',
    userName: 'Rahul Kumar',
    userEmail: 'rahul@levelup.com',
    userType: 'learner',
    action: 'completed_module',
    description: 'Completed Module: System Design Basics',
    timestamp: '2025-04-16T16:00:00Z',
    metadata: { courseSlug: 'backend-engineering', moduleName: 'System Design Basics', progress: 75 },
  },
];

export const activityLogAPI = {
  getAllActivities: (): ActivityLog[] => {
    if (typeof window === 'undefined') {
      return mockActivityLog;
    }

    try {
      const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
      if (!stored) {
        return mockActivityLog;
      }
      return JSON.parse(stored) as ActivityLog[];
    } catch (error) {
      console.error('Failed to load activity log:', error);
      return mockActivityLog;
    }
  },

  getActivitiesByUser: (userId: string): ActivityLog[] => {
    return activityLogAPI.getAllActivities().filter(activity => activity.userId === userId);
  },

  getActivitiesByType: (userType: 'learner' | 'founder'): ActivityLog[] => {
    return activityLogAPI.getAllActivities().filter(activity => activity.userType === userType);
  },

  addActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog => {
    const existing = activityLogAPI.getAllActivities();
    const newActivity: ActivityLog = {
      ...activity,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newActivity, ...existing];

    try {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save activity log:', error);
    }

    return newActivity;
  },

  getRecentActivities: (limit: number = 10): ActivityLog[] => {
    return activityLogAPI
      .getAllActivities()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  },
};
