import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Calendar,
  ArrowRight,
  ChevronRight,
  Eye,
  Car,
  Route,
  Timer
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ActivityViewProps {
  onViewTrip: () => void;
}

export default function ActivityView({ onViewTrip }: ActivityViewProps) {
  const currentTrip = {
    id: 'TRIP-2024-001',
    route: 'Cáceres → Madrid → Zaragoza',
    origin: 'Centro Logístico Cáceres',
    destination: 'Centro Distribución Zaragoza',
    startTime: '07:00',
    estimatedArrival: '15:30',
    duration: '8h 30min',
    status: 'En curso',
    progress: 45,
    distance: '615 km',
    currentLocation: 'Madrid (En pausa)'
  };

  const pastTrips = [
    {
      id: 'TRIP-2024-125',
      route: 'Zaragoza → Cáceres',
      date: '28 Sep 2024',
      startTime: '07:15',
      endTime: '13:20',
      duration: '6h 5min',
      distance: '485 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1588202783141-6fb660f77a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwbWFwJTIwbmF2aWdhdGlvbiUyMEdQU3xlbnwxfHx8fDE3NTkxMzk3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-124',
      route: 'Madrid → Valencia',
      date: '27 Sep 2024',
      startTime: '06:00',
      endTime: '09:30',
      duration: '3h 30min',
      distance: '352 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1742415105826-0d588fa879b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwJTIwcm91dGV8ZW58MXx8fHwxNzU5MTM5Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-123',
      route: 'Valencia → Barcelona',
      date: '26 Sep 2024',
      startTime: '14:15',
      endTime: '17:45',
      duration: '3h 30min',
      distance: '349 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWxpdmVyeSUyMHJvdXRlJTIwbWFwJTIwdHJhY2tpbmd8ZW58MXx8fHwxNzU5MTM5Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-122',
      route: 'Barcelona → Zaragoza',
      date: '25 Sep 2024',
      startTime: '09:45',
      endTime: '12:30',
      duration: '2h 45min',
      distance: '296 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1588202783141-6fb660f77a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwbWFwJTIwbmF2aWdhdGlvbiUyMEdQU3xlbnwxfHx8fDE3NTkxMzk3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-121',
      route: 'Zaragoza → Sevilla',
      date: '24 Sep 2024',
      startTime: '05:30',
      endTime: '12:15',
      duration: '6h 45min',
      distance: '542 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1742415105826-0d588fa879b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwJTIwcm91dGV8ZW58MXx8fHwxNzU5MTM5Nzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-120',
      route: 'Sevilla → Madrid',
      date: '23 Sep 2024',
      startTime: '15:00',
      endTime: '19:20',
      duration: '4h 20min',
      distance: '389 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWxpdmVyeSUyMHJvdXRlJTIwbWFwJTIwdHJhY2tpbmd8ZW58MXx8fHwxNzU5MTM5Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'TRIP-2024-119',
      route: 'Madrid → Bilbao',
      date: '22 Sep 2024',
      startTime: '08:00',
      endTime: '12:45',
      duration: '4h 45min',
      distance: '395 km',
      status: 'Completado',
      mapImage: 'https://images.unsplash.com/photo-1588202783141-6fb660f77a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwbWFwJTIwbmF2aWdhdGlvbiUyMEdQU3xlbnwxfHx8fDE3NTkxMzk3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Actividad de Viajes</h1>
          <p className="text-gray-600 text-sm sm:text-base">Seguimiento de viajes actuales y historial de rutas completadas</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('es-ES')}</span>
        </div>
      </div>

      {/* Current Trip Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full px-4 sm:px-0"
      >
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Viaje Actual en Curso
              </CardTitle>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {currentTrip.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Route Info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <span className="break-words">{currentTrip.route}</span>
                </div>
                <Badge variant="outline" className="text-xs self-start">
                  {currentTrip.id}
                </Badge>
              </div>
              <Button 
                onClick={onViewTrip}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto"
                size="sm"
              >
                <Eye className="w-4 h-4" />
                Ver el viaje
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  Inicio
                </div>
                <div className="font-semibold text-sm sm:text-base">{currentTrip.startTime}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
                  <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                  ETA
                </div>
                <div className="font-semibold text-sm sm:text-base">{currentTrip.estimatedArrival}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
                  <Route className="w-3 h-3 sm:w-4 sm:h-4" />
                  Distancia
                </div>
                <div className="font-semibold text-sm sm:text-base">{currentTrip.distance}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                  Ubicación
                </div>
                <div className="font-semibold text-sm sm:text-base">{currentTrip.currentLocation}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/60 rounded-lg p-3 sm:p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Progreso del viaje</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-600">{currentTrip.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full"
                  style={{ width: `${currentTrip.progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentTrip.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Past Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 px-4 sm:px-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Viajes Recientes</h2>
          <Badge variant="outline" className="text-xs self-start">
            {pastTrips.length} completados
          </Badge>
        </div>

        <div className="grid gap-4 px-4 sm:px-0 w-full min-w-0">
          {pastTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="w-full min-w-0"
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200 w-full mx-auto max-w-full overflow-hidden">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {/* Mobile Layout - Header with Image and Title */}
                    <div className="flex items-start gap-2 sm:hidden">
                      <div className="w-12 h-10 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={trip.mapImage} 
                          alt={`Mapa de ${trip.route}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight break-words">{trip.route}</h3>
                            <Badge variant="outline" className="text-xs mt-1 inline-block">
                              {trip.id}
                            </Badge>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs flex-shrink-0 mt-0.5">
                            {trip.status}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>

                    {/* Desktop Layout - Horizontal */}
                    <div className="hidden sm:flex sm:items-center sm:gap-4 sm:flex-1">
                      {/* Map Image */}
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={trip.mapImage} 
                          alt={`Mapa de ${trip.route}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Trip Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900">{trip.route}</h3>
                            <Badge variant="outline" className="text-xs">
                              {trip.id}
                            </Badge>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                            {trip.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{trip.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{trip.startTime} - {trip.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Timer className="w-3 h-3" />
                            <span>{trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Route className="w-3 h-3" />
                            <span>{trip.distance}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Arrow */}
                      <div className="flex-shrink-0">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Mobile Layout - Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs sm:hidden mt-2">
                      <div className="flex items-center gap-1 text-gray-600 min-w-0">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 min-w-0">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{trip.startTime} - {trip.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 min-w-0">
                        <Timer className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 min-w-0">
                        <Route className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{trip.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}