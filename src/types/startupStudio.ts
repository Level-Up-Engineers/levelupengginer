export type StartupStudioActivityStatus = 'new' | 'contacted' | 'qualified' | 'proposal-sent';

export interface StartupStudioActivity {
  id: string;
  userId?: string;
  name: string;
  email: string;
  ideaSummary: string;
  status: StartupStudioActivityStatus;
  recommendedAction: string;
  source: 'AI Analyzer' | 'Studio Contact' | 'Landing Page';
  createdAt: string;
}
