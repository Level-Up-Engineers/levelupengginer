import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, UserPlus, Mail, Lock, User as UserIcon, GraduationCap, Lightbulb } from 'lucide-react';
import { interestOptions } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserRole } from '@/types/auth';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner' as UserRole,
    interests: [] as string[],
    // Learner-specific fields
    learningGoals: [] as string[],
    experienceLevel: '',
    // Founder-specific fields
    companyStage: '',
    industry: '',
    fundingStatus: '',
    teamSize: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.role === 'learner' && formData.interests.length === 0) {
      return;
    }

    setIsLoading(true);

    const success = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      interests: formData.interests,
      learningGoals: formData.learningGoals,
      experienceLevel: formData.experienceLevel,
      companyStage: formData.companyStage,
      industry: formData.industry,
      fundingStatus: formData.fundingStatus,
      teamSize: formData.teamSize,
    });

    setIsLoading(false);

    if (success) {
      if (formData.role === 'learner') {
        navigate('/user/dashboard', { replace: true });
      } else if (formData.role === 'founder') {
        navigate('/startup-studio', { replace: true });
      } else {
        navigate('/admin/dashboard', { replace: true });
      }
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
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Join Level Up Engineer - Choose your path to success
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
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">I want to:</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="learner" id="learner" />
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <div>
                            <Label htmlFor="learner" className="font-medium cursor-pointer">
                              Learn & Grow
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Access courses and build skills
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="founder" id="founder" />
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          <div>
                            <Label htmlFor="founder" className="font-medium cursor-pointer">
                              Build & Scale
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Create and grow startups
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

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
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {formData.role === 'learner' && (
                    <>
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
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </>
                  )}

                  {formData.role === 'founder' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyStage">Company Stage</Label>
                          <select
                            id="companyStage"
                            name="companyStage"
                            value={formData.companyStage}
                            onChange={(e) => setFormData(prev => ({ ...prev, companyStage: e.target.value }))}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            required
                          >
                            <option value="">Select stage</option>
                            <option value="idea">Idea Stage</option>
                            <option value="mvp">MVP</option>
                            <option value="early-stage">Early Stage</option>
                            <option value="growth">Growth Stage</option>
                            <option value="scale">Scale Stage</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            name="industry"
                            type="text"
                            placeholder="e.g., FinTech, HealthTech"
                            value={formData.industry}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fundingStatus">Funding Status</Label>
                          <select
                            id="fundingStatus"
                            name="fundingStatus"
                            value={formData.fundingStatus}
                            onChange={(e) => setFormData(prev => ({ ...prev, fundingStatus: e.target.value }))}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            required
                          >
                            <option value="">Select funding status</option>
                            <option value="bootstrapped">Bootstrapped</option>
                            <option value="pre-seed">Pre-seed</option>
                            <option value="seed">Seed</option>
                            <option value="series-a">Series A</option>
                            <option value="series-b-plus">Series B+</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <select
                            id="teamSize"
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                            required
                          >
                            <option value="">Select team size</option>
                            <option value="solo">Solo Founder</option>
                            <option value="2-5">2-5 members</option>
                            <option value="6-10">6-10 members</option>
                            <option value="11-50">11-50 members</option>
                            <option value="50+">50+ members</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={
                    isLoading ||
                    (formData.role === 'learner' && formData.interests.length === 0) ||
                    formData.password !== formData.confirmPassword
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
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

export default Signup;
