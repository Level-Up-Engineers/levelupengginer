import { LearnerUser } from '@/types/auth';

// Mock learner users for development and testing
export const mockLearnerUsers: LearnerUser[] = [
  {
    id: 'learner-1',
    email: 'john@levelup.com',
    password: 'user123',
    name: 'John Smith',
    interests: ['frontend', 'react', 'ui-ux'],
    enrolledCourses: ['react-fundamentals', 'ui-ux-design'],
    createdAt: new Date('2024-01-15'),
    emailVerified: true,
    onboardingCompleted: true,
    profile: {
      learningGoals: ['Career Advancement', 'Skill Development'],
      skillLevel: 'intermediate',
      preferredLearningStyle: 'video',
      completedCourses: ['javascript-basics'],
      currentProgress: {
        'react-fundamentals': 75,
        'ui-ux-design': 45,
      },
      certifications: ['JavaScript Fundamentals'],
    },
  },
  {
    id: 'learner-2',
    email: 'sarah@levelup.com',
    password: 'user123',
    name: 'Sarah Johnson',
    interests: ['backend', 'python', 'data-engineering'],
    enrolledCourses: ['python-backend', 'data-structures'],
    createdAt: new Date('2024-02-20'),
    emailVerified: true,
    onboardingCompleted: true,
    profile: {
      learningGoals: ['Personal Growth', 'Industry Knowledge'],
      skillLevel: 'beginner',
      preferredLearningStyle: 'interactive',
      completedCourses: [],
      currentProgress: {
        'python-backend': 30,
        'data-structures': 60,
      },
      certifications: [],
    },
  },
  {
    id: 'learner-3',
    email: 'mike@levelup.com',
    password: 'user123',
    name: 'Mike Chen',
    interests: ['devops', 'kubernetes', 'aws'],
    enrolledCourses: ['devops-fundamentals', 'kubernetes-essentials'],
    createdAt: new Date('2024-03-10'),
    emailVerified: true,
    onboardingCompleted: true,
    profile: {
      learningGoals: ['Certification', 'Entrepreneurship'],
      skillLevel: 'advanced',
      preferredLearningStyle: 'hands-on',
      completedCourses: ['docker-basics', 'aws-fundamentals'],
      currentProgress: {
        'devops-fundamentals': 90,
        'kubernetes-essentials': 70,
      },
      certifications: ['AWS Certified Developer', 'Docker Certified'],
    },
  },
];