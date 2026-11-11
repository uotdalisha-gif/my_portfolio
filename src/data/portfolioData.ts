import {
  Palette,
  Server,
  Network,
  BrainCircuit
} from 'lucide-react';
import {
  siPython,
  siReact,
  siHtml5,
  siPhp,
  siTailwindcss,
  siVmware,
  siFigma,
  siGit
} from 'simple-icons';
import {
  ProfileInfo,
  NavItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  AwardItem,
  EducationItem,
  ExperienceItem,
  GalleryItem
} from '../types/portfolio';

export const PROFILE_DATA: ProfileInfo = {
  name: 'Uot Dalisha',
  nativeName: 'អ៊ួត ដាលីហ្សា',
  headline: 'IT Specialist & Developer',
  subheadline: 'crafting resilient systems & modern digital experiences',
  bio: 'Passionate Computer Science student and IT practitioner with a blend of software engineering, network administration, and visual UI design. Dedicated to building reliable, scalable, and intuitive technology solutions.',
  secondaryBio: 'Currently pursuing a Bachelor of Computer Science at Build Bright University (BBU). Experienced in enterprise server configurations (Active Directory, DFS), full-stack development, and user-centric design principles.',
  university: 'Build Bright University',
  faculty: 'Faculty of Science and Technology',
  location: 'Battambang, Cambodia',
  studentId: 'BBU-2026-UD',
  email: 'uotdalisha@gmail.com',
  githubUrl: 'https://github.com/uotdalisha-gif',
  telegramUrl: 'https://t.me/satelr',
  phone: '+855 97 650 1138',
  avatarUrl: '/avatar.jpg',
  isAvailableForWork: true
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' }
];

