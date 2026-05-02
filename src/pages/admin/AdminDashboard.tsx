import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { courses } from '@/lib/courseData';
import { mockUsers } from '@/data/mockData';
import { startupStudioActivityAPI } from '@/lib/startupStudioActivity';
import { activityLogAPI, ActivityLog } from '@/lib/activityLog';
import { StartupStudioActivity } from '@/types/startupStudio';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Activity,
  UserCheck,
  Calendar,
  Search,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { AddUserModal } from '@/components/admin/AddUserModal';

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activityFilter, setActivityFilter] = useState<'all' | 'learner' | 'founder'>('all');
  const [startupActivities, setStartupActivities] = useState<StartupStudioActivity[]>([]);
  const [allActivities, setAllActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setStartupActivities(startupStudioActivityAPI.getActivityLog());
    setAllActivities(activityLogAPI.getAllActivities());
  }, []);

  // Filter users based on search
  const filteredUsers = mockUsers.filter(u =>
    u.role === 'user' &&
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate stats
  const totalUsers = mockUsers.filter(u => u.role === 'user').length;
  const totalEnrollments = mockUsers.reduce(
    (acc, u) => acc + u.enrolledCourses.length,
    0
  );

  // Get enrollment count per course
  const courseEnrollments = courses.map(course => ({
    ...course,
    enrollments: mockUsers.filter(u => u.enrolledCourses.includes(course.slug)).length,
  }));

  const filteredStudioActivities = startupActivities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.ideaSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.recommendedAction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter activities by type and search
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = 
      activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activityFilter === 'all' || activity.userType === activityFilter;
    return matchesSearch && matchesFilter;
  });

  // Recent enrollments (mock - last 5 users who enrolled)
  const recentEnrollments = mockUsers
    .filter(u => u.role === 'user' && u.enrolledCourses.length > 0)
    .slice(0, 5)
    .map(user => ({
      userName: user.name,
      courseSlug: user.enrolledCourses[0],
      courseName: courses.find(c => c.slug === user.enrolledCourses[0])?.title || user.enrolledCourses[0],
      date: user.createdAt,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage users, courses, and view analytics
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{courses.length}</p>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <UserCheck className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalEnrollments}</p>
                    <p className="text-sm text-muted-foreground">Total Enrollments</p>
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
                    <TrendingUp className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {totalEnrollments > 0 ? ((totalEnrollments / totalUsers) * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg. Courses/User</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>

            <motion.Card
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
                    <Activity className="h-6 w-6 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{startupActivities.length}</p>
                    <p className="text-sm text-muted-foreground">Startup Studio Leads</p>
                  </div>
                </div>
              </CardContent>
            </motion.Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="startup-studio">Studio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Popular Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Courses</CardTitle>
                  <CardDescription>
                    Courses ranked by enrollment count
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseEnrollments
                      .sort((a, b) => b.enrollments - a.enrollments)
                      .slice(0, 5)
                      .map((course, index) => (
                        <div
                          key={course.slug}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground">{course.duration}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {course.enrollments} enrollments
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest user enrollments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentEnrollments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No recent activity
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentEnrollments.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                              <Activity className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                Enrolled in {activity.courseName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {activity.date.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>
                        View and manage all registered users
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <AddUserModal onAddUser={(user) => {
                        // Handle adding new user
                        console.log('New user added:', user);
                        // You can add logic to update the mockUsers here
                      }} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Interests</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {user.interests.slice(0, 3).map(interest => (
                                <Badge key={interest} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                              {user.interests.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{user.interests.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge>{user.enrolledCourses.length}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.createdAt.toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>All User Activities</CardTitle>
                      <CardDescription>
                        Track all learner and founder activities and engagement
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial sm:w-56">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search activities..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <select
                        value={activityFilter}
                        onChange={(e) => setActivityFilter(e.target.value as 'all' | 'learner' | 'founder')}
                        className="px-3 py-2 border rounded-md text-sm bg-background"
                      >
                        <option value="all">All Activities</option>
                        <option value="learner">Learner Activities</option>
                        <option value="founder">Founder Activities</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredActivities.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No activities found
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredActivities.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{activity.userName}</p>
                                <p className="text-sm text-muted-foreground">{activity.userEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={activity.userType === 'learner' ? 'default' : 'secondary'}>
                                {activity.userType.charAt(0).toUpperCase() + activity.userType.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {activity.action.replace(/_/g, ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm truncate">{activity.description}</p>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>All Courses</CardTitle>
                  <CardDescription>
                    Overview of available courses and enrollments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Enrollments</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => {
                        const enrollmentCount = mockUsers.filter(u =>
                          u.enrolledCourses.includes(course.slug)
                        ).length;
                        const category =
                          course.slug === 'interview-prep' ? 'Career' :
                          course.slug === 'devops-sre' ? 'DevOps' :
                          course.slug === 'data-engineering' ? 'Data' :
                          course.slug === 'android-engineering' ? 'Mobile' :
                          'Development';

                        return (
                          <TableRow key={course.slug}>
                            <TableCell className="font-medium max-w-xs">
                              <div className="truncate">{course.title}</div>
                            </TableCell>
                            <TableCell>{course.duration}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={enrollmentCount > 0 ? 'default' : 'outline'}>
                                {enrollmentCount}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button asChild size="sm" variant="ghost">
                                <Link to={`/courses/${course.slug}`}>
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="startup-studio">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Startup Studio Activity</CardTitle>
                      <CardDescription>
                        Review recent idea submissions and prioritize outreach.
                      </CardDescription>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search leads or ideas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredStudioActivities.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No startup studio activity has been logged yet.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Idea Summary</TableHead>
                          <TableHead>Recommended Action</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudioActivities.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="font-medium">{activity.name}</TableCell>
                            <TableCell>{activity.email}</TableCell>
                            <TableCell className="max-w-xl">
                              <div className="line-clamp-2 text-sm text-slate-300">
                                {activity.ideaSummary}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xl">
                              <div className="line-clamp-2 text-sm text-slate-300">
                                {activity.recommendedAction}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={activity.status === 'new' ? 'secondary' : activity.status === 'contacted' ? 'outline' : activity.status === 'qualified' ? 'default' : 'secondary'}>
                                {activity.status.replace('-', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
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

export default AdminDashboard;
