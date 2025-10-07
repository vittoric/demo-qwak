import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Shield, 
  Settings, 
  Activity,
  Bell,
  User,
  ChevronRight,
  Plus,

  TrendingUp,
  TrendingDown,
  LogOut,
  HelpCircle,
  HeadphonesIcon,
  Bot,
  History,
  Menu
} from 'lucide-react';
import driverImage from 'figma:asset/4ed83709013d6494c236e0b86363ae2b1f3c4e23.png';
import companyImage from 'figma:asset/5f082b3fdc73796338a0a75dbfc706511069c283.png';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TrackingView from './TrackingView';
import ActivityView from './ActivityView';
import AiAgentChat from './AiAgentChat';
import BusinessDashboard from './BusinessDashboard';
import SecurityCenter from './SecurityCenter';
import PlanningCalendar from './PlanningCalendar';

const allSidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, profiles: ['driver', 'business'] },
  { id: 'actividad', label: 'Actividad', icon: History, profiles: ['driver'] },
  { id: 'tracking', label: 'Tracking', icon: Activity, profiles: ['driver'] },
  { id: 'security', label: 'Centro de Seguridad', icon: Shield, profiles: ['business'] },
  { id: 'integrations', label: 'Planificación', icon: Activity, profiles: ['business'] },
  { id: 'settings', label: 'Configuraciones', icon: Settings, profiles: ['driver', 'business'] },
];

const chartData = [
  { month: 'JAN', performance: 85, safety: 92 },
  { month: 'FEB', performance: 88, safety: 89 },
  { month: 'MAR', performance: 92, safety: 94 },
  { month: 'APR', performance: 90, safety: 91 },
  { month: 'MAY', performance: 94, safety: 96 },
  { month: 'JUN', performance: 89, safety: 88 },
  { month: 'JUL', performance: 91, safety: 93 },
  { month: 'AUG', performance: 87, safety: 90 },
  { month: 'SEP', performance: 93, safety: 95 },
];

interface QwakDashboardProps {
  profileType: 'driver' | 'business';
  onLogout: () => void;
}

