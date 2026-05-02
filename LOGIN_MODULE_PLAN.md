# Login Module Implementation Plan

## Overview
Add a complete authentication system with separate User and Admin panels, course enrollment tracking, and personalized course recommendations.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Authentication Flow                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐     ┌──────────┐     ┌──────────────────────┐    │
│  │  Login   │────▶│  Auth    │────▶│  User Dashboard      │    │
│  │  Page    │     │  Check   │     │  - Enrolled Courses  │    │
│  └──────────┘     └──────────┘     │  - Recommendations   │    │
│         │                          └──────────────────────┘    │
│         │                               │                       │
│         ▼                               ▼                       │
│  ┌──────────┐                    ┌──────────────┐              │
│  │  Admin   │───────────────────▶│  Admin Panel │              │
│  │  Login   │                    │  - All Users │              │
│  └──────────┘                    │  - Analytics │              │
│                                  └──────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Features

### 1. Authentication System
- **Login Page**: Separate tabs for User/Admin login
- **Signup Page**: User registration with interests selection
- **Auth Context**: Global state management for user session
- **Protected Routes**: Route guards for user/admin pages
- **Local Storage**: Persist user session

### 2. User Panel
- **Dashboard**: View enrolled courses
- **Course Catalog**: Browse all available courses
- **Enrollment**: Enroll in new courses
- **Profile**: Manage interests and preferences
- **Recommendations**: AI-based course suggestions

### 3. Admin Panel
- **Dashboard**: User analytics, enrollment stats
- **User Management**: View all users, their enrollments
- **Course Management**: Add/edit courses (optional)
- **Analytics**: Enrollment trends, popular courses

### 4. Recommendation Engine
- **Based on**: User's selected interests, enrolled courses
- **Algorithm**: Similar course attributes (category, difficulty, topics)
- **Display**: "Recommended for You" section

---

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx           # Auth state management
├── lib/
│   ├── auth.ts                   # Auth utilities (mock backend)
│   └── recommendations.ts        # Course recommendation logic
├── types/
│   └── auth.ts                   # TypeScript interfaces
├── pages/
│   ├── Login.tsx                 # Login page
│   ├── Signup.tsx                # Signup page
│   ├── user/
│   │   ├── UserDashboard.tsx     # User home
│   │   ├── UserCourses.tsx       # Enrolled courses
│   │   └── UserProfile.tsx       # User settings
│   └── admin/
│       ├── AdminDashboard.tsx    # Admin home
│       ├── AdminUsers.tsx        # User management
│       └── AdminAnalytics.tsx    # Stats & reports
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx         # Login form component
│   │   ├── SignupForm.tsx        # Signup form component
│   │   └── ProtectedRoute.tsx    # Route guard
│   └── recommendations/
│       └── CourseRecommendations.tsx  # Recommendation widget
└── data/
    └── mockData.ts               # Mock users & enrollments
