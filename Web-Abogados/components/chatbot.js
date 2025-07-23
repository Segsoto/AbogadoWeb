// ===== CHATBOT AI FUNCTIONALITY =====

class LegalChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.userInfo = {};
        this.conversationStep = 'greeting';
        this.isMobile = this.detectMobile();
        this.lastTopic = null;
        this.userHistory = [];
        this.currentContext = 'general';
        
        // Knowledge base para respuestas inteligentes expandida
        this.knowledgeBase = {
            greetings: [
                "¡Hola! Soy el asistente virtual del despacho de Sergio Madriz.",
                "¿En qué puedo ayudarte hoy?",
                "Puedo orientarte sobre nuestros servicios legales o conectarte directamente con el abogado."
            ],
            
            // Respuestas a confirmaciones positivas
            positiveResponses: [
                "¡Perfecto! Me alegra poder ayudarte.",
                "¡Excelente! Estoy aquí para asistirte.",
                "¡Genial! Continuemos entonces.",
                "¡Muy bien! Sigamos adelante.",
                "¡Fantástico! Te voy a ayudar con eso."
            ],
            
            // Respuestas a negaciones
            negativeResponses: [
                "Entiendo perfectamente. ¿Hay algo más en lo que pueda ayudarte?",
                "No hay problema. ¿Te gustaría conocer otros servicios que ofrecemos?",
                "Está bien. ¿Prefieres que te conecte directamente con el abogado Sergio?",
                "Sin inconveniente. ¿Tienes alguna otra consulta legal?",
                "Comprendo. ¿Hay algún otro tema legal que te interese?"
            ],
            
            // Respuestas para volver al inicio
            restartResponses: [
                "¡Por supuesto! Volvamos al inicio. ¿En qué área legal puedo ayudarte?",
                "¡Claro! Empecemos de nuevo. ¿Qué servicio legal necesitas?",
                "¡Sin problema! Iniciemos otra vez. ¿Cuál es tu consulta principal?",
                "¡Perfecto! Comencemos desde el principio. ¿En qué puedo asistirte?"
            ],
            
            // Respuestas para más dudas
            moreDubtsResponses: [
                "¡Excelente! Estoy aquí para resolver todas tus dudas. ¿Cuál es tu siguiente pregunta?",
                "¡Por supuesto! Pregúntame lo que necesites saber.",
                "¡Claro que sí! ¿Qué más te gustaría conocer?",
                "¡Con mucho gusto! ¿En qué más puedo ayudarte?",
                "¡Perfecto! Estoy para ayudarte. ¿Cuál es tu otra consulta?"
            ],
            
            // Respuestas cuando no entiende
            clarificationResponses: [
                "Disculpa, no estoy seguro de entender. ¿Podrías ser más específico?",
                "Perdón, ¿podrías explicarme mejor tu consulta?",
                "No logro entender completamente. ¿Puedes darme más detalles?",
                "Disculpa la confusión. ¿Podrías reformular tu pregunta?",
                "Lo siento, ¿podrías ser más claro con tu consulta?"
            ],
            
            // Respuestas empáticas
            empatheticResponses: [
                "Entiendo que este puede ser un tema delicado para ti.",
                "Comprendo tu preocupación, es normal tener estas dudas.",
                "Sé que los asuntos legales pueden ser estresantes.",
                "Es completamente normal sentirse abrumado por temas legales.",
                "Tranquilo/a, estamos aquí para ayudarte en este proceso."
            ],
            
            services: {
                'derecho penal': {
                    description: "Ofrecemos defensa legal especializada en casos penales, protegiendo tus derechos fundamentales.",
                    details: ["Defensa en procesos penales", "Medidas cautelares", "Recursos legales", "Asesoría en investigaciones"],
                    price_range: "Consulta desde ₡25,000",
                    followUp: "¿Te encuentras en algún proceso penal actualmente? ¿O necesitas asesoría preventiva?"
                },
                'derecho familiar': {
                    description: "Soluciones legales en asuntos familiares con sensibilidad y profesionalismo.",
                    details: ["Divorcios", "Pensiones alimentarias", "Guarda y custodia", "Régimen de visitas"],
                    price_range: "Consulta desde ₡20,000",
                    followUp: "¿Qué tipo de situación familiar específica necesitas resolver?"
                },
                'servicios notariales': {
                    description: "Notario público certificado para todos tus trámites legales en La Guácima.",
                    details: ["Escrituras públicas", "Poderes", "Certificaciones", "Protocolización"],
                    price_range: "Desde ₡15,000",
                    followUp: "¿Qué documento necesitas que sea autenticado notarialmente?"
                },
                'matrimonios civiles': {
                    description: "Celebración de matrimonios civiles con todos los requisitos legales.",
                    details: ["Ceremonia civil", "Documentación", "Trámites previos", "Registro civil"],
                    price_range: "Desde ₡50,000",
                    followUp: "¿Ya tienen fecha pensada para su matrimonio civil?"
                },
                'derecho corporativo': {
                    description: "Asesoría legal integral para empresas y emprendedores.",
                    details: ["Constitución de empresas", "Contratos comerciales", "Fusiones", "Compliance"],
                    price_range: "Consulta desde ₡30,000",
                    followUp: "¿Estás pensando en crear una empresa o necesitas asesoría para una existente?"
                }
            },
            
            // Patrones de texto para reconocimiento
            patterns: {
                affirmative: ['sí', 'si', 'claro', 'perfecto', 'está bien', 'de acuerdo', 'ok', 'okay', 'dale', 'genial', 'excelente', 'correcto', 'exacto', 'cierto'],
                negative: ['no', 'nope', 'nada', 'ninguno', 'ninguna', 'no me interesa', 'no gracias', 'no necesito', 'paso', 'no aplica'],
                restart: ['inicio', 'empezar', 'comenzar', 'volver', 'reiniciar', 'otra vez', 'de nuevo', 'desde el principio', 'menu', 'menú'],
                moreDubts: ['otra duda', 'otra pregunta', 'más dudas', 'más preguntas', 'algo más', 'otra consulta', 'tengo otra', 'otra cosa'],
                greeting: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'que tal', 'qué tal'],
                thanks: ['gracias', 'thank you', 'muchas gracias', 'te agradezco', 'perfecto gracias'],
                urgency: ['urgente', 'rápido', 'pronto', 'ya', 'inmediato', 'emergency', 'emergencia'],
                consultation: ['consulta', 'cita', 'reunión', 'meeting', 'hablar', 'conversar', 'contactar']
            },
            
            locations: [
                "📍 Oficina principal: La Guácima, Alajuela",
                "⏰ Horario: Lunes a Viernes, 8:00 AM - 6:00 PM",
                "📱 WhatsApp: +506 8332-6747",
                "📧 Email: contacto.abogadoslaguacima@gmail.com"
            ],
            
            urgency_keywords: ['urgente', 'emergencia', 'inmediato', 'hoy', 'ahora', 'rápido', 'pronto'],
            legal_keywords: ['demanda', 'juicio', 'tribunal', 'juzgado', 'sentencia', 'apelación', 'recurso']
        };
        
        this.init();
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }
    
    init() {
        this.createWidget();
        this.bindEvents();
        this.startConversation();
    }
    
    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.innerHTML = `
            <div class="chat-overlay" id="chatOverlay"></div>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <img src="Imagenes/botcito.png" alt="Asistente Legal" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <i class="fas fa-balance-scale" style="display: none;"></i>
                    </div>
                    <div class="chat-info">
                        <h4>Asistente Legal</h4>
                        <p>Sergio Madriz - Abogado & Notario</p>
                    </div>
                    <button class="chat-close" id="chatClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-body" id="chatBody">
                    <!-- Los mensajes se insertarán aquí -->
                </div>
                <div class="chat-input">
                    <div class="input-container">
                        <input type="text" placeholder="Escribe tu consulta..." id="messageInput">
                        <button class="send-button" id="sendButton">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
            <button class="chat-button" id="chatButton">
                <img src="Imagenes/botcito.png" alt="Chat Legal" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <i class="fab fa-whatsapp" style="display: none;"></i>
                <div class="chat-notification">1</div>
            </button>
        `;
        
        document.body.appendChild(widget);
    }
    
    bindEvents() {
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatOverlay = document.getElementById('chatOverlay');
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');
        
        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        
        // Cerrar chat al hacer clic en el overlay (solo móviles)
        if (chatOverlay) {
            chatOverlay.addEventListener('click', () => {
                if (this.isMobile) {
                    this.closeChat();
                }
            });
        }
        
        sendButton.addEventListener('click', () => this.sendMessage());
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Prevenir zoom en iOS cuando se hace doble tap
        if (this.isMobile) {
            chatButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.toggleChat();
            });
            
            // Mejorar experiencia en dispositivos táctiles
            const quickActions = document.querySelectorAll('.quick-action');
            quickActions.forEach(action => {
                action.addEventListener('touchstart', () => {
                    action.style.transform = 'scale(0.95)';
                });
                action.addEventListener('touchend', () => {
                    action.style.transform = 'scale(1)';
                });
            });
        }
        
        // Ajustar tamaño de ventana en cambio de orientación móvil
        if (this.isMobile) {
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.adjustChatWindowSize();
                }, 500);
            });
            
            window.addEventListener('resize', () => {
                if (this.isOpen) {
                    this.adjustChatWindowSize();
                }
            });
        }
        
        // Cerrar al hacer clic fuera (solo en desktop)
        if (!this.isMobile) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.chatbot-widget') && this.isOpen) {
                    this.closeChat();
                }
            });
        }
    }
    
    adjustChatWindowSize() {
        const chatWindow = document.getElementById('chatWindow');
        if (!chatWindow || !this.isMobile) return;
        
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // En móviles, el chat ya está centrado por CSS, 
        // solo necesitamos ajustes finos si es necesario
        if (viewportWidth <= 360) {
            chatWindow.style.width = '98vw';
            chatWindow.style.height = '90vh';
        } else if (viewportWidth <= 480) {
            chatWindow.style.width = '95vw';
            chatWindow.style.height = '85vh';
        } else if (viewportWidth <= 768) {
            chatWindow.style.width = '90vw';
            chatWindow.style.height = '80vh';
            chatWindow.style.maxWidth = '400px';
        }
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatButton = document.getElementById('chatButton');
        const chatOverlay = document.getElementById('chatOverlay');
        const notification = document.querySelector('.chat-notification');
        
        chatWindow.classList.add('active');
        chatButton.classList.add('active');
        if (notification) notification.style.display = 'none';
        
        // Mostrar overlay en móviles
        if (this.isMobile && chatOverlay) {
            chatOverlay.classList.add('active');
        }
        
        this.isOpen = true;
        
        // Ajustar tamaño en móviles
        if (this.isMobile) {
            this.adjustChatWindowSize();
            // Prevenir scroll del body en móviles cuando el chat está abierto
            document.body.style.overflow = 'hidden';
        }
        
        // Focus en input (solo en desktop)
        setTimeout(() => {
            const messageInput = document.getElementById('messageInput');
            if (messageInput && !this.isMobile) {
                messageInput.focus();
            }
        }, 300);
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatButton = document.getElementById('chatButton');
        const chatOverlay = document.getElementById('chatOverlay');
        
        chatWindow.classList.remove('active');
        chatButton.classList.remove('active');
        
        // Ocultar overlay en móviles
        if (this.isMobile && chatOverlay) {
            chatOverlay.classList.remove('active');
        }
        
        this.isOpen = false;
        
        // Restaurar scroll del body en móviles
        if (this.isMobile) {
            document.body.style.overflow = '';
        }
    }
    
    startConversation() {
        // Mensaje de bienvenida automático después de 3 segundos
        setTimeout(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 3000);
        
        // Primer mensaje cuando se abre
        setTimeout(() => {
            this.addBotMessage(this.knowledgeBase.greetings[0]);
            setTimeout(() => {
                this.addBotMessage(this.knowledgeBase.greetings[1]);
                this.showQuickActions([
                    "Ver servicios legales",
                    "Contactar por WhatsApp",
                    "Información de ubicación",
                    "Consulta urgente"
                ]);
            }, 1000);
        }, 500);
    }
    
    showNotification() {
        const notification = document.querySelector('.chat-notification');
        if (notification) {
            notification.style.display = 'flex';
        }
    }
    
    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Desactivar botón de envío temporalmente
        const sendButton = document.getElementById('sendButton');
        sendButton.disabled = true;
        
        // Simular typing
        this.showTyping();
        
        // Procesar mensaje con IA
        setTimeout(() => {
            this.processMessage(message);
            sendButton.disabled = false;
        }, 1500 + Math.random() * 1000);
    }
    
    addUserMessage(message) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                ${this.escapeHtml(message)}
            </div>
        `;
        
        chatBody.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Guardar en historial
        this.messages.push({
            type: 'user',
            content: message,
            timestamp: new Date()
        });
    }
    
    addBotMessage(message, options = null) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        
        let optionsHtml = '';
        if (options) {
            if (options.type === 'quick_actions') {
                optionsHtml = `<div class="quick-actions">
                    ${options.actions.map(action => `<div class="quick-action" onclick="chatbot.handleQuickAction('${action}')">${action}</div>`).join('')}
                </div>`;
            } else if (options.type === 'whatsapp') {
                optionsHtml = `<div class="whatsapp-redirect" onclick="chatbot.redirectToWhatsApp('${options.message}')">
                    <i class="fab fa-whatsapp"></i>
                    Continuar en WhatsApp
                </div>`;
            }
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Imagenes/botcito.png" alt="Asistente" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-balance-scale" style="display: none;"></i>
            </div>
            <div class="message-content">
                ${message}
                ${optionsHtml}
            </div>
        `;
        
        chatBody.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Guardar en historial
        this.messages.push({
            type: 'bot',
            content: message,
            timestamp: new Date()
        });
    }
    
    showTyping() {
        const chatBody = document.getElementById('chatBody');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Imagenes/botcito.png" alt="Asistente" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-balance-scale" style="display: none;"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatBody.appendChild(typingDiv);
        this.scrollToBottom();
        this.isTyping = true;
        
        // Remover typing indicator después de la respuesta
        setTimeout(() => {
            if (typingDiv.parentNode) {
                typingDiv.remove();
            }
            this.isTyping = false;
        }, 2000);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Detectar intención del usuario usando IA básica
        const intent = this.detectIntent(lowerMessage);
        
        switch (intent) {
            case 'greeting':
                this.handleGreeting();
                break;
            case 'services':
                this.handleServicesInquiry(lowerMessage);
                break;
            case 'contact':
                this.handleContactInquiry();
                break;
            case 'location':
                this.handleLocationInquiry();
                break;
            case 'urgent':
                this.handleUrgentInquiry(message);
                break;
            case 'pricing':
                this.handlePricingInquiry(lowerMessage);
                break;
            default:
                this.handleGeneral(message);
        }
    }
    
    detectIntent(message) {
        // Sistema básico de detección de intenciones
        if (this.containsAny(message, ['hola', 'buenos días', 'buenas tardes', 'saludos'])) {
            return 'greeting';
        }
        
        if (this.containsAny(message, ['urgente', 'emergencia', 'inmediato', 'hoy', 'ahora'])) {
            return 'urgent';
        }
        
        if (this.containsAny(message, ['precio', 'costo', 'tarifa', 'cuanto cuesta', 'honorarios'])) {
            return 'pricing';
        }
        
        if (this.containsAny(message, ['contacto', 'teléfono', 'whatsapp', 'email', 'correo'])) {
            return 'contact';
        }
        
        if (this.containsAny(message, ['ubicación', 'dirección', 'oficina', 'donde están'])) {
            return 'location';
        }
        
        if (this.containsAny(message, Object.keys(this.knowledgeBase.services)) || 
            this.containsAny(message, ['servicios', 'áreas', 'especialidades', 'qué hacen'])) {
            return 'services';
        }
        
        return 'general';
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    handleGreeting() {
        const responses = [
            "¡Hola! Es un gusto saludarte. Soy el asistente del despacho de Sergio Madriz.",
            "¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros servicios legales."
        ];
        
        this.addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
        
        setTimeout(() => {
            this.showQuickActions([
                "Ver servicios legales",
                "Contactar abogado",
                "Consulta urgente",
                "Información general"
            ]);
        }, 1000);
    }
    
    handleServicesInquiry(message) {
        // Detectar servicio específico
        let specificService = null;
        for (const service in this.knowledgeBase.services) {
            if (message.includes(service) || message.includes(service.replace(' ', ''))) {
                specificService = service;
                break;
            }
        }
        
        if (specificService) {
            const serviceInfo = this.knowledgeBase.services[specificService];
            this.addBotMessage(`📋 **${specificService.toUpperCase()}**\n\n${serviceInfo.description}\n\n**Servicios incluidos:**\n${serviceInfo.details.map(d => `• ${d}`).join('\n')}\n\n💰 ${serviceInfo.price_range}`);
            
            setTimeout(() => {
                this.addBotMessage("¿Te gustaría agendar una consulta para este tema?", {
                    type: 'whatsapp',
                    message: `Hola, me interesa información sobre ${specificService}. ¿Podrían ayudarme?`
                });
            }, 1500);
        } else {
            this.addBotMessage("🏛️ **Nuestras Áreas de Especialización:**\n\n• Derecho Penal\n• Derecho de Familia\n• Servicios Notariales\n• Matrimonios Civiles\n• Derecho Corporativo\n• Pensiones Alimentarias");
            
            setTimeout(() => {
                this.showQuickActions([
                    "Derecho Penal",
                    "Derecho Familiar", 
                    "Servicios Notariales",
                    "Matrimonios Civiles"
                ]);
            }, 1000);
        }
    }
    
    handleContactInquiry() {
        this.addBotMessage("📞 **Información de Contacto:**\n\n" + this.knowledgeBase.locations.join('\n'));
        
        setTimeout(() => {
            this.addBotMessage("¿Prefieres que te contactemos por WhatsApp o agendar una cita presencial?", {
                type: 'whatsapp',
                message: 'Hola, me gustaría agendar una consulta legal. ¿Cuándo tienen disponibilidad?'
            });
        }, 1500);
    }
    
    handleLocationInquiry() {
        this.addBotMessage("📍 **Nuestra Ubicación:**\n\nEstamos ubicados en La Guácima, Alajuela, Costa Rica.\n\n⏰ **Horarios de atención:**\nLunes a Viernes: 8:00 AM - 6:00 PM\n\n🚗 Contamos con estacionamiento disponible y fácil acceso.");
        
        setTimeout(() => {
            this.showQuickActions([
                "Ver en Google Maps",
                "Agendar cita presencial",
                "Consulta virtual",
                "Más información"
            ]);
        }, 1500);
    }
    
    handleUrgentInquiry(message) {
        this.addBotMessage("🚨 **Consulta Urgente Detectada**\n\nEntiendo que necesitas atención inmediata. Para casos urgentes, te recomiendo contactar directamente:");
        
        setTimeout(() => {
            this.addBotMessage("📱 **WhatsApp:** +506 8332-6747\n📞 **Llamada directa:** +506 8332-6747\n\n⚡ Respuesta inmediata en horario laboral", {
                type: 'whatsapp',
                message: `URGENTE: ${message}`
            });
        }, 1000);
    }
    
    handlePricingInquiry(message) {
        this.addBotMessage("💰 **Información de Honorarios:**\n\n• Consulta inicial: Desde ₡20,000\n• Servicios notariales: Desde ₡15,000\n• Matrimonios civiles: Desde ₡50,000\n• Otros servicios: Cotización personalizada\n\n*Los precios pueden variar según la complejidad del caso.");
        
        setTimeout(() => {
            this.addBotMessage("Para una cotización exacta de tu caso específico, agenda una consulta:", {
                type: 'whatsapp',
                message: 'Hola, me gustaría recibir una cotización para mis servicios legales.'
            });
        }, 1500);
    }
    
    handleGeneral(message) {
        const responses = [
            "Gracias por tu consulta. Para brindarte la mejor orientación legal, te recomiendo hablar directamente con el abogado Sergio Madriz.",
            "Tu consulta es importante. ¿Te gustaría que coordinemos una cita para revisar tu caso en detalle?",
            "Entiendo tu inquietud. Para casos específicos como el tuyo, es mejor tener una consulta personalizada."
        ];
        
        this.addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
        
        setTimeout(() => {
            this.addBotMessage("¿Prefieres una consulta presencial o iniciar por WhatsApp?", {
                type: 'whatsapp',
                message: `Consulta: ${message}`
            });
        }, 1500);
    }
    
    showQuickActions(actions) {
        const chatBody = document.getElementById('chatBody');
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message bot';
        actionsDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Imagenes/botcito.png" alt="Asistente" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-balance-scale" style="display: none;"></i>
            </div>
            <div class="message-content">
                <div class="quick-actions">
                    ${actions.map(action => `<div class="quick-action" onclick="chatbot.handleQuickAction('${action}')">${action}</div>`).join('')}
                </div>
            </div>
        `;
        
        chatBody.appendChild(actionsDiv);
        this.scrollToBottom();
    }
    
    handleQuickAction(action) {
        // Simular que el usuario escribió la acción
        this.addUserMessage(action);
        
        // Procesar la acción
        setTimeout(() => {
            this.processMessage(action.toLowerCase());
        }, 500);
    }
    
    redirectToWhatsApp(message) {
        const whatsappUrl = `https://wa.me/50683326747?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Mostrar mensaje de confirmación
        this.addBotMessage("✅ Te he redirigido a WhatsApp. El abogado Sergio Madriz te atenderá personalmente.");
    }
    
    scrollToBottom() {
        const chatBody = document.getElementById('chatBody');
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar chatbot cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en una página del sitio legal
    if (document.title.includes('Sergio Madriz') || document.title.includes('Abogado')) {
        window.chatbot = new LegalChatbot();
    }
});

// Funciones globales para interacción
window.handleQuickAction = function(action) {
    if (window.chatbot) {
        window.chatbot.handleQuickAction(action);
    }
};

window.redirectToWhatsApp = function(message) {
    if (window.chatbot) {
        window.chatbot.redirectToWhatsApp(message);
    }
};
