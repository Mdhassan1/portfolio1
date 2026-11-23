export const CV_ASSET_URL =
  '/assets/aistudio/AbdulRahim_Software_Developer_Resume__1__90735a0e.pdf';
export const CV_DOWNLOAD_FILENAME = 'AbdulRahim_Software_Developer_Resume.pdf';

export const CONTACT_INFO = {
  name: 'Abdul Rahim S',
  wordmark: 'ABDUL RAHIM',
  email: 'arahim.dev02@gmail.com',
  phoneDisplay: '+91 9566751493',
  phoneHref: 'tel:+919566751493',
  swapUrl: 'https://bugbust.vercel.app/',
};

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface AboutPillar {
  index: string;
  title: string;
  description: string;
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    index: '01',
    title: 'Engineering',
    description: 'Building web and mobile applications.',
  },
  {
    index: '02',
    title: 'Product Thinking',
    description: 'Understanding real problems and creating practical solutions.',
  },
  {
    index: '03',
    title: 'Creative Execution',
    description: 'Combining functional development with thoughtful interface design.',
  },
];

export type TechCategoryId =
  | 'all'
  | 'frontend-mobile'
  | 'database'
  | 'design'
  | 'tools';

export interface TechItem {
  name: string;
  categoryId: Exclude<TechCategoryId, 'all'>;
  categoryLabel: string;
  contextNote: string;
}

export const TECH_CATEGORIES: { id: TechCategoryId; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'frontend-mobile', label: 'Frontend & Mobile' },
  { id: 'database', label: 'Database' },
  { id: 'design', label: 'Design' },
  { id: 'tools', label: 'Tools' },
];

export const TECH_ITEMS: TechItem[] = [
  {
    name: 'React.js',
    categoryId: 'frontend-mobile',
    categoryLabel: 'Frontend & Mobile',
    contextNote: 'Web application interfaces and interactive frontend builds.',
  },
  {
    name: 'React Native',
    categoryId: 'frontend-mobile',
    categoryLabel: 'Frontend & Mobile',
    contextNote: 'Mobile application feature development at MoonProduct.',
  },
  {
    name: 'FlutterFlow',
    categoryId: 'frontend-mobile',
    categoryLabel: 'Frontend & Mobile',
    contextNote: 'Cross-platform mobile application workflows and screens.',
  },
  {
    name: 'Supabase',
    categoryId: 'database',
    categoryLabel: 'Database',
    contextNote: 'Application data management and backend data workflows.',
  },
  {
    name: 'Figma',
    categoryId: 'design',
    categoryLabel: 'Design',
    contextNote: 'Application screen design, structure, and user flows.',
  },
  {
    name: 'Stitch',
    categoryId: 'design',
    categoryLabel: 'Design',
    contextNote: 'Interface layout design and user experience exploration.',
  },
  {
    name: 'GitHub',
    categoryId: 'tools',
    categoryLabel: 'Tools',
    contextNote: 'Version control and collaborative development workflows.',
  },
  {
    name: 'Microsoft Office',
    categoryId: 'tools',
    categoryLabel: 'Tools',
    contextNote: 'Documentation, structured planning, and coordination.',
  },
];

export type ProjectFilterGroup = 'all' | 'independent' | 'event' | 'moonproduct';

export type ArtworkVariant =
  | "scrap-finance"
  | "gold-ledger"
  | "productivity"
  | "swap-debug"
  | "erp"
  | "travel"
  | "bom"
  | "B2C-ecommerce";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  filterGroup: Exclude<ProjectFilterGroup, 'all'>;
  description: string;
  visualType: 'Conceptual Architecture' | 'Live Web Platform';
  artwork: ArtworkVariant;
  features?: string[];
  technologies?: string[];
  externalUrl?: string;
  externalLabel?: string;
}

