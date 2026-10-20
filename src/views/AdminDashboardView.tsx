import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { EducationalArticle, ProjectItem, ServiceItem, EnquiryStatus, EnquiryRecord, AutomationSettings } from '../types/index.ts';
import { ImageUploader } from '../components/ImageUploader.tsx';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Search, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Layers, 
  User, 
  Settings, 
  Globe, 
  ExternalLink,
  MessageCircle,
  Save,
  RotateCcw,
  Eye,
  AlertCircle,
  Loader2,
  X,
  Bell,
  Mail,
  Smartphone,
  Send,
  Activity,
  Check,
  Radio,
  Copy
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    data,
    adminUser,
    adminLogin,
    adminLogout,
    updateEnquiryStatus,
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
    setSelectedArticle
  } = useApp();

  // Authentication State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('mnx2026');
  const [authError, setAuthError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  // Active Admin Sub-Section
  const [activeAdminTab, setActiveAdminTab] = useState<
    'enquiries' | 'articles' | 'projects' | 'services' | 'founder' | 'announcements' | 'contacts' | 'settings' | 'automation'
  >('enquiries');

  // Enquiries Management State
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('All');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState<EnquiryStatus>('New');

  // Article Modal State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<EducationalArticle>>({
    title: '',
    category: 'JAMB Updates',
    isOfficialAnnouncement: true,
    officialSource: 'Joint Admissions and Matriculation Board (JAMB)',
    officialSourceUrl: '',
    readTime: '4 min read',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: ['Admissions', '2026', 'Guidelines']
  });

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'Educational Technology & Software',
    description: '',
    image: '',
    status: 'Active / Live',
    externalUrl: '',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    impactMetric: ''
  });

  // Founder Profile State
  const [founderForm, setFounderForm] = useState(data.founder);
  const [founderSaved, setFounderSaved] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState(data.settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Automation & Multi-Channel Dispatch State
  const [automationForm, setAutomationForm] = useState<AutomationSettings>(
    data.settings?.automation || {
      autoNotifyAdmin: true,
      notifyEmail: 'idrismohamed2521@gmail.com',
      enableEmailAlerts: true,
      notifyWhatsAppNumber: '+234 812 345 6789',
      enableWhatsAppAlerts: true,
      whatsAppGatewayProvider: 'callmebot',
      whatsAppApiKey: '',
      customWebhookUrl: ''
    }
  );
  const [automationSaved, setAutomationSaved] = useState(false);
  const [testingDispatch, setTestingDispatch] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Success Feedback Messages
  const [articleSavedMessage, setArticleSavedMessage] = useState('');
  const [projectSavedMessage, setProjectSavedMessage] = useState('');
  const [globalSuccessMessage, setGlobalSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Keep forms synchronized with live AppContext data
  React.useEffect(() => {
    setFounderForm(data.founder);
  }, [data.founder]);

  React.useEffect(() => {
    setSettingsForm(data.settings);
  }, [data.settings]);

  React.useEffect(() => {
    if (data.settings?.automation) {
      setAutomationForm(data.settings.automation);
    }
  }, [data.settings?.automation]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthenticating(true);
    const res = await adminLogin(username.trim(), password.trim());
    if (!res.success) {
      setAuthError(res.message || 'Authentication failed.');
    }
    setAuthenticating(false);
  };

  // 1. If not authenticated, render Login Gate
  if (!adminUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B1B3D] text-white p-6 text-center border-b border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">MNX DIGITAL TEAM SOLUTIONS Admin Gateway</h1>
            <p className="text-xs text-slate-300 mt-1">
              Secure Central Content Management & Automated Dispatch Desk
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Administrator Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Access Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold block">Evaluation Credentials:</span>
              Username: <code className="font-mono bg-white px-1 rounded">admin</code> · Passcode: <code className="font-mono bg-white px-1 rounded">mnx2026</code>
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-md transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {authenticating ? 'Verifying Credentials...' : 'Authenticate & Open Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Enquiries filtering
  const filteredEnquiries = data.enquiries.filter((enq) => {
    const matchStatus = enquiryStatusFilter === 'All' || enq.status === enquiryStatusFilter;
    const query = enquirySearch.toLowerCase();
    const matchQuery = 
      !query ||
      enq.referenceNumber.toLowerCase().includes(query) ||
      enq.fullName.toLowerCase().includes(query) ||
      enq.serviceCategory.toLowerCase().includes(query) ||
      enq.subject.toLowerCase().includes(query);
    return matchStatus && matchQuery;
  });

  // Handle Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.content) return;

    setIsSaving(true);
    try {
      if (editingArticleId) {
        await updateArticle(editingArticleId, articleForm);
        const msg = `Successfully saved! "${articleForm.title}" is updated and live on the front page.`;
        setArticleSavedMessage(msg);
        setGlobalSuccessMessage(msg);
      } else {
        await createArticle(articleForm);
        const msg = `Successfully saved! "${articleForm.title}" is published and live on the front page.`;
        setArticleSavedMessage(msg);
        setGlobalSuccessMessage(msg);
      }
      setTimeout(() => setArticleSavedMessage(''), 5000);
      setTimeout(() => setGlobalSuccessMessage(''), 5000);
      setArticleModalOpen(false);
      setEditingArticleId(null);
    } finally {
      setIsSaving(false);
    }
  };

  // Open Edit Article
  const handleEditArticle = (art: EducationalArticle) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      isOfficialAnnouncement: art.isOfficialAnnouncement,
      officialSource: art.officialSource,
      officialSourceUrl: art.officialSourceUrl,
      readTime: art.readTime,
      excerpt: art.excerpt,
      content: art.content,
      featuredImage: art.featuredImage,
      tags: art.tags
    });
    setArticleModalOpen(true);
  };

  // Handle Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    setIsSaving(true);
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, projectForm);
        const msg = `Successfully saved! "${projectForm.title}" is updated and live on the front page.`;
        setProjectSavedMessage(msg);
        setGlobalSuccessMessage(msg);
      } else {
        await createProject(projectForm);
        const msg = `Successfully saved! "${projectForm.title}" is created and live on the front page.`;
        setProjectSavedMessage(msg);
        setGlobalSuccessMessage(msg);
      }
      setTimeout(() => setProjectSavedMessage(''), 5000);
      setTimeout(() => setGlobalSuccessMessage(''), 5000);
      setProjectModalOpen(false);
      setEditingProjectId(null);
    } finally {
      setIsSaving(false);
    }
  };

  // Open Edit Project
  const handleEditProject = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      image: proj.image,
      status: proj.status,
      externalUrl: proj.externalUrl,
      technologies: proj.technologies,
      impactMetric: proj.impactMetric
    });
    setProjectModalOpen(true);
  };

  // Save Founder
  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateFounder(founderForm);
      setFounderSaved(true);
      setGlobalSuccessMessage('Successfully saved! Founder profile and executive photo updated.');
      setTimeout(() => setFounderSaved(false), 4000);
      setTimeout(() => setGlobalSuccessMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(settingsForm);
      setSettingsSaved(true);
      setGlobalSuccessMessage('Successfully saved! Website announcements, hero banner, SEO & contact settings updated.');
      setTimeout(() => setSettingsSaved(false), 4000);
      setTimeout(() => setGlobalSuccessMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Save Automation Settings
  const handleSaveAutomation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAutomationSettings(automationForm);
      setAutomationSaved(true);
      setGlobalSuccessMessage('Successfully saved! Automated email & WhatsApp dispatch preferences are live.');
      setTimeout(() => setAutomationSaved(false), 4000);
      setTimeout(() => setGlobalSuccessMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger Multi-Channel Test Dispatch
  const handleTestDispatch = async () => {
    setTestingDispatch(true);
    setTestResult(null);
    try {
      const res = await testNotificationDispatch('Live test alert from MNX DIGITAL TEAM SOLUTIONS automated dispatch engine.');
      setTestResult({
        success: res.success,
        message: res.message || 'Automated multi-channel test alert dispatched successfully.'
      });
      setGlobalSuccessMessage('Test notification dispatched! Check your email inbox, WhatsApp, and the live dispatch log table.');
      setTimeout(() => setGlobalSuccessMessage(''), 5000);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to dispatch test notification.'
      });
    } finally {
      setTestingDispatch(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16 relative">
      
      {/* Global Success Notification Toast */}
      {globalSuccessMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#07101E] text-white px-5 py-3.5 rounded-xl shadow-2xl border-2 border-emerald-400 animate-in slide-in-from-top-3 duration-200 max-w-md"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Successfully saved</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              {globalSuccessMessage}
            </p>
          </div>
          <button
            onClick={() => setGlobalSuccessMessage('')}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Top Navigation */}
      <div className="bg-[#0B1B3D] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs tracking-wider">
              MNX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">MNX Central Management</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                  {adminUser.role}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Logged in: {adminUser.name} ({adminUser.username})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await resetToInitialData();
                setArticleSavedMessage('Official MNX database seed restored.');
                setTimeout(() => setArticleSavedMessage(''), 4000);
              }}
              className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Restore Initial Seed"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Seed</span>
            </button>

            <button
              onClick={adminLogout}
              className="text-xs text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Sub-Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveAdminTab('enquiries')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'enquiries'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultancy Enquiries ({data.enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('articles')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'articles'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Educational Publications ({data.articles.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('projects')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'projects'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects & Portfolio ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('services')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'services'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>8 Departments ({data.services.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('founder')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'founder'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Founder Profile</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('announcements')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'announcements'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Announcements & Brand</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('contacts')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'contacts'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact Submissions ({data.contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'settings'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>SEO & Registry</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('automation')}
            className={`py-3 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'automation'
                ? 'border-amber-400 text-amber-300 font-bold bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated Alerts (Email & WhatsApp)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Gateway Active" />
          </button>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= SECTION 1: CONSULTANCY ENQUIRIES ================= */}
        {activeAdminTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Consultancy Enquiries Management</h2>
                <p className="text-xs text-slate-500">
                  Review incoming requests, update workflow statuses, add internal notes, or reply on WhatsApp.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'New', 'Under Review', 'In Progress', 'Resolved', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnquiryStatusFilter(st)}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      enquiryStatusFilter === st
                        ? 'bg-[#0B1B3D] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ref number, applicant name, or category..."
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Mobile View: Cards */}
            <div className="block sm:hidden space-y-3">
              {filteredEnquiries.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
                  No enquiries found matching criteria.
                </div>
              ) : (
                filteredEnquiries.map((enq) => (
                  <div key={enq.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900 text-xs">{enq.referenceNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        enq.status === 'Resolved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : enq.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : enq.status === 'Under Review' 
                          ? 'bg-amber-100 text-amber-800' 
                          : enq.status === 'Closed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 text-xs block">{enq.fullName}</span>
                      <span className="text-[11px] text-slate-500 font-mono block">{enq.whatsappNumber}</span>
                    </div>
                    <div className="text-[11px] text-amber-700 font-medium">
                      {enq.serviceCategory}
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-2">
                      {enq.subject}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{enq.submittedAt}</span>
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setEditingStatus(enq.status);
                          setEditingNotes(enq.adminNotes || '');
                        }}
                        className="px-3 py-1 bg-[#0B1B3D] hover:bg-slate-800 text-amber-300 rounded text-xs font-semibold cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop View: Full Table */}
            <div className="hidden sm:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref Number</th>
                      <th className="py-3 px-4">Applicant / WhatsApp</th>
                      <th className="py-3 px-4">Department Category</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No enquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {enq.referenceNumber}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold block text-slate-900">{enq.fullName}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{enq.whatsappNumber}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-700">
                            {enq.serviceCategory}
                          </td>
                          <td className="py-3 px-4 text-slate-800 max-w-xs truncate" title={enq.subject}>
                            {enq.subject}
                          </td>
                          <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                            {enq.submittedAt}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              enq.status === 'Resolved' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : enq.status === 'In Progress' 
                                ? 'bg-blue-100 text-blue-800' 
                                : enq.status === 'Under Review' 
                                ? 'bg-amber-100 text-amber-800' 
                                : enq.status === 'Closed'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setEditingStatus(enq.status);
                                setEditingNotes(enq.adminNotes || '');
                              }}
                              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-medium cursor-pointer transition-colors"
                            >
                              Manage Request
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Enquiry Detail Drawer / Modal */}
            {selectedEnquiry && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-800">
                  <div className="bg-[#0B1B3D] text-white p-5 flex items-center justify-between">
                    <div>
                      <span className="text-amber-400 font-mono text-xs font-bold block">
                        {selectedEnquiry.referenceNumber}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {selectedEnquiry.subject}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                    
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Applicant Name</span>
                        <span className="font-semibold text-slate-900 text-sm">{selectedEnquiry.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp / Phone</span>
                        <span className="font-semibold text-slate-900 text-sm font-mono">{selectedEnquiry.whatsappNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                        <span className="text-slate-700">{selectedEnquiry.email || 'None Provided'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Service Category</span>
                        <span className="font-semibold text-amber-700">{selectedEnquiry.serviceCategory}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Detailed Description of Request</span>
                      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed text-slate-800 whitespace-pre-wrap">
                        {selectedEnquiry.description}
                      </div>
                    </div>

                    {/* Status updater */}
                    <div className="pt-2 border-t border-slate-200">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Update Request Status
                      </label>
                      <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value as EnquiryStatus)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Advisor Notes */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Internal Advisor Notes (Visible to applicant during status tracking)
                      </label>
                      <textarea
                        rows={3}
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add progress note or next steps for this applicant..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                  </div>

                  <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <a
                      href={`https://wa.me/${selectedEnquiry.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.fullName)},%20this%20is%20MNX%20DIGITAL%20TEAM%20SOLUTIONS%20Consultancy%20Desk%20regarding%20your%20request%20ref:%20${selectedEnquiry.referenceNumber}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedEnquiry(null)}
                        className="px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await updateEnquiryStatus(selectedEnquiry.id, editingStatus, editingNotes);
                          setSelectedEnquiry(null);
                        }}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs cursor-pointer"
                      >
                        Save Status & Notes
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 2: EDUCATIONAL PUBLICATIONS ================= */}
        {activeAdminTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Educational Publications Manager</h2>
                <p className="text-xs text-slate-500">
                  Publish, modify, or remove educational admission updates, statutory bulletins, and guidance.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setArticleForm({
                    title: '',
                    category: 'JAMB Updates',
                    isOfficialAnnouncement: true,
                    officialSource: 'Joint Admissions and Matriculation Board (JAMB)',
                    officialSourceUrl: 'https://jamb.gov.ng',
                    readTime: '4 min read',
                    excerpt: '',
                    content: '',
                    featuredImage: '',
                    tags: ['Admissions', '2026']
                  });
                  setArticleModalOpen(true);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            </div>

            {articleSavedMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{articleSavedMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles.map((art) => (
                <div key={art.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-amber-700">{art.category}</span>
                      <span>{art.publishDate}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {art.excerpt}
                    </p>
                    <div className="pt-2 text-[11px] text-slate-400">
                      {art.isOfficialAnnouncement ? (
                        <span className="text-amber-800 font-medium">✓ Verified: {art.officialSource}</span>
                      ) : (
                        <span>General Advisory Guide</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditArticle(art)}
                        className="p-1.5 text-slate-600 hover:text-amber-700 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          await deleteArticle(art.id);
                          setArticleSavedMessage(`Article "${art.title}" removed.`);
                          setTimeout(() => setArticleSavedMessage(''), 4000);
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-100 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Article Create/Edit Modal */}
            {articleModalOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-800 my-8">
                  <div className="bg-[#0B1B3D] text-white p-5 flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {editingArticleId ? 'Edit Educational Publication' : 'Create New Educational Publication'}
                    </h3>
                    <button onClick={() => setArticleModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Category *</label>
                        <select
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="JAMB Updates">JAMB Updates</option>
                          <option value="University Admissions">University Admissions</option>
                          <option value="Polytechnic Admissions">Polytechnic Admissions</option>
                          <option value="College of Education Admissions">College of Education Admissions</option>
                          <option value="Post-UTME and Screening">Post-UTME and Screening</option>
                          <option value="Admission Requirements">Admission Requirements</option>
                          <option value="Registration Guidelines">Registration Guidelines</option>
                          <option value="Scholarships and Opportunities">Scholarships and Opportunities</option>
                          <option value="Academic Announcements">Academic Announcements</option>
                          <option value="Educational News">Educational News</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Read Time</label>
                        <input
                          type="text"
                          value={articleForm.readTime}
                          onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-900">
                        <input
                          type="checkbox"
                          checked={articleForm.isOfficialAnnouncement}
                          onChange={(e) => setArticleForm({ ...articleForm, isOfficialAnnouncement: e.target.checked })}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span>Verified Statutory Announcement (Checked against official regulatory gazette)</span>
                      </label>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Official Source</label>
                          <input
                            type="text"
                            value={articleForm.officialSource}
                            onChange={(e) => setArticleForm({ ...articleForm, officialSource: e.target.value })}
                            placeholder="e.g. JAMB Official Bulletin"
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Official Source URL</label>
                          <input
                            type="url"
                            value={articleForm.officialSourceUrl}
                            onChange={(e) => setArticleForm({ ...articleForm, officialSourceUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Summary / Excerpt *</label>
                      <textarea
                        rows={2}
                        required
                        value={articleForm.excerpt}
                        onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Full Article Content (Markdown supported) *</label>
                      <textarea
                        rows={8}
                        required
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                        placeholder="Write article content using ### Headings, bullet points - , and **bold**..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        label="Article Featured Image"
                        aspectRatioLabel="Upload photo from device gallery or camera"
                        currentImage={articleForm.featuredImage}
                        onImageSelected={(img) => setArticleForm({ ...articleForm, featuredImage: img })}
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setArticleModalOpen(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        <span>
                          {isSaving 
                            ? 'Saving...' 
                            : (editingArticleId ? 'Save Changes' : 'Publish Publication')}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 3: PROJECTS ================= */}
        {activeAdminTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Projects & Digital Platforms</h2>
                <p className="text-xs text-slate-500">
                  Manage showcased initiatives, CBT engines, school software, and e-commerce platforms.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProjectId(null);
                  setProjectForm({
                    title: '',
                    category: 'Educational Technology & Software',
                    description: '',
                    image: '',
                    status: 'Active / Live',
                    externalUrl: '',
                    technologies: ['React', 'Express', 'Tailwind CSS'],
                    impactMetric: ''
                  });
                  setProjectModalOpen(true);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {projectSavedMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{projectSavedMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-amber-600 uppercase block">{proj.category}</span>
                      <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.impactMetric && (
                    <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                      <strong>Impact:</strong> {proj.impactMetric}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-[11px] font-mono text-slate-400">
                      {proj.technologies.join(', ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProject(proj)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await deleteProject(proj.id);
                          setProjectSavedMessage(`Project "${proj.title}" removed.`);
                          setTimeout(() => setProjectSavedMessage(''), 4000);
                        }}
                        className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Modal */}
            {projectModalOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden text-slate-800 my-8">
                  <div className="bg-[#0B1B3D] text-white p-5 flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {editingProjectId ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <button onClick={() => setProjectModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="p-6 space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Project Name *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Category</label>
                        <input
                          type="text"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Status</label>
                        <select
                          value={projectForm.status}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        >
                          <option value="Active / Live">Active / Live</option>
                          <option value="Completed">Completed</option>
                          <option value="Under Development">Under Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Description *</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Impact Metric</label>
                      <input
                        type="text"
                        placeholder="e.g. Over 8,500 practice exams completed with 99.8% uptime."
                        value={projectForm.impactMetric}
                        onChange={(e) => setProjectForm({ ...projectForm, impactMetric: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        label="Project Screenshot / Preview Image"
                        aspectRatioLabel="Upload photo from device gallery or camera"
                        currentImage={projectForm.image}
                        onImageSelected={(img) => setProjectForm({ ...projectForm, image: img })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">External Link</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={projectForm.externalUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, externalUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setProjectModalOpen(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        <span>{isSaving ? 'Saving...' : (editingProjectId ? 'Save Changes' : 'Save Project')}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 4: 8 DEPARTMENTS ================= */}
        {activeAdminTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Business Departments & Services Manager</h2>
              <p className="text-xs text-slate-500">
                Update departmental descriptions, scopes of deliverables, and client groups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((svc) => (
                <div key={svc.id} className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-600">
                      Dept {svc.departmentCode} · {svc.categoryName}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                      {svc.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{svc.title}</h3>
                  <p className="text-xs text-slate-600 italic">"{svc.tagline}"</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{svc.description}</p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Features:</span>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                      {svc.features.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 5: FOUNDER PROFILE ================= */}
        {activeAdminTab === 'founder' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Founder Profile Editor</h2>
              <p className="text-xs text-slate-500">
                Update Isaiah (MNX DIGITAL TEAM SOLUTIONS)'s biography, title, expertise, and social channels.
              </p>
            </div>

            {founderSaved && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-lg font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Successfully saved! Founder profile and executive photo updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveFounder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Name</label>
                  <input
                    type="text"
                    value={founderForm.name}
                    onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Title</label>
                  <input
                    type="text"
                    value={founderForm.title}
                    onChange={(e) => setFounderForm({ ...founderForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  value={founderForm.shortBio}
                  onChange={(e) => setFounderForm({ ...founderForm, shortBio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Full Biography</label>
                <textarea
                  rows={5}
                  value={founderForm.fullBiography}
                  onChange={(e) => setFounderForm({ ...founderForm, fullBiography: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Professional Background</label>
                <textarea
                  rows={3}
                  value={founderForm.professionalBackground}
                  onChange={(e) => setFounderForm({ ...founderForm, professionalBackground: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">WhatsApp Link</label>
                  <input
                    type="url"
                    value={founderForm.socialLinks.whatsapp}
                    onChange={(e) => setFounderForm({ ...founderForm, socialLinks: { ...founderForm.socialLinks, whatsapp: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Facebook Link</label>
                  <input
                    type="url"
                    value={founderForm.socialLinks.facebook}
                    onChange={(e) => setFounderForm({ ...founderForm, socialLinks: { ...founderForm.socialLinks, facebook: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Founder Executive Portrait"
                  aspectRatioLabel="Square 1:1 portrait photo"
                  currentImage={founderForm.founderImage}
                  onImageSelected={(img) => setFounderForm({ ...founderForm, founderImage: img })}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all shadow-xs"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving...' : 'Save Founder Profile'}</span>
                </button>

                {founderSaved && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-2 rounded-md shadow-xs animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Successfully saved</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ================= SECTION 6: ANNOUNCEMENTS & BRAND ================= */}
        {activeAdminTab === 'announcements' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Website Announcements & Brand Identity</h2>
              <p className="text-xs text-slate-500">
                Manage top announcement bulletin ticker, brand slogans, and positioning statements.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-lg font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Successfully saved! Website announcements, hero banner, and brand identity updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-900">
                  <input
                    type="checkbox"
                    checked={settingsForm.announcementBanner.enabled}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      announcementBanner: { ...settingsForm.announcementBanner, enabled: e.target.checked }
                    })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Display Top Official Bulletin Ticker</span>
                </label>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Bulletin Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementBanner.text}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      announcementBanner: { ...settingsForm.announcementBanner, text: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Official Brand Slogan</label>
                <input
                  type="text"
                  value={settingsForm.brandSlogan}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandSlogan: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Brand Positioning Statement</label>
                <input
                  type="text"
                  value={settingsForm.brandPositioning}
                  onChange={(e) => setSettingsForm({ ...settingsForm, brandPositioning: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <ImageUploader
                  label="Official Company Logo (Header & Footer)"
                  aspectRatioLabel="Recommended: Transparent PNG, SVG, or WebP logo icon or wordmark"
                  currentImage={settingsForm.logoUrl || ''}
                  onImageSelected={(img) => setSettingsForm({
                    ...settingsForm,
                    logoUrl: img
                  })}
                />
              </div>

              <div>
                <ImageUploader
                  label="Front Page Hero Banner Image (Optional)"
                  aspectRatioLabel="Upload custom photo or banner from device gallery"
                  currentImage={settingsForm.hero?.heroImage || ''}
                  onImageSelected={(img) => setSettingsForm({
                    ...settingsForm,
                    hero: { ...settingsForm.hero, heroImage: img }
                  })}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all shadow-xs"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>

                {settingsSaved && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-2 rounded-md shadow-xs animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Successfully saved</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ================= SECTION 7: CONTACT SUBMISSIONS ================= */}
        {activeAdminTab === 'contacts' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">General Contact Submissions</h2>
              <p className="text-xs text-slate-500">
                Messages received from website visitors via the Contact Us form.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100">
                {data.contacts.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No contact submissions recorded.
                  </div>
                ) : (
                  data.contacts.map((cnt) => (
                    <div key={cnt.id} className="p-5 hover:bg-slate-50 transition-colors space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{cnt.name}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-mono text-slate-600">{cnt.phone}</span>
                          {cnt.email && (
                            <>
                              <span className="text-slate-400">·</span>
                              <span className="text-slate-500">{cnt.email}</span>
                            </>
                          )}
                        </div>
                        <span className="text-slate-400 text-[11px]">{cnt.createdAt}</span>
                      </div>

                      <div className="font-semibold text-slate-800">
                        {cnt.subject}
                      </div>

                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                        {cnt.message}
                      </p>

                      <div className="pt-1 flex items-center gap-3">
                        <a
                          href={`https://wa.me/${cnt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cnt.name)},%20this%20is%20MNX%20DIGITAL%20TEAM%20SOLUTIONS%20responding%20to%20your%20website%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>
                        <button
                          onClick={() => markContactRead(cnt.id, !cnt.isRead)}
                          className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                        >
                          {cnt.isRead ? 'Mark as Unread' : 'Mark as Addressed'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 8: SEO & SITE SETTINGS ================= */}
        {activeAdminTab === 'settings' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">SEO & Official Contact Settings</h2>
              <p className="text-xs text-slate-500">
                Configure search engine title tags, meta descriptions, and official telephone numbers.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-lg font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Successfully saved! SEO title tag, meta descriptions, and official contacts updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={settingsForm.seoMeta.siteTitle}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    seoMeta: { ...settingsForm.seoMeta, siteTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={settingsForm.seoMeta.metaDescription}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    seoMeta: { ...settingsForm.seoMeta, metaDescription: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Official Telephone</label>
                  <input
                    type="text"
                    value={settingsForm.contactDetails.phone}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      contactDetails: { ...settingsForm.contactDetails, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Official WhatsApp</label>
                  <input
                    type="text"
                    value={settingsForm.contactDetails.whatsapp}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      contactDetails: { ...settingsForm.contactDetails, whatsapp: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Corporate Address</label>
                <input
                  type="text"
                  value={settingsForm.contactDetails.address}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    contactDetails: { ...settingsForm.contactDetails, address: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all shadow-xs"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
                </button>

                {settingsSaved && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-2 rounded-md shadow-xs animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Successfully saved</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ================= SECTION 9: AUTOMATED ALERTS (EMAIL & WHATSAPP) ================= */}
        {activeAdminTab === 'automation' && (
          <div className="space-y-8 max-w-4xl">
            
            {/* Header & Concept Explainer Card */}
            <div className="bg-[#0B1B3D] text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 mb-2">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real-Time Multi-Channel Routing</span>
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-white">
                    Automated Website Dispatch Engine
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
                    Every request submitted on the website (consultancy requests, admission support, quote requests, and contact messages) is automatically dispatched to all three channels simultaneously:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTestDispatch}
                  disabled={testingDispatch}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {testingDispatch ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching Test...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Instant Test Alert</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3-Channel Live Flow Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>1. Admin Panel</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Instant database log, unread counters, reference tracking, and internal notes.
                  </p>
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono">
                    ● Status: Always Active
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>2. Direct Email</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Full request breakdown automatically sent to your executive email inbox.
                  </p>
                  <span className="inline-block mt-1 text-[10px] text-slate-300 font-mono truncate">
                    Target: {automationForm.notifyEmail || 'idrismohamed2521@gmail.com'}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>3. Background WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Direct server message to your phone <strong>without opening WhatsApp to send</strong>.
                  </p>
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono truncate">
                    Number: {automationForm.notifyWhatsAppNumber || '+234 812 345 6789'}
                  </span>
                </div>
              </div>

              {testResult && (
                <div className={`p-3.5 rounded-lg border text-xs flex items-center justify-between gap-3 animate-in fade-in ${
                  testResult.success 
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200' 
                    : 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{testResult.message}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Checked just now
                  </span>
                </div>
              )}
            </div>

            {/* Automation Preferences Form */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Notification Channels & Gateway Settings</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set the destination email address and phone number where automated alerts are delivered.
                </p>
              </div>

              {automationSaved && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-lg font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>Successfully saved! Notification destinations and background gateway configured.</span>
                </div>
              )}

              <form onSubmit={handleSaveAutomation} className="space-y-6 text-xs">
                
                {/* 1. Email Notifications Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-600" />
                      <span className="font-bold text-slate-900 text-sm">Automated Email Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={automationForm.enableEmailAlerts}
                        onChange={(e) => setAutomationForm({
                          ...automationForm,
                          enableEmailAlerts: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      <span className="ml-2 text-xs font-medium text-slate-700">
                        {automationForm.enableEmailAlerts ? 'Active' : 'Disabled'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                      Recipient Email Address
                    </label>
                    <input
                      type="email"
                      value={automationForm.notifyEmail}
                      onChange={(e) => setAutomationForm({
                        ...automationForm,
                        notifyEmail: e.target.value
                      })}
                      placeholder="idrismohamed2521@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:border-amber-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Every enquiry and contact submission sends an executive alert to this email address.
                    </p>
                  </div>
                </div>

                {/* 2. WhatsApp Background Gateway Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900 text-sm">Background WhatsApp API Gateway</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={automationForm.enableWhatsAppAlerts}
                        onChange={(e) => setAutomationForm({
                          ...automationForm,
                          enableWhatsAppAlerts: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      <span className="ml-2 text-xs font-medium text-slate-700">
                        {automationForm.enableWhatsAppAlerts ? 'Active' : 'Disabled'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                      Your WhatsApp Telephone Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={automationForm.notifyWhatsAppNumber}
                      onChange={(e) => setAutomationForm({
                        ...automationForm,
                        notifyWhatsAppNumber: e.target.value
                      })}
                      placeholder="+234 812 345 6789"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:border-amber-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Example: <span className="font-mono text-slate-700">+2348123456789</span>. This is where WhatsApp messages are delivered automatically.
                    </p>
                  </div>

                  {/* Provider Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase">
                      Automated Background Delivery Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div 
                        onClick={() => setAutomationForm({ ...automationForm, whatsAppGatewayProvider: 'callmebot' })}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          automationForm.whatsAppGatewayProvider === 'callmebot'
                            ? 'bg-amber-50 border-amber-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs">CallMeBot Free WhatsApp API</span>
                          {automationForm.whatsAppGatewayProvider === 'callmebot' && (
                            <Check className="w-3.5 h-3.5 text-amber-600" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Free direct WhatsApp messenger API. Sends messages in the background in seconds.
                        </p>
                      </div>

                      <div 
                        onClick={() => setAutomationForm({ ...automationForm, whatsAppGatewayProvider: 'webhook' })}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          automationForm.whatsAppGatewayProvider === 'webhook'
                            ? 'bg-amber-50 border-amber-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs">Custom Webhook / Twilio / Meta</span>
                          {automationForm.whatsAppGatewayProvider === 'webhook' && (
                            <Check className="w-3.5 h-3.5 text-amber-600" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Connect any external webhook endpoint (Zapier, Make, n8n, Twilio, or Meta Cloud API).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CallMeBot API Key & 30-Second Guide */}
                  {automationForm.whatsAppGatewayProvider === 'callmebot' && (
                    <div className="space-y-3 pt-2">
                      <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-lg text-slate-800 space-y-1.5">
                        <span className="font-bold text-amber-900 text-[11px] block uppercase tracking-wider">
                          How CallMeBot sends WhatsApp messages automatically (30-second setup):
                        </span>
                        <ol className="list-decimal list-inside text-[11px] text-slate-700 space-y-1 leading-relaxed">
                          <li>Save the official CallMeBot WhatsApp number <strong>+34 644 44 44 11</strong> in your phone's contacts as "CallMeBot".</li>
                          <li>Open WhatsApp and send this text to it: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono font-bold text-slate-900">I allow callmebot to send me messages</code></li>
                          <li>CallMeBot will instantly reply with your free personal API key.</li>
                          <li>Paste your API key into the field below and click <strong>"Save Automation Settings"</strong>!</li>
                        </ol>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                          CallMeBot WhatsApp API Key
                        </label>
                        <input
                          type="text"
                          value={automationForm.whatsAppApiKey || ''}
                          onChange={(e) => setAutomationForm({
                            ...automationForm,
                            whatsAppApiKey: e.target.value
                          })}
                          placeholder="e.g. 1234567"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:border-amber-500 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* Custom Webhook URL */}
                  {automationForm.whatsAppGatewayProvider === 'webhook' && (
                    <div className="space-y-2 pt-2">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Custom Webhook URL
                      </label>
                      <input
                        type="url"
                        value={automationForm.customWebhookUrl || ''}
                        onChange={(e) => setAutomationForm({
                          ...automationForm,
                          customWebhookUrl: e.target.value
                        })}
                        placeholder="https://hooks.zapier.com/hooks/catch/... or https://api.twilio.com/..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:border-amber-500 focus:outline-hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all shadow-xs"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{isSaving ? 'Saving...' : 'Save Automation Settings'}</span>
                  </button>

                  {automationSaved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-2 rounded-md shadow-xs animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Successfully saved</span>
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Live Multi-Channel Notification Logs */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Live Multi-Channel Delivery Logs ({data.notificationLogs?.length || 0})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Audit trail of recent requests dispatched to Admin Panel, Email, and WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTestDispatch}
                  disabled={testingDispatch}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3 text-amber-500" />
                  <span>Test New Event</span>
                </button>
              </div>

              {(!data.notificationLogs || data.notificationLogs.length === 0) ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-xs text-slate-500">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <span>No automated alerts logged yet. Submit a message on the Contact or Consultancy page or click "Send Instant Test Alert" above to verify.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 text-[10px] uppercase tracking-wider font-bold">
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Type / Ref</th>
                        <th className="py-2.5 px-3">Sender</th>
                        <th className="py-2.5 px-3">Admin Panel</th>
                        <th className="py-2.5 px-3">Email Inbox</th>
                        <th className="py-2.5 px-3">WhatsApp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.notificationLogs.slice(0, 15).map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-semibold text-slate-900 block font-mono text-[11px]">
                              {log.referenceOrSubject}
                            </span>
                            <span className="text-[10px] text-slate-400 capitalize">
                              {log.type} request
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-medium text-slate-800 block">
                              {log.senderName}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {log.senderPhone}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Logged</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                              log.channels.email.status === 'sent'
                                ? 'text-sky-700 bg-sky-50 border-sky-200'
                                : 'text-slate-600 bg-slate-100 border-slate-200'
                            }`}>
                              <Mail className="w-3 h-3 text-sky-600" />
                              <span className="truncate max-w-[120px]">{log.channels.email.recipient}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                              log.channels.whatsApp.status === 'sent'
                                ? 'text-emerald-800 bg-emerald-100 border-emerald-300'
                                : 'text-amber-800 bg-amber-50 border-amber-200'
                            }`}>
                              <Smartphone className="w-3 h-3 text-emerald-600" />
                              <span>Auto-Dispatched</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
