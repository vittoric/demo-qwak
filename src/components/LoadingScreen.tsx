import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Phone, CheckCircle, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number; // Duration in milliseconds
}

export default function LoadingScreen({ onComplete, duration = 4000 }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  const isQuickLoad = duration <= 2000;
  
  const loadingSteps = isQuickLoad ? [
    { id: 1, text: 'Verificando número de teléfono...', delay: 0 },
    { id: 2, text: 'Conectando con las APIs de Open Gateway...', delay: 0.7 }
  ] : [
    { id: 1, text: 'Conectando con las APIs de Open Gateway...', delay: 0 },
    { id: 2, text: 'Verificando número de teléfono...', delay: 1.2 },
    { id: 3, text: 'Validando identidad del usuario...', delay: 2.4 },
    { id: 4, text: 'Configurando tu perfil...', delay: 3.2 }
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${20 + (i % 5) * 20}%`,
              top: `${20 + Math.floor(i / 5) * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Simplified Network Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
          {/* Simple Network Nodes */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={50 + (i % 3) * 150}
              cy={75 + Math.floor(i / 3) * 150}
              r="6"
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {/* Main Loading Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{backgroundColor: '#2D2D2D'}}>
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Verificando Identidad
            </h1>
            <p className="text-blue-200">
              Procesando tu información
            </p>
          </motion.div>

          {/* Loading Steps */}
          <div className="space-y-4 mb-8">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay }}
                className="flex items-center gap-3 text-left"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.2 }}
                  className="flex-shrink-0"
                >
                  {step.delay <= (isQuickLoad ? 0.7 : 3.2) ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </motion.div>
                <span className="text-gray-300 text-sm">{step.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
              <motion.div
                className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* API Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <Phone className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">
              Con la Potencia de Telefónica Open Gateway APIs
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}