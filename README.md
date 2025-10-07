# 🚚 Qwak Driver Tracking Demo

## 📋 Descripción del Proyecto

**Demo interactiva de Qwak** desarrollada para presentaciones que demuestra las capacidades de detección de fraudes y seguridad en tiempo real utilizando las **APIs de Open Gateway de Telefónica**. 

Es un sistema completo de seguimiento de conductores con un diseño tecnológico moderno, animaciones fluidas y un enfoque profesional que simula un entorno real de gestión de flotas y logística.

## 🎯 Propósito de la Demo

Esta aplicación está diseñada específicamente para **presentaciones de 8 minutos** que muestran:

- ✅ **Verificación de identidad silenciosa** con Number Verification API
- ✅ **Autenticación segura** sin fricción para el usuario  
- ✅ **Detección de fraudes** en tiempo real
- ✅ **Gestión de perfiles** (Conductores y Empresas)
- ✅ **Dashboard en tiempo real** con métricas de conductores
- ✅ **Manejo de errores** de verificación

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animaciones**: Motion/React (Framer Motion)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Tipografía**: Epilogue (Google Fonts)

## 🚀 Flujo de la Demo

### 1. **Hero Section**
- Pantalla de bienvenida con branding de Qwak
- Introducción a las capacidades de Open Gateway
- Call-to-action para iniciar la demo

### 2. **Selección de Perfiles**
- **👨‍💼 Perfil Business**: Gestión empresarial de flotas
- **🚗 Perfil Driver**: Interfaz para conductores individuales
- Diferentes flujos según el perfil seleccionado

### 3. **Registro Completo**
- Formulario detallado de registro de usuarios
- Validación de campos en tiempo real
- Información específica por tipo de perfil

### 4. **Inicio de Sesión Rápido**
- **Number Verification API** de Telefónica Open Gateway
- Verificación silenciosa automática
- Sin necesidad de códigos SMS o apps de terceros

### 5. **Pantalla de Carga**
- Loading screen con animaciones
- Simulación de verificación en background
- Transición fluida al siguiente estado

### 6. **Verificación de Identidad**
- ✅ **Éxito**: Explicación del proceso de verificación silenciosa
- ❌ **Error**: Página específica para número `+34 654321006`
- Opciones de reintento o método alternativo

### 7. **Dashboard Principal**
- **Métricas en tiempo real** de conductores:
  - 📊 Viajes completados
  - ⏰ Entregas puntuales  
  - 🕐 Horas de conducción
  - 🚗 Velocidad promedio vs límites
  - 📏 Distancia total recorrida
- **Mapa de seguimiento** con ubicaciones en tiempo real
- **Device Swap Detection** en puntos de entrega

## 🧪 Funcionalidades de Testing

### Número de Prueba para Error
- **Número**: `+34 654321006`
- **Comportamiento**: Muestra página de error de verificación
- **Opciones**: Reintentar verificación o usar método alternativo

### Números Exitosos
- Cualquier otro número de teléfono
- **Comportamiento**: Verificación exitosa → Dashboard

## 📁 Estructura del Proyecto

```
├── App.tsx                     # Componente principal con error boundaries
├── components/
│   ├── AppFlow.tsx            # Controlador principal del flujo
│   ├── HeroSection.tsx        # Pantalla de bienvenida
│   ├── ProfileSelection.tsx   # Selección driver/business
│   ├── LoginForm.tsx          # Formulario de registro completo
│   ├── SignInForm.tsx         # Inicio de sesión rápido
│   ├── LoadingScreen.tsx      # Pantalla de carga
│   ├── SignInExplanation.tsx  # Explicación de verificación exitosa
│   ├── VerificationError.tsx  # Página de error de verificación
│   ├── QwakDashboard.tsx      # Dashboard principal
│   ├── TrackingView.tsx       # Vista de seguimiento en tiempo real
│   └── ui/                    # Componentes UI de shadcn
├── styles/
│   └── globals.css            # Estilos globales + Tailwind v4
└── README.md                  # Este archivo
```

## 🎪 Casos de Uso de la Demo

### Para Presentaciones Comerciales
- Demostrar capacidades de **Open Gateway APIs**
- Mostrar **autenticación sin fricción**
- Explicar **verificación silenciosa de identidad**
- Destacar **prevención de fraudes** en tiempo real

### Para Audiencias Técnicas
- Arquitectura de **verificación automática**
- Integración con **APIs de telecomunicaciones**
- **Manejo de errores** y casos edge
- **UX/UI moderna** con React y Tailwind

### Para Stakeholders de Negocio
- **ROI de seguridad** vs experiencia de usuario
- **Reducción de fricción** en onboarding
- **Métricas en tiempo real** de operaciones
- **Escalabilidad** del sistema

## 🔧 Configuración y Uso

1. **Inicio de la demo**: Hacer clic en "Iniciar Demo"
2. **Seleccionar perfil**: Driver o Business según el caso de uso
3. **Flujo normal**: Usar cualquier número excepto `+34 654321006`
4. **Flujo de error**: Usar específicamente `+34 654321006`
5. **Explorar dashboard**: Navegar por las métricas y funcionalidades

## 📊 Métricas del Dashboard

- **Viajes Completados**: Contador en tiempo real
- **Entregas Puntuales**: Porcentaje de cumplimiento
- **Horas de Conducción**: Tiempo total acumulado
- **Velocidad Promedio**: Comparación con límites de velocidad
- **Distancia Recorrida**: Kilómetros totales
- **Device Swap Detection**: Alertas de seguridad en entregas

## 🔐 Seguridad y APIs

### Telefónica Open Gateway
- **Number Verification API**: Verificación automática de números
- **Verificación silenciosa**: Sin códigos SMS
- **Prevención de fraudes**: Detección de suplantación
- **Cumplimiento**: Estándares de telecomunicaciones

### Funcionalidades de Seguridad
- **Autenticación automática** basada en red
- **Device Swap Detection** en puntos críticos
- **Validación de identidad** en tiempo real
- **Protección contra suplantación**

---

## 🚀 Tecnologías y Librerías

- React 18, TypeScript, Tailwind CSS v4
- Motion/React, shadcn/ui, Lucide React
- Recharts, Error Boundaries, Suspense
- Google Fonts (Epilogue), CSS Variables

**Desarrollado para demostraciones de Qwak y las capacidades de Telefónica Open Gateway**
