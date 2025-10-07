import { motion } from 'motion/react';
import { Car, Building2, ArrowRight, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProfileSelectionProps {
  onSelectProfile: (profile: 'driver' | 'business') => void;
  onBack: () => void;
}

export default function ProfileSelection({ onSelectProfile, onBack }: ProfileSelectionProps) {
  const profiles = [
    {
      id: 'driver' as const,
      title: 'Driver',
      subtitle: 'Conductores y Usuarios Móviles',
      description: 'Accede a funciones de seguridad personal, verificación de identidad y protección durante tus viajes.',
      icon: Car,
      features: [
        'Verificación de identidad en tiempo real',
        'Detección de fraudes',
        'Protección de datos personales',
        'Alertas de seguridad móvil'
      ],
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'business' as const,
      title: 'Business',
      subtitle: 'Empresas y Organizaciones',
      description: 'Centro de Control Unificado: Logística, Seguridad y Rendimiento. Un panel completo que te da el poder de:',
      icon: Building2,
      features: [
        'Visibilidad de la Flota y Operaciones',
        'Reporte de Confianza de Perfiles Validados',
        'Detección de Riesgos en Tiempo Real',
        'Informes de Rendimiento y Planificacion Avanzada'
      ],
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#2D2D2D'}}>
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      {/* Simplified Animated Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${10 + Math.floor(i / 6) * 15}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Elige tu <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Perfil</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto px-2">
            Selecciona el tipo de acceso que mejor se adapte a tus necesidades en la plataforma Qwak
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl w-full min-h-[400px]">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              
              <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border h-full flex flex-col ${
                profile.id === 'driver' 
                  ? 'border-blue-400/50 shadow-2xl shadow-blue-500/30 bg-gradient-to-br from-white/15 to-white/5 hover:border-blue-400/70 hover:shadow-blue-500/40' 
                  : 'border-pink-400/50 shadow-2xl shadow-pink-500/30 bg-gradient-to-br from-white/15 to-white/5 hover:border-pink-400/70 hover:shadow-pink-500/40'
              } transition-all duration-300`}>
                {/* Icon and Title */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${profile.gradient} flex items-center justify-center shadow-lg ${
                    profile.id === 'driver' ? 'ring-2 ring-blue-400/50' : 'ring-2 ring-pink-400/50'
                  }`}>
                    <profile.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{profile.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-blue-200">{profile.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {profile.description}
                </p>

                {/* Features */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                  {profile.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => onSelectProfile(profile.id)}
                  className={`w-full bg-gradient-to-r ${profile.gradient} text-white py-3 sm:py-4 rounded-xl border-2 ${
                    profile.id === 'driver' 
                      ? 'border-blue-400 shadow-2xl shadow-blue-500/50 ring-2 ring-blue-400/30 hover:shadow-blue-500/60 hover:ring-blue-400/50' 
                      : 'border-pink-400/50 shadow-2xl shadow-pink-500/50 ring-2 ring-pink-400/30 hover:shadow-pink-500/60 hover:ring-pink-400/50'
                  } shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:opacity-95`}
                >
                  <motion.span
                    className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Seleccionar {profile.title}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-10 lg:mt-12"
        >
          <Button
            variant="outline"
            onClick={onBack}
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            Volver al Inicio
          </Button>
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 sm:mt-8 px-4"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-300 text-center">
              Verificación Segura con las APIs de Open Gateway
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}