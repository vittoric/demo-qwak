import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos Estáticos para el Dashboard de Negocio
const businessMetrics = {
  titulo: "Panel de Control Empresarial",
  tiempo_vista: "Últimos 30 días",
  kpis: [
    { nombre: "Entregas a Tiempo (OTD)", valor: "96.5%", tendencia_pct: "+1.8%", tendencia_dir: "up", color: "green" },
    { nombre: "Utilización de la Flota", valor: "82.0%", tendencia_pct: "+4.1%", tendencia_dir: "up", color: "green" },
    { nombre: "Costo Promedio por Viaje", valor: "425", unidad: "$", tendencia_pct: "-3.5%", tendencia_dir: "down", color: "purple" },
    { nombre: "Cargas Totales Entregadas", valor: "850", tendencia_pct: "+12.0%", tendencia_dir: "up", color: "green" },
    { nombre: "Índice de Incidentes (por 100 mil km)", valor: "0.15", tendencia_pct: "-15.0%", tendencia_dir: "down", color: "purple" }
  ],
  grafico_anual: {
    titulo: "Evolución Mensual de la Eficiencia Operativa y Servicio - Últimos 12 meses",
    series: [
      { nombre: "OTD Mensual", color: "green", valores_simulados: [93, 94, 95, 96, 94, 95, 97, 96, 95, 96, 96.5, 96] },
      { nombre: "CCPKM Mensual", color: "purple", valores_simulados: [0.38, 0.40, 0.42, 0.45, 0.43, 0.42, 0.40, 0.39, 0.38, 0.37, 0.36, 0.35] }
    ]
  }
};

// Datos del gráfico
const chartData = [
  { month: 'JAN', otd: 93, ccpkm: 0.38 },
  { month: 'FEB', otd: 94, ccpkm: 0.40 },
  { month: 'MAR', otd: 95, ccpkm: 0.42 },
  { month: 'APR', otd: 96, ccpkm: 0.45 },
  { month: 'MAY', otd: 94, ccpkm: 0.43 },
  { month: 'JUN', otd: 95, ccpkm: 0.42 },
  { month: 'JUL', otd: 97, ccpkm: 0.40 },
  { month: 'AUG', otd: 96, ccpkm: 0.39 },
  { month: 'SEP', otd: 95, ccpkm: 0.38 },
  { month: 'OCT', otd: 96, ccpkm: 0.37 },
  { month: 'NOV', otd: 96.5, ccpkm: 0.36 },
  { month: 'DIC', otd: 96, ccpkm: 0.35 }
];

export default function BusinessDashboard() {
  // Función para obtener el color de la tendencia
  const getTrendColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <>
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{businessMetrics.titulo}</h1>
          <p className="text-gray-600 text-sm sm:text-base">Métricas y análisis de rendimiento empresarial - {new Date().toLocaleDateString('es-ES')}</p>
        </div>
        <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
          {businessMetrics.tiempo_vista}
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6">
        {businessMetrics.kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {kpi.unidad && kpi.unidad}{kpi.valor}
              </div>
              <div className={`flex items-center gap-1 text-xs sm:text-sm ${getTrendColor(kpi.color)}`}>
                {kpi.tendencia_dir === 'up' ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                {kpi.tendencia_pct}
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">{kpi.nombre}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Business Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">93.2%</div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              Excelente
            </div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Satisfacción del Cliente</p>
          <div className="mt-3 bg-white rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '93%' }}></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">1,245,680 km</div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-blue-600">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              +8.2%
            </div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Kilómetros Totales de la Flota</p>
          <p className="text-xs text-gray-500 mt-1">Este mes: +89,340 km</p>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Performance Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">96.3%</span>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  +2.1%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-xs sm:text-sm">{businessMetrics.grafico_anual.titulo}</p>
                <p className="text-gray-500 text-xs">Seguimiento del rendimiento operativo y costos durante los últimos 12 meses</p>
              </div>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <div className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                Año {new Date().getFullYear()}
              </div>
            </div>
          </div>
          
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  yAxisId="left"
                  domain={[90, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0.3, 0.5]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value, name) => [
                    name === 'otd' ? `${value}%` : `${value}`, 
                    name === 'otd' ? 'OTD Mensual' : 'CCPKM Mensual'
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="otd"
                  stroke="url(#otdGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#10b981' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ccpkm"
                  stroke="url(#ccpkmGradient)"
                  strokeWidth={2}
                  dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#7c3aed' }}
                />
                <defs>
                  <linearGradient id="otdGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="ccpkmGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#5b21b6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600">OTD Mensual (%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600">Costo por KM (CCPKM)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}