import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, X, Phone, Truck, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AiAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

const simulatedConversation: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  {
    type: 'bot',
    content: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?'
  },
  {
    type: 'user',
    content: 'Hola, tengo problemas para verificar mi número de teléfono'
  },
  {
    type: 'bot',
    content: 'Entiendo tu problema. Vamos a solucionarlo paso a paso. ¿Podrías decirme qué mensaje de error estás viendo exactamente?'
  },
  {
    type: 'user',
    content: 'Me dice "Número no válido" pero estoy seguro que es correcto'
  },
  {
    type: 'bot',
    content: 'Perfecto. Veo que tu número registrado es +34 6XX XXX XXX. Te voy a enviar un nuevo código de verificación.\n\nRevisa que:\n• Tengas cobertura móvil\n• No hayas cambiado de SIM recientemente\n• El número esté activo\n\n¿Quieres que reenvíe el código ahora?'
  },
  {
    type: 'user',
    content: 'Sí, por favor'
  },
  {
    type: 'bot',
    content: '✅ Código reenviado. Debería llegarte en 1-2 minutos.\n\nMientras esperas, ¿hay algo más en lo que pueda ayudarte?'
  },
  {
    type: 'user',
    content: 'Perfecto, ya me llegó. Gracias!'
  },
  {
    type: 'bot',
    content: '¡Excelente! Me alegra haberte ayudado. Si tienes más dudas, aquí estaré 24/7.'
  }
];

const quickActionButtons = [
  { icon: Phone, label: 'Cambié de teléfono', color: 'bg-blue-500' },
  { icon: Truck, label: 'Problema con contenedor', color: 'bg-green-500' },
  { icon: AlertTriangle, label: 'Reportar emergencia', color: 'bg-red-500' }
];

export default function AiAgentChat({ isOpen, onClose }: AiAgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    if (isOpen && currentMessageIndex < simulatedConversation.length) {
      const timer = setTimeout(() => {
        // Add typing indicator for bot messages
        if (simulatedConversation[currentMessageIndex].type === 'bot' && currentMessageIndex > 0) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addMessage();
          }, 1500);
        } else {
          addMessage();
        }
      }, currentMessageIndex === 0 ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentMessageIndex]);

  const addMessage = () => {
    if (currentMessageIndex < simulatedConversation.length) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        ...simulatedConversation[currentMessageIndex],
        timestamp: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, newMessage]);
      setCurrentMessageIndex(prev => prev + 1);

      // Show quick actions after the bot mentions them
      if (currentMessageIndex === 6) {
        setTimeout(() => setShowQuickActions(true), 1000);
      }
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentMessageIndex(0);
    setIsTyping(false);
    setShowQuickActions(false);
  };

  const handleClose = () => {
    resetChat();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-[600px] z-50 mx-4 sm:mx-0"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">🤖 Asistente IA - Qwak</h3>
                      <p className="text-xs sm:text-sm opacity-90">En línea</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                        : 'bg-gradient-to-r from-green-500 to-blue-500'
                    }`}>
                      {message.type === 'bot' ? (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`max-w-[85%] sm:max-w-[80%] ${
                      message.type === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                        message.type === 'bot'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Action Buttons */}
                {showQuickActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 mt-3 sm:mt-4"
                  >
                    <p className="text-xs sm:text-sm text-gray-600 text-center mb-2">Botones rápidos:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                      {quickActionButtons.map((button, index) => (
                        <Button
                          key={button.label}
                          variant="outline"
                          size="sm"
                          className={`text-xs ${button.color} text-white border-none hover:opacity-80 px-2 py-1 sm:px-3 sm:py-2`}
                        >
                          <button.icon className="w-3 h-3 mr-1" />
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>

              {/* Footer */}
              <div className="p-3 sm:p-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>👤 Conductor</span>
                  <span>🤖 Asistente IA</span>
                </div>
                <div className="text-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetChat}
                    className="text-xs px-3 py-1.5"
                  >
                    Reiniciar conversación
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}