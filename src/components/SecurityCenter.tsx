import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, Phone, Eye, AlertCircle, Globe } from 'lucide-react';

// Datos estáticos para el Monitor de Seguridad de Flota
const fleetSecurityData = [
  {
    id: 1,
    truckId: 'TPC-1045',
    status: 'verified',
    title: 'Verificado ✅',
    subtitle: 'Integridad OK',
    details: 'SIM Estable | Conductor Verificado | Sistema Activo',
    action: 'Ver Detalles',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  {
    id: 2,
    truckId: 'TPC-1077',
    status: 'verified',
    title: 'Verificado ✅',
    subtitle: 'Integridad OK',
    details: 'SIM Estable | Conductor Verificado | Sistema Activo',
    action: 'Ver Detalles',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  {
    id: 3,
    truckId: 'TPC-1022',
    status: 'critical',
    title: '🚨 INTERCAMBIO DE SIM DETECTADO 🚨',
    subtitle: 'ALERTA CRÍTICA',
    details: 'SIM Swap API | Bloqueo Remoto Pendiente',
    action: 'Revisar Incidente',
    bgColor: 'bg-gradient-to-r from-red-50 to-red-100',
    borderColor: 'border-red-300',
    textColor: 'text-red-900',
    buttonColor: 'bg-red-600 hover:bg-red-700'
  },
  {
    id: 4,
    truckId: 'TPC-1089',
    status: 'verified',
    title: 'Verificado ✅',
    subtitle: 'Integridad OK',
    details: 'SIM Estable | Conductor Verificado | Sistema Activo',
    action: 'Ver Detalles',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  {
    id: 5,
    truckId: 'TPC-1060',
    status: 'warning',
    title: '⚠️ REQUIERE VERIFICACIÓN DE CONDUCTOR ⚠️',
    subtitle: 'RIESGO PENDIENTE',
    details: 'KYC Match API | Pendiente de validación al inicio de ruta',
    action: 'Validar Ahora',
    bgColor: 'bg-gradient-to-r from-amber-50 to-orange-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-900',
    buttonColor: 'bg-amber-600 hover:bg-amber-700'
  },
  {
    id: 6,
    truckId: 'TPC-9905',
    status: 'international',
    title: '🌍 LLEGADA VERIFICADA: España',
    subtitle: 'INTERNACIONAL',
    details: 'Roaming Status API: Confirmado en país de destino',
    action: 'Ver Detalles',
    bgColor: 'bg-gradient-to-r from-cyan-50 to-sky-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-800',
    buttonColor: 'bg-cyan-600 hover:bg-cyan-700'
  }
];

// Componente de Loading Dots
const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <div className="flex space-x-1">
        <motion.div
          className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div
          className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.2
          }}
        />
        <motion.div
          className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.4
          }}
        />
      </div>
      <span className="text-gray-600 text-sm ml-3">Cargando más assets...</span>
    </div>
  );
};

// Componente de Card de Monitoreo
interface MonitoringCardProps {
  truck: typeof fleetSecurityData[0];
  index: number;
}

const MonitoringCard = ({ truck, index }: MonitoringCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'contact':
        return <Phone className="w-5 h-5 text-blue-600" />;
      case 'international':
        return <Globe className="w-5 h-5 text-cyan-600" />;
      default:
        return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${truck.bgColor} ${truck.borderColor} border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
    >
      {/* Header con ID del camión */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon(truck.status)}
          <span className="font-bold text-gray-900 text-sm sm:text-base">{truck.truckId}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          truck.status === 'verified' ? 'bg-green-100 text-green-800' :
          truck.status === 'critical' ? 'bg-red-100 text-red-800' :
          truck.status === 'warning' ? 'bg-amber-100 text-amber-800' :
          truck.status === 'international' ? 'bg-cyan-100 text-cyan-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {truck.subtitle}
        </div>
      </div>

      {/* Mensaje principal */}
      <div className="mb-3">
        <h3 className={`${truck.textColor} font-bold text-sm sm:text-base mb-1`}>
          {truck.title}
        </h3>
      </div>

      {/* Detalles */}
      <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-relaxed">
        {truck.details}
      </p>

      {/* Botón de acción */}
      <button
        className={`${truck.buttonColor} text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 w-full hover:shadow-md active:scale-95`}
      >
        {truck.action}
      </button>
    </motion.div>
  );
};

export default function SecurityCenter() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
            Centro de Seguridad
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Monitoreo de Integridad de Activos - {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800 font-medium">Monitor en Tiempo Real</span>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-800 font-bold text-lg sm:text-xl">103</span>
          </div>
          <p className="text-green-700 text-xs sm:text-sm">Assets Verificados</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 font-bold text-lg sm:text-xl">3</span>
          </div>
          <p className="text-red-700 text-xs sm:text-sm">Alertas Críticas</p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-amber-800 font-bold text-lg sm:text-xl">9</span>
          </div>
          <p className="text-amber-700 text-xs sm:text-sm">Pendientes</p>
        </div>
        
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-cyan-600" />
            <span className="text-cyan-800 font-bold text-lg sm:text-xl">12</span>
          </div>
          <p className="text-cyan-700 text-xs sm:text-sm">Internacional</p>
        </div>
      </motion.div>

      {/* Grid de Cards de Monitoreo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {fleetSecurityData.map((truck, index) => (
          <MonitoringCard key={truck.id} truck={truck} index={index} />
        ))}
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <LoadingDots />
      </motion.div>
    </div>
  );
}