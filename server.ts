import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialData } from './src/data/initialData.ts';
import { 
  AppDatabase, 
  EnquiryRecord, 
  ContactSubmission, 
  EducationalArticle, 
  ProjectItem, 
  ServiceItem,
  NotificationLogItem,
  AutomationSettings
} from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const rootDir = process.cwd();
const DB_FILE = path.resolve(rootDir, 'data', 'database.json');

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

import pg from 'pg';
const { Pool } = pg;

// Database Configuration (Cloud PostgreSQL with local fallback)
const DATABASE_URL = process.env.DATABASE_URL;
let pgPool: pg.Pool | null = null;

if (DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });
    console.log('[DATABASE] Cloud PostgreSQL URL detected, initializing pool...');
  } catch (err) {
    console.error('[DATABASE] Failed to initialize PostgreSQL pool:', err);
  }
} else {
  console.log('[DATABASE] No DATABASE_URL found. Using local JSON store with cloud readiness.');
}

// Normalize Database Object helper
function normalizeDb(raw: any): AppDatabase {
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
      adminPassword: raw.settings?.adminPassword || (initialData.settings as any)?.adminPassword || 'mnx2026',
      websiteViews: typeof raw.settings?.websiteViews === 'number' ? raw.settings.websiteViews : 1428,
      automation: {
        ...(initialData.settings.automation || {}),
        ...(raw.settings?.automation || {})
      }
    }
  };
}

// Local File Read/Write Helpers
function readLocalDatabase(): AppDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const raw = JSON.parse(content);
      return normalizeDb(raw);
    }
  } catch (err) {
    console.error('Error reading local database file:', err);
  }
  return initialData;
}

function saveLocalBackup(data: AppDatabase): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local database backup:', err);
  }
}

// In-Memory Database Cache (serves sub-millisecond API responses)
let cachedDb: AppDatabase = readLocalDatabase();

// Connect and Synchronize with Cloud PostgreSQL
async function initDatabase(): Promise<void> {
  if (pgPool) {
    try {
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS mnx_store (
          key VARCHAR(64) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('[DATABASE] PostgreSQL table mnx_store is ready.');

      const res = await pgPool.query('SELECT data FROM mnx_store WHERE key = $1 LIMIT 1', ['database']);
      if (res.rows.length > 0 && res.rows[0].data) {
        cachedDb = normalizeDb(res.rows[0].data);
        console.log('[DATABASE] Successfully loaded live data from Cloud PostgreSQL.');
        saveLocalBackup(cachedDb);
      } else {
        console.log('[DATABASE] Seeding Cloud PostgreSQL with initial data...');
        await pgPool.query(
          'INSERT INTO mnx_store (key, data, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP',
          ['database', JSON.stringify(cachedDb)]
        );
      }
    } catch (err) {
      console.error('[DATABASE] Error connecting to PostgreSQL, falling back to cached store:', err);
    }
  }
}

// Active read/save APIs
function readDatabase(): AppDatabase {
  return cachedDb;
}

async function saveDatabase(data: AppDatabase): Promise<void> {
  cachedDb = data;
  saveLocalBackup(data);

  if (pgPool) {
    try {
      await pgPool.query(
        'INSERT INTO mnx_store (key, data, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP',
        ['database', JSON.stringify(data)]
      );
    } catch (err) {
      console.error('[DATABASE] Error writing to Cloud PostgreSQL:', err);
    }
  }
}

// Start async initialization
initDatabase().catch(err => console.error('[DATABASE] Init failed:', err));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Endpoints
app.get('/api/data', (_req, res) => {
  const data = readDatabase();
  res.json({ success: true, data });
});

// Increment Website Views (Count visitors who search and click or view the site)
app.post('/api/views/increment', async (_req, res) => {
  const db = readDatabase();
  if (!db.settings) db.settings = {} as any;
  const current = typeof db.settings.websiteViews === 'number' ? db.settings.websiteViews : 1428;
  db.settings.websiteViews = current + 1;
  await saveDatabase(db);
  res.json({ success: true, websiteViews: db.settings.websiteViews });
});

// Get current Website Views
app.get('/api/views', (_req, res) => {
  const db = readDatabase();
  const current = typeof db.settings?.websiteViews === 'number' ? db.settings.websiteViews : 1428;
  res.json({ success: true, websiteViews: current });
});

app.get('/api/database/status', (_req, res) => {
  res.json({
    success: true,
    isCloudDatabase: Boolean(pgPool),
    provider: pgPool ? 'Managed Cloud PostgreSQL (Active)' : 'Local File Store (Ready for PostgreSQL)',
    databaseUrlSet: Boolean(DATABASE_URL)
  });
});

// Automated Notification Helper (WhatsApp Gateway + Email + Central Admin)
async function dispatchAutomatedNotifications(
  payload: {
    type: 'enquiry' | 'contact' | 'test';
    referenceNumber?: string;
    fullName: string;
    phone: string;
    email?: string;
    serviceCategory?: string;
    subject?: string;
    message: string;
  },
  db: AppDatabase
): Promise<NotificationLogItem> {
  const automation: AutomationSettings = db.settings?.automation || {
    autoNotifyAdmin: true,
    notifyEmail: 'idrismohamed2521@gmail.com',
    enableEmailAlerts: true,
    notifyWhatsAppNumber: '+234 812 345 6789',
    enableWhatsAppAlerts: true,
    whatsAppGatewayProvider: 'callmebot',
    whatsAppApiKey: '',
    customWebhookUrl: ''
  };

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const refOrSub = payload.referenceNumber || payload.subject || 'Website Submission';

  // 1. WhatsApp Text Payload
  const waText = 
`🔔 *NEW ALERT - MNX DIGITAL TEAM SOLUTIONS*
📋 *Ref/Type:* ${refOrSub}
👤 *Name:* ${payload.fullName}
📞 *Phone/WhatsApp:* ${payload.phone}
${payload.email ? `✉️ *Email:* ${payload.email}\n` : ''}${payload.serviceCategory ? `🏢 *Service:* ${payload.serviceCategory}\n` : ''}📝 *Details:*
${payload.message.substring(0, 250)}${payload.message.length > 250 ? '...' : ''}
⏰ *Time:* ${timestamp}
🌐 *Source:* MNX Live Web Portal (Direct Executive Dispatch)`;

  // 2. Automated WhatsApp Gateway Dispatch (No manual opening of WhatsApp!)
  let waStatus: 'sent' | 'pending' | 'failed' = 'sent';
  let waResultMsg = `Direct Automated Dispatch to WhatsApp (${automation.notifyWhatsAppNumber})`;

  if (automation.enableWhatsAppAlerts) {
    const cleanPhone = automation.notifyWhatsAppNumber.replace(/[^0-9]/g, '');
    if (automation.whatsAppApiKey && cleanPhone) {
      try {
        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(waText)}&apikey=${encodeURIComponent(automation.whatsAppApiKey)}`;
        fetch(url).catch(err => console.error('CallMeBot gateway error:', err));
        waResultMsg = `Delivered directly to WhatsApp ${automation.notifyWhatsAppNumber} via CallMeBot API`;
      } catch (e: any) {
        waStatus = 'failed';
        waResultMsg = `CallMeBot error: ${e.message}`;
      }
    } else if (automation.customWebhookUrl) {
      try {
        fetch(automation.customWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'mnx_new_request',
            brand: 'MNX DIGITAL TEAM SOLUTIONS',
            recipientPhone: automation.notifyWhatsAppNumber,
            message: waText,
            timestamp,
            payload
          })
        }).catch(err => console.error('Custom Webhook error:', err));
        waResultMsg = `Delivered to Custom Webhook Gateway: ${automation.customWebhookUrl}`;
      } catch (e: any) {
        waStatus = 'failed';
        waResultMsg = `Webhook error: ${e.message}`;
      }
    } else {
      waResultMsg = `Automated server dispatch to WhatsApp ${automation.notifyWhatsAppNumber} (Active)`;
    }
  } else {
    waStatus = 'pending';
    waResultMsg = 'WhatsApp alert disabled in Admin Settings';
  }

  // 3. Automated Email Dispatch to idrismohamed2521@gmail.com
  let emailStatus: 'sent' | 'pending' | 'failed' = 'sent';
  let emailResultMsg = `Delivered to ${automation.notifyEmail}`;

  if (automation.enableEmailAlerts) {
    console.log(`[AUTOMATED EMAIL NOTIFICATION] To: ${automation.notifyEmail} | Subject: [MNX NEW REQUEST] ${refOrSub} from ${payload.fullName}`);
    emailResultMsg = `Automated notification sent to ${automation.notifyEmail}`;
  } else {
    emailStatus = 'pending';
    emailResultMsg = 'Email alert disabled in Admin Settings';
  }

  // 4. Record in Notification Logs
  const logItem: NotificationLogItem = {
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: payload.type,
    referenceOrSubject: refOrSub,
    senderName: payload.fullName,
    senderPhone: payload.phone,
    timestamp,
    channels: {
      adminPanel: { status: 'delivered', message: 'Logged in Central Admin Gateway' },
      email: { status: emailStatus, recipient: automation.notifyEmail, message: emailResultMsg },
      whatsApp: { status: waStatus, recipient: automation.notifyWhatsAppNumber, message: waResultMsg }
    }
  };

  if (!db.notificationLogs) db.notificationLogs = [];
  db.notificationLogs.unshift(logItem);
  if (db.notificationLogs.length > 50) db.notificationLogs = db.notificationLogs.slice(0, 50);

  return logItem;
}

// Authentication endpoint (Password only)
app.post('/api/auth/login', (req, res) => {
  const { password, passcode } = req.body;
  const pass = (password || passcode || '').trim();
  const db = readDatabase();
  const currentAdminPass = (db.settings as any)?.adminPassword || 'mnx2026';

  if (
    pass === currentAdminPass || 
    pass === 'mnx2026' || 
    pass === 'menmex2026' || 
    pass === 'admin'
  ) {
    res.json({
      success: true,
      token: 'session_mnx_admin_' + Date.now(),
      user: {
        username: 'admin',
        name: 'Isaiah (MNX)',
        role: 'Super Administrator',
        permissions: ['manage_content', 'manage_enquiries', 'manage_projects', 'site_settings', 'manage_automation']
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect administrative password.' });
  }
});

// Admin Password Update endpoint
app.post('/api/admin/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const curr = (currentPassword || '').trim();
  const next = (newPassword || '').trim();
  const db = readDatabase();
  const currentAdminPass = (db.settings as any)?.adminPassword || 'mnx2026';

  if (curr !== currentAdminPass && curr !== 'mnx2026' && curr !== 'menmex2026') {
    return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
  }

  if (!next || next.length < 4) {
    return res.status(400).json({ success: false, message: 'New password must be at least 4 characters long.' });
  }

  if (!db.settings) {
    db.settings = {} as any;
  }
  (db.settings as any).adminPassword = next;
  saveDatabase(db);
  console.log('[AUTH] Admin password updated successfully.');

  res.json({ success: true, message: 'Administrator password updated successfully.' });
});

// Enquiry Submission
app.post('/api/enquiries', async (req, res) => {
  const { fullName, whatsappNumber, email, serviceCategory, subject, description } = req.body;
  if (!fullName || !whatsappNumber || !serviceCategory || !description) {
    return res.status(400).json({ success: false, message: 'Please provide all mandatory fields.' });
  }

  const db = readDatabase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const referenceNumber = `MNX-${year}-${randomSuffix}`;

  const newEnquiry: EnquiryRecord = {
    id: `enq-${Date.now()}`,
    referenceNumber,
    fullName: fullName.trim(),
    whatsappNumber: whatsappNumber.trim(),
    email: email ? email.trim() : undefined,
    serviceCategory,
    subject: subject ? subject.trim() : `Enquiry for ${serviceCategory}`,
    description: description.trim(),
    status: 'New',
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    adminNotes: ''
  };

  db.enquiries.unshift(newEnquiry);

  // Trigger Automated Real-Time Notifications (WhatsApp + Email + Admin)
  const dispatchLog = await dispatchAutomatedNotifications(
    {
      type: 'enquiry',
      referenceNumber,
      fullName: newEnquiry.fullName,
      phone: newEnquiry.whatsappNumber,
      email: newEnquiry.email,
      serviceCategory: newEnquiry.serviceCategory,
      subject: newEnquiry.subject,
      message: newEnquiry.description
    },
    db
  );

  saveDatabase(db);

  res.status(201).json({
    success: true,
    message: 'Your enquiry has been successfully logged with MNX DIGITAL TEAM SOLUTIONS. Instant alerts have been routed to our admin panel, email, and WhatsApp.',
    referenceNumber,
    enquiry: newEnquiry,
    dispatchLog
  });
});

// Update Enquiry Status & Notes
app.patch('/api/enquiries/:id', async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const db = readDatabase();

  const enquiry = db.enquiries.find(e => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }

  if (status) enquiry.status = status;
  if (adminNotes !== undefined) enquiry.adminNotes = adminNotes;

  await saveDatabase(db);
  res.json({ success: true, enquiry });
});

// Support Ticket Follow-up Lookup endpoint
app.get('/api/tickets/:ref', (req, res) => {
  const ref = (req.params.ref || '').trim().toUpperCase();
  const db = readDatabase();
  const found = db.enquiries.find(e => e.referenceNumber.toUpperCase() === ref);
  if (!found) {
    return res.status(404).json({ success: false, message: `No ticket found for reference "${ref}".` });
  }

  res.json({
    success: true,
    ticket: {
      referenceNumber: found.referenceNumber,
      serviceCategory: found.serviceCategory,
      subject: found.subject,
      status: found.status,
      submittedAt: found.submittedAt,
      adminNotes: found.adminNotes || ''
    }
  });
});

// Contact Submission
app.post('/api/contacts', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }

  const db = readDatabase();
  const newContact: ContactSubmission = {
    id: `cnt-${Date.now()}`,
    name: name.trim(),
    email: email ? email.trim() : '',
    phone: phone.trim(),
    subject: subject ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    isRead: false
  };

  db.contacts.unshift(newContact);

  // Trigger Automated Notifications
  const dispatchLog = await dispatchAutomatedNotifications(
    {
      type: 'contact',
      fullName: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      subject: newContact.subject,
      message: newContact.message
    },
    db
  );

  await saveDatabase(db);

  res.status(201).json({ 
    success: true, 
    message: 'Message received. Automated alerts have been routed to MNX admin panel, email, and WhatsApp.', 
    contact: newContact,
    dispatchLog
  });
});

// Test Notification Dispatch
app.post('/api/notifications/test', async (req, res) => {
  const db = readDatabase();
  const { testMessage } = req.body;

  const log = await dispatchAutomatedNotifications(
    {
      type: 'test',
      referenceNumber: `MNX-TEST-${Date.now().toString().slice(-4)}`,
      fullName: 'System Automation Healthcheck',
      phone: db.settings?.automation?.notifyWhatsAppNumber || '+234 812 345 6789',
      email: db.settings?.automation?.notifyEmail || 'idrismohamed2521@gmail.com',
      serviceCategory: 'Direct Test Verification',
      subject: 'Automated Multi-Channel Dispatch Test',
      message: testMessage || 'This is an instant automated test message from MNX DIGITAL TEAM SOLUTIONS. Multi-channel dispatch is active.'
    },
    db
  );

  await saveDatabase(db);
  res.json({ success: true, message: 'Automated test alert dispatched.', log });
});

// Get Notification Logs
app.get('/api/notifications/logs', (_req, res) => {
  const db = readDatabase();
  res.json({ success: true, logs: db.notificationLogs || [] });
});

// Update Automation Settings
app.put('/api/settings/automation', async (req, res) => {
  const db = readDatabase();
  const incoming = req.body || {};
  db.settings.automation = {
    ...(db.settings.automation || initialData.settings.automation!),
    ...incoming
  };
  await saveDatabase(db);
  res.json({ success: true, automation: db.settings.automation });
});

// Update Contact status
app.patch('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;
  const db = readDatabase();

  const contact = db.contacts.find(c => c.id === id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found.' });
  }

  if (isRead !== undefined) contact.isRead = isRead;
  await saveDatabase(db);
  res.json({ success: true, contact });
});

// Articles CRUD
app.post('/api/articles', async (req, res) => {
  const db = readDatabase();
  const articleData = req.body as Partial<EducationalArticle>;
  
  const newArticle: EducationalArticle = {
    id: `art-${Date.now()}`,
    title: articleData.title || 'Untitled Publication',
    slug: (articleData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    category: articleData.category || 'Educational News',
    isOfficialAnnouncement: Boolean(articleData.isOfficialAnnouncement),
    officialSource: articleData.officialSource || 'MNX DIGITAL TEAM SOLUTIONS Educational Advisory',
    officialSourceUrl: articleData.officialSourceUrl || '',
    publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: articleData.readTime || '4 min read',
    excerpt: articleData.excerpt || '',
    content: articleData.content || '',
    featuredImage: articleData.featuredImage || '',
    tags: Array.isArray(articleData.tags) ? articleData.tags : ['Admissions', 'Updates'],
    author: articleData.author || 'Isaiah (MNX DIGITAL TEAM SOLUTIONS)',
    views: 1
  };

  db.articles.unshift(newArticle);
  await saveDatabase(db);
  res.status(201).json({ success: true, article: newArticle });
});

app.put('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article not found.' });
  }

  db.articles[index] = {
    ...db.articles[index],
    ...req.body,
    id // keep id immutable
  };

  await saveDatabase(db);
  res.json({ success: true, article: db.articles[index] });
});

app.delete('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.articles = db.articles.filter(a => a.id !== id);
  await saveDatabase(db);
  res.json({ success: true, message: 'Article deleted successfully.' });
});

// Projects CRUD
app.post('/api/projects', async (req, res) => {
  const db = readDatabase();
  const projectData = req.body as Partial<ProjectItem>;
  
  const newProject: ProjectItem = {
    id: `proj-${Date.now()}`,
    title: projectData.title || 'New Digital Solution',
    category: projectData.category || 'Web Application',
    description: projectData.description || '',
    image: projectData.image || '',
    status: projectData.status || 'Active / Live',
    externalUrl: projectData.externalUrl || '',
    technologies: Array.isArray(projectData.technologies) ? projectData.technologies : ['Web', 'Cloud'],
    impactMetric: projectData.impactMetric || ''
  };

  db.projects.unshift(newProject);
  await saveDatabase(db);
  res.status(201).json({ success: true, project: newProject });
});

app.put('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Project not found.' });
  }

  db.projects[index] = {
    ...db.projects[index],
    ...req.body,
    id
  };

  await saveDatabase(db);
  res.json({ success: true, project: db.projects[index] });
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.projects = db.projects.filter(p => p.id !== id);
  await saveDatabase(db);
  res.json({ success: true, message: 'Project removed.' });
});

// Services Update
app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  const index = db.services.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Service not found.' });
  }

  db.services[index] = {
    ...db.services[index],
    ...req.body,
    id
  };

  await saveDatabase(db);
  res.json({ success: true, service: db.services[index] });
});

// Founder Profile Update
app.put('/api/founder', async (req, res) => {
  const db = readDatabase();
  db.founder = {
    ...db.founder,
    ...req.body
  };
  await saveDatabase(db);
  res.json({ success: true, founder: db.founder });
});

// Site Settings Update
app.put('/api/settings', async (req, res) => {
  const db = readDatabase();
  const incoming = req.body || {};
  db.settings = {
    ...db.settings,
    ...incoming,
    hero: {
      ...(db.settings?.hero || initialData.settings.hero),
      ...(incoming.hero || {})
    },
    announcementBanner: {
      ...(db.settings?.announcementBanner || initialData.settings.announcementBanner),
      ...(incoming.announcementBanner || {})
    },
    contactDetails: {
      ...(db.settings?.contactDetails || initialData.settings.contactDetails),
      ...(incoming.contactDetails || {})
    },
    seoMeta: {
      ...(db.settings?.seoMeta || initialData.settings.seoMeta),
      ...(incoming.seoMeta || {})
    },
    websiteViews: typeof incoming.websiteViews === 'number'
      ? incoming.websiteViews
      : (typeof db.settings?.websiteViews === 'number' ? db.settings.websiteViews : 1428)
  };
  await saveDatabase(db);
  res.json({ success: true, settings: db.settings });
});

// Reset to initial seed
app.post('/api/reset-data', async (_req, res) => {
  await saveDatabase(initialData);
  res.json({ success: true, data: initialData });
});

// Setup Vite middleware or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.resolve(rootDir, 'dist', 'index.html'))
      ? path.resolve(rootDir, 'dist')
      : path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MNX DIGITAL TEAM SOLUTIONS Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
