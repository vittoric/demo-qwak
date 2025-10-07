import { motion } from 'motion/react';
import { 
  Shield, 
  Zap, 
  BarChart3, 
  Settings, 
  Network, 
  Bell,
  Search,
  User,
  LogOut,
  ChevronRight,
  Home,
  Lock,
  Activity,
  Globe,
  Bot
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onAiAgentToggle?: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, onAiAgentToggle }: SidebarProps) {
  const navigationItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: Home,
      notifications: 0,
      description: 'Vista general del sistema'
    },
    {
      id: 'security',
      label: 'Centro de Seguridad',
      icon: Shield,
      notifications: 3,
      description: 'Detección de fraudes y amenazas'
    },
    {
      id: 'apis',
      label: 'APIs Gateway',
      icon: Zap,
      notifications: 1,
      description: 'Gestión de APIs de Telefónica'
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: BarChart3,
      notifications: 0,
      description: 'Métricas y reportes'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      notifications: 0,
      description: 'Ajustes del sistema'
    }
  ];

  const quickActions = [
    { label: 'Red en vivo', icon: Activity, color: 'text-green-500' },
    { label: 'APIs activas', icon: Globe, color: 'text-blue-500' },
    { label: 'Alertas', icon: Bell, color: 'text-orange-500' }
  ];

  return (
    <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Qwak</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Security Platform</p>
          </div>
        </motion.div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Status Indicators */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <action.icon className={`w-5 h-5 mx-auto mb-1 ${action.color}`} />
              <p className="text-xs text-slate-600 dark:text-slate-300">{action.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <h3 className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-4">
          Navegación Principal
        </h3>
        
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.notifications > 0 && (
                    <Badge variant="destructive" className="text-xs px-2 py-0.5">
                      {item.notifications}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      <Separator />

      {/* AI Agent Button */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onAiAgentToggle}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105 h-auto p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium">AI Agent</p>
                <p className="text-xs opacity-80">Asistente virtual 24/7</p>
              </div>
            </div>
          </Button>
        </motion.div>
      </div>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900 dark:text-white">Demo User</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Administrador</p>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <LogOut className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Status */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-600 dark:text-slate-300">Sistema operativo</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400">v2.1.0</span>
        </div>
      </div>
    </div>
  );
}