import { useState } from 'react';
import { motion } from 'motion/react';
import { Car, Building2, Phone, ArrowRight, Shield, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SignInFormProps {
  profileType: 'driver' | 'business';
  onSignIn: (phoneNumber: string) => void;
  onBack: () => void;
}

export default function SignInForm({ profileType, onSignIn, onBack }: SignInFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('+34 600 123 456');

  const profileConfig = {
    driver: {
      title: 'Iniciar Sesión Driver',
      subtitle: 'Acceso Rápido para Conductores',
      icon: Car,
      gradient: 'from-blue-600 to-cyan-600',
      description: 'Inicia sesión de forma segura con tu número de teléfono'
    },
    business: {
      title: 'Iniciar Sesión Business',
      subtitle: 'Acceso Rápido para Empresas',
      icon: Building2,
      gradient: 'from-purple-600 to-pink-600',
      description: 'Inicia sesión de forma segura con tu número de teléfono'
    }
  };

  const config = profileConfig[profileType];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the phone number to the handler
    onSignIn(phoneNumber);
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-2xl`}>
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{config.title}</h1>
            <p className="text-blue-200">{config.subtitle}</p>
            <p className="text-gray-300 text-sm mt-2">{config.description}</p>
          </motion.div>

          {/* Sign In Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl" />
            
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">Número de Teléfono</Label>
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
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-blue-200 text-xs leading-relaxed">
                        <p className="font-medium mb-1">Verificación Silenciosa</p>
                        <p>Tu identidad se verificará automáticamente con Telefónica Open Gateway sin necesidad de códigos SMS.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white py-3 rounded-xl border-2 border-white/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <motion.span
                    className="flex items-center justify-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Iniciar Sesión
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              Volver al Registro
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