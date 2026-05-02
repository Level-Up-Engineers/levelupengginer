import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { courses } from '@/lib/courseData';
import { courseCategories } from '@/data/mockData';
import { getRecommendations } from '@/lib/recommendations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseRecommendations from '@/components/recommendations/CourseRecommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user, enrollInCourse } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-accent/20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const enrolledCoursesData = courses.filter(c => user.enrolledCourses.includes(c.slug));
  const availableCourses = courses.filter(c => !user.enrolledCourses.includes(c.slug));

  // Calculate progress (mock - in production this would track actual progress)
  const getProgress = (courseSlug: string) => {
    const enrolledIndex = user.enrolledCourses.indexOf(courseSlug);
    // Mock progress based on enrollment order
    return Math.min(100, 20 + enrolledIndex * 15);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Welcome Section */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {user.enrolledCourses.length > 0
                ? "Continue your learning journey and explore new opportunities"
                : "Start your learning journey with personalized course recommendations"}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.Card
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.enrolledCourses.length}</p>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>

            <motion.Card
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.enrolledCourses.filter(slug => getProgress(slug) === 100).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>

            <motion.Card
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.enrolledCourses.filter(slug => getProgress(slug) > 0 && getProgress(slug) < 100).length}
                    </p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>

            <motion.Card
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                    <Award className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.interests.length}</p>
                    <p className="text-sm text-muted-foreground">Interest Areas</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Enrolled Courses Preview or Get Started */}
              {enrolledCoursesData.length > 0 ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Continue Learning</CardTitle>
                        <CardDescription>
                          Pick up where you left off
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('courses')}>
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {enrolledCoursesData.slice(0, 3).map((course) => {
                        const progress = getProgress(course.slug);
                        const category = courseCategories[course.slug as keyof typeof courseCategories];

                        return (
                          <Card key={course.slug} className="group hover:border-primary/50 transition-all">
                            <CardHeader className="pb-3">
                              <div className="mb-2 flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  {category?.category || 'Course'}
                                </Badge>
                                {progress === 100 && (
                                  <Badge className="bg-green-500/10 text-green-600 text-xs">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button asChild size="sm" className="w-full" variant={progress === 100 ? 'outline' : 'default'}>
                                <Link to={`/courses/${course.slug}`}>
                                  {progress === 100 ? 'Review' : 'Continue'}
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Start Your Learning Journey</h3>
                    <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                      You haven't enrolled in any courses yet. Check out our personalized recommendations below or explore all courses to find the perfect fit!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => setActiveTab('explore')}>
                        Browse All Courses
                      </Button>
                      <Button variant="outline" onClick={() => {
                        // Enroll in first recommended course
                        const recs = getRecommendations(user, courses);
                        if (recs.length > 0) {
                          enrollInCourse(recs[0].slug);
                        }
                      }}>
                        Quick Enroll (Recommended)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations - Always show for users with no or some enrollments */}
              <CourseRecommendations user={user} />
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>My Enrolled Courses</CardTitle>
                  <CardDescription>
                    Track your progress and continue learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {enrolledCoursesData.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      <p>No enrolled courses yet</p>
                      <Button variant="link" onClick={() => setActiveTab('explore')}>
                        Browse available courses
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {enrolledCoursesData.map((course) => {
                        const progress = getProgress(course.slug);
                        const category = courseCategories[course.slug as keyof typeof courseCategories];

                        return (
                          <Card key={course.slug} className="group hover:border-primary/50 transition-all">
                            <CardHeader className="pb-3">
                              <div className="mb-2 flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  {category?.category || 'Course'}
                                </Badge>
                                {progress === 100 && (
                                  <Badge className="bg-green-500/10 text-green-600 text-xs">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                              <CardDescription>{course.duration}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button asChild size="sm" className="w-full" variant={progress === 100 ? 'outline' : 'default'}>
                                <Link to={`/courses/${course.slug}`}>
                                  {progress === 100 ? 'Review' : 'Continue'}
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explore">
              <Card>
                <CardHeader>
                  <CardTitle>Explore More Courses</CardTitle>
                  <CardDescription>
                    Expand your skills with these courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {availableCourses.map((course) => {
                      const category = courseCategories[course.slug as keyof typeof courseCategories];
                      const isRecommended = getRecommendations(user, courses).some(r => r.slug === course.slug);

                      return (
                        <Card key={course.slug} className="group hover:border-primary/50 transition-all">
                          <CardHeader className="pb-3">
                            <div className="mb-2 flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {category?.category || 'Course'}
                              </Badge>
                              {isRecommended && (
                                <Badge className="bg-primary/10 text-primary text-xs">
                                  <Star className="mr-1 h-3 w-3" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                            <CardDescription>{course.duration}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button asChild size="sm" className="w-full">
                              <Link to={`/courses/${course.slug}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Profile & Settings</CardTitle>
                      <CardDescription>
                        Manage your interests and view your details
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                  <p className="text-muted-foreground mb-6">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {user.interests.length > 0 ? (
                      user.interests.map(interest => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No interests selected yet</p>
                    )}
                  </div>
                  <Button asChild>
                    <Link to="/user/profile">
                      Go to Profile Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