export const PROJECT_FILTERS: { id: ProjectFilterGroup; label: string }[] = [
  { id: 'all', label: 'All Works (08)' },
  { id: 'independent', label: 'Independent Products (03)' },
  { id: 'event', label: 'Event Technology (01)' },
  { id: 'moonproduct', label: 'MoonProduct (04)' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "scrap-business-finance",
    number: "01",
    title: "Scrap Business Finance Management",
    shortTitle: "Scrap Finance",
    category: "Independent Product",
    filterGroup: "independent",
    description:
      "An independently developed finance-management application designed for scrap business operations.",
    visualType: "Conceptual Architecture",
    artwork: "scrap-finance",
  },
  {
    id: "gold-seller-ledger",
    number: "02",
    title: "Gold Seller Ledger",
    shortTitle: "Gold Ledger",
    category: "Independent Product",
    filterGroup: "independent",
    description:
      "An independent ledger application developed for gold-selling business operations.",
    visualType: "Conceptual Architecture",
    artwork: "gold-ledger",
  },
  {
    id: "personal-productivity-app",
    number: "03",
    title: "Personal Productivity App",
    shortTitle: "Productivity App",
    category: "Independent Product",
    filterGroup: "independent",
    description:
      "A productivity application developed to support personal task and productivity management.",
    visualType: "Conceptual Architecture",
    artwork: "productivity",
  },
  {
    id: "swap-2k26-debugging-platform",
    number: "04",
    title: "SWAP 2K26 Debugging Platform",
    shortTitle: "SWAP 2K26",
    category: "Event Technology / Web Application",
    filterGroup: "event",
    description:
      "A dedicated timed testing website developed for the SWAP 2K26 debugging competition.",
    visualType: "Live Web Platform",
    artwork: "swap-debug",
    features: [
      "Timed assessments",
      "Automated time calculation",
      "Marking system",
    ],
    externalUrl: "https://bugbust.vercel.app/",
    externalLabel: "Visit Live Platform",
  },
  {
    id: "erp-application",
    number: "05",
    title: "ERP Application",
    shortTitle: "ERP System",
    category: "Professional Experience / MoonProduct",
    filterGroup: "moonproduct",
    description:
      "Contributed to the development of an enterprise resource planning application.",
    visualType: "Conceptual Architecture",
    artwork: "erp",
    technologies: [
      "React Native",
      "FlutterFlow",
      "Supabase",
      "Figma",
      "Stitch",
    ],
  },
  {
    id: "travel-application",
    number: "06",
    title: "Travel Application",
    shortTitle: "Travel App",
    category: "Professional Experience / MoonProduct",
    filterGroup: "moonproduct",
    description:
      "Contributed to travel application development and its user-facing experience.",
    visualType: "Conceptual Architecture",
    artwork: "travel",
    technologies: [
      "React Native",
      "FlutterFlow",
      "Supabase",
      "Figma",
      "Stitch",
    ],
  },
  {
    id: "bill-of-materials",
    number: "07",
    title: "Bill of Materials (BOM)",
    shortTitle: "BOM Software",
    category: "Professional Experience / MoonProduct",
    filterGroup: "moonproduct",
    description: "Contributed to a Bill of Materials software project.",
    visualType: "Conceptual Architecture",
    artwork: "bom",
    technologies: [
      "React Native",
      "FlutterFlow",
      "Supabase",
      "Figma",
      "Stitch",
    ],
  },
  {
    id: "B2C-ecommerce",
    number: "08",
    title: "B2C E-Commerce",
    shortTitle: "B2C",
    category: "Professional Experience / MoonProduct",
    filterGroup: "moonproduct",
    description:
      "Contributed to the development of a business-to-consumer e-commerce application.",
    visualType: "Conceptual Architecture",
    artwork: "B2C-ecommerce",
    technologies: [
      "React Native",
      "FlutterFlow",
      "Supabase",
      "Figma",
      "Stitch",
    ],
  },
];

export interface ExperienceRole {
  role: string;
  duration: string;
  details: string[];
}

export const EXPERIENCE_COMPANY = {
  company: 'MoonProduct',
  location: 'Bangalore',
  roles: [
    {
      role: 'Software Developer',
      duration: '1 year',
      details: [
        'Contributed to software and application development across web and mobile products.',
        'Worked on ERP, travel, BOM and B2C e-commerce projects.',
        'Developed mobile application features using React Native and FlutterFlow.',
        'Worked with Supabase for application data management.',
        'Designed application screens and user flows using Figma and Stitch.',
      ],
    },
    {
      role: 'Software Development Intern',
      duration: '1 year',
      details: [
        'Gained practical experience in application development and interface design.',
        'Collaborated with team members and contributed to development and design tasks.',
      ],
    },
  ] as ExperienceRole[],
};

export interface AchievementItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  externalUrl?: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    number: '01',
    title: 'Student Committee Head',
    subtitle: 'MIET Arts and Science College',
    description:
      'Served as Student Committee Head, coordinating student initiatives and campus events.',
  },
  {
    number: '02',
    title: 'SWAP 2K26 — Debugging Competition Head',
    subtitle: 'Event Leadership & Platform Engineering',
    description:
      'Led the debugging competition and developed its dedicated participant testing platform with timed assessments, automated time calculation and a marking system.',
    externalUrl: 'https://bugbust.vercel.app/',
  },
  {
    number: '03',
    title: 'Second Prize',
    subtitle: 'BigLearn Debugging Competition',
    description:
      'Awarded Second Prize in the BigLearn Debugging Competition.',
  },
  {
    number: '04',
    title: 'JMC Expo',
    subtitle: 'Interactive Game Creation',
    description:
      'Created a game showcased for the college expo.',
  },
  {
    number: '05',
    title: 'Event Host',
    subtitle: 'SWAP 2K26 Inter-College Competition',
    description:
      'Hosted the SWAP 2K26 inter-college competition.',
  },
  {
    number: '06',
    title: 'College Symposiums',
    subtitle: 'Quiz & Debugging Competitions',
    description:
      'Active participant across college symposiums, competing in technical quiz and debugging competitions.',
  },
];

