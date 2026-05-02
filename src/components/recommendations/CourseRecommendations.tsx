import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/lib/courseData';
import { getRecommendations } from '@/lib/recommendations';
import { User } from '@/types/auth';
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react';

interface CourseRecommendationsProps {
  user: User;
  onEnroll?: (courseSlug: string) => void;
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({ user, onEnroll }) => {
  const recommendations = getRecommendations(user, courses);

  // For users with no interests/enrollments, show popular courses
  const showPopular = user.interests.length === 0 && user.enrolledCourses.length === 0;
  const displayCourses = showPopular
    ? courses.slice(0, 4).map(course => ({
        slug: course.slug,
        title: course.title,
        reason: "Popular choice for learners",
        matchScore: 10,
      }))
    : recommendations;

  if (displayCourses.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            {showPopular ? (
              <TrendingUp className="h-4 w-4 text-primary" />
            ) : (
              <Lightbulb className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg">
              {showPopular ? "Popular Courses" : "Recommended For You"}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {showPopular
                ? "Start with these trending courses"
                : "Based on your interests and enrolled courses"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {displayCourses.map((rec) => {
            const course = courses.find(c => c.slug === rec.slug);
            if (!course) return null;

            return (
              <Card key={rec.slug} className="group hover:border-primary/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {rec.reason}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.duration}
                    </Badge>
                    {rec.matchScore >= 40 && (
                      <Badge className="bg-primary/10 text-primary text-xs">
                        Top Pick
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm" className="w-full">
                    <Link to={`/courses/${course.slug}`}>
                      View Course
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseRecommendations;
