export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  duration: string;
  description: string;
  overview: string;
  icon: string;
  highlights: string[];
  modules: CourseModule[];
  basePrice?: number;
  internshipPrice?: number;
  internshipDuration?: string;
  whoShouldTake?: string[];   
}

export const courses: Course[] = [
  {
    slug: "interview-prep",
    title: "Intensive Interview Prep Program – DSA + CS Fundamentals + System Design",
    shortTitle: "Intensive Interview Prep Program",
    duration: "3 Months",
    description: "Master Data Structures, Algorithms, core Computer Science fundamentals, and System Design to crack interviews at top product-based companies.",
    overview: "An intensive 3-month program designed to transform your problem-solving and technical skills to prepare you for coding rounds and real interview scenarios at FAANG and top product companies. Includes 1:1 mentorship, mock interviews, machine coding challenges, resume review, and referrals.",
    icon: "Code",
    basePrice: 15999,
    internshipPrice: 23999,
    internshipDuration: "2 Months",
    highlights: [
      "1:1 Mentorship from FAANG engineers",
      "200+ DSA problems with detailed solutions",
      "System Design fundamentals & case studies",
      "Mock interviews with real interviewers",
      "Machine coding rounds practice",
      "Core Computer Science fundamentals: OS, DBMS & Networking",
      "Resume review & optimization",
      "Referrals to top companies"
    ],
    modules: [
      {
        title: "Foundation – Arrays, Strings & Math",
        topics: [
          "Arrays & Hashing",
          "Two Pointers",
          "Sliding Window",
          "String Manipulation",
          "Bit Manipulation"
        ]
      },
      {
        title: "Core DSA – Trees, Graphs & Optimization",
        topics: [
          "Binary Trees & BST",
          "Graphs – BFS & DFS",
          "Dynamic Programming",
          "Backtracking",
          "Greedy Algorithms"
        ]
      },
      {
        title: "Computer Science Fundamentals – OS, DBMS & Networking",
        topics: [
          "Operating Systems basics: Processes, Scheduling, Memory & Concurrency",
          "Database Management Systems: SQL & NoSQL, Normalization, Transactions",
          "Computer Networks: Protocols, HTTP/HTTPS, TCP/IP models",
          "OS/DB/Networking interview concepts & common questions"
        ]
      },
      {
        title: "Advanced System Design & Mock Interview Module",
        topics: [
          "System Design Fundamentals & Scalable Architecture",
          "High-Level and Low-Level Design Case Studies",
          "Design Patterns & Trade-offs",
          "Machine Coding Rounds Practice",
          "Live Mock Interviews with feedback",
          "Interview strategies & behavioural preparation"
        ]
      }
    ]
  }
  ,
  {
    slug: "backend-engineering",
    title: "Backend Engineering Program",
    shortTitle: "Backend Engineering",
    duration: "4 Months",
    description: "Build production-grade backend systems with microservices, databases, scalable architecture, real projects, and mock interviews to help you crack your dream job.",
    overview: "A comprehensive 4-month program that takes you from backend fundamentals to building production-ready systems and real world projects. Learn from engineers at top companies, gain hands-on experience with real projects & mock interviews, and get placement support with resume review and referrals.",
    icon: "Server",
    basePrice: 19999,
    internshipPrice: 27999,
    internshipDuration: "2 Months",
    whoShouldTake: [
      "Final-year students targeting full-time software roles",
      "3rd-year students preparing for internships",
      "Self-taught developers needing structured interview prep",
      "Engineers struggling past mid-level rounds",
      "Anyone serious about becoming interview-ready"
    ],
    highlights: [
      "1:1 Mentorship from senior backend engineers",
      "Build production-grade real projects",
      "Microservices architecture patterns",
      "Design patterns & distributed systems",
      "Cloud deployment & DevOps basics",
      "Resume review & interview referrals",
      "Mock interviews with feedback",
      "Placement support & career coaching"
    ],
    modules: [
      {
        title: "Foundation – Languages, Frameworks & Concurrency",
        topics: [
          "Go/Java/Python/Node.js deep dive",
          "Spring Boot / Express / Django / Gin",
          "REST API Design",
          "Authentication & Authorization",
          "Concurrency fundamentals & patterns",
          "Testing strategies (unit & integration)"
        ]
      },
      {
        title: "Databases & Storage Systems",
        topics: [
          "SQL – PostgreSQL/MySQL",
          "NoSQL – MongoDB/Redis",
          "Database indexing & optimization",
          "Data modeling & relationships",
          "Message queues – Kafka/RabbitMQ"
        ]
      },
      {
        title: "Microservices, DevOps & Cloud",
        topics: [
          "Microservices architecture patterns",
          "Docker & containerization",
          "CI/CD pipelines & GitHub Actions",
          "Cloud deployment (AWS/GCP)",
          "Monitoring, logging & observability"
        ]
      },
      {
        title: "System Design, Scalability & Patterns",
        topics: [
          "High-level system design fundamentals",
          "Caching strategies & load balancing",
          "Rate limiting, fault tolerance & resiliency",
          "Design patterns (SOLID, factory, strategy, observer)",
          "Scalable architecture case studies"
        ]
      },
      {
        title: "Projects & Mock Interviews",
        topics: [
          "Build a Food Ordering Platform (order API, menu, cart, payment flows)",
          "Build an Alert Manager System(event triggers, notification pipelines)",
          "Build a BookMyShow-style Ticketing Backend (concurrency-safe seat booking, notifications)", 
          "Build a Distributed Redis-based Caching System (pub/sub, failover)", 
          "Practice real design patterns in projects for modular & scalable code",
          "Mock technical interviews with senior mentors",
          "Resume review, portfolio readiness & interview feedback sessions"
        ]
      }
    ]
  },  
  {
    slug: "devops-sre",
    title: "DevOps + SRE Engineering Program",
    shortTitle: "DevOps + SRE",
    duration: "4 Months",
    description: "Master DevOps practices, cloud infrastructure, containers, CI/CD, and Site Reliability Engineering with hands-on projects and mock interview preparation to help you land your dream DevOps role.",
    overview: "A 4-month immersive, hands-on program covering everything from Linux fundamentals to advanced Kubernetes, CI/CD, and SRE practices. Build real cloud infrastructure projects, practice mock interviews with feedback, and get placement support including resume review and referrals.",
    icon: "Cloud",
    basePrice: 22999,
    internshipPrice: 30999,
    internshipDuration: "2 Months",
    highlights: [
      "1:1 Mentorship from DevOps/SRE leads",
      "Real-world hands-on projects with cloud deployment",
      "CI/CD design, Kubernetes & container orchestration",
      "Infrastructure as Code & automation workflows",
      "Mock interview rounds with senior engineers",
      "Incident management & SRE best practices",
      "Resume review & referrals",
      "Placement support & career coaching"
    ],
    modules: [
      {
        title: "Foundation – Linux, Networking & Automation",
        topics: [
          "Linux administration & shell scripting",
          "Networking fundamentals (DNS, HTTP, TCP/IP)",
          "Security basics & firewall hardening",
          "Git & version control fundamentals",
          "Automation scripts & troubleshooting workflows"
        ]
      },
      {
        title: "Cloud & Infrastructure Fundamentals",
        topics: [
          "Core services in AWS/GCP/Azure",
          "Infrastructure as Code with Terraform",
          "Configuration management with Ansible",
          "Cloud networking, VPCs & security groups",
          "Cost optimization best practices"
        ]
      },
      {
        title: "Containers, Orchestration & CI/CD",
        topics: [
          "Docker deep dive & container lifecycle",
          "Kubernetes architecture & deployments",
          "Helm charts & service meshes",
          "CI/CD pipelines with Jenkins/GitHub Actions",
          "Container security and best practices"
        ]
      },
      {
        title: "SRE Practices & Observability",
        topics: [
          "SLIs, SLOs & SLAs for reliability",
          "Monitoring with Prometheus & Grafana",
          "Logging with ELK stack (Elasticsearch, Logstash, Kibana)",
          "Incident management & chaos engineering",
          "Alerting & escalation workflows"
        ]
      },
      {
        title: "Real Projects & Mock Interview Module",
        topics: [
          "Build Multi-Cloud CI/CD Pipeline Project (Git → Build → Deploy using Jenkins, Terraform, Docker, Kubernetes) to demonstrate end-to-end automation skills", 
          "Infrastructure provisioning with Terraform + Ansible on AWS/GCP (IaC skills)",
          "Monitoring & alerting project with Prometheus + ELK Stack (observability best practices)", 
          "Kubernetes production scenarios: self-healing clusters & secure deployments",
          "Real interview mock rounds with feedback from senior engineers (scenario-based & tool-focused)",
          "DevOps interview tasks & exercises (scenario questions & troubleshooting drills)"
        ]
      }
    ]
  }
  ,
  {
    slug: "full-stack",
    title: "Full Stack Engineering Program",
    shortTitle: "Full Stack Engineering",
    duration: "4 Months",
    description: "Become a complete, job-ready full stack engineer with modern frontend, backend, cloud deployment, real projects, portfolio builds, and interview practice.",
    overview: "A comprehensive 4-month program that covers the full web development stack — from pixel-perfect frontends to scalable backends, deployment, system design, real project builds, and mock interview preparation. Graduate ready to build and ship production applications with confidence.",
    icon: "Layers",
    basePrice: 19999,
    internshipPrice: 27999,
    internshipDuration: "2 Months",
    highlights: [
      "1:1 Mentorship from full stack leads",
      "Build 4+ production-ready projects",
      "Modern React, Next.js & backend fundamentals",
      "Portfolio builds & GitHub showcase",
      "Mock interviews & interview strategy sessions",
      "Deployment, DevOps basics & cloud hosting",
      "Resume review & referrals",
      "Placement support & career coaching"
    ],
    modules: [
      {
        title: "Frontend Fundamentals",
        topics: [
          "HTML5, CSS3, JavaScript (ES6+)",
          "TypeScript fundamentals",
          "React.js deep dive",
          "State management (Redux/Zustand)",
          "Responsive design & accessibility"
        ]
      },
      {
        title: "Advanced Frontend & UX",
        topics: [
          "Next.js & SSR/SSG",
          "Component libraries & design systems",
          "Testing (Jest, React Testing Library)",
          "Performance optimization",
          "Animation & UX/UI patterns"
        ]
      },
      {
        title: "Backend, APIs & Databases",
        topics: [
          "Node.js / Express.js / Go/Python backend options",
          "RESTful API design & best practices",
          "PostgreSQL & MongoDB integration",
          "Authentication & Authorization (JWT, OAuth)",
          "File uploads, storage & backend security"
        ]
      },
      {
        title: "Projects, Deployment & DevOps",
        topics: [
          "Full stack project architecture",
          "Docker & CI/CD pipelines",
          "Cloud deployment (AWS/Vercel/Cloud Run)",
          "Monitoring & analytics setup",
          "Capstone project planning & execution"
        ]
      },
      {
        title: "Real Projects & Portfolio Builds",
        topics: [
          "E-commerce platform (products, cart, orders)",
          "Social Media app (feeds, user profiles, real-time features)",
          "Khatabook-style personal finance tracker (transactions & dashboards)",
          "Task manager / team collaboration app with real auth",
          "Push project updates to personal GitHub portfolio"
        ]
      },
      {
        title: "Interview Prep & Mock Interview Module",
        topics: [
          "Full stack interview challenges & best practices",
          "300+ interview questions spanning frontend, backend & systems",
          "Mock interviews with senior engineers (technical + behavioural)",
          "Portfolio walkthrough & project demo coaching",
          "System design basics for full stack roles",
          "Debugging & real coding challenge practice"
        ]
      }
    ]
  },
  {
    slug: "data-engineering",
    title: "Data Engineering Program",
    shortTitle: "Data Engineering",
    duration: "4 Months",
    description: "Master the skills to build robust, scalable data pipelines, data warehouses, big data processing systems, and cloud data platforms — with real projects, mock interview prep, and placement support.",
    overview: "A comprehensive 6-month program that takes you from foundational data engineering concepts to building enterprise-level data pipelines and architectures. Learn SQL, Python, ETL/ELT, big data frameworks, cloud data platforms, orchestration tools, and real project deployments. Includes mock interviews, resume review, and referrals to help launch your career as a Data Engineer.",
    icon: "Database",
    basePrice: 19999,
    internshipPrice: 27999,
    internshipDuration: "2 Months",
    highlights: [
      "1:1 Mentorship from data engineering experts",
      "Build production-ready data pipelines & platforms",
      "Hands-on experience with Hadoop, Spark, Kafka & Airflow",
      "Cloud data platform skills (AWS/GCP/Azure)",
      "Mock interviews & feedback with senior engineers",
      "Resume review, portfolio builds & referrals",
      "Real-time streaming pipeline expertise",
      "Placement support & career coaching"
    ],
    modules: [
      {
        title: "Data Engineering Foundations",
        topics: [
          "Introduction to Data Engineering & modern data ecosystem",
          "Role of data engineers & data lifecycle",
          "Data architecture basics & data stack overview",
          "Advanced SQL for data engineering",
          "Python for data processing, automation & scripting"
        ]
      },
      {
        title: "Data Storage, Modeling & Warehousing",
        topics: [
          "Relational & NoSQL database fundamentals",
          "Data modeling principles (ER modeling, star & snowflake schema)",
          "Dimensional modeling & OLAP/OLTP systems",
          "Data warehousing concepts, Redshift/Snowflake basics",
          "Indexing, partitioning & query performance optimization"
        ]
      },
      {
        title: "ETL, Pipelines & Workflow Orchestration",
        topics: [
          "ETL/ELT processes & pipeline design",
          "Data ingestion from APIs, files & streaming sources",
          "Apache Airflow – DAGs, scheduling, monitoring",
          "Data validation, transformation, and quality checks",
          "Incremental loads & operational workflows"
        ]
      },
      {
        title: "Big Data Processing & Real-Time Streams",
        topics: [
          "Hadoop ecosystem & HDFS fundamentals",
          "Apache Spark (batch & streaming) with PySpark/Scala",
          "Kafka producer/consumer & real-time pipelines",
          "Processing large datasets with Spark SQL",
          "Spark optimization & cluster resource tuning"
        ]
      },
      {
        title: "Cloud Data Platforms & Deployment",
        topics: [
          "AWS/GCP/Azure core services for data engineering",
          "S3, BigQuery, Redshift, Azure Synapse basics",
          "Serverless data workflows (Glue, Dataflow)",
          "Cloud storage & lifecycle management",
          "Cost optimization & security best practices"
        ]
      },
      {
        title: "Real Projects & Mock Interview Module",
        topics: [
          "Build ETL pipeline project (ingest → transform → load to data warehouse)",
          "Design eal-time streaming analytics pipeline with Kafka & Spark",
          "Cloud data platform deployment (e.g., AWS/GCP pipeline automation)",
          "Data quality & testing automation project",
          "Mock interviews with senior data engineers",
          "Portfolio & resume walkthrough + interview strategy"
        ]
      }
    ]
  },
  {
    slug: "android-engineering",
    title: "Android Engineering Program",
    shortTitle: "Android Engineering",
    duration: "4 Months",
    description: "Become a professional Android engineer by mastering Kotlin, Android SDK, Jetpack, app architecture, real projects, and interview skills — ready for mobile development roles.",
    overview: "A 4-month hands-on Android engineering program — from Kotlin fundamentals and Android platform essentials to advanced app architecture, real-world projects, mock interview prep, and placement support. Learn by building production-grade apps, portfolio showcases, and get 1:1 mentorship and referrals.",
    icon: "Mobile",
    basePrice: 19999,
    internshipPrice: 27999,
    internshipDuration: "2 Months",
    highlights: [
      "1:1 Mentorship from Android leads",
      "Build production-ready mobile apps",
      "Kotlin & Android Studio mastery",
      "Jetpack & modern Android architecture",
      "Mock technical interviews & review",
      "Portfolio projects + Google Play deployment",
      "Resume review & referrals",
      "Placement support & career coaching"
    ],
    modules: [
      {
        title: "Foundation – Kotlin & Android Basics",
        topics: [
          "Kotlin language fundamentals & idioms",
          "Android Studio setup & tools",
          "Android application components (Activities, Fragments)",
          "Layouts, Views & UI fundamentals",
          "Application lifecycles & navigation",
          "Jetpack Compose basics"
        ]
      },
      {
        title: "Core Android Development",
        topics: [
          "RecyclerView & dynamic lists",
          "Networking & REST API integration",
          "Data storage: SQLite, Room & Shared Preferences",
          "Coroutines & background processing",
          "Material Design & responsive UI",
          "Permissions, sensors & device features"
        ]
      },
      {
        title: "Advanced Architecture & Patterns",
        topics: [
          "MVVM & Clean Architecture",
          "Dependency Injection (Hilt/Dagger)",
          "State management & UI patterns",
          "Testing & debugging with Android tools",
          "Performance optimization",
          "Offline sync & caching strategies"
        ]
      },
      {
        title: "Deployment & Professional Practices",
        topics: [
          "Publishing apps to Google Play Store",
          "CI/CD basics for Android apps",
          "App signing, builds & flavors",
          "Crash reporting & analytics setup",
          "Security best practices"
        ]
      },
      {
        title: "Real Projects & Portfolio Builds",
        topics: [
          "Build E-commerce Android App(product lists, cart, orders)",
          "Build Chat/Messaging App with real-time updates",
          "Build Social Feed App (profiles, posts, likes)",
          "Build Location & Maps App (geolocation & routing)",
          "Deploy projects to Google Play Store"
        ]
      },
      {
        title: "Interview Prep & Mock Interview Module",
        topics: [
          "Android interview Q&A & problem sets",
          "Mock interviews with senior engineers",
          "Android architectural & design discussions",
          "Debugging challenge rounds",
          "Portfolio walkthrough & resume coaching"
        ]
      }
    ]
  }
];

