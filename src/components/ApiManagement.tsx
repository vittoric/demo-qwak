import { motion } from 'motion/react';
import { Zap, Globe, Activity, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export default function ApiManagement() {
  const apis = [
    {
      name: 'Device Location API',
      status: 'active',
      usage: 87,
      requests: '2.4M',
      latency: '45ms',
      description: 'Geolocalización precisa de dispositivos'
    },
    {
      name: 'Identity Verification API',
      status: 'active',
      usage: 92,
      requests: '1.8M',
      latency: '32ms',
      description: 'Verificación de identidad en tiempo real'
    },
    {
      name: 'Fraud Detection API',
      status: 'warning',
      usage: 76,
      requests: '956K',
      latency: '67ms',
      description: 'Detección avanzada de fraudes'
    },
    {
      name: 'Network Analytics API',
      status: 'active',
      usage: 43,
      requests: '743K',
      latency: '28ms',
      description: 'Análisis de red y tráfico'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestión de APIs</h1>
          <p className="text-slate-600 dark:text-slate-400">APIs de Telefónica Open Gateway integradas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Zap className="w-4 h-4 mr-2" />
            Nueva API
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {apis.map((api, index) => (
          <motion.div
            key={api.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{api.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{api.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={api.status === 'active' ? 'default' : 'destructive'} className="flex items-center gap-1">
                      {api.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {api.status === 'active' ? 'Activa' : 'Advertencia'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Uso</p>
                    <div className="space-y-1">
                      <Progress value={api.usage} className="h-2" />
                      <p className="text-sm font-medium">{api.usage}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Requests</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{api.requests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Latencia</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{api.latency}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Ver Docs</Button>
                    <Button variant="outline" size="sm">
                      <Activity className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}