export default function QwakDashboard({ profileType, onLogout }: QwakDashboardProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Filter sidebar items based on profile type
  const sidebarItems = allSidebarItems.filter(item => 
    item.profiles.includes(profileType)
  );

  const handleViewTrip = () => {
    setActiveItem('tracking');
  };

  const handleNavigation = (itemId: string) => {
    // Handle all possible navigation items
    const validItems = ['dashboard', 'tracking', 'actividad', 'security', 'integrations', 'settings'];
    
    // Prevent navigation to settings for both driver and business profiles
    if (itemId === 'settings') {
      return; // Don't navigate
    }
    
    if (validItems.includes(itemId)) {
      setActiveItem(itemId);
      setIsMobileMenuOpen(false); // Close mobile menu after selection
    }
  };

  const handleNotificationClick = () => {
    setShowNotification(true);
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };



  const stats = [
    {
      value: '17',
      label: 'Viajes completados',
      change: '+15.2%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      value: '94.7%',
      label: 'Entregas puntuales',
      change: '+2.3%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      value: '136h',
      label: 'Horas de conducción',
      change: '+6.8%',
      trend: 'up',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0" style={{backgroundColor: '#2D2D2D'}}>
              <div className="text-white h-full flex flex-col">
                {/* Mobile Menu Header */}
                <SheetHeader className="p-6 border-b" style={{borderColor: '#404040'}}>
                  <SheetTitle className="flex items-center gap-3 text-white">
                    <span className="text-xl font-bold">QWAK</span>
                    <Badge className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
                      {profileType === 'driver' ? 'Driver' : 'Business'}
                    </Badge>
                  </SheetTitle>
                  <SheetDescription className="text-slate-400">
                    Menú de navegación del dashboard
                  </SheetDescription>
                </SheetHeader>



                {/* Mobile Menu Navigation */}
                <nav className="flex-1 px-4 space-y-2 pt-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      disabled={item.id === 'settings' && profileType === 'driver'}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        item.id === 'settings'
                          ? 'text-slate-500 cursor-default opacity-50'
                          : activeItem === item.id
                            ? 'text-white'
                            : 'text-slate-300 hover:text-white'
                      }`}
                      style={activeItem === item.id ? {backgroundColor: '#404040'} : {}}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Mobile Menu AI Assistant */}
                <div className="px-4 pb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setIsAiChatOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">AI Agent</p>
                          <p className="text-xs opacity-80">Asistente virtual 24/7</p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </div>

                {/* Mobile Menu User Profile */}
                <div className="p-4 border-t" style={{borderColor: '#404040'}}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <img
                          src={profileType === 'business' ? companyImage : driverImage}
                          alt="Carlos Rodríguez"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-white group-hover:text-blue-200">
                            {profileType === 'business' ? 'Global Cargo Express' : 'Carlos Rodríguez'}
                          </div>
                          <div className="text-xs text-slate-400 group-hover:text-slate-300">
                            {profileType === 'business' ? 'Perfil de empresa' : 'Conductor Profesional'}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      side="top"
                      className="w-56 text-white"
                      style={{backgroundColor: '#2D2D2D', borderColor: '#555555'}}
                    >
                      <DropdownMenuItem onClick={onLogout} className="hover:bg-red-600/20 focus:bg-red-600/20 text-red-400 hover:text-red-300 focus:text-red-300">
                        <LogOut className="mr-3 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Title */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">QWAK</span>
            <Badge className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
              {profileType === 'driver' ? 'Driver' : 'Business'}
            </Badge>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleNotificationClick}
              className="relative p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
            </button>
            <img
              src={profileType === 'business' ? companyImage : driverImage}
              alt="Carlos Rodríguez"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 text-white flex-col" style={{backgroundColor: '#2D2D2D'}}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b" style={{borderColor: '#404040'}}>
          <div className="flex items-center gap-3">
            <span className="text-lg lg:text-xl font-bold">QWAK</span>
            <Badge className="ml-2 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
              {profileType === 'driver' ? 'Driver' : 'Business'}
            </Badge>
          </div>
        </div>





        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 pt-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              disabled={item.id === 'settings' && profileType === 'driver'}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                item.id === 'settings'
                  ? 'text-slate-500 cursor-default opacity-50'
                  : activeItem === item.id
                    ? 'text-white cursor-pointer'
                    : 'text-slate-300 hover:text-white cursor-pointer'
              }`}
              style={activeItem === item.id ? {backgroundColor: '#404040'} : {}}
              onMouseEnter={(e) => {
                if (!(item.id === 'settings')) {
                  e.currentTarget.style.backgroundColor = '#404040';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </nav>

        {/* AI Agent Button */}
        <div className="px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">AI Agent</p>
                  <p className="text-xs opacity-80">Asistente virtual 24/7</p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t" style={{borderColor: '#404040'}}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="w-full flex items-center gap-3 rounded-lg p-2 transition-colors group"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <img
                  src={profileType === 'business' ? companyImage : driverImage}
                  alt="Carlos Rodríguez"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-white group-hover:text-blue-200">
                    {profileType === 'business' ? 'Global Cargo Express' : 'Carlos Rodríguez'}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300">
                    {profileType === 'business' ? 'Perfil de empresa' : 'Conductor Profesional'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              side="top"
              className="w-56 text-white"
              style={{backgroundColor: '#2D2D2D', borderColor: '#555555'}}
            >
              <DropdownMenuItem 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <User className="mr-3 h-4 w-4" />
                Ver perfil
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings className="mr-3 h-4 w-4" />
                Configuración de perfil
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Bell className="mr-3 h-4 w-4" />
                Notificaciones
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{backgroundColor: '#555555'}} />
              <DropdownMenuItem 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <HelpCircle className="mr-3 h-4 w-4" />
                Centro de ayuda
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#404040'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <HeadphonesIcon className="mr-3 h-4 w-4" />
                Soporte
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{backgroundColor: '#555555'}} />
              <DropdownMenuItem 
                onClick={onLogout}
                className="hover:bg-red-600/20 focus:bg-red-600/20 text-red-400 hover:text-red-300 focus:text-red-300"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16 lg:pt-0">
        {/* Desktop Header - Hidden on mobile */}
        <header className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {activeItem === 'tracking' ? 'Tracking' : activeItem === 'actividad' ? 'Actividad' : activeItem === 'integrations' ? 'Planificación' : activeItem === 'security' ? 'Centro de Seguridad' : 'Dashboard'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleNotificationClick}
                className="relative p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
              </button>
              <img
                src={profileType === 'business' ? companyImage : driverImage}
                alt="Carlos Rodríguez"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {activeItem === 'tracking' ? (
            <TrackingView />
          ) : activeItem === 'actividad' ? (
            <ActivityView onViewTrip={handleViewTrip} />
          ) : activeItem === 'security' ? (
            <SecurityCenter />
          ) : activeItem === 'integrations' ? (
            <PlanningCalendar />
          ) : activeItem === 'dashboard' && profileType === 'business' ? (
            <BusinessDashboard />
          ) : (
              <>
                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Panel de Control de Conductores</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Métricas y análisis de rendimiento - {new Date().toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                    Últimos 30 días
                  </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className={`flex items-center gap-1 text-xs sm:text-sm ${stat.color}`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Driver Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">85/90 km/h</div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        Óptimo
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">Velocidad Promedio vs Límites</p>
                    <div className="mt-3 bg-white rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">8,245 km</div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-blue-600">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        +12.4%
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">Distancia Total Recorrida</p>
                    <p className="text-xs text-gray-500 mt-1">Este mes: +485 km</p>
                  </motion.div>
                </div>

                {/* Chart Section */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Performance Chart */}
                  <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl sm:text-2xl font-bold text-gray-900">93.2%</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                            +4.1%
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-600 text-xs sm:text-sm">Rendimiento Anual del Conductor - {new Date().getFullYear()}</p>
                          <p className="text-gray-500 text-xs">Evolución mensual del rendimiento y seguridad durante los últimos 12 meses</p>
                        </div>
                      </div>
                      <div className="flex bg-gray-100 rounded-lg p-1">
                        <div className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                          Año {new Date().getFullYear()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-48 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                          />
                          <YAxis 
                            domain={[70, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: 'none',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value, name) => [
                              `${value}%`, 
                              name === 'performance' ? 'Rendimiento' : 'Seguridad'
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="performance"
                            stroke="url(#performanceGradient)"
                            strokeWidth={3}
                            dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, fill: '#2563eb' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="safety"
                            stroke="url(#safetyGradient)"
                            strokeWidth={2}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#10b981' }}
                          />
                          <defs>
                            <linearGradient id="performanceGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#2563eb" />
                              <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                            <linearGradient id="safetyGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-gray-600">Rendimiento del Conductor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-gray-600">Índice de Seguridad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          )}
        </main>
      </div>
      
      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg shadow-2xl border border-white/20 backdrop-blur-lg max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                {profileType === 'business' ? (
                  <>
                    <h3 className="font-semibold text-sm mb-1">INTERCAMBIO DE SIM DETECTADO</h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Se ha detectado un posible intercambio de tarjeta SIM en el <span className="font-medium text-white">Camión #TPC-1022</span>
                    </p>
                    <button
                      onClick={() => {
                        setActiveItem('security');
                        setShowNotification(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="mt-3 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-xs font-medium transition-colors"
                    >
                      Ver detalles
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-sm mb-1">Nueva Ruta Asignada</h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Tienes una ruta asignada para mañana de <span className="font-medium text-white">Madrid a Valencia</span>
                    </p>
                    <p className="text-xs text-blue-200 mt-2">
                      Salida: 08:00 • Duración estimada: 4h 30min
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <span className="text-white text-sm">×</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Agent Chat */}
      <AiAgentChat 
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />
    </div>
  );
}