export const FEATURED_TECH: string[] = [
  'Python',
  'TypeScript',
  'React.js',
  'Tailwind CSS',
  'Active Directory',
  'PHP & MySQL',
  'VMware',
  'Figma'
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'PYTHON',
    category: 'DEVELOPMENT',
    description: 'Automation scripts, backend logic, and data analysis',
    simpleIcon: siPython,
    brandColor: '#3776AB',
    proficiency: 'Advanced'
  },
  {
    id: 'react-ts',
    name: 'REACT & TS',
    category: 'DEVELOPMENT',
    description: 'Modern component architectures & typed interfaces',
    simpleIcon: siReact,
    brandColor: '#61DAFB',
    proficiency: 'Advanced'
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'DEVELOPMENT',
    description: 'Semantic layouts, Flexbox/Grid, and responsive design',
    simpleIcon: siHtml5,
    brandColor: '#E34F26',
    proficiency: 'Expert'
  },
  {
    id: 'php-mysql',
    name: 'PHP & MYSQL',
    category: 'DEVELOPMENT',
    description: 'Database schema design, queries, and server scripts',
    simpleIcon: siPhp,
    brandColor: '#777BB4',
    proficiency: 'Proficient'
  },
  {
    id: 'tailwind',
    name: 'TAILWIND CSS',
    category: 'DEVELOPMENT',
    description: 'Utility-first modern styling & brutalist aesthetics',
    simpleIcon: siTailwindcss,
    brandColor: '#06B6D4',
    proficiency: 'Advanced'
  },
  {
    id: 'ad-ds',
    name: 'ACTIVE DIRECTORY',
    category: 'NETWORKING',
    description: 'Domain Controller, Tree Domain, AD DS, and GPO policies',
    icon: Server,
    brandColor: '#0078D4',
    proficiency: 'Advanced'
  },
  {
    id: 'dfs-net',
    name: 'DFS & REPLICATION',
    category: 'NETWORKING',
    description: 'Distributed File System namespaces & RDC synchronization',
    icon: Network,
    brandColor: '#0ea5e9',
    proficiency: 'Advanced'
  },
  {
    id: 'vmware',
    name: 'VMWARE LABS',
    category: 'NETWORKING',
    description: 'Virtual network topologies, DHCP, and host clustering',
    simpleIcon: siVmware,
    brandColor: '#607078',
    proficiency: 'Advanced'
  },
  {
    id: 'ui-ux',
    name: 'UI / UX DESIGN',
    category: 'DESIGN',
    description: 'Wireframing, design systems, and user flow mapping',
    simpleIcon: siFigma,
    brandColor: '#F24E1E',
    proficiency: 'Advanced'
  },
  {
    id: 'visual-poster',
    name: 'POSTER & BRANDING',
    category: 'DESIGN',
    description: 'Client poster designs, branding assets, and typography',
    icon: Palette,
    brandColor: '#ec4899',
    proficiency: 'Advanced'
  },
  {
    id: 'git',
    name: 'GIT & GITHUB',
    category: 'TOOLS',
    description: 'Branch workflows, repository hygiene, and code reviews',
    simpleIcon: siGit,
    brandColor: '#F05032',
    proficiency: 'Advanced'
  },
  {
    id: 'ai-tools',
    name: 'AI PRODUCTIVITY',
    category: 'TOOLS',
    description: 'Prompt engineering, code debugging, and automation',
    icon: BrainCircuit,
    brandColor: '#10b981',
    proficiency: 'Advanced'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'bbu',
    institution: 'Build Bright University (BBU)',
    degree: 'Bachelor of Computer Science',
    period: '2022 - 2026',
    details: 'Faculty of Science and Technology. Core coursework in Python, Java, C++, Network Infrastructure, Active Directory Systems, and Database Management.',
    location: 'Battambang, Cambodia'
  },
  {
    id: 'sahmyook',
    institution: 'Sahmyook University & NIA',
    degree: 'Advanced Python Programming Certificate',
    period: '2024',
    details: 'Completed an intensive 55-hour program focusing on Python algorithm design, data structures, and automation scripting.',
    location: 'BBU Collaboration Program'
  },
  {
    id: 'usa-esl',
    institution: 'U.S.A International School',
    degree: 'Advanced English (ESL Level 12 - C1)',
    period: 'Completed May 2024',
    details: 'Mastered English language communication, technical writing, oral presentations, and business correspondence.',
    location: 'Battambang, Cambodia'
  },
  {
    id: 'dewey',
    institution: 'Dewey International School',
    degree: 'High School Diploma',
    period: 'Graduated Dec 2022',
    details: 'Solid academic foundation in mathematics, information technology basics, and sciences.',
    location: 'Battambang, Cambodia'
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'freelance-design',
    role: 'Freelance Poster & UI Designer',
    organization: 'Creative Client Projects',
    period: '01/2025 - 02/2025',
    location: 'Battambang',
    description: 'Collaborated directly with clients to define visual identities, created promotional posters, crafted wireframes, and prepared delivery-ready design specifications.',
    badgeColor: 'bg-blue-500/20 text-[#3b66f5]'
  },
  {
    id: 'lab-sysadmin',
    role: 'Systems & Infrastructure Lab Specialist',
    organization: 'BBU Computer Labs',
    period: '2024 - 2025',
    location: 'Build Bright University',
    description: 'Implemented multi-server VMware environments: configured Active Directory Domain Controllers, deployed Group Policy Objects (GPO), and managed DFS Replication pipelines.',
    badgeColor: 'bg-emerald-500/20 text-emerald-400'
  },
  {
    id: 'assistant-teacher',
    role: 'Assistant Teacher',
    organization: 'Educational Center',
    period: '12/2022 - 01/2023',
    location: 'Battambang, Svay Por',
    description: 'Supported classroom instruction, assisted students with exercises, organized learning spaces, and reinforced collaborative problem solving.',
    badgeColor: 'bg-purple-500/20 text-purple-400'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'school-management-sys',
    title: 'School Management System (SchoolAdmin)',
    tagline: 'Comprehensive Academic Administration & Student Portal',
    category: 'Full-Stack Web Application',
    description: 'A cloud-deployed school administration dashboard for managing student enrollments, attendance, faculty records, grade tracking, and administrative workflows.',
    fullDescription: 'Architected and deployed a modern full-stack School Management System featuring real-time dashboard analytics, role-based student and teacher portals, class scheduling, academic report card generation, and secure data administration.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'PostgreSQL'],
    metrics: 'Live Production Deployment on Vercel with Full Multi-Role Dashboard',
    accentColor: '#3b82f6',
    demoUrl: 'https://school-management-sys-inky.vercel.app/dashboard',
    githubUrl: 'https://github.com/uotdalisha-gif/School-management-sys'
  }
];

