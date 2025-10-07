import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, KeyRound, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface VerificationErrorProps {
  onRetry: () => void;
  onAlternativeMethod: () => void;
}

export default function VerificationError({ onRetry, onAlternativeMethod }: VerificationErrorProps) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#2D2D2D'}}>
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(239, 68, 68, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      {/* Animated Dots - Error themed */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
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
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">Verificación de Identidad Fallida</h1>
            <p className="text-xl text-red-200 max-w-3xl mx-auto leading-relaxed">
              No pudimos confirmar que el número de teléfono ingresado coincide con la tarjeta SIM activa en este dispositivo.
            </p>
          </motion.div>



          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12 space-y-4"
          >
            {/* Primary Button - Retry */}
            <Button
              size="lg"
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-full border-2 border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] mr-4"
            >
              <motion.span
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <RefreshCw className="w-5 h-5" />
                Reintentar Verificación
              </motion.span>
            </Button>

            {/* Secondary Button - Alternative Method */}
            <Button
              size="lg"
              variant="outline"
              onClick={onAlternativeMethod}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full transform transition-all duration-300 hover:scale-105"
            >
              <motion.span
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <KeyRound className="w-5 h-5" />
                Usar Método de Acceso Alternativo
              </motion.span>
            </Button>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">Verificación Segura con las APIs de Open Gateway</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}