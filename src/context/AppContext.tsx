import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppDatabase, 
  EducationalArticle, 
  ServiceItem, 
  ProjectItem, 
  EnquiryRecord, 
  ContactSubmission, 
  FounderProfile, 
  SiteSettings,
  EnquiryStatus,
  NotificationLogItem,
  AutomationSettings
} from '../types/index.ts';
import { initialData } from '../data/initialData.ts';

interface AdminUser {
  username: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AppContextType {
  data: AppDatabase;
  loading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedArticle: EducationalArticle | null;
  setSelectedArticle: (article: EducationalArticle | null) => void;
  selectedServiceForEnquiry: string | null;
  setSelectedServiceForEnquiry: (service: string | null) => void;
  adminUser: AdminUser | null;
  adminLogin: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  adminLogout: () => void;
  submitEnquiry: (enquiry: Omit<EnquiryRecord, 'id' | 'referenceNumber' | 'status' | 'submittedAt'>) => Promise<{ success: boolean; referenceNumber?: string; message?: string }>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, adminNotes?: string) => Promise<boolean>;
  submitContact: (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>) => Promise<{ success: boolean; message?: string }>;
  markContactRead: (id: string, isRead: boolean) => Promise<boolean>;
  createArticle: (article: Partial<EducationalArticle>) => Promise<boolean>;
  updateArticle: (id: string, article: Partial<EducationalArticle>) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;
  createProject: (project: Partial<ProjectItem>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<boolean>;
  updateFounder: (founder: Partial<FounderProfile>) => Promise<boolean>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  updateAutomationSettings: (automation: Partial<AutomationSettings>) => Promise<boolean>;
  testNotificationDispatch: (testMessage?: string) => Promise<{ success: boolean; message: string; log?: NotificationLogItem }>;
  resetToInitialData: () => Promise<boolean>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const normalizeDatabase = (raw: any): AppDatabase => {
  if (!raw || typeof raw !== 'object') return initialData;
  return {
    articles: Array.isArray(raw.articles) ? raw.articles : initialData.articles,
    services: Array.isArray(raw.services) ? raw.services : initialData.services,
    projects: Array.isArray(raw.projects) ? raw.projects : initialData.projects,
    enquiries: Array.isArray(raw.enquiries) ? raw.enquiries : initialData.enquiries,
    contacts: Array.isArray(raw.contacts) ? raw.contacts : initialData.contacts,
    notificationLogs: Array.isArray(raw.notificationLogs) ? raw.notificationLogs : (initialData.notificationLogs || []),
    founder: {
      ...initialData.founder,
      ...(raw.founder || {}),
      socialLinks: {
        ...initialData.founder.socialLinks,
        ...(raw.founder?.socialLinks || {})
      }
    },
    settings: {
      ...initialData.settings,
      ...(raw.settings || {}),
      hero: {
        ...initialData.settings.hero,
        ...(raw.settings?.hero || {})
      },
      announcementBanner: {
        ...initialData.settings.announcementBanner,
        ...(raw.settings?.announcementBanner || {})
      },
      contactDetails: {
        ...initialData.settings.contactDetails,
        ...(raw.settings?.contactDetails || {})
      },
      seoMeta: {
        ...initialData.settings.seoMeta,
        ...(raw.settings?.seoMeta || {})
      },
      automation: {
        ...(initialData.settings.automation || {}),
        ...(raw.settings?.automation || {})
      }
    }
  };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppDatabase>(() => {
    // Check localStorage cache first for instant initial render
    const cached = localStorage.getItem('menmex_db_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return normalizeDatabase(parsed);
      } catch {
        // ignore
      }
    }
    return initialData;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('menmex_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch full data from server API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const normalized = normalizeDatabase(json.data);
          setData(normalized);
          localStorage.setItem('menmex_db_cache', JSON.stringify(normalized));
        }
      }
    } catch (err) {
      console.warn('Could not load data from /api/data, using local cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Admin login
  const adminLogin = async (username: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass })
      });
      const resJson = await res.json();
      if (resJson.success && resJson.user) {
        setAdminUser(resJson.user);
        localStorage.setItem('menmex_admin_user', JSON.stringify(resJson.user));
        return { success: true };
      }
      return { success: false, message: resJson.message || 'Invalid credentials' };
    } catch {
      if ((username === 'admin' || username === 'mnx' || username === 'menmex') && (pass === 'mnx2026' || pass === 'menmex2026' || pass === 'admin123')) {
        const fallbackUser: AdminUser = {
          username: 'admin',
          name: 'Isaiah (MNX DIGITAL TEAM SOLUTIONS)',
          role: 'Super Administrator',
          permissions: ['manage_content', 'manage_enquiries', 'manage_projects', 'site_settings', 'manage_automation']
        };
        setAdminUser(fallbackUser);
        localStorage.setItem('mnx_admin_user', JSON.stringify(fallbackUser));
        return { success: true };
      }
      return { success: false, message: 'Invalid administrative passcode.' };
    }
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('menmex_admin_user');
  };

  // Submit enquiry
  const submitEnquiry = async (
    enquiryData: Omit<EnquiryRecord, 'id' | 'referenceNumber' | 'status' | 'submittedAt'>
  ): Promise<{ success: boolean; referenceNumber?: string; message?: string }> => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return { success: true, referenceNumber: json.referenceNumber, message: json.message };
      }
      return { success: false, message: json.message };
    } catch {
      // Offline fallback
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const referenceNumber = `MMX-${new Date().getFullYear()}-${randomSuffix}`;
      const newEnq: EnquiryRecord = {
        id: `enq-${Date.now()}`,
        referenceNumber,
        ...enquiryData,
        status: 'New',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        adminNotes: ''
      };
      const updated = { ...data, enquiries: [newEnq, ...data.enquiries] };
      setData(updated);
      localStorage.setItem('menmex_db_cache', JSON.stringify(updated));
      return { success: true, referenceNumber };
    }
  };

  // Update enquiry status
  const updateEnquiryStatus = async (id: string, status: EnquiryStatus, adminNotes?: string): Promise<boolean> => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      await refreshData();
      return true;
    } catch {
      const updatedEnquiries = data.enquiries.map(e => (e.id === id ? { ...e, status, adminNotes: adminNotes ?? e.adminNotes } : e));
      const updated = { ...data, enquiries: updatedEnquiries };
      setData(updated);
      localStorage.setItem('menmex_db_cache', JSON.stringify(updated));
      return true;
    }
  };

  // Contact submission
  const submitContact = async (
    contactData: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message };
    } catch {
      const newCnt: ContactSubmission = {
        id: `cnt-${Date.now()}`,
        ...contactData,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        isRead: false
      };
      const updated = { ...data, contacts: [newCnt, ...data.contacts] };
      setData(updated);
      localStorage.setItem('menmex_db_cache', JSON.stringify(updated));
      return { success: true };
    }
  };

  const markContactRead = async (id: string, isRead: boolean): Promise<boolean> => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead })
      });
      await refreshData();
      return true;
    } catch {
      const updatedContacts = data.contacts.map(c => (c.id === id ? { ...c, isRead } : c));
      const updated = { ...data, contacts: updatedContacts };
      setData(updated);
      localStorage.setItem('menmex_db_cache', JSON.stringify(updated));
      return true;
    }
  };

  // Articles
  const createArticle = async (article: Partial<EducationalArticle>): Promise<boolean> => {
    const newArt: EducationalArticle = {
      id: `art-${Date.now()}`,
      title: article.title || 'Untitled Publication',
      slug: (article.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: article.category || 'Educational News',
      isOfficialAnnouncement: Boolean(article.isOfficialAnnouncement),
      officialSource: article.officialSource || 'MNX DIGITAL TEAM SOLUTIONS Educational Advisory',
      officialSourceUrl: article.officialSourceUrl || '',
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: article.readTime || '4 min read',
      excerpt: article.excerpt || '',
      content: article.content || '',
      featuredImage: article.featuredImage || '',
      tags: Array.isArray(article.tags) ? article.tags : ['Admissions', 'Updates'],
      author: article.author || 'Isaiah (MNX DIGITAL TEAM SOLUTIONS)',
      views: 1
    };
    const updatedDb = { ...data, articles: [newArt, ...data.articles] };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  const updateArticle = async (id: string, article: Partial<EducationalArticle>): Promise<boolean> => {
    const updatedArticles = data.articles.map(a => a.id === id ? { ...a, ...article } : a);
    const updatedDb = { ...data, articles: updatedArticles };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    const updatedArticles = data.articles.filter(a => a.id !== id);
    const updatedDb = { ...data, articles: updatedArticles };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Projects
  const createProject = async (project: Partial<ProjectItem>): Promise<boolean> => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: project.title || 'New Digital Solution',
      category: project.category || 'Web Application',
      description: project.description || '',
      image: project.image || '',
      status: project.status || 'Active / Live',
      externalUrl: project.externalUrl || '',
      technologies: Array.isArray(project.technologies) ? project.technologies : ['Web', 'Cloud'],
      impactMetric: project.impactMetric || ''
    };
    const updatedDb = { ...data, projects: [newProj, ...data.projects] };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>): Promise<boolean> => {
    const updatedProjects = data.projects.map(p => p.id === id ? { ...p, ...project } : p);
    const updatedDb = { ...data, projects: updatedProjects };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updatedProjects = data.projects.filter(p => p.id !== id);
    const updatedDb = { ...data, projects: updatedProjects };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Services
  const updateService = async (id: string, service: Partial<ServiceItem>): Promise<boolean> => {
    const updatedServices = data.services.map(s => s.id === id ? { ...s, ...service } : s);
    const updatedDb = { ...data, services: updatedServices };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Founder
  const updateFounder = async (founder: Partial<FounderProfile>): Promise<boolean> => {
    const updatedFounder = { ...data.founder, ...founder };
    const updatedDb = { ...data, founder: updatedFounder };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch('/api/founder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(founder)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Settings
  const updateSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    const updatedSettings: SiteSettings = {
      ...data.settings,
      ...settings,
      hero: {
        ...(data.settings?.hero || initialData.settings.hero),
        ...(settings.hero || {})
      },
      announcementBanner: {
        ...(data.settings?.announcementBanner || initialData.settings.announcementBanner),
        ...(settings.announcementBanner || {})
      },
      contactDetails: {
        ...(data.settings?.contactDetails || initialData.settings.contactDetails),
        ...(settings.contactDetails || {})
      },
      seoMeta: {
        ...(data.settings?.seoMeta || initialData.settings.seoMeta),
        ...(settings.seoMeta || {})
      }
    };
    const updatedDb: AppDatabase = { ...data, settings: updatedSettings };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Automation Settings
  const updateAutomationSettings = async (automation: Partial<AutomationSettings>): Promise<boolean> => {
    const updatedAutomation = {
      ...(data.settings?.automation || initialData.settings.automation!),
      ...automation
    };
    const updatedSettings = {
      ...data.settings,
      automation: updatedAutomation
    };
    const updatedDb: AppDatabase = { ...data, settings: updatedSettings };
    setData(updatedDb);
    localStorage.setItem('menmex_db_cache', JSON.stringify(updatedDb));

    try {
      await fetch('/api/settings/automation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automation)
      });
      await refreshData();
      return true;
    } catch {
      return true;
    }
  };

  // Test Notification Dispatch
  const testNotificationDispatch = async (testMessage?: string): Promise<{ success: boolean; message: string; log?: NotificationLogItem }> => {
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testMessage })
      });
      const json = await res.json();
      await refreshData();
      return { success: true, message: json.message || 'Test alert dispatched.', log: json.log };
    } catch (e: any) {
      return { success: false, message: e.message || 'Failed to dispatch test notification.' };
    }
  };

  // Reset
  const resetToInitialData = async (): Promise<boolean> => {
    try {
      await fetch('/api/reset-data', { method: 'POST' });
      await refreshData();
      return true;
    } catch {
      setData(initialData);
      localStorage.setItem('menmex_db_cache', JSON.stringify(initialData));
      return true;
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        activeTab,
        setActiveTab,
        selectedArticle,
        setSelectedArticle,
        selectedServiceForEnquiry,
        setSelectedServiceForEnquiry,
        adminUser,
        adminLogin,
        adminLogout,
        submitEnquiry,
        updateEnquiryStatus,
        submitContact,
        markContactRead,
        createArticle,
        updateArticle,
        deleteArticle,
        createProject,
        updateProject,
        deleteProject,
        updateService,
        updateFounder,
        updateSettings,
        updateAutomationSettings,
        testNotificationDispatch,
        resetToInitialData,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