/** Per-course SEO metadata (title 55–60 chars, description 150–155 chars). */
export const courseSeo: Record<string, { title: string; description: string }> = {
  "interview-prep": {
    title: "Interview Prep – DSA & System Design | Level Up Engineers",
    description: "3-month intensive interview prep: 200+ DSA problems, CS fundamentals, system design and mock interviews with FAANG mentors. Crack top product companies.",
  },
  "backend-engineering": {
    title: "Backend Engineering Course & Mentorship | Level Up Engineers",
    description: "Master backend engineering — APIs, databases, microservices, cloud and scalable system design. 1:1 mentorship, real projects and mock interviews included.",
  },
  "devops-sre": {
    title: "DevOps + SRE Course – Cloud, K8s, CI/CD | Level Up Engineers",
    description: "Learn DevOps and SRE hands-on — Linux, cloud infrastructure, Kubernetes, CI/CD and observability tooling. Real projects, 1:1 mentorship and interview prep.",
  },
  "full-stack": {
    title: "Full Stack Engineering Course Online | Level Up Engineers",
    description: "Become a full stack engineer — modern frontend, backend APIs, databases and deployment. Build portfolio projects with 1:1 mentorship and interview prep.",
  },
  "data-engineering": {
    title: "Data Engineering Course – ETL, Big Data | Level Up Engineers",
    description: "Learn data engineering end to end — data modeling, warehousing, ETL pipelines, big data and streaming. Real projects, 1:1 mentorship and interview prep.",
  },
  "android-engineering": {
    title: "Android Course – Kotlin & Jetpack Apps | Level Up Engineers",
    description: "Build production Android apps with Kotlin, Jetpack and modern architecture. Real projects, 1:1 mentorship and interview prep from top mobile engineers.",
  },
};

