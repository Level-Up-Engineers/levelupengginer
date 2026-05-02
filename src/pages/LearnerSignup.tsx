import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLearnerAuth } from '@/contexts/LearnerAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, UserPlus, Mail, Lock, User as UserIcon, GraduationCap } from 'lucide-react';
import { interestOptions } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LearnerSignupData } from '@/types/auth';

const LearnerSignup = () => {
  const navigate = useNavigate();
  const { signup, error, clearError } = useLearnerAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<LearnerSignupData, 'learningGoals'> & { learningGoals: string[] }>({
    name: '',
    email: '',
    password: '',
    interests: [],
    learningGoals: [],
    experienceLevel: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.interests.length === 0) {
      return;
    }

    setIsLoading(true);

    const success = await signup(formData);

    setIsLoading(false);

    if (success) {
      navigate('/user/dashboard', { replace: true });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId],
    }));
    clearError();
  };

  const toggleLearningGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter(g => g !== goal)
        : [...prev.learningGoals, goal],
    }));
    clearError();
  };

  const learningGoals = [
    'Career Advancement',
    'Skill Development',
    'Personal Growth',
    'Industry Knowledge',
    'Certification',
    'Entrepreneurship',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-20">
        <div className="container flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join Level Up Engineer</CardTitle>
              <CardDescription>
                Start your learning journey and build your skills
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={(formData as any).confirmPassword || ''}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-3 pt-4">
                    <Label>Select Your Interests (at least one)</Label>
                    <p className="text-xs text-muted-foreground">
                      We'll use this to recommend relevant courses
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {interestOptions.map((interest) => (
                        <div
                          key={interest.id}
                          className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                            formData.interests.includes(interest.id)
                              ? 'border-primary bg-primary/5'
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => toggleInterest(interest.id)}
                        >
                          <Checkbox
                            id={interest.id}
                            checked={formData.interests.includes(interest.id)}
                          />
                          <Label
                            htmlFor={interest.id}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {interest.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Goals */}
                  <div className="space-y-3">
                    <Label>Learning Goals</Label>
                    <p className="text-xs text-muted-foreground">
                      What do you want to achieve?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {learningGoals.map((goal) => (
                        <div
                          key={goal}
                          className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                            formData.learningGoals.includes(goal)
                              ? 'border-primary bg-primary/5'
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => toggleLearningGoal(goal)}
                        >
                          <Checkbox
                            id={goal}
                            checked={formData.learningGoals.includes(goal)}
                          />
                          <Label
                            htmlFor={goal}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isLoading || formData.interests.length === 0 || formData.password !== (formData as any).confirmPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Start Learning'
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center">
              <div className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnerSignup;