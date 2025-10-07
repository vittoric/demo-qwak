import { useState } from 'react';
import { motion } from 'motion/react';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import SecurityCenter from './SecurityCenter';
import ApiManagement from './ApiManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import AiAgentChat from './AiAgentChat';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'security':
        return <SecurityCenter />;
      case 'apis':
        return <ApiManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onAiAgentToggle={() => setIsAiChatOpen(true)}
      />
      
      <main className="flex-1 overflow-hidden">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-auto"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* AI Agent Chat */}
      <AiAgentChat 
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />
    </div>
  );
}