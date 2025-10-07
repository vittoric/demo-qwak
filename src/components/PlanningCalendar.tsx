import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Truck, MapPin, Clock, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react';

interface TripEvent {
  id: string;
  truckId: string;
  route: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'delayed';
  priority: 'high' | 'medium' | 'low';
}

type ViewType = 'day' | 'week' | 'month' | 'year';

const PlanningCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  // Mock data for trips
  const mockTrips: TripEvent[] = useMemo(() => {
    const trips: TripEvent[] = [];
    const truckIds = ['TPC-1045', 'TPC-2087', 'TPC-3156', 'TPC-4289', 'TPC-5340', 'TPC-6421', 'TPC-7592'];
    const routes = [
      'Madrid → Barcelona',
      'Valencia → Sevilla',
      'Bilbao → Zaragoza',
      'Málaga → Granada',
      'Palma → Ibiza',
      'Santander → León',
      'Cádiz → Córdoba',
      'Toledo → Cuenca',
      'Murcia → Alicante'
    ];

    // Generate trips for current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const numTrips = Math.floor(Math.random() * 6) + 1; // 1-6 trips per day
      
      for (let i = 0; i < numTrips; i++) {
        const date = new Date(year, month, day);
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        
        trips.push({
          id: `trip-${day}-${i}`,
          truckId: truckIds[Math.floor(Math.random() * truckIds.length)],
          route: routes[Math.floor(Math.random() * routes.length)],
          startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          endTime: `${(hour + Math.floor(Math.random() * 8) + 1).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          status: Math.random() > 0.7 ? 'completed' : Math.random() > 0.5 ? 'in-progress' : 'scheduled',
          priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low'
        });
      }
    }

    return trips;
  }, [currentDate]);

  const getTripsForDate = (date: Date) => {
    return mockTrips.filter(trip => {
      const tripDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date.getDate());
      return tripDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 h-32"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const trips = getTripsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div key={day} className={`p-2 h-32 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
              {day}
            </span>
            {trips.length > 3 && (
              <span className="text-xs text-gray-500">+{trips.length - 3}</span>
            )}
          </div>
          <div className="space-y-1">
            {trips.slice(0, 3).map((trip, index) => (
              <div key={trip.id} className={`text-xs p-1 rounded border ${getStatusColor(trip.status)} truncate`}>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(trip.priority)}`}></div>
                  <span className="font-medium">{trip.truckId}</span>
                </div>
                <div className="truncate">{trip.route}</div>
              </div>
            ))}
            {trips.length > 3 && (
              <div className="flex justify-center">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const trips = getTripsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div key={index} className="space-y-2">
              <div className={`text-center p-3 rounded-lg ${isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-50'}`}>
                <div className="text-sm font-medium">
                  {day.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}
                </div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </div>
              <div className="space-y-2 min-h-96">
                {trips.map((trip) => (
                  <div key={trip.id} className={`p-2 rounded border ${getStatusColor(trip.status)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(trip.priority)}`}></div>
                      <span className="font-medium text-sm">{trip.truckId}</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{trip.startTime}</div>
                    <div className="text-xs">{trip.route}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const trips = getTripsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="space-y-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold">
            {currentDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-gray-600">{trips.length} viajes programados</p>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
          {hours.map(hour => {
            const hourTrips = trips.filter(trip => parseInt(trip.startTime.split(':')[0]) === hour);
            
            return (
              <div key={hour} className="flex items-start gap-4 p-2 border-b border-gray-100">
                <div className="w-16 text-sm text-gray-500 font-medium">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="flex-1 space-y-2">
                  {hourTrips.map(trip => (
                    <div key={trip.id} className={`p-3 rounded-lg border ${getStatusColor(trip.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(trip.priority)}`}></div>
                          <span className="font-medium">{trip.truckId}</span>
                          <span className="text-sm text-gray-600">{trip.startTime} - {trip.endTime}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{trip.route}</span>
                      </div>
                    </div>
                  ))}
                  {hourTrips.length === 0 && (
                    <div className="text-gray-400 text-sm italic">Sin viajes programados</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = [];
    const year = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(year, month, 1);
      const monthTrips = mockTrips.filter(trip => {
        const tripDate = new Date(year, month, 15); // Use middle of month for comparison
        return tripDate.getMonth() === month;
      });

      months.push(
        <div key={month} className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
             onClick={() => {
               setCurrentDate(monthDate);
               setView('month');
             }}>
          <h4 className="font-medium text-center mb-3">
            {monthDate.toLocaleDateString('es-ES', { month: 'long' })}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total viajes:</span>
              <span className="font-medium">{monthTrips.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completados:</span>
              <span className="text-green-600 font-medium">
                {monthTrips.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">En progreso:</span>
              <span className="text-blue-600 font-medium">
                {monthTrips.filter(t => t.status === 'in-progress').length}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {months}
      </div>
    );
  };

  const getNavigationHandler = () => {
    switch (view) {
      case 'day': return navigateDay;
      case 'week': return navigateWeek;
      case 'month': return navigateMonth;
      default: return navigateMonth;
    }
  };

  const getDateTitle = () => {
    switch (view) {
      case 'day':
        return currentDate.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
      case 'month':
        return currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      case 'year':
        return currentDate.getFullYear().toString();
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planificación de Cargas</h1>
          <p className="text-gray-600">Gestiona y programa los viajes de tu flota</p>
        </div>
        
        {/* View Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { id: 'day', label: 'Día', icon: Clock },
            { id: 'week', label: 'Semana', icon: CalendarIcon },
            { id: 'month', label: 'Mes', icon: CalendarIcon },
            { id: 'year', label: 'Año', icon: CalendarIcon }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id as ViewType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => getNavigationHandler()('prev')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <h2 className="text-xl font-bold text-gray-900 capitalize">
          {getDateTitle()}
        </h2>

        <button
          onClick={() => getNavigationHandler()('next')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Siguiente
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Content */}
      <div className="bg-white rounded-lg">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
        {view === 'year' && renderYearView()}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Viajes Totales</p>
              <p className="text-xl font-bold">{mockTrips.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completados</p>
              <p className="text-xl font-bold text-green-600">
                {mockTrips.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En Progreso</p>
              <p className="text-xl font-bold text-blue-600">
                {mockTrips.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MapPin className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Programados</p>
              <p className="text-xl font-bold text-yellow-600">
                {mockTrips.filter(t => t.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningCalendar;