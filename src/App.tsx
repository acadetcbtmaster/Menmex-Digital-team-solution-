/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ArticleModal } from './components/ArticleModal.tsx';
import { HomeView } from './views/HomeView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { EducationView } from './views/EducationView.tsx';
import { ProjectsView } from './views/ProjectsView.tsx';
import { ResourcesView } from './views/ResourcesView.tsx';
import { ConsultancyView } from './views/ConsultancyView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { AdminDashboardView } from './views/AdminDashboardView.tsx';
import { MessageCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, data } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView />;
      case 'education':
        return <EducationView />;
      case 'projects':
        return <ProjectsView />;
      case 'resources':
        return <ResourcesView />;
      case 'consultancy':
        return <ConsultancyView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <Header />
      
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Global Article Reading Modal */}
      <ArticleModal />

      {/* Persistent Direct WhatsApp Floating Desk */}
      <aside aria-label="WhatsApp quick contact">
        <a
          href={`https://wa.me/${data.settings.contactDetails.whatsapp.replace(/^0/, '234').replace(/[^0-9]/g, '')}?text=Hello%20MNX%20DIGITAL%20TEAM%20SOLUTIONS,%20I%20am%20reaching%20out%20via%20your%20website%20desk.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer border border-emerald-500/40"
          title="Direct WhatsApp Chat Desk"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-semibold max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            WhatsApp Desk
          </span>
        </a>
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

