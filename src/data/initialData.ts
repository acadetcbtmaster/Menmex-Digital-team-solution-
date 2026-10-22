import { AppDatabase } from '../types/index.ts';

export const initialData: AppDatabase = {
  settings: {
    brandName: "MNX DIGITAL TEAM SOLUTIONS",
    brandSlogan: "Simplifying Digital Processes. Connecting People to Opportunities.",
    brandPositioning: "Digital Solutions | Online Consultancy | Educational Information | Technology | Business Support",
    logoUrl: "/logo.png",
    hero: {
      badgeText: "OFFICIAL DIGITAL SOLUTIONS & CONSULTANCY",
      headline: "MNX DIGITAL TEAM SOLUTIONS",
      subheadline: "Your Trusted Partner in Digital Solutions, Online Consultancy and Educational Information.",
      description: "We provide professional digital services, educational information, online consultancy, technology solutions and business support designed to simplify processes and create opportunities.",
      heroImage: ""
    },
    announcementBanner: {
      enabled: true,
      text: "Official Notice: 2026/2027 JAMB UTME Registration Procedures & Direct Entry Verification Now Active. Contact our MNX consultancy desk for support.",
      link: "#educational-updates"
    },
    contactDetails: {
      phone: "07053157243",
      whatsapp: "07053157243",
      email: "idrismohamed2521@gmail.com",
      address: "Digital Suite 4, Technology Hub Complex, Nigeria (Virtual & Nationwide Service Delivery)",
      workingHours: "Monday – Saturday: 8:00 AM – 7:00 PM (WAT)"
    },
    seoMeta: {
      siteTitle: "MNX DIGITAL TEAM SOLUTIONS | Digital Services, Consultancy & Educational Portal",
      metaDescription: "MNX DIGITAL TEAM SOLUTIONS connects individuals, students, and businesses with reliable digital services, educational information, web development, and online consultancy."
    },
    automation: {
      autoNotifyAdmin: true,
      notifyEmail: "idrismohamed2521@gmail.com",
      enableEmailAlerts: true,
      notifyWhatsAppNumber: "07053157243",
      enableWhatsAppAlerts: true,
      whatsAppGatewayProvider: "callmebot",
      whatsAppApiKey: "",
      customWebhookUrl: ""
    }
  },
  founder: {
    name: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
    title: "Founder & Lead Consultant | MNX DIGITAL TEAM SOLUTIONS",
    slogan: "Empowering minds and enterprises through technology, clarity, and dependable digital systems.",
    shortBio: "Isaiah is the visionary founder and lead consultant at MNX DIGITAL TEAM SOLUTIONS, serving as a dedicated digital solutions consultant, educational information specialist, and web developer.",
    fullBiography: "Isaiah (widely recognized across digital communities as leader of MNX DIGITAL TEAM SOLUTIONS) established the brand to bridge the critical gap between individuals and the digital tools, educational announcements, and technology-driven opportunities they need. With extensive hands-on expertise spanning educational admissions guidance, web platform development, digital marketing, and social media brand positioning, he leads MNX DIGITAL TEAM SOLUTIONS with a clear commitment to integrity, accuracy, and process simplification. Under his leadership, MNX has grown into a reputable central digital destination trusted by thousands of students, applicants, and growing businesses across Nigeria and beyond.",
    professionalBackground: "Isaiah has actively spearheaded practical digital initiatives including online university admissions advisory, computer-based testing (CBT) training workflows, small business digital transitions, and custom web development. His approach combines hands-on technical execution with direct, approachable client consultancy.",
    areasOfExpertise: [
      "Digital Solutions & Online Consultancy",
      "Educational Information Dissemination & Verification",
      "Website & Custom Web Application Development",
      "Social Media Management & Channel Growth",
      "Online Registration & Application Workflow Assistance",
      "Digital Marketing & Brand Positioning"
    ],
    founderImage: "",
    socialLinks: {
      whatsapp: "https://wa.me/2347053157243",
      facebook: "https://www.facebook.com/share/1DzH6eycuZ/",
      tiktok: "https://www.tiktok.com/@menmex01?_r=1&_t=ZN-9AlFGUElAus",
      youtube: "https://youtube.com/@menmex001?si=IGbArnqmuNiRHXvv",
      linkedin: ""
    }
  },
  services: [
    {
      id: "dept-a",
      departmentCode: "A",
      categoryName: "Online Consultancy",
      title: "Online Consultancy & Advisory",
      tagline: "Professional guidance for resolving complex online service and educational challenges.",
      description: "Direct one-on-one professional guidance and strategic troubleshooting for individuals and organisations seeking dependable solutions to digital, educational, and online service hurdles.",
      features: [
        "General online consultancy & digital guidance",
        "Digital process simplification & step-by-step navigation",
        "Online account recovery & credential troubleshooting",
        "Technical support and digital bottleneck diagnosis",
        "Application and registration guidance for institutions",
        "Platform onboarding & digital tool navigation"
      ],
      targetClients: ["Students & Applicants", "Individual Professionals", "Growing Businesses"],
      iconName: "HelpCircle",
      isActive: true
    },
    {
      id: "dept-b",
      departmentCode: "B",
      categoryName: "Educational Information & Updates",
      title: "Educational Information Centre",
      tagline: "Verified, timely, and actionable admission and academic announcements.",
      description: "A dedicated educational information division providing prospective university, polytechnic, and college students with accurate, verified admissions updates, requirements, and deadlines.",
      features: [
        "JAMB official directives & policy bulletins",
        "University, Polytechnic & COE admission screening updates",
        "Post-UTME requirements & aggregate calculations",
        "O'Level result upload & verification procedures",
        "Scholarship notices & international study grants",
        "Step-by-step educational application walkthroughs"
      ],
      targetClients: ["UTME & Direct Entry Candidates", "Parents & Guardians", "Educational Counselors"],
      iconName: "GraduationCap",
      isActive: true
    },
    {
      id: "dept-c",
      departmentCode: "C",
      categoryName: "Online Registration & Application Services",
      title: "Online Registration & Application Processing",
      tagline: "Seamless handling of critical digital registration workflows with error prevention.",
      description: "Comprehensive assistance with time-sensitive online registration, examination applications, document uploads, and academic portal submissions.",
      features: [
        "JAMB profile generation & registration assistance",
        "Post-UTME & institutional screening application processing",
        "Admission acceptance & CAPS portal services",
        "Result checking, verification & document archiving",
        "Accredited document uploads & biometric coordination",
        "Application tracking and error rectification"
      ],
      targetClients: ["Exam Candidates", "Postgraduate Applicants", "Job Seekers"],
      iconName: "FileCheck",
      isActive: true
    },
    {
      id: "dept-d",
      departmentCode: "D",
      categoryName: "Website & Software Development",
      title: "Website & Custom Software Engineering",
      tagline: "Modern, high-performance web applications tailored to business and educational workflows.",
      description: "End-to-end design and engineering of responsive websites, institutional management portals, e-commerce stores, and specialized software systems.",
      features: [
        "Corporate & Business Websites with CMS",
        "Educational & School Management Portals",
        "CBT (Computer-Based Test) Examination Systems",
        "Online Marketplaces & E-Commerce Web Stores",
        "Real Estate, Housing & Property Platforms",
        "Custom Workflow Automation & Client Portals"
      ],
      targetClients: ["Schools & Academies", "Commercial Businesses", "Startups & Real Estate Firms"],
      iconName: "Code",
      isActive: true
    },
    {
      id: "dept-e",
      departmentCode: "E",
      categoryName: "Social Media Management",
      title: "Social Media Management & Channel Growth",
      tagline: "Elevate your digital community presence, engagement, and audience reach.",
      description: "Structured management of social channels designed to maintain a consistent brand voice, plan engaging content, and expand organic community reach.",
      features: [
        "Facebook page curation & community moderation",
        "WhatsApp channel & broadcast group management",
        "TikTok strategy & short-form video content planning",
        "YouTube channel optimization & publishing cadence",
        "Content calendar development & brand alignment",
        "Audience engagement and community support"
      ],
      targetClients: ["Brand Creators", "Educational Influencers", "SMEs & E-commerce Brands"],
      iconName: "Share2",
      isActive: true
    },
    {
      id: "dept-f",
      departmentCode: "F",
      categoryName: "Digital Marketing & Advertising",
      title: "Digital Marketing & Performance Campaigns",
      tagline: "Targeted digital visibility campaigns that attract customers and drive conversion.",
      description: "Result-oriented digital promotional strategies and targeted paid campaigns designed to connect products, services, and educational programs with interested prospects.",
      features: [
        "Paid search & social advertising campaigns",
        "Product & service promotional strategy",
        "Targeted audience segmentation & retargeting",
        "Digital brand awareness & positioning funnels",
        "High-conversion promotional copy & creatives",
        "Campaign analytics & visibility reporting"
      ],
      targetClients: ["Service Providers", "E-commerce Retailers", "Private Institutions"],
      iconName: "TrendingUp",
      isActive: true
    },
    {
      id: "dept-g",
      departmentCode: "G",
      categoryName: "Digital Solutions & Technical Support",
      title: "Digital Solutions & Technical Support",
      tagline: "Practical troubleshooting, digital system setup, and workflow automation.",
      description: "Hands-on technology assistance helping businesses and individuals configure digital accounts, automate repetitive workflows, and maintain reliable online tools.",
      features: [
        "Custom online registration forms & intake pipelines",
        "Corporate email setup & cloud platform configuration",
        "Website maintenance & technical troubleshooting",
        "Business workflow automation & notification webhooks",
        "Digital documentation archiving & cloud backups",
        "General internet & software advisory"
      ],
      targetClients: ["Independent Professionals", "Small Office Teams", "Organizations"],
      iconName: "Cpu",
      isActive: true
    },
    {
      id: "dept-h",
      departmentCode: "H",
      categoryName: "Business & Digital Development Consultancy",
      title: "Business & Digital Development Advisory",
      tagline: "Guiding entrepreneurs through digital transformation and sustainable online operations.",
      description: "Strategic advisory services supporting early-stage startups and established businesses in adopting practical digital infrastructure, online sales funnels, and modern operating models.",
      features: [
        "Digital business model formulation & market validation",
        "Online presence & credibility architecture",
        "Website planning & functional specification",
        "Online service delivery & payment gateway integration",
        "Modern technology adoption roadmaps",
        "Customer journey & digital touchpoint optimization"
      ],
      targetClients: ["Entrepreneurs", "Emerging Startups", "Traditional Enterprises"],
      iconName: "Briefcase",
      isActive: true
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "JAMB 2026/2027 Registration Guidelines, Profile Code Generation & Biometric Directives",
      slug: "jamb-2026-registration-guidelines-profile-code",
      category: "JAMB Updates",
      isOfficialAnnouncement: true,
      officialSource: "Joint Admissions and Matriculation Board (JAMB) Official Bulletin",
      officialSourceUrl: "https://jamb.gov.ng",
      publishDate: "October 14, 2026",
      readTime: "5 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 1420,
      tags: ["JAMB 2026", "UTME", "Profile Code", "NIN Verification"],
      featuredImage: "",
      excerpt: "Comprehensive breakdown of the mandatory National Identification Number (NIN) linking, SMS profile code generation, accredited CBT centres, and e-PIN purchase procedures for the 2026 UTME.",
      content: `### Executive Overview & Official Directives

The Joint Admissions and Matriculation Board (JAMB) has formally released the operational framework and guidelines for the 2026/2027 Unified Tertiary Matriculation Examination (UTME) and Direct Entry (DE) registrations. Candidates nationwide are strongly advised to adhere strictly to the accredited procedural protocols to avoid registration disqualification.

### 1. Mandatory Profile Code Generation via NIN

In strict compliance with federal digital identity regulations, every prospective applicant must obtain their 10-character Profile Code using their linked National Identification Number (NIN).

- **Method**: Send a text message containing the word **NIN** followed by a single space and your 11-digit NIN number (e.g., \`NIN 01234567890\`) to either **55019** or **66019**.
- **Important Notice**: The SIM card utilized for sending this SMS must be registered in the applicant's official name and must remain active throughout the admissions lifecycle.
- Once sent, you will receive a 10-character Profile Code via return SMS. This code is unique and permanent.

### 2. Purchase of Registration e-PIN

After successfully obtaining your profile code, the next stage involves purchasing the 2026 UTME e-PIN:
- Payments can be processed via authorized commercial banks, accredited mobile money operators, or directly through the official Remita payment gateway on the JAMB portal.
- Avoid third-party unverified cash handlers. Always confirm that your Profile Code appears accurately on the transaction receipt before payment confirmation.

### 3. Biometric Capture at Accredited CBT Centres

Candidates must proceed with their Profile Code and e-PIN to any JAMB Accredited Computer-Based Test (CBT) Centre for final biometric capture and document verification:
- **Ten-finger fingerprint verification** is strictly mandatory. No proxy registrations are permitted under any circumstances.
- Verify your choice of institutions (First, Second, Third, and Fourth choice) and corresponding O'Level subject combinations before final submission.
- Ensure you collect your printed JAMB Registration Slip and the official syllabus/e-brochure.

### How MNX DIGITAL TEAM SOLUTIONS Can Assist You

If you encounter SMS delivery failures, profile code discrepancies, or require guidance choosing compliant UTME subject combinations for competitive courses (such as Medicine, Law, Computer Science, and Engineering), reach out to the **MNX DIGITAL TEAM SOLUTIONS Educational Assistance Desk** for verified support.`
    },
    {
      id: "art-2",
      title: "University of Lagos (UNILAG) Post-UTME 2026/2027 Screening Timetable & Aggregate Calculation",
      slug: "unilag-post-utme-2026-screening-timetable-aggregate",
      category: "Post-UTME and Screening",
      isOfficialAnnouncement: true,
      officialSource: "University of Lagos Admissions Directorate & Academic Affairs",
      officialSourceUrl: "https://unilag.edu.ng",
      publishDate: "October 10, 2026",
      readTime: "4 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 980,
      tags: ["UNILAG", "Post-UTME", "Screening", "Catchment Areas"],
      featuredImage: "",
      excerpt: "Detailed screening calendar, minimum cut-off marks, and official aggregate formula (50% JAMB, 30% Post-UTME, 20% O'Level) for candidates seeking admission into UNILAG.",
      content: `### University of Lagos Post-UTME Screening Guidelines

The management of the University of Lagos has published the procedural guidelines for candidates who scored 200 and above in the 2026 UTME and selected UNILAG as their First Choice institution.

### 1. Eligibility Criteria
- Applicants must have chosen UNILAG as their first choice institution.
- Minimum UTME score of **200**.
- Must possess five (5) credit passes in relevant O'Level subjects including English Language and Mathematics in not more than **one sitting**.
- Minimum age requirement of sixteen (16) years by October 31, 2026.

### 2. The Official Aggregate Formula
UNILAG operates a 100-point aggregate system divided as follows:
1. **JAMB UTME Score (50%)**: Your JAMB score divided by 8. (e.g., 320 / 8 = 40.0 points).
2. **Post-UTME CBT Score (30%)**: Your Post-UTME examination score out of 30.
3. **O'Level Grades (20%)**: Best 5 relevant subjects:
   - A1 = 4.0 points
   - B2 = 3.6 points
   - B3 = 3.2 points
   - C4 = 2.8 points
   - C5 = 2.4 points
   - C6 = 2.0 points

Total aggregate determines departmental cut-off placement across Merit, Catchment States (Lagos, Ogun, Oyo, Osun, Ondo, Ekiti), and Educationally Less Developed States (ELDS).`
    },
    {
      id: "art-3",
      title: "Federal Government Bilateral Education Agreement (BEA) Overseas Scholarships 2026/2027",
      slug: "federal-scholarship-board-bea-overseas-2026",
      category: "Scholarships and Opportunities",
      isOfficialAnnouncement: true,
      officialSource: "Federal Ministry of Education / Federal Scholarship Board (FSB)",
      officialSourceUrl: "https://education.gov.ng",
      publishDate: "October 5, 2026",
      readTime: "6 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 1850,
      tags: ["BEA Scholarship", "Overseas Grants", "Undergraduate", "Postgraduate"],
      featuredImage: "",
      excerpt: "Application procedures for fully-funded international undergraduate and postgraduate scholarships in Russia, Hungary, China, Morocco, and Romania offered through the Federal Scholarship Board.",
      content: `### Federal Scholarship Board International Awards

The Federal Ministry of Education, through the Federal Scholarship Board (FSB), invites qualified Nigerian candidates to apply for the Bilateral Education Agreement (BEA) Overseas Scholarships for Undergraduate and Postgraduate studies.

### Participating Countries:
- **Undergraduate (UG)**: Russia, Morocco, Hungary, Egypt, and Venezuela.
- **Postgraduate (PG)**: Russia (for Russian graduates), China, Hungary, Serbia, and Romania.

### Fields of Study:
- Engineering, Agriculture, Sciences, Mathematics, Environmental Sciences, Medical Sciences, Social Sciences, Biotechnology, and Languages.

### Eligibility Guidelines:
- **Undergraduate**: Five distinctions (A or B) in WAEC/NECO in relevant subjects including English and Mathematics. Certificates must not be older than two years. Age bracket: 17 to 20 years.
- **Postgraduate**: First Class or Minimum of Second Class Upper (2:1) degree. NYSC discharge or exemption certificate is compulsory.

Candidates can reach out to MNX DIGITAL TEAM SOLUTIONS for documentation assistance and application verification.`
    },
    {
      id: "art-4",
      title: "Complete Step-by-Step Guide: O'Level Result Upload on JAMB CAPS Portal & Status Verification",
      slug: "step-by-step-guide-olevel-upload-jamb-caps",
      category: "Registration Guidelines",
      isOfficialAnnouncement: false,
      officialSource: "MNX DIGITAL TEAM SOLUTIONS Educational Advisory & Technical Verification Desk",
      publishDate: "September 28, 2026",
      readTime: "4 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 2310,
      tags: ["JAMB CAPS", "O'Level Upload", "Awaiting Result", "WAEC/NECO"],
      featuredImage: "",
      excerpt: "Step-by-step instructions on verifying whether your WAEC, NECO, or NABTEB results have been successfully uploaded to the Central Admissions Processing System (CAPS).",
      content: `### Why O'Level Upload is Crucial for Admission Consideration

A large percentage of qualified candidates miss their admission quotas annually due to a simple technical omission: **failure of O'Level results to reflect on the JAMB CAPS server**. Even if you scored 300+ in the UTME, tertiary institutions cannot process your admission without verified O'Level credentials on the CAPS database.

### How to Confirm Your Upload Status:
1. Log in to your personal JAMB profile at \`portal.jamb.gov.ng/efacility\`.
2. Ensure you switch your mobile browser view to **Desktop Site**.
3. Click on **Check Admission Status** and select **Access My CAPS**.
4. Navigate to the left menu and select **My O'Level**.
5. Inspect the displayed subjects and grades:
   - If grades appear (e.g., Mathematics: B3, English: C4), your result is successfully uploaded.
   - If the subject slots are blank or state 'Awaiting Result', you must upload immediately.

### Re-upload Protocol:
O'Level uploads cannot be performed from domestic mobile phones or personal cybercafes; they must be submitted through an accredited CBT centre via the official JAMB registration intranet.`
    },
    {
      id: "art-5",
      title: "Polytechnic ND & HND Admission Timetable & Direct Screening Protocols Across Federal Institutions",
      slug: "polytechnic-nd-hnd-admission-timetable-2026",
      category: "Polytechnic Admissions",
      isOfficialAnnouncement: true,
      officialSource: "National Board for Technical Education (NBTE) & Individual Rectors' Committees",
      officialSourceUrl: "https://nbte.gov.ng",
      publishDate: "September 22, 2026",
      readTime: "3 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 740,
      tags: ["Polytechnic", "ND Admission", "HND", "NBTE"],
      featuredImage: "",
      excerpt: "Screening cut-offs, National Diploma regular/evening programs, Industrial Training (IT) completion requirements, and Higher National Diploma application deadlines.",
      content: `### 2026 Polytechnic Admissions Overview

The National Board for Technical Education (NBTE) together with Federal and State Polytechnics across Nigeria have published admission screening modalities for both National Diploma (ND) and Higher National Diploma (HND) programmes.

### National Diploma (ND) Requirements:
- Minimum UTME score ranging between **100 and 150** depending on the specific institution.
- 5 credit passes in relevant O'Level subjects obtained in not more than two sittings.

### Higher National Diploma (HND) Requirements:
- National Diploma (ND) certificate with at least Lower Credit grade in relevant field.
- Evidence of compulsory One-Year post-ND Industrial Training (IT) or Two-Year IT for candidates with Pass grade.
- Official ND academic transcript sent directly to the registrar.`
    },
    {
      id: "art-6",
      title: "Understanding University Catchment Areas & ELDS in Nigerian Tertiary Admissions",
      slug: "understanding-university-catchment-areas-elds",
      category: "Academic Announcements",
      isOfficialAnnouncement: false,
      officialSource: "MNX DIGITAL TEAM SOLUTIONS Educational Advisory & Analysis",
      publishDate: "September 15, 2026",
      readTime: "5 min read",
      author: "Isaiah (MNX DIGITAL TEAM SOLUTIONS)",
      views: 1190,
      tags: ["Catchment Area", "ELDS", "Merit List", "Admissions Policy"],
      featuredImage: "",
      excerpt: "How the federal government quota formula (45% Merit, 35% Catchment Area, 20% ELDS) affects your probability of gaining admission into federal and state universities.",
      content: `### The Federal Admission Quota Formula Explained

Federal tertiary institutions in Nigeria operate an official admission quota policy established to foster national integration and equal access to education:

1. **National Merit (45%)**: The highest scorers regardless of state of origin.
2. **Catchment Areas (35%)**: Geographical zones historically and culturally connected to the university.
3. **Educationally Less Developed States (20%)**: States designated by the federal government for affirmative educational development.`
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "MNX EduPortal & CBT Examination Platform",
      category: "Educational Technology & Software",
      description: "A high-concurrency Computer-Based Test (CBT) training platform and admission tracking portal developed for secondary schools, tutorial academies, and prospective UTME candidates.",
      image: "",
      status: "Active / Live",
      externalUrl: "https://mnx.com.ng/eduportal",
      technologies: ["React", "Node.js", "Express", "Tailwind CSS", "PostgreSQL"],
      impactMetric: "Over 8,500 practice exams completed with 99.8% uptime during peak admission cycles."
    },
    {
      id: "proj-2",
      title: "Campus360 Institutional Management System",
      category: "School Management Solutions",
      description: "Custom web-based management suite built for private academies, featuring student biometric records, report card generation, tuition billing, and parent communication channels.",
      image: "",
      status: "Completed",
      externalUrl: "https://campus360.mnx.com.ng",
      technologies: ["TypeScript", "Next.js", "Express", "REST API"],
      impactMetric: "Adopted by 4 regional private secondary schools, cutting administrative paper workflows by 75%."
    },
    {
      id: "proj-3",
      title: "HavenRealty Property & Student Housing Finder",
      category: "Real Estate & Housing Platforms",
      description: "A fast, searchable property portal connecting university students and working professionals with verified off-campus accommodations, secure inspections, and tenancy agreements.",
      image: "",
      status: "Active / Live",
      externalUrl: "https://havenrealty.mnx.com.ng",
      technologies: ["React", "Tailwind CSS", "Leaflet Maps", "Node.js"],
      impactMetric: "Connected 1,200+ students to verified campus-proximity apartments with zero fraudulent listings."
    },
    {
      id: "proj-4",
      title: "NexaStore Multi-Vendor E-Commerce Platform",
      category: "Commercial Business Applications",
      description: "Scalable digital marketplace enabling retail merchants to establish digital storefronts, manage live inventory, process instant Paystack/Flutterwave payments, and coordinate delivery.",
      image: "",
      status: "Active / Live",
      externalUrl: "https://nexastore.mnx.com.ng",
      technologies: ["React", "Express", "Paystack API", "Tailwind CSS"],
      impactMetric: "Generated over ₦14.5M in processed merchant transactions in the first 9 months."
    }
  ],
  enquiries: [
    {
      id: "enq-101",
      referenceNumber: "MNX-2026-8912",
      fullName: "Adeyemi Michael",
      whatsappNumber: "+234 803 112 4455",
      email: "adeyemi.m@gmail.com",
      serviceCategory: "JAMB and Admission Assistance",
      subject: "Assistance with O'Level Upload & Direct Entry Screening Verification",
      description: "I recently sat for the 2026 UTME and have my NECO result ready, but my CAPS portal continues to display 'Awaiting Result'. I need professional guidance to ensure my upload is verified before the UNILAG screening deadline.",
      status: "Under Review",
      submittedAt: "2026-10-16 14:32:00",
      adminNotes: "Contacted candidate via WhatsApp. Scheduled accredited CBT upload verification."
    },
    {
      id: "enq-102",
      referenceNumber: "MNX-2026-7841",
      fullName: "Blessing Okonjo",
      whatsappNumber: "+234 814 990 2233",
      email: "blessing.okonjo@creativestudio.ng",
      serviceCategory: "Website Development",
      subject: "Development of Business Website & E-commerce Store",
      description: "We are an expanding fashion and footwear brand looking to launch a bespoke corporate website with payment gateway integration and inventory management.",
      status: "In Progress",
      submittedAt: "2026-10-15 10:15:00",
      adminNotes: "Sent proposal and technical scope. Client scheduled for discovery call."
    },
    {
      id: "enq-103",
      referenceNumber: "MNX-2026-6520",
      fullName: "Tunde Bakare",
      whatsappNumber: "+234 802 334 5566",
      email: "tunde.bakare@apexacademy.edu.ng",
      serviceCategory: "Online Consultancy",
      subject: "CBT Center Setup Advisory for School Testing",
      description: "Our secondary school intends to transition our end-of-term examinations to an internal CBT format. We need consultancy regarding software licensing and local network hardware requirements.",
      status: "Resolved",
      submittedAt: "2026-10-12 09:20:00",
      adminNotes: "Delivered hardware specification checklist and recommended EduPortal software deployment."
    }
  ],
  contacts: [
    {
      id: "cnt-1",
      name: "Chukwuma Eze",
      email: "chukwuma.eze@gmail.com",
      phone: "+234 805 443 2211",
      subject: "Partnership Opportunity for Educational Outreach",
      message: "Hello MNX DIGITAL TEAM SOLUTIONS, we represent an educational foundation providing scholarship funding for students and would like to collaborate with your educational information portal.",
      createdAt: "2026-10-16 11:24:00",
      isRead: false
    }
  ],
  notificationLogs: [
    {
      id: "log-1",
      type: "enquiry",
      referenceOrSubject: "MNX-2026-8912",
      senderName: "Adeyemi Michael",
      senderPhone: "+234 803 112 4455",
      timestamp: "2026-10-16 14:32:00",
      channels: {
        adminPanel: { status: "delivered", message: "Logged into Admin Gateway" },
        email: { status: "sent", recipient: "idrismohamed2521@gmail.com", message: "Automated dispatch successful" },
        whatsApp: { status: "sent", recipient: "+234 812 345 6789", message: "Direct gateway message delivered" }
      }
    }
  ]
};
