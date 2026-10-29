export interface EducationalArticle {
  id: string;
  title: string;
  slug: string;
  category: 
    | 'JAMB Updates'
    | 'University Admissions'
    | 'Polytechnic Admissions'
    | 'College of Education Admissions'
    | 'Post-UTME and Screening'
    | 'Admission Requirements'
    | 'Registration Guidelines'
    | 'Scholarships and Opportunities'
    | 'Academic Announcements'
    | 'Educational News';
  isOfficialAnnouncement: boolean;
  officialSource?: string;
  officialSourceUrl?: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  author: string;
  views: number;
}

export interface ServiceItem {
  id: string;
  departmentCode: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  title: string;
  categoryName: string;
  tagline: string;
  description: string;
  features: string[];
  targetClients: string[];
  iconName: string;
  isActive: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: 'Completed' | 'Active / Live' | 'Under Development';
  externalUrl?: string;
  technologies: string[];
  impactMetric?: string;
}

export type EnquiryStatus = 'New' | 'Under Review' | 'In Progress' | 'Resolved' | 'Closed';

export interface EnquiryRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  whatsappNumber: string;
  email?: string;
  serviceCategory: string;
  subject: string;
  description: string;
  status: EnquiryStatus;
  submittedAt: string;
  adminNotes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface FounderProfile {
  name: string;
  title: string;
  slogan: string;
  shortBio: string;
  fullBiography: string;
  professionalBackground: string;
  areasOfExpertise: string[];
  founderImage: string;
  isVerified?: boolean;
  badgeTitle?: string;
  googleBusinessVerified?: boolean;
  googleBusinessName?: string;
  googleBusinessCategory?: string;
  googleVerificationText?: string;
  socialLinks: {
    whatsapp: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    linkedin?: string;
  };
}

export interface HeroSettings {
  badgeText: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage?: string;
}

export interface AutomationSettings {
  autoNotifyAdmin: boolean;
  notifyEmail: string;
  enableEmailAlerts: boolean;
  notifyWhatsAppNumber: string;
  enableWhatsAppAlerts: boolean;
  whatsAppGatewayProvider: 'callmebot' | 'webhook' | 'direct';
  whatsAppApiKey?: string;
  customWebhookUrl?: string;
}

export interface NotificationLogItem {
  id: string;
  type: 'enquiry' | 'contact' | 'test';
  referenceOrSubject: string;
  senderName: string;
  senderPhone: string;
  timestamp: string;
  channels: {
    adminPanel: { status: 'delivered'; message: string };
    email: { status: 'sent' | 'pending' | 'failed'; recipient: string; message: string };
    whatsApp: { status: 'sent' | 'pending' | 'failed'; recipient: string; message: string };
  };
}

export interface SiteSettings {
  brandName: string;
  brandSlogan: string;
  brandPositioning: string;
  logoUrl?: string;
  hero: HeroSettings;
  announcementBanner: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  contactDetails: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workingHours: string;
  };
  seoMeta: {
    siteTitle: string;
    metaDescription: string;
  };
  adminPassword?: string;
  websiteViews?: number;
  automation?: AutomationSettings;
}

export interface AppDatabase {
  articles: EducationalArticle[];
  services: ServiceItem[];
  projects: ProjectItem[];
  enquiries: EnquiryRecord[];
  contacts: ContactSubmission[];
  founder: FounderProfile;
  settings: SiteSettings;
  notificationLogs?: NotificationLogItem[];
}