```

---

## Data Models

### User Interface
```typescript
interface User {
  id: string;
  email: string;
  password: string; // hashed in production
  name: string;
  role: 'user' | 'admin';
  interests: string[];  // e.g., ['backend', 'devops']
  enrolledCourses: string[];  // course slugs
  createdAt: Date;
}
```

### Course Interest Tags (added to existing courses)
```typescript
interface Course {
  // ... existing fields
  tags: string[];  // ['backend', 'system-design', 'cloud']
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'development' | 'devops' | 'data' | 'mobile';
}
```

---

## Implementation Steps

### Phase 1: Foundation (Day 1-2)
- [ ] Create TypeScript types for auth
- [ ] Set up AuthContext with login/logout/signup
- [ ] Create mock user data (admin + sample users)
- [ ] Build Login page with User/Admin tabs

### Phase 2: User Features (Day 3-4)
- [ ] Create User Dashboard layout
- [ ] Show enrolled courses with progress
- [ ] Add course enrollment functionality
- [ ] Build recommendation engine
- [ ] Display "Recommended Courses" section

### Phase 3: Admin Features (Day 5-6)
- [ ] Create Admin Dashboard layout
- [ ] User management table
- [ ] Enrollment analytics charts
- [ ] Course overview stats

### Phase 4: Integration (Day 7)
- [ ] Add protected route guards
- [ ] Update navigation with auth-aware menu
- [ ] Connect recommendation module to user interests
- [ ] Test complete user flows

---

## Recommendation Logic

```typescript
// Pseudo-code for course recommendations
function getRecommendations(user: User, allCourses: Course[]): Course[] {
  // 1. Get courses user is NOT enrolled in
  const availableCourses = allCourses.filter(
    c => !user.enrolledCourses.includes(c.slug)
  );
  
  // 2. Score each course based on:
  //    - Matches user's interests tags
  //    - Same category as enrolled courses
  //    - Similar difficulty progression
  
  const scored = availableCourses.map(course => ({
    course,
    score: calculateScore(user, course)
  }));
  
  // 3. Return top 3-5 recommendations
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.course);
}
```

### Example Recommendation Triggers
| User's Current Course | Recommended Next |
|----------------------|------------------|
| Backend Engineering | DevOps + SRE (natural progression) |
| Full Stack | Data Engineering (expand skills) |
| Interview Prep | Backend Engineering (specialize) |
| DevOps + SRE | Cloud Architecture (advanced) |

---

## UI Mockups

### Login Page
```
┌────────────────────────────────────────┐
│         LEVEL UP ENGINEER              │
├────────────────────────────────────────┤
│  ┌─────────┬─────────┐                 │
│  │  User   │  Admin  │                 │
│  └─────────┴─────────┘                 │
│                                        │
│  Email: [________________]             │
│  Password: [________________]          │
│                                        │
│  [ ] Remember me                       │
│                                        │
│  ┌──────────────────────────┐          │
│  │         Login            │          │
│  └──────────────────────────┘          │
│                                        │
│  Don't have an account? Sign up       │
└────────────────────────────────────────┘
```

### User Dashboard
```
┌─────────────────────────────────────────────────┐
│  Logo    Home  Courses  Profile    [User ▼]    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Welcome back, Rahul! 👋                        │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  📚 My Enrolled Courses (2)             │   │
│  │  ┌──────────────┐ ┌──────────────┐      │   │
│  │  │ Backend Eng  │ │ DevOps SRE   │      │   │
│  │  │ ████░░ 60%   │ │ ██░░░░ 30%   │      │   │
│  │  └──────────────┘ └──────────────┘      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  💡 Recommended For You                 │   │
│  │  Based on your interest in Backend      │   │
│  │  ┌──────────────┐ ┌──────────────┐      │   │
│  │  │ Full Stack   │ │ Data Eng     │      │   │
│  │  │ "Expand your │ │ "Next level  │      │   │
│  │  │  backend..." │ │  data..."    │      │   │
│  │  └──────────────┘ └──────────────┘      │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────────────┐
│  Logo    Dashboard  Users  Analytics   [Admin▼]│
├─────────────────────────────────────────────────┤
│                                                 │
│  Admin Dashboard                                │
│                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 150     │ │ 85%     │ │ 45      │          │
│  │ Users   │ │ Growth  │ │ Enroll. │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Recent Enrollments                     │   │
│  │  Rahul - Backend Eng - 2 hrs ago        │   │
│  │  Priya - Full Stack - 5 hrs ago         │   │
│  │  Amit - DevOps - 1 day ago              │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Tech Stack

| Feature | Technology |
|---------|------------|
| State Management | React Context + useReducer |
| Routing | React Router (existing) |
| Storage | localStorage (demo) / JWT (prod) |
| UI Components | shadcn/ui (existing) |
| Charts (Admin) | recharts (existing) |
| Forms | react-hook-form (existing) |

---

## Security Considerations (Production)

> ⚠️ This implementation uses **mock authentication** for demonstration.
> For production, replace with:

1. **Backend API**: Node.js/Express or serverless functions
2. **Password Hashing**: bcrypt/argon2
3. **JWT Tokens**: Secure session management
4. **HTTPS**: Encrypted transport
5. **Rate Limiting**: Prevent brute force
6. **OAuth**: Google/GitHub login options

---

## Next Steps

1. **Review this plan** and provide feedback
2. **Approve implementation** to proceed
3. **Customize requirements**:
   - Specific fields for user signup?
   - Admin capabilities needed?
   - Real backend or mock data?

---

## Implementation Status

### Phase 1: Foundation ✅ COMPLETED
- [x] Create TypeScript types for auth (`src/types/auth.ts`)
- [x] Set up AuthContext with login/logout/signup (`src/contexts/AuthContext.tsx`)
- [x] Create mock user data (`src/data/mockData.ts`)
- [x] Build Login page with User/Admin tabs (`src/pages/Login.tsx`)
- [x] Build Signup page with interests (`src/pages/Signup.tsx`)

### Phase 2: User Features ✅ COMPLETED
- [x] Create User Dashboard layout (`src/pages/user/UserDashboard.tsx`)
- [x] Show enrolled courses with progress
- [x] Build recommendation engine (`src/lib/recommendations.ts`)
- [x] Display "Recommended Courses" section (`src/components/recommendations/CourseRecommendations.tsx`)

### Phase 3: Admin Features ✅ COMPLETED
- [x] Create Admin Dashboard layout (`src/pages/admin/AdminDashboard.tsx`)
- [x] User management table
- [x] Enrollment analytics

### Phase 4: Integration ✅ COMPLETED
- [x] Add protected route guards (`src/components/auth/ProtectedRoute.tsx`)
- [x] Update navigation with auth-aware menu
- [x] Routes added to App.tsx with AuthProvider

---

## Estimated Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Planning | 1 day | This document |
| Core Auth | 2 days | Login, Signup, Context |
| User Panel | 2 days | Dashboard, Enrollment |
| Recommendations | 1 day | Suggestion engine |
| Admin Panel | 2 days | Admin UI, Analytics |
| Testing | 1 day | Bug fixes, polish |
| **Total** | **9 days** | Full feature |

---

*Generated for Level Up Engineer - Login Module Implementation*
