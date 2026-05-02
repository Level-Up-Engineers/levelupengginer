import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { interestOptions } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Calendar,
  Heart,
  BookOpen,
  GraduationCap,
  Briefcase,
  Save,
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { user, updateInterests, enrollInCourse } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState(user?.interests || []);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleToggleInterest = (interestId: string) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSaveInterests = async () => {
    setIsSaving(true);
    updateInterests(interests);
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Interests updated successfully!');
    setIsSaving(false);
  };

  const handleQuickEnroll = (courseSlug: string) => {
    enrollInCourse(courseSlug);
    toast.success('Successfully enrolled in the course!');
  };

  const userType = user.enrolledCourses.length > 0 ? 'Student' : 'Prospective Learner';
  const userStatus = user.enrolledCourses.length > 0 ? 'Active' : 'Not Enrolled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-5xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/user/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">My Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your interests and view your learning details
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Details Card */}
            <motion.Card
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>Your account information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                    <GraduationCap className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User Type</p>
                    <Badge>{userType}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Briefcase className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enrollment Status</p>
                    <Badge variant={userStatus === 'Active' ? 'default' : 'secondary'}>
                      {userStatus}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10">
                    <Calendar className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{user.createdAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                    <p className="font-medium">{user.enrolledCourses.length} course(s)</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>

            {/* Interests Card */}
            <motion.Card
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Learning Interests</CardTitle>
                    <CardDescription>
                      Select your interests for personalized recommendations
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <div
                      key={interest.id}
                      className={`flex items-center space-x-2 rounded-lg border p-3 cursor-pointer transition-all ${
                        interests.includes(interest.id)
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handleToggleInterest(interest.id)}
                    >
                      <div
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          interests.includes(interest.id)
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {interests.includes(interest.id) && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <Label className="text-sm font-normal cursor-pointer flex-1">
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Selected: <span className="font-medium">{interests.length}</span> interests
                    </p>
                  </div>
                  <Button
                    onClick={handleSaveInterests}
                    disabled={isSaving || interests.length === 0}
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Interests'}
                  </Button>
                </div>
              </CardContent>
            </motion.Card>
          </div>

          {/* Quick Enroll Section */}
          <motion.Card
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Quick Enrollment</CardTitle>
                  <CardDescription>
                    Enroll in a course instantly without browsing
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your current interests, here are recommended courses to get started:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { slug: 'backend-engineering', name: 'Backend Engineering', tags: ['backend', 'api', 'system-design'] },
                  { slug: 'full-stack', name: 'Full Stack Engineering', tags: ['frontend', 'backend', 'fullstack'] },
                  { slug: 'devops-sre', name: 'DevOps + SRE', tags: ['devops', 'cloud', 'kubernetes'] },
                  { slug: 'data-engineering', name: 'Data Engineering', tags: ['data', 'etl', 'analytics'] },
                  { slug: 'android-engineering', name: 'Android Engineering', tags: ['mobile', 'android', 'kotlin'] },
                  { slug: 'interview-prep', name: 'Interview Preparation', tags: ['interview', 'dsa', 'fundamentals'] },
                ].map((course) => {
                  const isEnrolled = user.enrolledCourses.includes(course.slug);
                  const matchesInterest = course.tags.some(tag => interests.includes(tag));

                  return (
                    <Card
                      key={course.slug}
                      className={`transition-all ${
                        isEnrolled
                          ? 'bg-green-500/5 border-green-500/30'
                          : matchesInterest
                          ? 'border-primary/50 bg-primary/5'
                          : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{course.name}</p>
                          {isEnrolled && (
                            <Badge className="bg-green-500/10 text-green-600 text-xs">
                              Enrolled
                            </Badge>
                          )}
                          {matchesInterest && !isEnrolled && (
                            <Badge className="bg-primary/10 text-primary text-xs">
                              Matches Interest
                            </Badge>
                          )}
                        </div>
                        {!isEnrolled && (
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => handleQuickEnroll(course.slug)}
                          >
                            Enroll Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </motion.Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
