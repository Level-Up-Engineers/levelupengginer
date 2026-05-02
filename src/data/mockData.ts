import { User } from '@/types/auth';

// Course category and tag mappings for recommendations
export const courseCategories = {
  'interview-prep': { category: 'career', tags: ['dsa', 'interview', 'fundamentals'], difficulty: 'intermediate' as const },
  'backend-engineering': { category: 'development', tags: ['backend', 'api', 'database', 'microservices'], difficulty: 'intermediate' as const },
  'devops-sre': { category: 'devops', tags: ['devops', 'cloud', 'kubernetes', 'ci-cd'], difficulty: 'intermediate' as const },
  'full-stack': { category: 'development', tags: ['frontend', 'backend', 'fullstack', 'react'], difficulty: 'intermediate' as const },
  'data-engineering': { category: 'data', tags: ['data', 'etl', 'big-data', 'analytics'], difficulty: 'intermediate' as const },
  'android-engineering': { category: 'mobile', tags: ['mobile', 'android', 'kotlin'], difficulty: 'intermediate' as const },
};

// Course recommendation relationships
export const courseRecommendations: Record<string, { slug: string; reason: string }[]> = {
  'interview-prep': [
    { slug: 'backend-engineering', reason: 'Apply your DSA skills in real backend systems' },
    { slug: 'full-stack', reason: 'Build complete applications with your interview knowledge' },
    { slug: 'data-engineering', reason: 'Explore high-demand data roles' },
  ],
  'backend-engineering': [
    { slug: 'devops-sre', reason: 'Learn to deploy and manage your backend systems' },
    { slug: 'full-stack', reason: 'Add frontend skills to become a complete engineer' },
    { slug: 'data-engineering', reason: 'Expand into data pipeline architecture' },
  ],
  'devops-sre': [
    { slug: 'backend-engineering', reason: 'Understand the applications you deploy' },
    { slug: 'full-stack', reason: 'Build full apps you can deploy end-to-end' },
    { slug: 'data-engineering', reason: 'Manage large-scale data infrastructure' },
  ],
  'full-stack': [
    { slug: 'devops-sre', reason: 'Master deployment and infrastructure' },
    { slug: 'backend-engineering', reason: 'Deepen your backend expertise' },
    { slug: 'android-engineering', reason: 'Expand to mobile development' },
  ],
  'data-engineering': [
    { slug: 'backend-engineering', reason: 'Build robust data APIs and services' },
    { slug: 'devops-sre', reason: 'Deploy and monitor data pipelines' },
  ],
  'android-engineering': [
    { slug: 'full-stack', reason: 'Build web backends for your mobile apps' },
    { slug: 'backend-engineering', reason: 'Create scalable APIs for mobile' },
  ],
};

// Mock users with different roles and enrollments
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@levelup.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    interests: [],
    enrolledCourses: [],
    createdAt: new Date('2024-01-01'),
    emailVerified: true,
    onboardingCompleted: true,
  },
  {
    id: 'learner-1',
    email: 'rahul@levelup.com',
    password: 'user123',
    name: 'Rahul Kumar',
    role: 'learner',
    interests: ['backend', 'system-design', 'cloud'],
    enrolledCourses: ['backend-engineering'],
    createdAt: new Date('2024-06-15'),
    emailVerified: true,
    onboardingCompleted: true,
    learnerProfile: {
      learningGoals: ['Become a senior backend engineer', 'Master system design'],
      skillLevel: 'intermediate',
      preferredLearningStyle: 'hands-on',
      completedCourses: [],
      currentProgress: { 'backend-engineering': 75 },
      certifications: [],
    },
  },
  {
    id: 'founder-1',
    email: 'priya@levelup.com',
    password: 'user123',
    name: 'Priya Sharma',
    role: 'founder',
    interests: ['frontend', 'react', 'ui-ux'],
    enrolledCourses: [],
    createdAt: new Date('2024-07-20'),
    emailVerified: true,
    onboardingCompleted: true,
    founderProfile: {
      companyStage: 'mvp',
      industry: ['e-commerce', 'saas'],
      fundingStage: 'seed',
      technicalBackground: 'technical',
      previousStartups: 1,
      ideaSubmissions: ['studio-2'],
      preferredContactMethod: 'call',
      teamSize: '2-5',
    },
  },
  {
    id: 'founder-2',
    email: 'amit@levelup.com',
    password: 'user123',
    name: 'Amit Patel',
    role: 'founder',
    interests: ['devops', 'kubernetes', 'aws'],
    enrolledCourses: [],
    createdAt: new Date('2024-08-10'),
    emailVerified: true,
    onboardingCompleted: true,
    founderProfile: {
      companyStage: 'early-stage',
      industry: ['fintech', 'ai'],
      fundingStage: 'series-a',
      technicalBackground: 'mixed',
      previousStartups: 2,
      ideaSubmissions: ['studio-3'],
      preferredContactMethod: 'email',
      teamSize: '6-10',
    },
  },
  {
    id: 'learner-2',
    email: 'sneha@levelup.com',
    password: 'user123',
    name: 'Sneha Reddy',
    role: 'learner',
    interests: ['data', 'python', 'analytics'],
    enrolledCourses: ['data-engineering', 'interview-prep'],
    createdAt: new Date('2024-09-05'),
    emailVerified: true,
    onboardingCompleted: true,
    learnerProfile: {
      learningGoals: ['Master data engineering', 'Get into FAANG'],
      skillLevel: 'intermediate',
      preferredLearningStyle: 'video',
      completedCourses: ['interview-prep'],
      currentProgress: { 'data-engineering': 45 },
      certifications: ['AWS Certified Cloud Practitioner'],
    },
  },
  {
    id: 'learner-3',
    email: 'demo@levelup.com',
    password: 'user123',
    name: 'Demo User',
    role: 'learner',
    interests: [],
    enrolledCourses: [],
    createdAt: new Date('2024-12-01'),
    emailVerified: false,
    onboardingCompleted: false,
  },
];

// Interest options for signup
export const interestOptions = [
  { id: 'backend', label: 'Backend Development', category: 'development' },
  { id: 'frontend', label: 'Frontend Development', category: 'development' },
  { id: 'fullstack', label: 'Full Stack Development', category: 'development' },
  { id: 'devops', label: 'DevOps & Cloud', category: 'devops' },
  { id: 'data', label: 'Data Engineering', category: 'data' },
  { id: 'mobile', label: 'Mobile Development', category: 'mobile' },
  { id: 'system-design', label: 'System Design', category: 'architecture' },
  { id: 'interview', label: 'Interview Preparation', category: 'career' },
  { id: 'cloud', label: 'Cloud Computing', category: 'devops' },
  { id: 'api', label: 'API Development', category: 'development' },
];
