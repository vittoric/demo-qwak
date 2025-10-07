import { motion } from 'motion/react';
import { ArrowRight, Phone, RotateCcw, Truck, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onStartDemo: () => void;
}

export default function HeroSection({ onStartDemo }: HeroSectionProps) {
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

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 lg:p-8">
        {/* Qwak Logo - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-2xl sm:text-3xl font-bold text-white">QWAK</div>
        </motion.div>

        {/* Telefónica Logo - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="145.833" height="35" viewBox="0 0 145.833 35" className="h-6 sm:h-8 w-auto">
            <g id="Grupo_7789" data-name="Grupo 7789" transform="translate(-139 -20)">
              <circle id="Elipse_1" data-name="Elipse 1" cx="5.224" cy="5.224" r="5.224" transform="translate(139 20)" fill="#f2f4ff"></circle>
              <circle id="Elipse_2" data-name="Elipse 2" cx="5.224" cy="5.224" r="5.224" transform="translate(151.274 20)" fill="#f2f4ff"></circle>
              <circle id="Elipse_3" data-name="Elipse 3" cx="5.224" cy="5.224" r="5.224" transform="translate(163.551 20)" fill="#f2f4ff"></circle>
              <circle id="Elipse_4" data-name="Elipse 4" cx="5.224" cy="5.224" r="5.224" transform="translate(151.274 32.275)" fill="#f2f4ff"></circle>
              <circle id="Elipse_5" data-name="Elipse 5" cx="5.224" cy="5.224" r="5.224" transform="translate(151.274 44.553)" fill="#f2f4ff"></circle>
              <path id="Trazado_8219" data-name="Trazado 8219" d="M747.862,495.116H743v-2.9h12.75v2.9h-4.875v13.329h-3.013Z" transform="translate(-562.73 -461.688)" fill="#f2f4ff"></path>
              <path id="Trazado_8220" data-name="Trazado 8220" d="M832.954,529.406a5.516,5.516,0,0,1-5.447,3.709,6.144,6.144,0,0,1,0-12.285,5.766,5.766,0,0,1,5.8,5.911,6.581,6.581,0,0,1-.07.834l-.047.325h-8.808a3.117,3.117,0,0,0,3.13,2.781,2.7,2.7,0,0,0,2.434-1.275ZM830.4,525.93a2.9,2.9,0,0,0-2.9-2.666,3.114,3.114,0,0,0-3.13,2.666Z" transform="translate(-629.764 -486.125)" fill="#f2f4ff"></path>
              <path id="Trazado_8221" data-name="Trazado 8221" d="M914.46,492.22h2.9v16.225h-2.9Z" transform="translate(-709.186 -461.688)" fill="#f2f4ff"></path>
              <path id="Trazado_8222" data-name="Trazado 8222" d="M957.714,529.406a5.516,5.516,0,0,1-5.448,3.709,6.144,6.144,0,0,1,0-12.285,5.765,5.765,0,0,1,5.8,5.911,6.57,6.57,0,0,1-.07.834l-.045.325h-8.81a3.118,3.118,0,0,0,3.13,2.781,2.7,2.7,0,0,0,2.434-1.275Zm-2.551-3.477a2.9,2.9,0,0,0-2.9-2.666,3.116,3.116,0,0,0-3.13,2.666Z" transform="translate(-736.33 -486.125)" fill="#f2f4ff"></path>
              <path id="Trazado_8223" data-name="Trazado 8223" d="M1034.03,498.039h-1.97v-2.781h1.97v-1.74a2.714,2.714,0,0,1,2.9-2.9h2.551v2.551h-1.74a.792.792,0,0,0-.812.811v1.276h2.551v2.781h-2.551v9.042h-2.9Z" transform="translate(-809.635 -460.322)" fill="#f2f4ff"></path>
              <path id="Trazado_8224" data-name="Trazado 8224" d="M1097.955,527.022a6.028,6.028,0,1,1-6.027-6.142A5.876,5.876,0,0,1,1097.955,527.022Zm-2.9,0a3.147,3.147,0,1,0-3.13,3.477A3.21,3.21,0,0,0,1095.057,527.022Z" transform="translate(-855.623 -486.168)" fill="#f2f4ff"></path>
              <path id="Trazado_8225" data-name="Trazado 8225" d="M1180.47,521.1h2.666l.232,1.167h.115a3.826,3.826,0,0,1,.789-.7,4.42,4.42,0,0,1,2.457-.7c2.666,0,4.636,1.97,4.636,4.983v7.07h-2.9v-6.845a2.55,2.55,0,0,0-5.1,0v6.838h-2.9Z" transform="translate(-936.402 -486.164)" fill="#f2f4ff"></path>
              <path id="Trazado_8226" data-name="Trazado 8226" d="M1313.76,528.479a5.48,5.48,0,0,1-5.564,4.636,6.144,6.144,0,0,1,0-12.285,5.492,5.492,0,0,1,5.564,4.521h-2.9a2.7,2.7,0,0,0-2.667-1.854,3.5,3.5,0,0,0,0,6.959,2.628,2.628,0,0,0,2.667-1.97Z" transform="translate(-1040.354 -486.125)" fill="#f2f4ff"></path>
              <path id="Trazado_8227" data-name="Trazado 8227" d="M1396.236,531.751h-.115a3.469,3.469,0,0,1-.812.694,4.646,4.646,0,0,1-2.549.7c-2.689,0-4.289-1.645-4.289-3.592,0-2.319,1.623-3.937,4.868-3.937H1396v-.232a2.015,2.015,0,0,0-2.087-2.2,1.978,1.978,0,0,0-2.085,1.508h-2.9c.255-1.948,1.832-3.825,4.983-3.825,3.014,0,4.985,1.994,4.985,4.521v7.534h-2.434Zm-.232-3.937h-2.434c-1.506,0-2.2.583-2.2,1.508s.672,1.506,1.855,1.506a2.506,2.506,0,0,0,2.781-2.666Z" transform="translate(-1114.068 -486.152)" fill="#f2f4ff"></path>
              <path id="Trazado_8228" data-name="Trazado 8228" d="M1270.39,522.42h2.9v11.821h-2.9Z" transform="translate(-1013.209 -487.484)" fill="#f2f4ff"></path>
              <circle id="Elipse_6" data-name="Elipse 6" cx="1.715" cy="1.715" r="1.715" transform="translate(256.914 29.807)" fill="#f2f4ff"></circle>
              <path id="Trazado_8229" data-name="Trazado 8229" d="M1121.482,488.24h3.014l-2.782,3.361h-2.434Z" transform="translate(-884.135 -458.289)" fill="#f2f4ff"></path>
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="text-gray-100">
                Gestión de Flotas y Detección de Fraude en{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent font-black">
                Tiempo Real
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Verificación de identidad y monitoreo de riesgos con{' '}
              <span className="text-blue-400">Open Gateway</span> para proteger tu carga y{' '}
              <span className="text-purple-400">optimizar la logística</span>.
            </p>
          </motion.div>

          {/* Feature Pills - Responsive Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 max-w-5xl mx-auto px-2"
          >
            {[
              { icon: Phone, text: "Identidad del Conductor Garantizada", emoji: "🛡️" },
              { icon: Zap, text: "Prevención de Fraude Instantánea", emoji: "⚡" },
              { icon: Truck, text: "Logística Optimizada y Trazable", emoji: "📈" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs sm:text-sm min-w-fit"
              >
                <span className="text-sm sm:text-lg">{feature.emoji}</span>
                <span className="text-white font-medium whitespace-nowrap">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={onStartDemo}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-base sm:text-lg rounded-full border-2 border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <motion.span
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Ver Demo en Acción
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Additional Visual Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      
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
    </div>
  );
}