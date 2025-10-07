import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Clock, Route, Car, CheckCircle, Shield, Phone, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
//import mapImage from ':asset/7315cb132255caadd349329b0cc063321a6c15f5.png';
const mapImage = '/image.png';

interface TrackingPoint {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  status: 'completed' | 'current' | 'pending';
  time: string;
  type: 'start' | 'pickup' | 'destination';
  apis: {
    primary: string;
    secondary?: string;
    description: string;
  };
}

const trackingPoints: TrackingPoint[] = [
  {
    id: '1',
    name: 'Punto de Inicio',
    address: 'Cáceres, Extremadura',
    coords: [39.4753, -6.3724],
    status: 'completed',
    time: '07:00',
    type: 'start',
    apis: {
      primary: 'Number Verification',
      description: 'Confirma que el número de teléfono del conductor está activo y compara los datos de contacto registrados con los datos de la red del operador. Garantiza la autenticación silenciosa y la identidad consistente antes de asignar el viaje.'
    }
  },
  {
    id: '2',
    name: 'Punto de Recogida',
    address: 'Madrid, Comunidad de Madrid',
    coords: [40.4168, -3.7038],
    status: 'current',
    time: '11:00',
    type: 'pickup',
    apis: {
      primary: 'Location Verification',
      secondary: 'Device Roaming Status',
      description: 'Confirma que el dispositivo del conductor se encuentra en la zona geográfica esperada y valida la ubicación reportada contra la red telco para prevenir spoofing del GPS durante el tránsito.'
    }
  },
  {
    id: '3',
    name: 'Punto de Entrega',
    address: 'Zaragoza, Aragón',
    coords: [41.6488, -0.8891],
    status: 'pending',
    time: '15:30',
    type: 'destination',
    apis: {
      primary: 'Location Verification',
      secondary: 'Device Swap Detection',
      description: 'Confirma que el conductor está en el punto de entrega mediante verificación de ubicación por red telco y realiza una comprobación final de seguridad para validar que la identidad del conductor es la misma que inició el viaje.'
    }
  }
];



export default function TrackingView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'current':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'current':
        return <Car className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Coordenadas específicas para el mapa - Responsive positions
  const getMapPosition = (coords: [number, number]) => {
    const [lat, lng] = coords;
    
    let xPercent, yPercent;
    
    if (lat === 39.4753 && lng === -6.3724) {
      // Cáceres - izquierda del mapa
      xPercent = 20;
      yPercent = 75;
    } else if (lat === 40.4168 && lng === -3.7038) {
      // Madrid - centro del mapa
      xPercent = 55;
      yPercent = 50;
    } else if (lat === 41.6488 && lng === -0.8891) {
      // Zaragoza - derecha superior
      xPercent = 85;
      yPercent = 25;
    } else {
      // Fallback
      xPercent = 50;
      yPercent = 50;
    }
    
    return { x: xPercent, y: yPercent };
  };

  const toggleDropdown = (pointId: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [pointId]: !prev[pointId]
    }));
  };

  const getApiIcon = (apiName: string) => {
    if (apiName.includes('Number Verification')) return <Phone className="w-4 h-4" />;
    if (apiName.includes('KYC-Match')) return <Shield className="w-4 h-4" />;
    if (apiName.includes('Location Verification')) return <MapPin className="w-4 h-4" />;
    if (apiName.includes('Device Roaming')) return <Navigation className="w-4 h-4" />;
    if (apiName.includes('Device Swap') || apiName.includes('Swap Detection')) return <Zap className="w-4 h-4" />;
    return <Phone className="w-4 h-4" />;
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Seguimiento en Tiempo Real</h1>
          <p className="text-gray-600 text-sm sm:text-base">Monitoreo del recorrido Cáceres → Madrid → Zaragoza</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
            En Vivo
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-visible">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Mapa de Seguimiento - España Central
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full">
                {/* Map */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={mapImage}
                    alt="Mapa de España - Rutas de Seguimiento"
                    className="w-full h-full object-cover rounded-b-lg"
                  />
                  {/* Overlay for better visibility */}
                  <div className="absolute inset-0 bg-black/5"></div>
                </div>

                {/* Tracking Points - Responsive positions */}
                {trackingPoints.map((point, index) => {
                  const position = getMapPosition(point.coords);
                  
                  return (
                    <motion.div
                      key={point.id}
                      className="absolute"
                      style={{ 
                        left: `${position.x}%`, 
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.5, duration: 0.6 }}
                    >
                      <div className="relative">
                        {/* Point Circle - Responsive sizing */}
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white ${
                          point.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          point.status === 'current' ? 'bg-gradient-to-r from-blue-600 to-purple-600' :
                          'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}>
                          {point.status === 'completed' && <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />}
                          {point.status === 'current' && <Car className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />}
                          {point.status === 'pending' && <Navigation className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />}
                        </div>
                        
                        {/* Pulsing animation for current point */}
                        {point.status === 'current' && (
                          <motion.div
                            className="absolute inset-0 bg-blue-500 rounded-full opacity-30"
                            animate={{ scale: [1, 2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        
                        {/* City Label - Responsive */}
                        <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md shadow-lg text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap border border-gray-200">
                          {point.address.split(',')[0]}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Panel */}
        <div className="space-y-4">
          {/* Trip Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5 text-blue-600" />
                Progreso del Viaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`rounded-lg overflow-hidden ${
                      point.status === 'current' ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 p-3">
                      <div className="flex-shrink-0">
                        {getStatusIcon(point.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{point.name}</h4>
                          <span className="text-sm text-gray-600">{point.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                        <Badge className={`text-xs ${getStatusColor(point.status)}`}>
                          {point.status === 'completed' && 'Completado'}
                          {point.status === 'current' && 'En curso'}
                          {point.status === 'pending' && 'Pendiente'}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* API Information Collapsible */}
                    <Collapsible open={openDropdowns[point.id]} onOpenChange={() => toggleDropdown(point.id)}>
                      <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 bg-white/50 hover:bg-white/70 transition-colors text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          APIs de Seguridad
                        </span>
                        {openDropdowns[point.id] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 pb-3">
                        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
                          {/* Primary API */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {getApiIcon(point.apis.primary)}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-blue-600 block">
                                {point.apis.primary}
                              </span>
                              <span className="text-xs text-gray-500">API Principal</span>
                            </div>
                          </div>
                          
                          {/* Secondary API */}
                          {point.apis.secondary && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                {getApiIcon(point.apis.secondary)}
                              </div>
                              <div className="flex-1">
                                <span className="text-sm text-purple-600 block">
                                  {point.apis.secondary}
                                </span>
                                <span className="text-xs text-gray-500">API de Apoyo</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Description */}
                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {point.apis.description}
                            </p>
                          </div>
                          
                          {/* Telefónica branding */}
                          <div className="pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-500 font-medium">Telefónica Open Gateway</span>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trip Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Distancia Total</span>
                <span className="font-medium">612 km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tiempo Estimado</span>
                <span className="font-medium">7h 45min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Velocidad Promedio</span>
                <span className="font-medium">79 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estado</span>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  Activo
                </Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  Protegido por Telefónica Open Gateway
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}