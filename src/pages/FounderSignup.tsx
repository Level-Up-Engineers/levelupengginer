import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFounderAuth } from '@/contexts/FounderAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, Mail, Lock, User as UserIcon, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FounderSignupData } from '@/types/auth';

const FounderSignup = () => {
  const navigate = useNavigate();
  const { signup, error, clearError } = useFounderAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FounderSignupData & { confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    setIsLoading(true);

    const success = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      companyStage: formData.companyStage,
      industry: formData.industry,
      fundingStatus: formData.fundingStatus,
      teamSize: formData.teamSize,
    });

    setIsLoading(false);

    if (success) {
      navigate('/startup-studio', { replace: true });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-20">
        <div className="container flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join Startup Studio</CardTitle>
              <CardDescription>
                Build and scale your startup with expert engineering teams
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
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
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
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isLoading || formData.password !== formData.confirmPassword}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Start Building'
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center">
              <div className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/founder/login" className="text-primary hover:underline">
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

export default FounderSignup;