export interface Instructor {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedin: string;
  bio: string;
  experience: string;
}

// Professional headshots in black attire (Unsplash)
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&crop=face`;

export const instructors: Instructor[] = [
  {
    name: "Vikas Pal",
    role: "Senior Software Engineer",
    company: "Blinkit,Zomato,Park+",
    image: "/instructor-vikas.jpeg", // Your photo – place file in public/
    linkedin: "https://www.linkedin.com/in/palrohitg/",
    bio: "Senior Software Engineer at Blinkit,Ex-Park+ engineer with deep expertise in  backend,system design, distributed systems and algorithms. Took 300+ interviews",
    experience: "5+ years",
  },
  {
    name: "Avinash Prajapati",
    role: "Senior Software Engineer",
    company: "Microsoft, Park+",
    image: "/instructor-avinash.png", // Your photo – place file in public/
    linkedin: "https://www.linkedin.com/in/aviprajapati/",
    bio: "Senior Software Engineer with deep expertise in backend systems. Built and scaled services at Microsoft and Park+. Passionate about distributed systems, APIs, and mentoring engineers.",
    experience: "5+ years",
  },
  {
    name: "Naman Kumar",
    role: "Software Engineer 2",
    company: "Google, Blinkit",
    image: "/instructor-naman.jpeg", // Your photo – place file in public/
    linkedin: "https://www.linkedin.com/in/naman-kumar-83abb2187/",
    bio: "Full stack engineer with experience at Google and Blinkit. Builds scalable products end-to-end and loves mentoring engineers on frontend, backend, and system design.",
    experience: "3+ years",
  },
  {
    name: "Deepankar Kumar Rao",
    role: "Data Architect",
    company: "Oyo, Park+",
    image: "/instructor-deepankar.jpeg", // Your photo – place file in public/
    linkedin: "https://www.linkedin.com/in/deepankar-rao-615483150/",
    bio: "NIT Kurukshetra alum. Data architect who has built scalable data pipelines at top startups. Expert in designing and running systems that handle data at scale.",
    experience: "7+ years",
  },
  {
    name: "Shiv Ram",
    role: "Tech Lead",
    company: "Paytm",
    image: "/instructor-shivram.jpeg",
    linkedin: "https://www.linkedin.com/in/jani-shiv-ram/",
    bio: "NITK alum. Tech Lead at Paytm. Full-stack expert with deep experience in developer tools, APIs, and platform engineering.",
    experience: "5+ years",
  },
  {
    name: "Ashutosh Singh",
    role: "Senior Software Engineer",
    company: "Amazon, PhysicsWallah",
    image: "/instructor-ashutosh.jpeg",
    linkedin: "https://www.linkedin.com/in/ashutosh-singh-70208b154/",
    bio: "Worked with Amazon and PhysicsWallah as Full-stack expert with deep experience in MERN Stack developer tools, APIs, and platform engineering.",
    experience: "5+ years",
  }
];

export const testimonials = [
  {
    name: "Ayush",
    role: "SDE-2 at Swiggy",
    text: "Level Up Engineers completely transformed my interview preparation. The 1:1 mentorship and structured approach helped me crack Swiggy in just 2 months!",
    avatar: "AY",
  },
  {
    name: "Nitish",
    role: "Backend Engineer at HotStar",
    text: "The backend engineering program gave me real-world project experience that made all the difference. My mentor's guidance was invaluable.",
    avatar: "NH",
  },
  {
    name: "Paras",
    role: "DevOps Engineer at Amazon",
    text: "From zero DevOps knowledge to landing a role at Amazon – that's my Level Up Engineers journey. The hands-on approach is unmatched.",
    avatar: "PA",
  },
];

export const stats = [
  { value: "80+", label: "Students Placed" },
  { value: "50+", label: "Hiring Partners" },
  { value: "95%", label: "Placement Rate" },
  { value: "4.9/5", label: "Student Rating" },
];