export const EDUCATION_DATA = {
  degree: {
    title: 'B.Sc. Computer Science — Third Year',
    institution: 'MIET Arts and Science College, Gundur, Tiruchirappalli',
    university: 'Bharathidasan University',
    aggregate: '71%',
  },
  schooling: [
    {
      level: 'Higher Secondary Education (CBSE)',
      score: '71%',
      period: '2021–2022',
    },
    {
      level: 'Secondary Education (CBSE)',
      score: '61%',
      period: '2019–2020',
    },
  ],
  courses: ['Naan Mudhalvan', 'Photoshop'],
};

export type SectionSeoKey =
  | 'home'
  | 'about'
  | 'expertise'
  | 'projects'
  | 'experience'
  | 'leadership'
  | 'education'
  | 'contact';

export interface SectionSeoMeta {
  sectionId: SectionSeoKey;
  title: string;
  description: string;
  keywords: string[];
  schemaType: string;
}

export const SECTION_SEO_META: Record<SectionSeoKey, SectionSeoMeta> = {
  home: {
    sectionId: "home",
    title: "Abdul Rahim S — Software Developer & Digital Builder",
    description:
      "Explore the portfolio of Abdul Rahim S, a Software Developer building web applications, mobile apps, and practical digital products.",
    keywords: [
      "Abdul Rahim S",
      "Software Developer",
      "Digital Builder",
      "Web Development",
      "Mobile Applications",
      "UI/UX Design",
    ],
    schemaType: "ProfilePage",
  },
  about: {
    sectionId: "about",
    title: "About Abdul Rahim S — Engineering & Product Thinking",
    description:
      "Learn about Abdul Rahim S, a Bangalore-experienced Software Developer combining engineering, product thinking, and interface design.",
    keywords: [
      "About Abdul Rahim S",
      "MoonProduct Bangalore",
      "Software Engineering",
      "Product Thinking",
      "Creative Execution",
    ],
    schemaType: "AboutPage",
  },
  expertise: {
    sectionId: "expertise",
    title: "Technical Toolkit — React, React Native & Supabase",
    description:
      "Discover the toolkit behind Abdul Rahim S: React.js, React Native, FlutterFlow, Supabase, Figma, Stitch and GitHub.",
    keywords: [
      "React.js",
      "React Native",
      "FlutterFlow",
      "Supabase",
      "Figma",
      "Stitch",
      "GitHub",
    ],
    schemaType: "WebPageElement",
  },
  projects: {
    sectionId: "projects",
    title: "Selected Works — Apps & Platforms by Abdul Rahim S",
    description:
      "Browse 8 projects by Abdul Rahim S, including SWAP 2K26 Debugging Platform, ERP, Travel, BOM, B2C E-Commerce, and independent tools.",
    keywords: [
      "SWAP 2K26 Debugging Platform",
      "bugbust.vercel.app",
      "ERP Application",
      "B2C E-Commerce",
      "Scrap Business Finance Management",
      "Gold Seller Ledger",
    ],
    schemaType: "CollectionPage",
  },
  experience: {
    sectionId: "experience",
    title: "Experience at MoonProduct — Abdul Rahim S Portfolio",
    description:
      "Review Abdul Rahim S's two years at MoonProduct Bangalore across Software Developer and Intern roles in web and mobile engineering.",
    keywords: [
      "MoonProduct Bangalore",
      "Software Developer Experience",
      "Software Development Intern",
      "React Native",
      "FlutterFlow",
      "Supabase",
    ],
    schemaType: "WebPageElement",
  },
  leadership: {
    sectionId: "leadership",
    title: "Leadership & Achievements — Abdul Rahim S Portfolio",
    description:
      "See leadership milestones by Abdul Rahim S: Student Committee Head, SWAP 2K26 Debugging Head, BigLearn Second Prize, and JMC Expo.",
    keywords: [
      "Student Committee Head",
      "SWAP 2K26",
      "BigLearn Debugging Competition",
      "JMC Expo",
      "MIET Arts and Science College",
    ],
    schemaType: "WebPageElement",
  },
  education: {
    sectionId: "education",
    title: "Education & Courses — Abdul Rahim S Portfolio",
    description:
      "View the academic background of Abdul Rahim S: B.Sc. Computer Science at MIET Arts and Science College, CBSE schooling, and courses.",
    keywords: [
      "B.Sc. Computer Science",
      "MIET Arts and Science College",
      "Bharathidasan University",
      "Naan Mudhalvan",
      "CBSE",
    ],
    schemaType: "WebPageElement",
  },
  contact: {
    sectionId: "contact",
    title: "Contact Abdul Rahim S — Let's Build Something Meaningful",
    description:
      "Connect with Abdul Rahim S via email or phone, download the latest CV, or explore the live SWAP 2K26 platform to start a collaboration.",
    keywords: [
      "Contact Abdul Rahim S",
      "arahim.dev02@gmail.com",
      "Hire Software Developer",
      "Download CV",
    ],
    schemaType: "ContactPage",
  },
};

