import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

interface AddUserModalProps {
  onAddUser?: (user: any) => void;
}

export const AddUserModal = ({ onAddUser }: AddUserModalProps) => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState<'learner' | 'founder'>('learner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: `${userType}-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: userType,
      createdAt: new Date(),
      emailVerified: false,
      onboardingCompleted: false,
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()) : [],
      enrolledCourses: [],
      ...(userType === 'learner' && {
        learnerProfile: {
          learningGoals: [],
          skillLevel: 'beginner',
          preferredLearningStyle: 'online',
          completedCourses: [],
          currentProgress: {},
          certifications: [],
        },
      }),
      ...(userType === 'founder' && {
        founderProfile: {
          companyStage: 'idea',
          industry: [],
          fundingStage: 'bootstrapped',
          technicalBackground: 'non-technical',
          previousStartups: 0,
          ideaSubmissions: [],
          preferredContactMethod: 'email',
          teamSize: '1',
        },
      }),
    };

    onAddUser?.(newUser);
    setSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', password: '', interests: '' });
      setSubmitted(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new learner or founder account in the system
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <Card className="border-green-500 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 mx-auto">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-600">User Added Successfully!</p>
                  <p className="text-sm text-muted-foreground">{formData.name} has been added as a {userType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select value={userType} onValueChange={(value) => setUserType(value as 'learner' | 'founder')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="learner">Learner (Course Student)</SelectItem>
                  <SelectItem value="founder">Founder (Startup Studio)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Initial Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                User should change this on first login
              </p>
            </div>

            {/* Interests (only for learners) */}
            {userType === 'learner' && (
              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  name="interests"
                  placeholder="e.g., backend, react, devops"
                  value={formData.interests}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add User
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
