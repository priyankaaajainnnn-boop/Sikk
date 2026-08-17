/**
 * EduPremium — Central Course Data
 * ====================================
 * Single source of truth for all course information.
 * Add, edit, or remove courses here — every page renders from this data.
 *
 * Category options: 'Basic Computing' | 'MS Office' | 'Design & Web' | 'Accounting' | 'Digital Skills'
 * Level options:    'Beginner' | 'Intermediate' | 'Advanced'
 * Badge options:    'Bestseller' | 'Popular' | 'New' | 'Hot' | null
 */

const COURSES = [
  // ═══════════════════════════════════════════════════════════════════════
  // 1. Computer Fundamentals
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 1,
    slug: 'computer-fundamentals',
    name: 'Computer Fundamentals',
    shortDescription: 'Start from zero — understand hardware, software, and the Windows OS with hands-on practice.',
    fullDescription: 'This course is the perfect starting point for anyone who has never used a computer or wants to build a strong foundation. You will explore what makes up a computer, how operating systems work, and how to navigate Windows efficiently. By the end, you will be comfortable using a computer for everyday tasks at home or at work.',
    price: 1999,
    duration: '4 Weeks',
    durationWeeks: 4,
    level: 'Beginner',
    category: 'Basic Computing',
    icon: 'computer',
    iconColor: '#3b82f6',
    thumbnailBg: 'linear-gradient(135deg, #dae2fd 0%, #bec6e0 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Identify and understand computer hardware components (CPU, RAM, HDD, etc.)',
      'Navigate the Windows operating system with confidence',
      'Organise files and folders using Windows Explorer',
      'Connect and use peripherals: printers, pen drives, keyboards',
      'Keep your computer secure with updates and basic antivirus practices',
      'Troubleshoot common day-to-day computer problems',
    ],
    curriculum: [
      {
        title: 'Module 1: Introduction to Computers',
        lessons: [
          { title: 'What is a Computer? History & Types', duration: '45:00' },
          { title: 'Hardware Deep Dive (CPU, RAM, Storage, Motherboard)', duration: '60:00' },
          { title: 'Input & Output Devices', duration: '30:00' },
          { title: 'Software: System vs Application Software', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Windows Operating System',
        lessons: [
          { title: 'The Windows Desktop & Taskbar Tour', duration: '45:00' },
          { title: 'File & Folder Management', duration: '60:00' },
          { title: 'Control Panel & System Settings', duration: '45:00' },
          { title: 'Installing & Uninstalling Applications', duration: '30:00' },
        ],
      },
      {
        title: 'Module 3: Practical Computing Skills',
        lessons: [
          { title: 'Connecting Peripherals & External Devices', duration: '30:00' },
          { title: 'Basic Keyboard Shortcuts & Productivity Tips', duration: '45:00' },
          { title: 'Computer Safety & Antivirus Basics', duration: '30:00' },
          { title: 'Final Assessment & Revision', duration: '45:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'laptop', title: 'Hands-on Practice', description: 'Learn by doing on real systems with guided lab sessions every class.' },
      { icon: 'workspace_premium', title: 'Certificate of Completion', description: 'Earn a recognised certificate to add to your resume and job applications.' },
      { icon: 'support_agent', title: 'Lifetime Doubt Support', description: 'Our instructors are available for doubt-clearing even after the course ends.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 2. Basic Computer Course
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 2,
    slug: 'basic-computer-course',
    name: 'Basic Computer Course',
    shortDescription: 'Master Windows OS, internet navigation, email, and essential daily digital tasks.',
    fullDescription: 'Our most popular introductory course covers everything a beginner needs to operate a computer confidently. From understanding the Windows OS to browsing the internet and managing your email inbox, this course prepares you for everyday digital life and entry-level office work.',
    price: 2499,
    duration: '4 Weeks',
    durationWeeks: 4,
    level: 'Beginner',
    category: 'Basic Computing',
    icon: 'laptop_mac',
    iconColor: '#2563eb',
    thumbnailBg: 'linear-gradient(135deg, #dae2fd 0%, #93c5fd 100%)',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ekhSFVWYE6h_OJyv_x3SUyso8Iet6yUO4xoQ8Ofe16YZ8qNar_eP5xuBejO00f7U6GQB0fccYfP7cJNLW3UlmxYJTPjdTp0WOkzMVE_LtTkC4LBU_MCv7UbjRzg_6YAhnO8bN3VDD2Y135mWNh2lAPAuKHWcgxYsp8V01uM5RwD2-759luaEGsSJUm8Fgmt_xDUo3HTzwLnIj9meVll4GDuKr0zMQGGCbTjjtJU_APrWee5cgyZbyg',
    badge: 'Bestseller',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Use the Windows OS to manage files, programs, and settings',
      'Browse the internet safely using Chrome / Edge',
      'Create and manage a professional email account',
      'Use Google Search effectively for research',
      'Understand basic networking: Wi-Fi, hotspot, Bluetooth',
      'Perform common tasks: print, scan, screenshot, copy-paste',
    ],
    curriculum: [
      {
        title: 'Module 1: Windows Essentials',
        lessons: [
          { title: 'Desktop, Start Menu & Taskbar', duration: '45:00' },
          { title: 'File Management & Storage Devices', duration: '60:00' },
          { title: 'System Settings & Customisation', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Internet & Browsing',
        lessons: [
          { title: 'How the Internet Works', duration: '30:00' },
          { title: 'Web Browsing & Search Techniques', duration: '45:00' },
          { title: 'Online Safety & Digital Awareness', duration: '30:00' },
        ],
      },
      {
        title: 'Module 3: Email & Communication',
        lessons: [
          { title: 'Setting Up Gmail / Outlook', duration: '45:00' },
          { title: 'Composing, Replying & Managing Emails', duration: '45:00' },
          { title: 'Attachments, Contacts & Calendar', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'school', title: 'Beginner-Friendly', description: 'No prior computer knowledge required. We start from scratch.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Receive an industry-recognised certificate on completion.' },
      { icon: 'schedule', title: 'Flexible Batches', description: 'Morning, evening, and weekend batches to suit your schedule.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 3. Internet & Email Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 3,
    slug: 'internet-email-basics',
    name: 'Internet & Email Basics',
    shortDescription: 'Learn to browse safely, use Gmail efficiently, and handle online communication like a pro.',
    fullDescription: 'This focused short course teaches you everything you need to get online confidently. You will learn how to use a web browser, perform effective searches, create and manage a Gmail account, use WhatsApp Web, and stay safe from online scams — all essential skills for the modern digital world.',
    price: 1499,
    duration: '2 Weeks',
    durationWeeks: 2,
    level: 'Beginner',
    category: 'Basic Computing',
    icon: 'wifi',
    iconColor: '#0891b2',
    thumbnailBg: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 25,
    certificate: true,
    whatYoullLearn: [
      'Navigate browsers: Chrome, Edge, Firefox',
      'Perform powerful Google searches using filters and operators',
      'Set up and manage a Gmail account professionally',
      'Attach files, use labels, and manage your inbox',
      'Use WhatsApp Web and Google Meet for communication',
      'Recognise and avoid phishing, spam, and online scams',
    ],
    curriculum: [
      {
        title: 'Module 1: Internet & Web Browsing',
        lessons: [
          { title: 'Understanding the Internet & WWW', duration: '30:00' },
          { title: 'Browser Tour: Tabs, Bookmarks, History', duration: '30:00' },
          { title: 'Advanced Google Search Techniques', duration: '45:00' },
          { title: 'Online Safety & Password Best Practices', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Email & Digital Communication',
        lessons: [
          { title: 'Creating & Setting Up Gmail', duration: '30:00' },
          { title: 'Sending, Replying & Organising Emails', duration: '45:00' },
          { title: 'WhatsApp Web & Google Meet Basics', duration: '30:00' },
          { title: 'Identifying & Avoiding Online Scams', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'shield', title: 'Stay Safe Online', description: 'Learn to protect yourself from scams, phishing, and malware.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a completion certificate to share with employers.' },
      { icon: 'speed', title: 'Fast-Track Course', description: 'Complete in just 2 weeks — ideal for busy individuals.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 4. Typing Mastery
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 4,
    slug: 'typing-mastery',
    name: 'Typing Mastery',
    shortDescription: 'Build lightning-fast typing speed and accuracy with touch-typing techniques.',
    fullDescription: 'Typing speed and accuracy are among the most in-demand skills for any office job. This course teaches you the correct touch-typing technique, home row positioning, and efficient use of all keyboard keys. You will practice with structured exercises and real-world text to build speed and reduce errors progressively.',
    price: 999,
    duration: '3 Weeks',
    durationWeeks: 3,
    level: 'Beginner',
    category: 'Basic Computing',
    icon: 'keyboard',
    iconColor: '#7c3aed',
    thumbnailBg: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
    thumbnail: null,
    badge: 'New',
    badgeClass: 'bg-green-100 text-green-800',
    seats: 30,
    certificate: true,
    whatYoullLearn: [
      'Master touch-typing with correct finger placement on the home row',
      'Type all alphabets, numbers, and special characters without looking',
      'Achieve a minimum typing speed of 30–40 WPM by course end',
      'Reduce typing errors through targeted accuracy exercises',
      'Use keyboard shortcuts to work faster in Windows and Office',
      'Practice typing in both English and common data entry formats',
    ],
    curriculum: [
      {
        title: 'Module 1: Keyboard Fundamentals',
        lessons: [
          { title: 'Keyboard Layout & Key Functions', duration: '30:00' },
          { title: 'Home Row Technique & Finger Placement', duration: '45:00' },
          { title: 'Top Row, Bottom Row & Number Row Practice', duration: '45:00' },
        ],
      },
      {
        title: 'Module 2: Speed & Accuracy Building',
        lessons: [
          { title: 'Timed Typing Drills: Words & Sentences', duration: '45:00' },
          { title: 'Paragraph Typing & Accuracy Analysis', duration: '45:00' },
          { title: 'Special Characters & Symbols', duration: '30:00' },
        ],
      },
      {
        title: 'Module 3: Real-World Application',
        lessons: [
          { title: 'Data Entry Typing Practice', duration: '45:00' },
          { title: 'Essential Keyboard Shortcuts', duration: '30:00' },
          { title: 'Final Speed Test & Assessment', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'speed', title: 'Speed & Accuracy', description: 'Structured drills help you build lasting speed without sacrificing accuracy.' },
      { icon: 'work', title: 'Office-Ready Skill', description: 'Fast typing is required for most office, data entry, and admin roles.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Certificate with your final typing speed on record.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 5. Microsoft Word
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 5,
    slug: 'microsoft-word',
    name: 'Microsoft Word',
    shortDescription: 'Create professional documents, reports, and letters using Microsoft Word.',
    fullDescription: 'Microsoft Word is the world\'s most used word processing software. This course takes you from basic document creation to advanced formatting, styles, tables, mail merge, and document collaboration. By the end, you will produce professional-quality reports, letters, and business documents with confidence.',
    price: 1999,
    duration: '3 Weeks',
    durationWeeks: 3,
    level: 'Beginner',
    category: 'MS Office',
    icon: 'description',
    iconColor: '#2563eb',
    thumbnailBg: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Create, save, and format professional Word documents',
      'Apply heading styles, themes, and design templates',
      'Insert and format tables, images, shapes, and charts',
      'Use Track Changes and Comments for document collaboration',
      'Perform mail merge to send personalised bulk letters',
      'Create professional CVs, letters, and reports from scratch',
    ],
    curriculum: [
      {
        title: 'Module 1: Word Basics & Interface',
        lessons: [
          { title: 'The Word Interface & Ribbon', duration: '30:00' },
          { title: 'Creating, Saving & Opening Documents', duration: '30:00' },
          { title: 'Basic Text Formatting (Font, Size, Colour)', duration: '45:00' },
          { title: 'Paragraph Formatting & Alignment', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Styles, Tables & Layouts',
        lessons: [
          { title: 'Using Heading Styles & Document Themes', duration: '45:00' },
          { title: 'Inserting & Formatting Tables', duration: '45:00' },
          { title: 'Headers, Footers & Page Numbers', duration: '30:00' },
          { title: 'Inserting Images, Shapes & SmartArt', duration: '45:00' },
        ],
      },
      {
        title: 'Module 3: Advanced & Real-World Projects',
        lessons: [
          { title: 'Track Changes & Reviewing Documents', duration: '30:00' },
          { title: 'Mail Merge & Bulk Letters', duration: '60:00' },
          { title: 'Creating a Professional CV & Cover Letter', duration: '45:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'description', title: 'Professional Documents', description: 'Learn to create polished, professional documents for any industry.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Microsoft Word completion certificate.' },
      { icon: 'construction', title: 'Project-Based Learning', description: 'Complete real projects — CVs, letters, and reports.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 6. Microsoft Excel
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 6,
    slug: 'microsoft-excel',
    name: 'Microsoft Excel',
    shortDescription: 'Build data entry, calculation, and reporting skills using Microsoft Excel.',
    fullDescription: 'Excel is one of the most powerful tools in any office environment. This beginner course covers the essentials: data entry, cell formatting, formulas, charts, and basic data analysis. You will finish the course able to build practical spreadsheets for budgets, attendance registers, salary sheets, and more.',
    price: 2499,
    duration: '4 Weeks',
    durationWeeks: 4,
    level: 'Beginner',
    category: 'MS Office',
    icon: 'grid_on',
    iconColor: '#16a34a',
    thumbnailBg: 'linear-gradient(135deg, #dcfce7 0%, #86efac 100%)',
    thumbnail: null,
    badge: 'Popular',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Enter, edit, and format data in Excel spreadsheets',
      'Use essential formulas: SUM, AVERAGE, IF, COUNT, MIN, MAX',
      'Create bar, line, and pie charts from data',
      'Sort, filter, and manage large datasets',
      'Build practical spreadsheets: salary sheets, invoices, budgets',
      'Protect cells and sheets to prevent accidental edits',
    ],
    curriculum: [
      {
        title: 'Module 1: Excel Basics',
        lessons: [
          { title: 'The Excel Interface & Workbook Structure', duration: '30:00' },
          { title: 'Data Entry, Cell References & Formatting', duration: '45:00' },
          { title: 'Working with Rows, Columns & Multiple Sheets', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Formulas & Functions',
        lessons: [
          { title: 'Basic Math Formulas & Operators', duration: '45:00' },
          { title: 'SUM, AVERAGE, COUNT, MIN, MAX, IF', duration: '60:00' },
          { title: 'Using AutoFill & Relative/Absolute References', duration: '30:00' },
        ],
      },
      {
        title: 'Module 3: Charts, Data & Practical Projects',
        lessons: [
          { title: 'Creating Charts & Data Visualisation', duration: '45:00' },
          { title: 'Sorting, Filtering & Conditional Formatting', duration: '45:00' },
          { title: 'Building Salary Sheets, Invoices & Budgets', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'table_chart', title: 'Practical Spreadsheets', description: 'Build real-world Excel sheets used in offices every day.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Receive a Microsoft Excel completion certificate.' },
      { icon: 'trending_up', title: 'Career Boost', description: 'Excel proficiency is listed in most office job descriptions.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 7. Advanced Excel
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 7,
    slug: 'advanced-excel',
    name: 'Advanced Excel',
    shortDescription: 'Master VLOOKUP, Pivot Tables, Macros & dashboards for data-driven decision making.',
    fullDescription: 'Take your Excel skills to the professional level. This course covers advanced formulas (VLOOKUP, INDEX MATCH, SUMIFS), Pivot Tables, Power Query for data cleaning, dynamic charts, and VBA Macros for automation. You will build interactive business dashboards and become the Excel expert in your organization.',
    price: 3999,
    duration: '6 Weeks',
    durationWeeks: 6,
    level: 'Intermediate',
    category: 'MS Office',
    icon: 'analytics',
    iconColor: '#15803d',
    thumbnailBg: 'linear-gradient(135deg, #dcfce7 0%, #4ade80 100%)',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwYmZY0vcseF5oz9RsoXvqnNIhZJassUoMwbZkJxME6PyDXbToz4SCm0CCptJyrMWFfokPZwYzRuEb14sp6Rt8z4vB9Q2Y2irqFKzr2tLdmDEyyG4_29G2qri1Zl3cw4L8gfmJAxTY2LIRMWjkUSuiBWBJCP4bM8cpoNVxyU1SKRrpjy1mUd_8fzL23rOBvaay6dxrJQXWkHStOda6tNoKYmlKXV3iq8siXEkcGwLG8eShDE8fKjkqIw',
    badge: 'Popular',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Navigate the Excel interface efficiently and customise the ribbon',
      'Master advanced formulas: VLOOKUP, INDEX MATCH, SUMIFS, COUNTIFS',
      'Build powerful Pivot Tables and Pivot Charts for rapid data analysis',
      'Clean and reshape data using Power Query basics',
      'Automate repetitive tasks using VBA Macros',
      'Design interactive business dashboards with slicers and dynamic charts',
    ],
    curriculum: [
      {
        title: 'Module 1: Advanced Formulas',
        lessons: [
          { title: 'VLOOKUP & HLOOKUP Mastery', duration: '60:00' },
          { title: 'INDEX, MATCH & Dynamic References', duration: '60:00' },
          { title: 'SUMIFS, COUNTIFS & Array Formulas', duration: '60:00' },
          { title: 'Error Handling: IFERROR, ISERROR', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Pivot Tables & Data Analysis',
        lessons: [
          { title: 'Creating & Customising Pivot Tables', duration: '60:00' },
          { title: 'Pivot Charts & Interactive Slicers', duration: '45:00' },
          { title: 'Power Query: Importing & Transforming Data', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Automation & Dashboards',
        lessons: [
          { title: 'Introduction to VBA & Macro Recording', duration: '60:00' },
          { title: 'Writing Basic VBA Code for Automation', duration: '60:00' },
          { title: 'Building an Interactive Business Dashboard', duration: '90:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'construction', title: 'Practical Skills', description: 'Learn by doing — real datasets, real formulas, real dashboards.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a professional Advanced Excel certificate to share on LinkedIn.' },
      { icon: 'all_inclusive', title: 'Lifetime Access', description: 'Unlimited access to course materials and future updates.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 8. Microsoft PowerPoint
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 8,
    slug: 'microsoft-powerpoint',
    name: 'Microsoft PowerPoint',
    shortDescription: 'Design compelling presentations with animations, charts, and professional slide layouts.',
    fullDescription: 'Master the art of visual storytelling with Microsoft PowerPoint. This course teaches you to design professional, engaging presentations using themes, animations, transitions, SmartArt, and embedded charts. You will also learn presentation delivery techniques to confidently present in meetings, classrooms, and business settings.',
    price: 1999,
    duration: '3 Weeks',
    durationWeeks: 3,
    level: 'Beginner',
    category: 'MS Office',
    icon: 'slideshow',
    iconColor: '#dc2626',
    thumbnailBg: 'linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Create structured presentations using slide layouts and themes',
      'Use SmartArt, charts, and infographics to visualise data',
      'Apply professional animations and transition effects',
      'Embed videos, audio, and screen recordings in slides',
      'Export presentations as PDF, video, and web formats',
      'Deliver presentations confidently using Presenter View',
    ],
    curriculum: [
      {
        title: 'Module 1: PowerPoint Basics',
        lessons: [
          { title: 'The PowerPoint Interface & Slide Structure', duration: '30:00' },
          { title: 'Applying Themes, Colours & Fonts', duration: '45:00' },
          { title: 'Inserting Text, Images & Icons', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Design & Multimedia',
        lessons: [
          { title: 'SmartArt Diagrams & Infographics', duration: '45:00' },
          { title: 'Embedding Charts, Tables & Data', duration: '45:00' },
          { title: 'Animations & Slide Transitions', duration: '60:00' },
          { title: 'Inserting Videos & Screen Recordings', duration: '30:00' },
        ],
      },
      {
        title: 'Module 3: Delivery & Export',
        lessons: [
          { title: 'Presenter View & Speaker Notes', duration: '30:00' },
          { title: 'Exporting to PDF, Video & Web', duration: '30:00' },
          { title: 'Final Presentation Project', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'slideshow', title: 'Professional Slides', description: 'Design slides that look polished and communicate clearly.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Receive a PowerPoint completion certificate.' },
      { icon: 'person_play', title: 'Presentation Skills', description: 'Learn delivery techniques alongside design skills.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 9. MS Office Complete Course
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 9,
    slug: 'ms-office-complete',
    name: 'MS Office Complete Course',
    shortDescription: 'Master Word, Excel, PowerPoint, and Outlook in one comprehensive bundle course.',
    fullDescription: 'The ultimate MS Office bundle for students and professionals. This course combines Word, Excel, PowerPoint, and Outlook into one intensive program. You will graduate fully equipped to handle any office task thrown at you — from writing reports and building data sheets to creating presentations and managing a professional email account.',
    price: 5999,
    duration: '8 Weeks',
    durationWeeks: 8,
    level: 'Beginner',
    category: 'MS Office',
    icon: 'devices',
    iconColor: '#0369a1',
    thumbnailBg: 'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)',
    thumbnail: null,
    badge: 'Bestseller',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Create professional documents, reports, and CVs with MS Word',
      'Build spreadsheets, formulas, and data reports with MS Excel',
      'Design compelling business presentations with MS PowerPoint',
      'Manage professional email, calendar, and contacts with MS Outlook',
      'Integrate data between Word, Excel, and PowerPoint seamlessly',
      'Complete a full office project portfolio to showcase your skills',
    ],
    curriculum: [
      {
        title: 'Module 1: MS Word (Weeks 1–2)',
        lessons: [
          { title: 'Document Creation & Text Formatting', duration: '60:00' },
          { title: 'Styles, Tables & Page Layout', duration: '60:00' },
          { title: 'Mail Merge & Document Collaboration', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: MS Excel (Weeks 3–5)',
        lessons: [
          { title: 'Data Entry, Formatting & Formulas', duration: '90:00' },
          { title: 'Charts, VLOOKUP & Pivot Basics', duration: '90:00' },
          { title: 'Excel Project: Salary & Budget Sheet', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: MS PowerPoint (Weeks 6–7)',
        lessons: [
          { title: 'Slide Design, Themes & Animation', duration: '60:00' },
          { title: 'Business Presentation Project', duration: '60:00' },
        ],
      },
      {
        title: 'Module 4: MS Outlook & Integration (Week 8)',
        lessons: [
          { title: 'Email, Calendar & Contacts in Outlook', duration: '45:00' },
          { title: 'Cross-App Integration (Word + Excel + PPT)', duration: '45:00' },
          { title: 'Final Assessment & Portfolio Review', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'devices', title: 'All Four Apps', description: 'One course to master Word, Excel, PowerPoint, and Outlook.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Comprehensive MS Office certificate on completion.' },
      { icon: 'payments', title: 'Best Value', description: 'Buying the bundle saves significantly over individual courses.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 10. Google Workspace
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 10,
    slug: 'google-workspace',
    name: 'Google Workspace',
    shortDescription: 'Master Google Docs, Sheets, Slides, Drive, Meet, and Forms for modern collaboration.',
    fullDescription: 'Google Workspace (formerly G Suite) is used by millions of businesses and schools worldwide. This course teaches you to use the complete suite — Docs, Sheets, Slides, Drive, Meet, and Forms — for real-time collaboration, file management, and online communication. Ideal for remote workers, students, and modern office professionals.',
    price: 2499,
    duration: '4 Weeks',
    durationWeeks: 4,
    level: 'Beginner',
    category: 'MS Office',
    icon: 'cloud',
    iconColor: '#0369a1',
    thumbnailBg: 'linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)',
    thumbnail: null,
    badge: 'New',
    badgeClass: 'bg-green-100 text-green-800',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Create, format, and collaborate on documents in Google Docs',
      'Build spreadsheets, charts, and formulas in Google Sheets',
      'Design and present slides in Google Slides',
      'Organise, share, and manage files in Google Drive',
      'Conduct professional video meetings using Google Meet',
      'Create surveys and quizzes using Google Forms',
    ],
    curriculum: [
      {
        title: 'Module 1: Google Docs & Slides',
        lessons: [
          { title: 'Google Docs: Document Creation & Sharing', duration: '60:00' },
          { title: 'Real-Time Collaboration & Comments', duration: '30:00' },
          { title: 'Google Slides: Presentations & Themes', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Google Sheets & Forms',
        lessons: [
          { title: 'Google Sheets: Data Entry & Formulas', duration: '60:00' },
          { title: 'Charts, Filters & Conditional Formatting', duration: '45:00' },
          { title: 'Google Forms: Surveys & Response Analysis', duration: '45:00' },
        ],
      },
      {
        title: 'Module 3: Drive & Meet',
        lessons: [
          { title: 'Google Drive: File Management & Sharing', duration: '45:00' },
          { title: 'Google Meet: Professional Video Meetings', duration: '30:00' },
          { title: 'Workspace Integration & Admin Tips', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'cloud', title: 'Cloud-First Learning', description: 'Work and collaborate from anywhere — no software installation needed.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Google Workspace proficiency certificate.' },
      { icon: 'group', title: 'Collaboration Ready', description: 'Learn to work effectively in modern remote and hybrid teams.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 11. HTML & CSS Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 11,
    slug: 'html-css-basics',
    name: 'HTML & CSS Basics',
    shortDescription: 'Learn the building blocks of the web — create your first website with HTML and CSS.',
    fullDescription: 'HTML and CSS are the foundation of every website on the internet. In this beginner course, you will learn to write clean, semantic HTML5 for page structure and CSS3 for styling, layouts, and responsive design. By the end, you will have built and published your own personal website from scratch.',
    price: 3499,
    duration: '6 Weeks',
    durationWeeks: 6,
    level: 'Beginner',
    category: 'Design & Web',
    icon: 'code',
    iconColor: '#7c3aed',
    thumbnailBg: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Write semantic HTML5 for well-structured web pages',
      'Style pages with CSS3: colours, fonts, margins, padding',
      'Use Flexbox and CSS Grid for modern layouts',
      'Create hover effects, animations, and transitions',
      'Make websites responsive for mobile, tablet, and desktop',
      'Publish a personal website using GitHub Pages or Netlify',
    ],
    curriculum: [
      {
        title: 'Module 1: HTML5 Fundamentals',
        lessons: [
          { title: 'How Websites Work: Browsers & Servers', duration: '30:00' },
          { title: 'HTML Document Structure & Tags', duration: '60:00' },
          { title: 'Text, Links, Images & Lists', duration: '45:00' },
          { title: 'Forms, Tables & Semantic HTML5 Elements', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: CSS3 Styling',
        lessons: [
          { title: 'CSS Selectors, Properties & Values', duration: '60:00' },
          { title: 'The Box Model: Margin, Padding & Borders', duration: '45:00' },
          { title: 'Colours, Typography & Backgrounds', duration: '45:00' },
          { title: 'Flexbox Layout Mastery', duration: '60:00' },
          { title: 'CSS Grid for Complex Layouts', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Responsive Design & Publishing',
        lessons: [
          { title: 'Media Queries & Mobile-First Design', duration: '60:00' },
          { title: 'CSS Animations & Hover Effects', duration: '45:00' },
          { title: 'Building & Publishing a Personal Website', duration: '90:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'code', title: 'Build Real Websites', description: 'Go from zero to a published personal website in just 6 weeks.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a web development foundation certificate.' },
      { icon: 'web', title: 'In-Demand Skills', description: 'HTML & CSS are the essential skills for any web career path.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 12. Web Designing Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 12,
    slug: 'web-designing-basics',
    name: 'Web Designing Basics',
    shortDescription: 'Design beautiful, responsive websites using HTML5, CSS3, Bootstrap, and Figma fundamentals.',
    fullDescription: 'Web Designing combines technical skill with visual creativity. This course takes you beyond raw HTML/CSS into professional web design with Bootstrap, basic JavaScript interactivity, and Figma wireframing. You will build a complete multi-page portfolio website and learn to apply design principles that make websites look stunning and user-friendly.',
    price: 4999,
    duration: '8 Weeks',
    durationWeeks: 8,
    level: 'Beginner',
    category: 'Design & Web',
    icon: 'web',
    iconColor: '#6d28d9',
    thumbnailBg: 'linear-gradient(135deg, #ede9fe 0%, #8b5cf6 100%)',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9rLpFvjtW0T22YBjKoHCgkVi-zk2actvZb1jWpTjtpEBVAr4FOySdQR5vCtNjubLaDMf_Rop3-gbVW_7T9qfiiAHoqM4mvT9k67OckKHdp8QC9U4FjQxej7MTtl9BzwEBzf3wCQDGFxAtye1XUQMUI0cntrruuN84raxOyapxuxetV3DHjjbTT1s0RfxZFsBOrpMbCqmIQhHlq44XkBxIe_QwFDpCQbvLnQ5tFM53_Im-vZxN4yxw2w',
    badge: 'Hot',
    badgeClass: 'bg-red-100 text-red-700',
    seats: 12,
    certificate: true,
    whatYoullLearn: [
      'Apply design principles: colour theory, typography, and layout',
      'Structure websites with semantic HTML5 and style with CSS3',
      'Build responsive layouts using Bootstrap 5 grid system',
      'Add basic JavaScript for interactive navigation and forms',
      'Wireframe and prototype designs using Figma basics',
      'Build and deploy a complete multi-page portfolio website',
    ],
    curriculum: [
      {
        title: 'Module 1: Design Principles & Tools',
        lessons: [
          { title: 'Visual Design Fundamentals: Colour, Typography, Layout', duration: '60:00' },
          { title: 'Figma Basics: Wireframing & Prototyping', duration: '60:00' },
          { title: 'Design Systems & Style Guides', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: HTML, CSS & Bootstrap',
        lessons: [
          { title: 'HTML5 & CSS3 Foundations (Recap)', duration: '90:00' },
          { title: 'Bootstrap 5 Grid & Components', duration: '90:00' },
          { title: 'Responsive Design & Mobile-First Approach', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: JavaScript & Interactivity',
        lessons: [
          { title: 'JavaScript Basics for Web Designers', duration: '60:00' },
          { title: 'DOM Manipulation & Event Handling', duration: '60:00' },
        ],
      },
      {
        title: 'Module 4: Portfolio Project & Deployment',
        lessons: [
          { title: 'Building a Complete Portfolio Website', duration: '120:00' },
          { title: 'Deploying to Netlify / GitHub Pages', duration: '30:00' },
          { title: 'Final Design Review & Assessment', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'web', title: 'Portfolio Website', description: 'Graduate with a complete, live portfolio website you can show employers.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a professional Web Designing certificate.' },
      { icon: 'trending_up', title: 'Freelancing Ready', description: 'Learn the skills to start freelancing as a web designer.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 13. Canva Designing
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 13,
    slug: 'canva-designing',
    name: 'Canva Designing',
    shortDescription: 'Create stunning social media posts, flyers, banners, and resumes using Canva.',
    fullDescription: 'Canva is the world\'s most popular browser-based design tool — and you don\'t need any design experience to use it. This course teaches you to create professional-quality social media graphics, business cards, flyers, resumes, YouTube thumbnails, and more. Perfect for entrepreneurs, social media managers, small businesses, and students.',
    price: 1999,
    duration: '3 Weeks',
    durationWeeks: 3,
    level: 'Beginner',
    category: 'Design & Web',
    icon: 'palette',
    iconColor: '#7c3aed',
    thumbnailBg: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Navigate the Canva interface and understand design templates',
      'Create social media posts, stories, and reels graphics',
      'Design professional flyers, posters, and business cards',
      'Use Canva\'s photo editor, background remover, and AI tools',
      'Create stunning resumes and presentation slides in Canva',
      'Brand kit setup: consistent colours, fonts, and logo placement',
    ],
    curriculum: [
      {
        title: 'Module 1: Canva Basics & Interface',
        lessons: [
          { title: 'Canva Overview: Dashboard, Templates & Tools', duration: '30:00' },
          { title: 'Working with Text, Fonts & Colour Palettes', duration: '45:00' },
          { title: 'Using & Editing Canva Templates', duration: '45:00' },
        ],
      },
      {
        title: 'Module 2: Designing Real Projects',
        lessons: [
          { title: 'Social Media Posts: Instagram, Facebook & LinkedIn', duration: '60:00' },
          { title: 'Flyers, Posters & Business Card Design', duration: '60:00' },
          { title: 'Resume & Presentation Design in Canva', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Advanced Tools & Branding',
        lessons: [
          { title: 'Photo Editing & Canva AI Tools', duration: '45:00' },
          { title: 'Brand Kit: Logo, Colours & Fonts', duration: '30:00' },
          { title: 'Exporting & Sharing Your Designs', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'palette', title: 'No Design Experience Needed', description: 'Canva makes professional design accessible to everyone.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Receive a Canva Designing completion certificate.' },
      { icon: 'currency_rupee', title: 'Earn as a Freelancer', description: 'Use Canva skills to offer design services and earn online.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 14. Graphic Designing Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 14,
    slug: 'graphic-designing-basics',
    name: 'Graphic Designing Basics',
    shortDescription: 'Learn design principles, colour theory, typography, and tools to create professional graphics.',
    fullDescription: 'Graphic design is one of the most in-demand creative skills worldwide. This course introduces you to the core principles of design — colour theory, typography, composition, and visual hierarchy — and teaches you to apply them using Canva and basic Photoshop / GIMP tools. Build a design portfolio by the end of the course.',
    price: 3999,
    duration: '6 Weeks',
    durationWeeks: 6,
    level: 'Beginner',
    category: 'Design & Web',
    icon: 'design_services',
    iconColor: '#db2777',
    thumbnailBg: 'linear-gradient(135deg, #fce7f3 0%, #f472b6 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Understand core design principles: balance, contrast, alignment, proximity',
      'Apply colour theory to choose effective colour palettes',
      'Select and pair typefaces for visual harmony',
      'Use Canva and GIMP / Photoshop for professional graphic work',
      'Design logos, banners, posters, and marketing materials',
      'Build a design portfolio with 5+ real-world projects',
    ],
    curriculum: [
      {
        title: 'Module 1: Design Fundamentals',
        lessons: [
          { title: 'Principles of Good Design (CRAP Model)', duration: '60:00' },
          { title: 'Colour Theory & Building Palettes', duration: '60:00' },
          { title: 'Typography: Fonts, Hierarchy & Pairing', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Design Tools',
        lessons: [
          { title: 'Canva Advanced: Vectors, Shapes & Layers', duration: '60:00' },
          { title: 'GIMP / Photoshop Basics: Editing & Compositing', duration: '90:00' },
          { title: 'Creating Brand Identity Packages', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Portfolio Projects',
        lessons: [
          { title: 'Project 1: Logo & Business Card Design', duration: '60:00' },
          { title: 'Project 2: Social Media Campaign Graphics', duration: '60:00' },
          { title: 'Project 3: Poster & Flyer Design', duration: '60:00' },
          { title: 'Portfolio Review & Feedback', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'design_services', title: 'Real Projects', description: 'Build a portfolio of 5+ professional design projects.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Graphic Designing foundation certificate.' },
      { icon: 'work', title: 'Freelance-Ready', description: 'Start offering graphic design services immediately after graduation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 15. Python Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 15,
    slug: 'python-basics',
    name: 'Python Basics',
    shortDescription: 'Learn to code with Python — the world\'s most beginner-friendly programming language.',
    fullDescription: 'Python is consistently ranked as the world\'s most popular programming language for beginners. This course teaches Python from absolute scratch — data types, control flow, functions, file handling, and basic libraries. By the end you will have solved real programming challenges and built small utility programs. A perfect first step into software development, automation, or data science.',
    price: 4999,
    duration: '8 Weeks',
    durationWeeks: 8,
    level: 'Beginner',
    category: 'Design & Web',
    icon: 'terminal',
    iconColor: '#15803d',
    thumbnailBg: 'linear-gradient(135deg, #dcfce7 0%, #4ade80 100%)',
    thumbnail: null,
    badge: 'New',
    badgeClass: 'bg-green-100 text-green-800',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Set up a Python development environment and write your first program',
      'Understand Python data types: strings, integers, lists, dicts, tuples',
      'Write conditional statements, loops, and nested control flow',
      'Define and call functions with parameters and return values',
      'Read, write, and process text files with Python',
      'Use Python libraries for practical tasks: math, random, datetime',
    ],
    curriculum: [
      {
        title: 'Module 1: Python Introduction',
        lessons: [
          { title: 'Python Setup: Installation & IDLE / VS Code', duration: '30:00' },
          { title: 'Your First Python Program: print(), input()', duration: '45:00' },
          { title: 'Data Types: str, int, float, bool', duration: '60:00' },
          { title: 'Variables, Operators & Expressions', duration: '45:00' },
        ],
      },
      {
        title: 'Module 2: Control Flow & Functions',
        lessons: [
          { title: 'if / elif / else Statements', duration: '60:00' },
          { title: 'Loops: for, while, range()', duration: '60:00' },
          { title: 'Lists, Tuples & Dictionaries', duration: '90:00' },
          { title: 'Defining & Using Functions', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Files, Libraries & Projects',
        lessons: [
          { title: 'Reading & Writing Text Files', duration: '60:00' },
          { title: 'Using Standard Libraries: math, random, datetime', duration: '60:00' },
          { title: 'Project 1: Student Grade Calculator', duration: '60:00' },
          { title: 'Project 2: Simple Number Guessing Game', duration: '45:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'terminal', title: 'Beginner-Friendly Language', description: 'Python\'s clean syntax makes it the ideal first programming language.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Python Basics programming certificate.' },
      { icon: 'trending_up', title: 'Career Gateway', description: 'Python opens doors to web dev, data science, AI, and automation.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 16. Tally Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 16,
    slug: 'tally-basics',
    name: 'Tally Basics',
    shortDescription: 'Master Tally Prime for accounting entries, vouchers, ledgers, and financial reports.',
    fullDescription: 'Tally is the most widely used accounting software in India, and Tally skills are required for millions of office and accountancy jobs. This course covers Tally Prime from scratch — creating companies, maintaining ledgers, recording vouchers, generating trial balances, and producing basic financial reports. Hands-on practice with real business scenarios throughout.',
    price: 3499,
    duration: '6 Weeks',
    durationWeeks: 6,
    level: 'Beginner',
    category: 'Accounting',
    icon: 'account_balance',
    iconColor: '#b45309',
    thumbnailBg: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)',
    thumbnail: null,
    badge: 'Popular',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Install, configure, and navigate Tally Prime',
      'Create companies, groups, ledgers, and cost centres',
      'Record all types of vouchers: purchase, sales, payment, receipt, journal',
      'Generate trial balance, profit & loss, and balance sheet reports',
      'Handle inventory management: stock items, godowns, and units of measure',
      'Manage basic GST entries and GST report generation in Tally',
    ],
    curriculum: [
      {
        title: 'Module 1: Tally Foundation',
        lessons: [
          { title: 'Tally Prime Overview & Installation', duration: '30:00' },
          { title: 'Creating a Company & Configuring Settings', duration: '30:00' },
          { title: 'Ledger Groups & Ledger Creation', duration: '60:00' },
          { title: 'Voucher Types & Their Uses', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Transactions & Accounting',
        lessons: [
          { title: 'Purchase, Sales & Journal Vouchers', duration: '90:00' },
          { title: 'Payment, Receipt & Contra Vouchers', duration: '60:00' },
          { title: 'Debit Notes, Credit Notes & Adjustments', duration: '45:00' },
        ],
      },
      {
        title: 'Module 3: Reports, Inventory & GST',
        lessons: [
          { title: 'Financial Reports: Trial Balance, P&L, Balance Sheet', duration: '60:00' },
          { title: 'Basic Inventory Management in Tally', duration: '45:00' },
          { title: 'GST Basics in Tally: Entries & GSTR Reports', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'account_balance', title: 'India\'s No.1 Accounting Software', description: 'Tally is used by millions of businesses across India — making it a must-have skill.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Tally Basics certificate to boost your resume.' },
      { icon: 'work', title: 'Job-Ready', description: 'Tally proficiency is required for most accountant and office assistant roles.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 17. Computer Accounting Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 17,
    slug: 'computer-accounting-basics',
    name: 'Computer Accounting Basics',
    shortDescription: 'Learn fundamental accounting concepts and apply them using computer-based accounting software.',
    fullDescription: 'This course bridges the gap between traditional accounting knowledge and modern computer-based accounting. You will learn the basics of bookkeeping, double-entry accounting, and GST fundamentals before applying them in Tally Prime and basic Excel-based accounting. Ideal for commerce students and aspiring accounting clerks.',
    price: 2999,
    duration: '5 Weeks',
    durationWeeks: 5,
    level: 'Beginner',
    category: 'Accounting',
    icon: 'calculate',
    iconColor: '#ca8a04',
    thumbnailBg: 'linear-gradient(135deg, #fef9c3 0%, #fde047 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Understand fundamental accounting concepts: debit, credit, assets, liabilities',
      'Apply the double-entry bookkeeping system correctly',
      'Record transactions in journals and post to ledger accounts',
      'Prepare trial balance, trading account, and profit & loss statement',
      'Understand GST basics: types, rates, and applicability',
      'Manage accounts using Tally Prime and Excel-based templates',
    ],
    curriculum: [
      {
        title: 'Module 1: Accounting Fundamentals',
        lessons: [
          { title: 'Introduction to Accounting: Concepts & Terminology', duration: '60:00' },
          { title: 'Double-Entry System: Debit & Credit Rules', duration: '60:00' },
          { title: 'Journal Entries & Ledger Posting', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Financial Statements',
        lessons: [
          { title: 'Trial Balance Preparation & Errors', duration: '60:00' },
          { title: 'Trading, Profit & Loss Account', duration: '60:00' },
          { title: 'Balance Sheet Preparation', duration: '45:00' },
        ],
      },
      {
        title: 'Module 3: Software & GST',
        lessons: [
          { title: 'Computer Accounting with Tally Prime', duration: '90:00' },
          { title: 'GST Fundamentals: Types, Rates & ITC', duration: '60:00' },
          { title: 'Excel-Based Accounting Templates', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'calculate', title: 'Theory + Software', description: 'Learn accounting concepts and immediately apply them in software.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Computer Accounting Basics certificate.' },
      { icon: 'trending_up', title: 'Commerce Career Ready', description: 'Perfect for students pursuing careers in finance and accounting.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 18. Data Entry Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 18,
    slug: 'data-entry-basics',
    name: 'Data Entry Basics',
    shortDescription: 'Build high-speed, accurate data entry skills for office, back-office, and remote work.',
    fullDescription: 'Data entry is one of the most widely available entry-level job categories in India — both online and in offices. This course builds your typing speed, accuracy, and familiarity with data entry software including MS Excel, Google Sheets, and common CRM/ERP form interfaces. You will practice with real data entry exercises designed to mirror actual job tasks.',
    price: 1999,
    duration: '3 Weeks',
    durationWeeks: 3,
    level: 'Beginner',
    category: 'Accounting',
    icon: 'edit_document',
    iconColor: '#c2410c',
    thumbnailBg: 'linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 25,
    certificate: true,
    whatYoullLearn: [
      'Type accurately at 30+ WPM for data entry tasks',
      'Enter and verify data in MS Excel spreadsheets efficiently',
      'Use data entry forms in Google Sheets and basic CRM interfaces',
      'Apply data formatting, validation, and error-checking techniques',
      'Handle numeric data, dates, addresses, and product codes correctly',
      'Manage time effectively and maintain accuracy under speed pressure',
    ],
    curriculum: [
      {
        title: 'Module 1: Speed & Accuracy',
        lessons: [
          { title: 'Typing Technique Review & Speed Drills', duration: '45:00' },
          { title: 'Numeric Keypad Mastery', duration: '45:00' },
          { title: 'Error Detection & Self-Checking Habits', duration: '30:00' },
        ],
      },
      {
        title: 'Module 2: Data Entry Tools & Software',
        lessons: [
          { title: 'Excel Data Entry: Forms, Validation & Shortcuts', duration: '60:00' },
          { title: 'Google Sheets: Data Entry & Collaboration', duration: '45:00' },
          { title: 'Working with CRM & Online Form Interfaces', duration: '45:00' },
          { title: 'Handling Real Data: Invoices, Addresses & Product Data', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'speed', title: 'Speed & Accuracy', description: 'Targeted exercises build the speed and accuracy employers need.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Receive a Data Entry Skills certificate.' },
      { icon: 'work', title: 'Immediate Employment', description: 'Data entry skills open doors to hundreds of office and online jobs.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 19. Digital Marketing Basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 19,
    slug: 'digital-marketing-basics',
    name: 'Digital Marketing Basics',
    shortDescription: 'Learn SEO, social media marketing, Google Ads basics, and email marketing fundamentals.',
    fullDescription: 'Digital marketing is the fastest-growing career field of the decade. This beginner course teaches you how businesses promote themselves online — through SEO, social media, content marketing, Google Ads, and email campaigns. You will run a practice marketing campaign and learn to measure results with Google Analytics. Ideal for students, entrepreneurs, and job seekers.',
    price: 3999,
    duration: '6 Weeks',
    durationWeeks: 6,
    level: 'Beginner',
    category: 'Digital Skills',
    icon: 'campaign',
    iconColor: '#0e7490',
    thumbnailBg: 'linear-gradient(135deg, #cffafe 0%, #22d3ee 100%)',
    thumbnail: null,
    badge: 'Hot',
    badgeClass: 'bg-red-100 text-red-700',
    seats: 20,
    certificate: true,
    whatYoullLearn: [
      'Understand the digital marketing landscape and key channels',
      'Apply basic SEO: keyword research, on-page optimisation, and backlinks',
      'Create and manage social media campaigns on Instagram, Facebook & LinkedIn',
      'Write effective copy for ads, emails, and social posts',
      'Set up and run a basic Google Ads search campaign',
      'Measure campaign performance using Google Analytics fundamentals',
    ],
    curriculum: [
      {
        title: 'Module 1: Digital Marketing Overview & SEO',
        lessons: [
          { title: 'Introduction to Digital Marketing Channels', duration: '45:00' },
          { title: 'SEO Basics: How Search Engines Work', duration: '60:00' },
          { title: 'Keyword Research Tools & Strategy', duration: '60:00' },
          { title: 'On-Page SEO & Content Optimisation', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Social Media & Content Marketing',
        lessons: [
          { title: 'Social Media Marketing: Instagram, Facebook, LinkedIn', duration: '90:00' },
          { title: 'Content Strategy & Copywriting for Social Media', duration: '60:00' },
          { title: 'Running Paid Social Media Ads (Meta Ads Basics)', duration: '60:00' },
        ],
      },
      {
        title: 'Module 3: Google Ads, Email & Analytics',
        lessons: [
          { title: 'Google Search Ads: Setup & Bidding Basics', duration: '60:00' },
          { title: 'Email Marketing with Mailchimp', duration: '45:00' },
          { title: 'Google Analytics: Reading Key Metrics', duration: '60:00' },
          { title: 'Mini Campaign Project & Review', duration: '60:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'campaign', title: 'Run Real Campaigns', description: 'Practice with live tools — real ads, real analytics, real results.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Digital Marketing Basics certificate.' },
      { icon: 'trending_up', title: 'High-Demand Career', description: 'Digital marketers are among the most sought-after professionals today.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 20. Online Work & Digital Skills
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 20,
    slug: 'online-work-digital-skills',
    name: 'Online Work & Digital Skills',
    shortDescription: 'Learn how to find legitimate online work, use freelancing platforms, and earn from home.',
    fullDescription: 'This practical course teaches you how to identify and secure legitimate online earning opportunities. You will learn about freelancing platforms (Fiverr, Upwork, Freelancer), how to create a winning profile, write proposals, deliver work online, and get paid securely. It also covers essential digital tools and habits needed for productive remote work — communication, time management, and cyber safety.',
    price: 2499,
    duration: '4 Weeks',
    durationWeeks: 4,
    level: 'Beginner',
    category: 'Digital Skills',
    icon: 'work_history',
    iconColor: '#0284c7',
    thumbnailBg: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)',
    thumbnail: null,
    badge: null,
    badgeClass: '',
    seats: 25,
    certificate: true,
    whatYoullLearn: [
      'Identify legitimate online job and freelance opportunities',
      'Create a professional freelancer profile on Fiverr and Upwork',
      'Write winning proposals and communicate professionally with clients',
      'Deliver freelance projects and get client reviews effectively',
      'Receive online payments securely: bank transfer, UPI, PayPal basics',
      'Manage remote work: time tracking, productivity tools, and digital communication',
    ],
    curriculum: [
      {
        title: 'Module 1: Online Work Landscape',
        lessons: [
          { title: 'Types of Online Work: Freelance, Part-Time & Remote', duration: '30:00' },
          { title: 'Identifying Legitimate vs Fake Online Jobs', duration: '30:00' },
          { title: 'Introduction to Fiverr, Upwork & Freelancer.com', duration: '45:00' },
        ],
      },
      {
        title: 'Module 2: Building a Freelancer Profile',
        lessons: [
          { title: 'Creating a Winning Fiverr Gig Profile', duration: '60:00' },
          { title: 'Writing Proposals & Client Communication', duration: '60:00' },
          { title: 'Delivering Work & Getting 5-Star Reviews', duration: '45:00' },
        ],
      },
      {
        title: 'Module 3: Remote Work Tools & Getting Paid',
        lessons: [
          { title: 'Online Payments: UPI, Bank Transfer & PayPal Basics', duration: '30:00' },
          { title: 'Remote Work Tools: Slack, Trello & Google Meet', duration: '45:00' },
          { title: 'Time Management & Productivity for Remote Workers', duration: '30:00' },
          { title: 'Cyber Safety for Online Workers', duration: '30:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'currency_rupee', title: 'Earn from Home', description: 'Learn to find real online work and start earning from day one.' },
      { icon: 'workspace_premium', title: 'Certificate', description: 'Earn a Digital Skills & Online Work certificate.' },
      { icon: 'shield', title: 'Stay Safe Online', description: 'Learn to identify scams and protect your earnings.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 21. Full-Stack Web Development & AI Career Diploma (₹19,999)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 21,
    slug: 'full-stack-web-development-diploma',
    name: 'Full-Stack Web Development & AI Diploma',
    shortDescription: 'Job-ready career diploma in HTML/CSS, JavaScript, React, Node.js, Databases & AI Tool Integration with 100% Placement Support.',
    fullDescription: 'Become an industry-ready software professional. This comprehensive 6-month master diploma takes you from absolute coding fundamentals to building scalable production web apps with React, Express, MongoDB/SQL, REST APIs, Git, and integrating modern AI API capabilities. Includes resume building, portfolio projects, mock interviews, and guaranteed job assistance.',
    price: 19999,
    duration: '24 Weeks (6 Months)',
    durationWeeks: 24,
    level: 'Advanced',
    category: 'Design & Web',
    icon: 'terminal',
    iconColor: '#7c3aed',
    thumbnailBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    badge: 'Career Master',
    badgeClass: 'bg-amber-400 text-black font-extrabold',
    seats: 12,
    certificate: true,
    whatYoullLearn: [
      'Master Frontend with HTML5, Modern CSS3, Tailwind CSS & JavaScript (ES6+)',
      'Build modern single page reactive applications using React.js & State Management',
      'Develop robust Backend REST APIs with Node.js & Express',
      'Design and manage SQL & NoSQL Databases (PostgreSQL / MongoDB)',
      'Integrate AI APIs & automate development workflows',
      'Complete 4 live capstone projects, portfolio website & 100% placement support',
    ],
    curriculum: [
      {
        title: 'Module 1: Frontend Core & Responsive UI',
        lessons: [
          { title: 'Semantic HTML5, CSS Grid, Flexbox & Tailwind CSS', duration: '90:00' },
          { title: 'Core JavaScript, DOM, Events & Asynchronous Programming', duration: '120:00' },
          { title: 'Version Control with Git, GitHub & Deployment', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: React & Modern Frontend Architecture',
        lessons: [
          { title: 'React Hooks, Custom Components & Router', duration: '120:00' },
          { title: 'State Management, API Consumption & Auth Tokens', duration: '90:00' },
          { title: 'Capstone Project 1: Full-Featured E-Commerce UI', duration: '180:00' },
        ],
      },
      {
        title: 'Module 3: Backend API, Databases & Cloud Deployment',
        lessons: [
          { title: 'Node.js, Express Server & Authentication (JWT, bcrypt)', duration: '120:00' },
          { title: 'Database Modeling with MongoDB & PostgreSQL', duration: '120:00' },
          { title: 'RESTful API Design & AI API Integration', duration: '90:00' },
          { title: 'DevOps: Docker basics, CI/CD, Cloud Deployment & Interview Prep', duration: '150:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'work', title: '100% Placement Assistance', description: 'Dedicated hiring partner network, resume reviews, and direct interview scheduling.' },
      { icon: 'code', title: '4 Live Capstone Projects', description: 'Build and deploy production-grade applications that impress recruiters.' },
      { icon: 'school', title: 'Government Recognized Diploma', description: 'Certified diploma certificate valid for national and global IT job applications.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 22. Certified Digital Marketing & Performance Growth Master (₹9,999)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 22,
    slug: 'certified-digital-marketing-master',
    name: 'Digital Marketing & Growth Mastery',
    shortDescription: 'Master Google Ads, Meta Ads (FB & Insta), SEO, Content Strategy, WhatsApp Marketing, and AI-powered Copywriting with live ad budgets.',
    fullDescription: 'An intensive 12-week performance marketing bootcamp designed for business owners, freelancers, and aspiring marketers. You will run real ad campaigns with live budgets, perform in-depth SEO audits, build high-converting landing pages, master Google Analytics (GA4), and leverage AI tools for viral content generation.',
    price: 9999,
    duration: '12 Weeks (3 Months)',
    durationWeeks: 12,
    level: 'Intermediate',
    category: 'Digital Skills',
    icon: 'trending_up',
    iconColor: '#059669',
    thumbnailBg: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'High ROI',
    badgeClass: 'bg-emerald-400 text-emerald-950 font-extrabold',
    seats: 15,
    certificate: true,
    whatYoullLearn: [
      'Set up & optimize Google Search, Display, and Video (YouTube) Ad campaigns',
      'Master Meta Ads Manager (Facebook & Instagram) with custom audience targeting',
      'On-Page, Off-Page & Technical SEO with keyword research tools',
      'Google Analytics 4 (GA4), Tag Manager & conversion tracking setup',
      'WhatsApp Automation, Email Marketing & Sales Funnels',
      'AI marketing workflows with ChatGPT, Canva Pro & automated copy generators',
    ],
    curriculum: [
      {
        title: 'Module 1: Search Engine Optimization & Content',
        lessons: [
          { title: 'Keyword Research & Competitor Gap Analysis', duration: '60:00' },
          { title: 'Technical SEO, Core Web Vitals & Local Google Business Profile', duration: '90:00' },
          { title: 'AI-assisted Content Writing & Backlink Outreach', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Paid Ads & Performance Marketing',
        lessons: [
          { title: 'Meta Ads Blueprint: Pixel Setup, Audiences & Retargeting', duration: '120:00' },
          { title: 'Google Ads: Search Intent, Bidding Strategies & Quality Score', duration: '120:00' },
          { title: 'Live Ad Campaign Execution with Real Budgets', duration: '90:00' },
        ],
      },
      {
        title: 'Module 3: Analytics, Automation & Freelance Growth',
        lessons: [
          { title: 'GA4 Setup, Event Tracking & Custom Dashboards', duration: '60:00' },
          { title: 'Email & WhatsApp Automated Lead Generation', duration: '60:00' },
          { title: 'Pitching Clients, Agency Business Model & Freelancing', duration: '90:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'ads_click', title: 'Live Campaign Budgets', description: 'Get hands-on experience by executing real campaigns during the course.' },
      { icon: 'workspace_premium', title: 'Industry Certifications', description: 'Assistance for Google, HubSpot, and SikshaSetu Master Certifications.' },
      { icon: 'trending_up', title: 'Client Acquisition Strategy', description: 'Learn how to pitch high-paying clients and earn monthly retainers.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 23. Python Programming for Data Analytics & Automation (₹4,999)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 23,
    slug: 'python-data-analytics-automation',
    name: 'Python for Data Analytics & Automation',
    shortDescription: 'Learn Python from scratch — manipulate big data with Pandas, build interactive charts with Matplotlib/Seaborn, and automate repetitive office tasks.',
    fullDescription: 'Python is the #1 programming language in the world for automation and analytics. This 8-week course covers Python fundamentals, data extraction, CSV/Excel automation, statistical analysis with NumPy and Pandas, and data visualization dashboards. Perfect for analysts, managers, and students looking for high-paying corporate roles.',
    price: 4999,
    duration: '8 Weeks (2 Months)',
    durationWeeks: 8,
    level: 'Intermediate',
    category: 'Basic Computing',
    icon: 'data_object',
    iconColor: '#3b82f6',
    thumbnailBg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    badge: 'In Demand',
    badgeClass: 'bg-blue-200 text-blue-900 font-bold',
    seats: 18,
    certificate: true,
    whatYoullLearn: [
      'Core Python syntax: variables, loops, functions, and data structures',
      'Automate Excel sheets, PDFs, and email workflows using Python scripts',
      'Data manipulation & cleaning using Pandas and NumPy',
      'Exploratory Data Analysis (EDA) and business dashboards with Seaborn',
      'Web scraping data from websites with BeautifulSoup',
      'Build 3 real-world portfolio analytics projects',
    ],
    curriculum: [
      {
        title: 'Module 1: Python Fundamentals',
        lessons: [
          { title: 'Python Setup, Variables, Conditionals & Loops', duration: '60:00' },
          { title: 'Lists, Dictionaries, Tuples & String Methods', duration: '60:00' },
          { title: 'Functions, Modules & File Handling', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Automation & Data Cleaning',
        lessons: [
          { title: 'Automating Excel Files, CSVs & Email Reports', duration: '90:00' },
          { title: 'Introduction to NumPy for Fast Numerical Operations', duration: '60:00' },
          { title: 'Pandas DataFrames: Filtering, Grouping & Aggregations', duration: '120:00' },
        ],
      },
      {
        title: 'Module 3: Visualization & Portfolio Projects',
        lessons: [
          { title: 'Visualizing Data with Matplotlib & Seaborn', duration: '90:00' },
          { title: 'Web Scraping Live Data with BeautifulSoup', duration: '90:00' },
          { title: 'Final Business Intelligence Project & Showcase', duration: '120:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'insights', title: 'Business Analytics Skills', description: 'Analyze corporate datasets and automate repetitive tasks in seconds.' },
      { icon: 'code', title: 'Practical Code Repository', description: 'Walk away with reusable automation scripts and a GitHub portfolio.' },
      { icon: 'workspace_premium', title: 'Python Certified Specialist', description: 'Boost resume credibility for data analyst and operations roles.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 24. Advanced GST, Tally Prime & Corporate Taxation Specialist (₹4,999)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 24,
    slug: 'advanced-gst-tally-taxation',
    name: 'Advanced GST, Tally Prime & Corporate Tax',
    shortDescription: 'Become a certified tax accountant. Master Tally Prime 4.0, GST Return Filing (GSTR 1, 3B, 9), TDS/TCS, E-Way Bills & Balance Sheet finalization.',
    fullDescription: 'Designed for commerce students, accountants, and business managers who want to handle end-to-end company accounts. Learn live GST portal filing, payroll computation with PF/ESI, annual audits, bank reconciliation, and balance sheet preparation in Tally Prime.',
    price: 4999,
    duration: '8 Weeks (2 Months)',
    durationWeeks: 8,
    level: 'Advanced',
    category: 'Accounting',
    icon: 'account_balance',
    iconColor: '#e11d48',
    thumbnailBg: 'linear-gradient(135deg, #881337 0%, #e11d48 100%)',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    badgeClass: 'bg-rose-200 text-rose-900 font-bold',
    seats: 16,
    certificate: true,
    whatYoullLearn: [
      'Comprehensive accounting in Tally Prime 4.0 with inventory & billing',
      'Live GST portal filing: GSTR-1, GSTR-3B, GSTR-9 and Input Tax Credit (ITC) reconciliation',
      'TDS and TCS computation, payment challans, and quarterly returns',
      'Payroll management: Salary structure, PF, ESI & Professional Tax',
      'Financial statement preparation, P&L, and Balance Sheet finalization',
      'E-Way Bill & E-Invoicing portal live operations',
    ],
    curriculum: [
      {
        title: 'Module 1: Advanced Tally Prime & Inventory',
        lessons: [
          { title: 'Company Setup, Chart of Accounts & Advanced Voucher Entries', duration: '90:00' },
          { title: 'Multi-Location Inventory, Batch Management & Price Lists', duration: '90:00' },
          { title: 'Bank Reconciliation Statement (BRS) & Payment Gateway entries', duration: '60:00' },
        ],
      },
      {
        title: 'Module 2: Complete GST & Direct Tax Mastery',
        lessons: [
          { title: 'GST Rules, Reverse Charge (RCM), and ITC Claim Rules', duration: '90:00' },
          { title: 'Hands-on GSTR-1 & GSTR-3B preparation and portal uploading', duration: '120:00' },
          { title: 'TDS/TCS deduction rates, Challan 281 & Return 26Q/24Q', duration: '90:00' },
        ],
      },
      {
        title: 'Module 3: Payroll, Final Accounts & Practical Audit',
        lessons: [
          { title: 'Payroll Processing: Salary Slips, PF & ESI calculation', duration: '90:00' },
          { title: 'Finalization of Balance Sheet & Profit & Loss Statement', duration: '120:00' },
          { title: 'Audit Preparation & Corporate Practical Assessment', duration: '90:00' },
        ],
      },
    ],
    benefits: [
      { icon: 'receipt_long', title: 'Real Government Portal Practice', description: 'Practical experience on GST and Income Tax testing portals.' },
      { icon: 'work', title: 'High Demand Accounting Jobs', description: 'Direct qualification for Senior Accountant and Tax Executive roles.' },
      { icon: 'workspace_premium', title: 'Authorized Tax Diploma', description: 'Industry-standard certification recognized across business firms.' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Find a course by its URL slug.
 * @param {string} slug
 * @returns {object|null}
 */
function getCourseBySlug(slug) {
  return COURSES.find(c => c.slug === slug) || null;
}

/**
 * Return unique course categories present in the data.
 * @returns {string[]}
 */
function getCourseCategories() {
  return [...new Set(COURSES.map(c => c.category))];
}
