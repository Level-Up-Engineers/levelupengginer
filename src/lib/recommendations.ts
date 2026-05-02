import { User, CourseRecommendation } from '@/types/auth';
import { Course } from '@/lib/courseData';
import { courseCategories, courseRecommendations } from '@/data/mockData';

interface ScoredCourse {
  slug: string;
  title: string;
  score: number;
  reason: string;
}

/**
 * Get personalized course recommendations for a user
 * Based on: interests, enrolled courses, and course relationships
 */
export function getRecommendations(
  user: User,
  allCourses: Course[]
): CourseRecommendation[] {
  const scoredCourses: ScoredCourse[] = [];

  // Get courses user is not enrolled in
  const availableCourses = allCourses.filter(
    course => !user.enrolledCourses.includes(course.slug)
  );

  for (const course of availableCourses) {
    let score = 0;
    const reasons: string[] = [];
    const courseMeta = courseCategories[course.slug as keyof typeof courseCategories];

    // Score based on user's enrolled courses and recommendations
    for (const enrolledSlug of user.enrolledCourses) {
      const recs = courseRecommendations[enrolledSlug];
      if (recs) {
        const rec = recs.find(r => r.slug === course.slug);
        if (rec) {
          score += 30;
          reasons.push(rec.reason);
        }
      }
    }

    // Score based on interest matching
    if (courseMeta) {
      for (const interest of user.interests) {
        if (courseMeta.tags.includes(interest)) {
          score += 20;
        }
        // Bonus for category match
        if (courseMeta.category === getInterestCategory(interest)) {
          score += 10;
        }
      }
    }

    // Bonus for being a natural progression (interview-prep -> any technical course)
    if (user.enrolledCourses.includes('interview-prep') && course.slug !== 'interview-prep') {
      score += 15;
      if (!reasons.length) {
        reasons.push('Build on your interview preparation with practical skills');
      }
    }

    // Small boost for courses with no enrollment (encourage exploration)
    if (user.enrolledCourses.length === 0) {
      score += 5;
      if (!reasons.length) {
        reasons.push('Popular course for new learners');
      }
    }

    if (score > 0) {
      scoredCourses.push({
        slug: course.slug,
        title: course.title,
        score,
        reason: reasons[0] || 'Matches your learning path',
      });
    }
  }

  // Sort by score and return top recommendations
  scoredCourses.sort((a, b) => b.score - a.score);

  return scoredCourses.slice(0, 4).map(sc => ({
    slug: sc.slug,
    title: sc.title,
    reason: sc.reason,
    matchScore: sc.score,
  }));
}

/**
 * Get category for an interest ID
 */
function getInterestCategory(interestId: string): string {
  const categories: Record<string, string> = {
    backend: 'development',
    frontend: 'development',
    fullstack: 'development',
    devops: 'devops',
    data: 'data',
    mobile: 'mobile',
    'system-design': 'architecture',
    interview: 'career',
    cloud: 'devops',
    api: 'development',
  };
  return categories[interestId] || 'development';
}

/**
 * Get suggested interests based on a selected course
 */
export function getSuggestedInterests(courseSlug: string): string[] {
  const courseMeta = courseCategories[courseSlug as keyof typeof courseCategories];
  if (!courseMeta) return [];
  return courseMeta.tags;
}

/**
 * Check if a user might be interested in a module based on their profile
 */
export function isUserInterestedInModule(
  user: User,
  courseSlug: string
): { interested: boolean; reason: string } {
  // If already enrolled, not a recommendation
  if (user.enrolledCourses.includes(courseSlug)) {
    return { interested: false, reason: '' };
  }

  const courseMeta = courseCategories[courseSlug as keyof typeof courseCategories];

  // Check interest tag matches
  if (courseMeta) {
    for (const interest of user.interests) {
      if (courseMeta.tags.includes(interest)) {
        return {
          interested: true,
          reason: `Matches your interest in ${interest}`
        };
      }
    }
  }

  // Check recommendation relationships
  for (const enrolledSlug of user.enrolledCourses) {
    const recs = courseRecommendations[enrolledSlug];
    if (recs?.some(r => r.slug === courseSlug)) {
      return {
        interested: true,
        reason: 'Recommended based on your enrolled courses'
      };
    }
  }

  return { interested: false, reason: '' };
}
