import { motion } from 'motion/react';
import { ArrowRight, Shield, Phone, CheckCircle, Clock, UserCheck } from 'lucide-react';
import { Button } from './ui/button';


interface SignInExplanationProps {
  onComplete: () => void;
}

export default function SignInExplanation({ onComplete }: SignInExplanationProps) {
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">¡Autenticación Exitosa!</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Tu identidad ha sido verificada de forma silenciosa utilizando la tecnología{' '}
              <span className="text-blue-400 font-medium">Open Gateway</span>
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="flex justify-center">
            {/* Explanation Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl w-full"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Proceso de Verificación Silenciosa</h2>
                
                <div className="space-y-4">
                  {/* Step 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Number Verification API</h3>
                      <p className="text-gray-300 text-sm">Tu número de teléfono se verifica automáticamente a través de la red</p>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Autenticación segura y rápida</h3>
                      <p className="text-gray-300 text-sm">Sin necesidades de otras aplicaciones de terceros</p>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Acceso Inmediato</h3>
                      <p className="text-gray-300 text-sm">Validación instantánea y acceso inmediato al dashboard</p>
                    </div>
                  </motion.div>
                </div>

                {/* Benefits Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 font-medium text-sm">Ventajas del Sistema</span>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Sin fricción en la experiencia de usuario</li>
                    <li>• Mayor seguridad que métodos tradicionales</li>
                    <li>• Reducción de fraude y suplantación de identidad</li>
                    <li>• Cumplimiento con estándares de telecomunicaciones</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={onComplete}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-lg rounded-full border-2 border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            >
              <motion.span
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Acceder al Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Protegido por Telefónica Open Gateway</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}