// Verified certifications with high-resolution visual previews
export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-python-sahmyook',
    title: 'Advanced Python Programming Certificate',
    issuer: 'Sahmyook University & NIA',
    year: '2024',
    badge: 'Distinction Honor',
    description: 'Completed an intensive 55-hour program focusing on Python algorithm design, data structures, and automation scripting.',
    imageUrl: '/gallery/cert-1.jpg'
  },
  {
    id: 'cert-bbu-excellence',
    title: 'Academic Excellence in Computer Science',
    issuer: 'Build Bright University (BBU)',
    year: '2025',
    badge: 'Faculty Recognition',
    description: 'Recognized for top academic ranking in systems programming and networking infrastructure lab practicals.',
    imageUrl: '/gallery/cert-2.jpg'
  },
  {
    id: 'cert-esl-c1',
    title: 'Advanced English Proficiency (ESL Level 12 - C1)',
    issuer: 'U.S.A International School',
    year: '2024',
    badge: 'C1 Advanced Level',
    description: 'Mastered English language communication, technical writing, oral presentations, and business correspondence.',
    imageUrl: '/gallery/cert-3.jpg'
  },
  {
    id: 'cert-ad-dfs-lab',
    title: 'Active Directory & Enterprise Systems Lab',
    issuer: 'BBU Computer Systems Lab',
    year: '2024',
    badge: 'Hands-on Verified',
    description: 'Implemented multi-server VMware environments: configured Active Directory Domain Controllers, deployed Group Policy Objects (GPO), and managed DFS Replication pipelines.',
    imageUrl: '/gallery/cert-4.jpg'
  },
  {
    id: 'cert-dewey-graduate',
    title: 'High School Outstanding Graduate Diploma',
    issuer: 'Dewey International School',
    year: '2022',
    badge: 'Outstanding Graduate',
    description: 'Honored for dedication, high scholastic standing, and leadership in student academic groups.',
    imageUrl: '/gallery/cert-5.jpg'
  },
  {
    id: 'cert-fullstack-capstone',
    title: 'Full-Stack Development Capstone',
    issuer: 'Academic Software Capstone',
    year: '2025',
    badge: 'Production Capstone',
    description: 'Architected and deployed a live cloud School Management System on Vercel with role-based dashboard authentication.',
    imageUrl: '/gallery/cert-6.jpg'
  }
];

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'award-bbu',
    title: 'Academic Excellence in Computer Science',
    event: 'Build Bright University Faculty Recognition',
    date: '2025',
    description: 'Recognized for top academic ranking in systems programming and networking infrastructure lab practicals.'
  },
  {
    id: 'award-python',
    title: 'Distinguished Python Project Capstone',
    event: 'Sahmyook University & NIA Joint Program',
    date: '2024',
    description: 'Awarded for developing a top-rated algorithmic automation tool during the 55-hour advanced training.'
  },
  {
    id: 'award-highschool',
    title: 'High School Outstanding Graduate Award',
    event: 'Dewey International School',
    date: '2022',
    description: 'Honored for dedication, high scholastic standing, and leadership in student academic groups.'
  }
];

export const MARQUEE_TECH_ITEMS: string[] = [
  'Python',
  'TypeScript',
  'React.js',
  'Active Directory',
  'Tailwind CSS',
  'Windows Server',
  'DFS Replication',
  'VMware',
  'PHP & MySQL',
  'HTML5 / CSS3',
  'Figma UI/UX',
  'PowerShell Automation'
];

// Empty gallery list ready for user to add their verified certificate photos and activity images
export const GALLERY_DATA: GalleryItem[] = [];

export const GRADIENT_PRESETS = {
  aurora: 'from-emerald-500/20 via-[#3b66f5]/20 to-purple-600/20',
  glacier: 'from-cyan-500/20 via-blue-600/20 to-indigo-600/20',
  ember: 'from-amber-500/20 via-orange-600/20 to-rose-600/20',
  dusk: 'from-purple-600/20 via-pink-600/20 to-blue-600/20'
};

