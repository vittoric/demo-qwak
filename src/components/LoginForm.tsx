import { useState } from 'react';
import { motion } from 'motion/react';
import { Car, Building2, User, Mail, Phone, ArrowRight, Shield, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginFormProps {
  profileType: 'driver' | 'business';
  onLogin: () => void;
  onGoToSignIn: () => void;
  onBack: () => void;
}

export default function LoginForm({ profileType, onLogin, onGoToSignIn, onBack }: LoginFormProps) {
  const [companyName, setCompanyName] = useState('Global Cargo Express');
  const [firstName, setFirstName] = useState(profileType === 'business' ? 'Ana' : 'Carlos');
  const [lastName, setLastName] = useState(profileType === 'business' ? 'García' : 'Rodríguez');
  const [email, setEmail] = useState(profileType === 'business' ? 'ana.garcia@globalcargo.es' : 'carlos.rodriguez@email.com');
  const [phoneNumber, setPhoneNumber] = useState('+34 600 123 456');

  const profileConfig = {
    driver: {
      title: 'Registro Driver',
      subtitle: 'Registro para Conductores',
      icon: Car,
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Regístrate para acceder a tus funciones de seguridad personal'
    },
    business: {
      title: 'Registro Business',
      subtitle: 'Registro para Empresas',
      icon: Building2,
      gradient: 'from-purple-600 to-pink-600',
      description: 'Regístrate para acceder al panel completo de administración y análisis'
    }
  };

  const config = profileConfig[profileType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration process
    onLogin();
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#2D2D2D'}}>
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      {/* Animated Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating particles for extra ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-2xl`}>
              <config.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{config.title}</h1>
            <p className="text-blue-200 text-sm sm:text-base">{config.subtitle}</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 px-2">{config.description}</p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl" />
            
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Company Name Field - Only for Business */}
                {profileType === 'business' && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white">Nombre de Empresa</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Global Cargo Express"
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* First Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    {profileType === 'business' ? 'Nombre Responsable' : 'Nombre'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={profileType === 'business' ? 'Ana' : 'Carlos'}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                      required
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    {profileType === 'business' ? 'Apellido Responsable' : 'Apellido'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={profileType === 'business' ? 'García' : 'Rodríguez'}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    {profileType === 'business' ? 'Email Empresa' : 'Email'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={profileType === 'business' ? 'ana.garcia@globalcargo.es' : 'carlos.rodriguez@email.com'}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">Número de Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+34 600 123 456"
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                      required
                    />
                  </div>
                  <p className="text-blue-300 text-xs mt-1">
                    * Requerido para verificación de identidad con Telefónica Open Gateway
                  </p>
                </div>



                {/* Register Button */}
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white py-3 sm:py-4 rounded-xl border-2 border-white/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <motion.span
                    className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Registrarse y Verificar
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                </Button>
              </form>
              
              {/* Login Option */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">¿Ya tienes una cuenta?</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onGoToSignIn}
                  className="w-full bg-white/5 border-white/30 text-white hover:bg-white/10 py-2 sm:py-3 text-sm sm:text-base"
                >
                  Iniciar Sesión con Número de Teléfono
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-4 sm:mt-6"
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            >
              Volver a Selección de Perfil
            </Button>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-300">Verificación Segura con las APIs de Open Gateway</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}