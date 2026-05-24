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
            
            // MEGA BASE DE CONOCIMIENTOS - PALABRAS CLAVE EXPANDIDA
            keywordAssociations: {
                // DERECHO PENAL - Palabras asociadas a lo criminal/penal
                'derecho_penal': [
                    'carcel', 'cárcel', 'prisión', 'preso', 'reo', 'detenido', 'arrestado', 'capturado',
                    'denuncia', 'querella', 'acusación', 'imputado', 'procesado', 'delito', 'crimen', 'criminal',
                    'robo', 'hurto', 'asalto', 'homicidio', 'asesinato', 'violación', 'estafa', 'fraude',
                    'drogas', 'narcóticos', 'tráfico', 'posesión', 'venta', 'distribución',
                    'violencia', 'agresión', 'golpes', 'lesiones', 'daños', 'amenazas',
                    'policía', 'oij', 'organismo', 'investigación', 'judicial', 'ministerio público',
                    'fiscal', 'fiscalía', 'tribunal penal', 'juez penal', 'defensa', 'abogado defensor',
                    'libertad', 'fianza', 'medidas', 'cautelares', 'prisión preventiva', 'casa de confianza',
                    'audiencia', 'juicio oral', 'sentencia', 'condena', 'absolución', 'veredicto',
                    'apelación', 'casación', 'recurso', 'amparo', 'habeas corpus',
                    'antecedentes', 'penales', 'record', 'criminal', 'certificación', 'judicial',
                    'reincidencia', 'excarcelación', 'libertad condicional', 'trabajo comunal',
                    'multa', 'pena', 'castigo', 'sanción', 'inhabilitación'
                ],
                
                // DERECHO FAMILIAR - Todo lo relacionado con familia
                'derecho_familiar': [
                    'divorcio', 'separación', 'matrimonio', 'esposo', 'esposa', 'cónyuge', 'pareja',
                    'hijos', 'menores', 'niños', 'bebé', 'hijo', 'hija', 'padre', 'madre', 'papá', 'mamá',
                    'pensión', 'alimentaria', 'manutención', 'cuota', 'alimentaria', 'sostén', 'económico',
                    'custodia', 'guarda', 'patria', 'potestad', 'cuidado', 'crianza', 'educación',
                    'visitas', 'régimen', 'convivencia', 'tiempo', 'compartido', 'weekend',
                    'violencia', 'doméstica', 'intrafamiliar', 'maltrato', 'abuso', 'golpes', 'agresión',
                    'reconocimiento', 'paternidad', 'filiación', 'adn', 'prueba', 'biológica',
                    'adopción', 'adoptar', 'menor', 'abandonado', 'orfanato', 'pani',
                    'tutela', 'curatela', 'incapacidad', 'adulto mayor', 'discapacidad',
                    'patrimonio', 'familiar', 'bienes', 'gananciales', 'sociedad', 'conyugal',
                    'liquidación', 'división', 'herencia', 'sucesión', 'testamento', 'legado',
                    'unión', 'libre', 'convivencia', 'concubinato', 'pareja', 'hecho',
                    'separación', 'bienes', 'deudas', 'casa', 'vehículo', 'propiedades',
                    'mediación', 'familiar', 'conciliación', 'acuerdo', 'negociación'
                ],
                
                // SERVICIOS NOTARIALES - Todo lo notarial
                'servicios_notariales': [
                    'escritura', 'pública', 'documento', 'notariar', 'protocolizar', 'legalizar',
                    'poder', 'especial', 'general', 'representación', 'autorización', 'mandato',
                    'compraventa', 'venta', 'compra', 'casa', 'terreno', 'propiedad', 'inmueble',
                    'hipoteca', 'préstamo', 'garantía', 'banco', 'financiamiento', 'crédito',
                    'herencia', 'sucesión', 'testamento', 'legado', 'herederos', 'bienes',
                    'declaratoria', 'herederos', 'inventario', 'avalúo', 'partición',
                    'donación', 'regalo', 'liberalidad', 'gratuito', 'transferencia',
                    'constitución', 'sociedad', 'empresa', 'compañía', 'corporación', 'negocio',
                    'certificación', 'copias', 'testimonios', 'fotocopias', 'auténticas',
                    'fe', 'pública', 'autenticación', 'firma', 'validación', 'verificación',
                    'registro', 'público', 'propiedad', 'mercantil', 'civil', 'inscripción',
                    'título', 'propiedad', 'plano', 'catastro', 'folio', 'real', 'finca',
                    'permiso', 'construcción', 'uso', 'suelo', 'setena', 'cfia', 'ams',
                    'divorcio', 'mutuo', 'acuerdo', 'separación', 'convenio', 'liquidación'
                ],
                
                // MATRIMONIOS CIVILES - Todo sobre bodas civiles
                'matrimonios_civiles': [
                    'matrimonio', 'civil', 'boda', 'casamiento', 'ceremonia', 'celebración',
                    'novio', 'novia', 'esposo', 'esposa', 'pareja', 'comprometidos',
                    'testigos', 'padrinos', 'madrinas', 'acompañantes', 'familia', 'invitados',
                    'requisitos', 'documentos', 'cédula', 'pasaporte', 'soltería', 'certificado',
                    'registro', 'civil', 'nacimiento', 'defunción', 'estado', 'civil',
                    'extranjero', 'foráneo', 'apostilla', 'consulado', 'embajada', 'traducción',
                    'fecha', 'hora', 'lugar', 'ubicación', 'salón', 'jardín', 'playa', 'iglesia',
                    'decreto', 'matrimonial', 'acta', 'matrimonio', 'certificación', 'copia',
                    'régimen', 'económico', 'gananciales', 'separación', 'bienes', 'capitulaciones',
                    'menor', 'edad', 'autorización', 'padres', 'permiso', 'judicial',
                    'impedimentos', 'prohibiciones', 'parentesco', 'consanguinidad', 'afinidad',
                    'divorciado', 'viudo', 'soltero', 'estado', 'previo', 'anterior'
                ],
                
                // DERECHO CORPORATIVO - Todo empresarial
                'derecho_corporativo': [
                    'empresa', 'compañía', 'sociedad', 'corporación', 'negocio', 'comercio',
                    'constitución', 'crear', 'formar', 'establecer', 'fundar', 'abrir',
                    'srl', 'limitada', 'anónima', 'sa', 'sociedad', 'responsabilidad', 'limitada',
                    'socios', 'accionistas', 'capital', 'acciones', 'participaciones', 'cuotas',
                    'junta', 'directiva', 'asamblea', 'general', 'presidente', 'gerente',
                    'registro', 'mercantil', 'inscripción', 'legal', 'personalidad', 'jurídica',
                    'tributario', 'impuestos', 'hacienda', 'patente', 'municipal', 'comercial',
                    'contratos', 'comerciales', 'proveedores', 'clientes', 'distribuidores',
                    'fusión', 'adquisición', 'compra', 'venta', 'empresa', 'negocio',
                    'liquidación', 'cierre', 'disolución', 'quiebra', 'insolvencia', 'bancarrota',
                    'marca', 'patente', 'propiedad', 'intelectual', 'copyright', 'derechos',
                    'franquicia', 'licencia', 'concesión', 'representación', 'distribución',
                    'laboral', 'empleados', 'trabajadores', 'planilla', 'ccss', 'ins',
                    'permiso', 'funcionamiento', 'operación', 'licencia', 'municipal', 'sanitario'
                ],
                
                // PALABRAS GENERALES DE CONSULTA
                'consulta_general': [
                    'consulta', 'cita', 'reunión', 'hablar', 'conversar', 'platicar', 'charlar',
                    'asesoría', 'orientación', 'consejo', 'ayuda', 'guía', 'información',
                    'urgente', 'emergencia', 'inmediato', 'rápido', 'pronto', 'ya', 'ahora',
                    'precio', 'costo', 'tarifa', 'honorarios', 'cobrar', 'pagar', 'vale',
                    'ubicación', 'dirección', 'oficina', 'despacho', 'donde', 'queda', 'está',
                    'horario', 'hora', 'tiempo', 'cuando', 'disponible', 'cita', 'agenda',
                    'whatsapp', 'teléfono', 'llamar', 'contactar', 'escribir', 'mensaje'
                ]
            },
            
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
        // Configurar ayuda contextual
        this.setupContextualHelp();
        
        // Mensaje de bienvenida automático después de 3 segundos
        setTimeout(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 3000);
        
        // Primer mensaje cuando se abre con menú visual
        setTimeout(() => {
            this.addBotMessage("¡Hola! 👋 Soy el asistente virtual del **Abogado Sergio Madriz**");
            
            setTimeout(() => {
                this.addBotMessage("¿En qué área legal puedo ayudarte hoy? Selecciona una opción:", {
                    buttons: [
                        { text: "⚖️ Derecho Penal", action: "service_derecho penal", description: "Defensa legal, procesos penales" },
                        { text: "👨‍👩‍👧‍👦 Derecho Familiar", action: "service_derecho familiar", description: "Divorcios, pensiones, custodia" },
                        { text: "� Servicios Notariales", action: "service_servicios notariales", description: "Escrituras, poderes, certificaciones" },
                        { text: "💒 Matrimonios Civiles", action: "service_matrimonios civiles", description: "Ceremonias civiles completas" },
                        { text: "🏢 Derecho Corporativo", action: "service_derecho corporativo", description: "Empresas y negocios" },
                        { text: "� Contactar Directamente", action: "contact_menu", description: "WhatsApp, teléfono, email" }
                    ]
                });
                
                // Agregar botón permanente de WhatsApp
                setTimeout(() => {
                    this.addPermanentWhatsAppButton();
                }, 500);
                
            }, 1200);
        }, 500);
    }
    
    addPermanentWhatsAppButton() {
        const chatBody = document.getElementById('chatBody');
        
        // Verificar si ya existe el botón
        if (document.querySelector('.permanent-whatsapp-btn')) {
            return;
        }
        
        const whatsappDiv = document.createElement('div');
        whatsappDiv.className = 'permanent-whatsapp-btn';
        whatsappDiv.innerHTML = `
            <div class="whatsapp-sticky-button" onclick="window.open('https://wa.me/50683326747?text=Hola,%20necesito%20asesoría%20legal', '_blank')">
                <i class="fab fa-whatsapp"></i>
                <span>💬 Contactar por WhatsApp</span>
            </div>
        `;
        
        chatBody.appendChild(whatsappDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
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
            if (options.buttons) {
                // Detectar si es un menú principal (más de 4 botones con descripciones)
                const isMainMenu = options.buttons.length >= 4 && options.buttons.some(btn => btn.description);
                
                if (isMainMenu) {
                    // Menú principal con botones grandes y descripciones
                    optionsHtml = `<div class="message-buttons menu-grid">
                        ${options.buttons.map(button => `
                            <div class="chat-button-enhanced" onclick="window.chatbot.handleQuickAction('${button.action}')">
                                <div class="chat-button-icon">${button.text.split(' ')[0]}</div>
                                <div class="chat-button-content">
                                    <div class="chat-button-title">${button.text.substring(2)}</div>
                                    ${button.description ? `<div class="chat-button-description">${button.description}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>`;
                } else {
                    // Botones normales para submenús
                    optionsHtml = `<div class="message-buttons">
                        ${options.buttons.map(button => `
                            <div class="message-option" onclick="window.chatbot.handleQuickAction('${button.action}')">
                                ${button.text}
                            </div>
                        `).join('')}
                    </div>`;
                }
            } else if (options.type === 'quick_actions') {
                optionsHtml = `<div class="quick-actions">
                    ${options.actions.map(action => `<div class="quick-action" onclick="window.chatbot.handleQuickAction('${action}')">${action}</div>`).join('')}
                </div>`;
            } else if (options.type === 'whatsapp') {
                optionsHtml = `<div class="whatsapp-redirect" onclick="window.chatbot.redirectToWhatsApp('${options.message}')">
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
        const lowerMessage = message.toLowerCase().trim();
        this.userHistory.push(lowerMessage);
        
        // 1. Rastrear comportamiento del usuario
        this.trackUserBehavior('message_sent');
        
        // 2. PRIMERA PRIORIDAD: Detectar palabras clave específicas (divorcio, carcel, etc.)
        const keywordAssociation = this.detectKeywordAssociation(lowerMessage);
        if (keywordAssociation && keywordAssociation.confidence > 0.6) {
            this.handleKeywordAssociation(keywordAssociation, message);
            return;
        }
        
        // 3. Verificar si es una emergencia
        if (this.handleEmergencyKeywords(lowerMessage)) {
            return;
        }
        
        // 4. Análisis de sentimientos
        const sentimentResponse = this.handleSentimentAnalysis(lowerMessage);
        if (sentimentResponse) {
            this.addBotMessage(sentimentResponse);
            setTimeout(() => {
                this.continueConversationAfterSentiment();
            }, 1500);
            return;
        }
        
        // 5. Detectar patrones específicos (sí, no, etc.)
        const response = this.analyzeUserInput(lowerMessage);
        
        if (response.type === 'specific') {
            this.handleSpecificResponse(response);
            return;
        }
        
        // 6. Detectar intención del usuario usando IA mejorada
        const intent = this.detectIntent(lowerMessage);
        
        switch (intent) {
            case 'affirmative':
                this.handleAffirmativeResponse();
                break;
            case 'negative':
                this.handleNegativeResponse();
                break;
            case 'restart':
                this.handleRestartRequest();
                break;
            case 'moreDubts':
                this.handleMoreDubtsRequest();
                break;
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
            case 'thanks':
                this.handleThanks();
                break;
            case 'consultation':
                this.handleConsultationRequest();
                break;
            default:
                this.handleGeneral(message);
        }
    }
    
    analyzeUserInput(message) {
        // Análisis más sofisticado de patrones de texto
        
        // Detectar respuestas afirmativas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.affirmative)) {
            return { type: 'specific', intent: 'affirmative', confidence: 0.9 };
        }
        
        // Detectar respuestas negativas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.negative)) {
            return { type: 'specific', intent: 'negative', confidence: 0.9 };
        }
        
        // Detectar solicitudes de reinicio
        if (this.matchesPattern(message, this.knowledgeBase.patterns.restart)) {
            return { type: 'specific', intent: 'restart', confidence: 0.8 };
        }
        
        // Detectar más dudas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.moreDubts)) {
            return { type: 'specific', intent: 'moreDubts', confidence: 0.8 };
        }
        
        // Detectar agradecimientos
        if (this.matchesPattern(message, this.knowledgeBase.patterns.thanks)) {
            return { type: 'specific', intent: 'thanks', confidence: 0.7 };
        }
        
        return { type: 'general', intent: null, confidence: 0 };
    }
    
    continueConversationAfterSentiment() {
        this.addBotMessage("¿En qué puedo ayudarte específicamente?", {
            buttons: [
                { text: "📋 Consultar servicios", action: "services_menu" },
                { text: "📞 Hablar con el abogado", action: "contact" },
                { text: "💰 Información de precios", action: "pricing" },
                { text: "🔄 Empezar de nuevo", action: "restart" }
            ]
        });
    }
    
    detectKeywordAssociation(message) {
        const lowerMessage = message.toLowerCase();
        
        // Buscar en todas las categorías de palabras clave
        for (const [category, keywords] of Object.entries(this.knowledgeBase.keywordAssociations)) {
            for (const keyword of keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    return {
                        category: category,
                        matchedKeyword: keyword,
                        confidence: this.calculateKeywordConfidence(lowerMessage, keyword)
                    };
                }
            }
        }
        
        return null;
    }
    
    calculateKeywordConfidence(message, keyword) {
        // Calcular confianza basada en longitud de palabra y contexto
        const messageWords = message.split(' ');
        const keywordLength = keyword.length;
        
        if (messageWords.includes(keyword)) {
            return 0.9; // Coincidencia exacta
        } else if (message.includes(keyword)) {
            return 0.7; // Coincidencia parcial
        }
        
        return 0.5; // Coincidencia básica
    }
    
    handleKeywordAssociation(association, originalMessage) {
        const { category, matchedKeyword, confidence } = association;
        
        // Respuestas específicas según la categoría detectada
        switch (category) {
            case 'derecho_penal':
                this.handlePenalKeywords(matchedKeyword, originalMessage);
                break;
            case 'derecho_familiar':
                this.handleFamiliarKeywords(matchedKeyword, originalMessage);
                break;
            case 'servicios_notariales':
                this.handleNotarialKeywords(matchedKeyword, originalMessage);
                break;
            case 'matrimonios_civiles':
                this.handleMatrimonioKeywords(matchedKeyword, originalMessage);
                break;
            case 'derecho_corporativo':
                this.handleCorporativoKeywords(matchedKeyword, originalMessage);
                break;
            case 'consulta_general':
                this.handleGeneralKeywords(matchedKeyword, originalMessage);
                break;
        }
    }
    
    handlePenalKeywords(keyword, message) {
        const responses = [
            `Veo que mencionas "${keyword}". El derecho penal es un área muy delicada que requiere atención especializada.`,
            `Entiendo tu preocupación sobre "${keyword}". En temas penales, es crucial tener una defensa adecuada.`,
            `El tema de "${keyword}" que mencionas está relacionado con derecho penal. Te puedo ayudar con eso.`
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("En **Derecho Penal** ofrecemos:", {
                buttons: [
                    { text: "🛡️ Defensa Legal", action: "penal_defensa" },
                    { text: "⚖️ Procesos Penales", action: "penal_procesos" },
                    { text: "🔒 Medidas Cautelares", action: "penal_medidas" },
                    { text: "📋 Recursos Legales", action: "penal_recursos" },
                    { text: "📞 Consulta Urgente", action: "contact_urgent" },
                    { text: "💬 WhatsApp Inmediato", action: "whatsapp_penal" }
                ]
            });
        }, 1500);
    }
    
    handleFamiliarKeywords(keyword, message) {
        const responses = [
            `Comprendo que necesitas ayuda con "${keyword}". Los asuntos familiares requieren sensibilidad y experiencia.`,
            `El tema de "${keyword}" que mencionas es parte del derecho de familia. Estamos aquí para apoyarte.`,
            `Entiendo tu situación con "${keyword}". En derecho familiar manejamos estos casos con mucho cuidado.`
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("En **Derecho de Familia** te ayudamos con:", {
                buttons: [
                    { text: "💔 Divorcios", action: "familiar_divorcio" },
                    { text: "👶 Pensiones Alimentarias", action: "familiar_pension" },
                    { text: "🏠 Custodia y Guarda", action: "familiar_custodia" },
                    { text: "👨‍👧‍👦 Régimen de Visitas", action: "familiar_visitas" },
                    { text: "🔒 Violencia Doméstica", action: "familiar_violencia" },
                    { text: "📞 Asesoría Confidencial", action: "contact_familiar" }
                ]
            });
        }, 1500);
    }
    
    handleNotarialKeywords(keyword, message) {
        const responses = [
            `Para "${keyword}" que mencionas, nuestros servicios notariales son la solución perfecta.`,
            `El trámite de "${keyword}" requiere un notario público certificado. Te puedo ayudar con eso.`,
            `Entiendo que necesitas "${keyword}". Como notario público, puedo gestionar ese documento.`
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("Como **Notario Público** ofrecemos:", {
                buttons: [
                    { text: "📋 Escrituras Públicas", action: "notarial_escrituras" },
                    { text: "✍️ Poderes Especiales", action: "notarial_poderes" },
                    { text: "🏠 Compraventas", action: "notarial_compraventa" },
                    { text: "📜 Certificaciones", action: "notarial_certificaciones" },
                    { text: "🏢 Constitución Empresas", action: "notarial_empresas" },
                    { text: "💰 Consultar Precios", action: "pricing_notarial" }
                ]
            });
        }, 1500);
    }
    
    handleMatrimonioKeywords(keyword, message) {
        const responses = [
            `¡Qué emocionante! Veo que mencionas "${keyword}". Los matrimonios civiles son una celebración muy especial.`,
            `Para "${keyword}" que mencionas, celebramos matrimonios civiles con todos los requisitos legales.`,
            `Entiendo que necesitas información sobre "${keyword}". Te ayudo con tu matrimonio civil.`
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("Para **Matrimonios Civiles** ofrecemos:", {
                buttons: [
                    { text: "💒 Ceremonia Completa", action: "matrimonio_ceremonia" },
                    { text: "📋 Requisitos Legales", action: "matrimonio_requisitos" },
                    { text: "📜 Documentación", action: "matrimonio_documentos" },
                    { text: "🌍 Extranjeros", action: "matrimonio_extranjeros" },
                    { text: "📅 Agendar Fecha", action: "matrimonio_agendar" },
                    { text: "💰 Precios y Paquetes", action: "pricing_matrimonio" }
                ]
            });
        }, 1500);
    }
    
    handleCorporativoKeywords(keyword, message) {
        const responses = [
            `Para "${keyword}" que mencionas, el derecho corporativo es fundamental para tu éxito empresarial.`,
            `El tema de "${keyword}" requiere asesoría legal especializada en empresas. Te puedo ayudar.`,
            `Entiendo tu consulta sobre "${keyword}". En derecho corporativo tenemos mucha experiencia.`
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("En **Derecho Corporativo** te asesoramos con:", {
                buttons: [
                    { text: "🏢 Constitución Empresas", action: "corporativo_constitucion" },
                    { text: "📋 Contratos Comerciales", action: "corporativo_contratos" },
                    { text: "⚖️ Compliance Legal", action: "corporativo_compliance" },
                    { text: "🤝 Fusiones y Adquisiciones", action: "corporativo_fusiones" },
                    { text: "💼 Registro Mercantil", action: "corporativo_registro" },
                    { text: "💰 Asesoría Tributaria", action: "corporativo_tributario" }
                ]
            });
        }, 1500);
    }
    
    handleGeneralKeywords(keyword, message) {
        if (['urgente', 'emergencia', 'inmediato'].includes(keyword.toLowerCase())) {
            this.handleUrgentInquiry(message);
        } else if (['precio', 'costo', 'honorarios'].includes(keyword.toLowerCase())) {
            this.handlePricingInquiry(message);
        } else if (['whatsapp', 'contactar', 'llamar'].includes(keyword.toLowerCase())) {
            this.handleContactInquiry();
        } else {
            this.offerServicesMenu();
        }
    }
    
    matchesPattern(message, patterns) {
        return patterns.some(pattern => 
            message.includes(pattern) || 
            this.fuzzyMatch(message, pattern)
        );
    }
    
    fuzzyMatch(message, pattern) {
        // Coincidencia difusa simple para typos comunes
        const distance = this.levenshteinDistance(message, pattern);
        return distance <= Math.max(1, Math.floor(pattern.length * 0.2));
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }
    
    handleSpecificResponse(response) {
        switch (response.intent) {
            case 'affirmative':
                this.handleAffirmativeResponse();
                break;
            case 'negative':
                this.handleNegativeResponse();
                break;
            case 'restart':
                this.handleRestartRequest();
                break;
            case 'moreDubts':
                this.handleMoreDubtsRequest();
                break;
            case 'thanks':
                this.handleThanks();
                break;
        }
    }
    
    handleAffirmativeResponse() {
        const randomResponse = this.getRandomResponse(this.knowledgeBase.positiveResponses);
        this.addBotMessage(randomResponse);
        
        // Continuar con la conversación basada en el contexto
        setTimeout(() => {
            if (this.currentContext === 'general') {
                this.offerServicesMenu();
            } else if (this.currentContext === 'service_inquiry') {
                this.askForMoreDetails();
            } else if (this.currentContext === 'contact_ready') {
                this.provideContactOptions();
            }
        }, 1000);
    }
    
    handleNegativeResponse() {
        const randomResponse = this.getRandomResponse(this.knowledgeBase.negativeResponses);
        this.addBotMessage(randomResponse);
        
        setTimeout(() => {
            this.offerAlternatives();
        }, 1200);
    }
    
    handleRestartRequest() {
        const randomResponse = this.getRandomResponse(this.knowledgeBase.restartResponses);
        this.addBotMessage(randomResponse);
        
        // Reiniciar el contexto
        this.currentContext = 'general';
        this.conversationStep = 'greeting';
        this.lastTopic = null;
        
        setTimeout(() => {
            this.offerServicesMenu();
        }, 1500);
    }
    
    handleMoreDubtsRequest() {
        const randomResponse = this.getRandomResponse(this.knowledgeBase.moreDubtsResponses);
        this.addBotMessage(randomResponse);
        
        setTimeout(() => {
            this.offerComprehensiveHelp();
        }, 1000);
    }
    
    handleThanks() {
        const responses = [
            "¡De nada! Es un placer ayudarte. 😊",
            "¡Con mucho gusto! Para eso estamos aquí. 👍",
            "¡No hay de qué! ¿Hay algo más en lo que pueda asistirte?",
            "¡Un placer ayudarte! El despacho de Sergio Madriz está aquí para ti. ⚖️"
        ];
        
        const randomResponse = this.getRandomResponse(responses);
        this.addBotMessage(randomResponse);
        
        setTimeout(() => {
            this.addBotMessage("¿Tienes alguna otra consulta legal o prefieres que te conecte directamente con el abogado?", {
                buttons: [
                    { text: "Tengo otra duda", action: "more_questions" },
                    { text: "Contactar al abogado", action: "contact" },
                    { text: "Estoy bien por ahora", action: "end_chat" }
                ]
            });
        }, 1500);
    }
    
    offerServicesMenu() {
        this.addBotMessage("Te puedo ayudar con información sobre nuestras áreas legales:", {
            buttons: [
                { text: "🏛️ Derecho Penal", action: "service_derecho penal" },
                { text: "👨‍👩‍👧‍👦 Derecho Familiar", action: "service_derecho familiar" },
                { text: "📋 Servicios Notariales", action: "service_servicios notariales" },
                { text: "💒 Matrimonios Civiles", action: "service_matrimonios civiles" },
                { text: "🏢 Derecho Corporativo", action: "service_derecho corporativo" },
                { text: "📞 Contactar directamente", action: "contact" }
            ]
        });
    }
    
    askForMoreDetails() {
        const prompts = [
            "Cuéntame más detalles sobre tu situación legal para poder orientarte mejor.",
            "¿Podrías darme más información sobre tu caso específico?",
            "¿En qué etapa se encuentra tu situación legal actualmente?",
            "¿Hay algún detalle particular de tu caso que te preocupe?"
        ];
        
        this.addBotMessage(this.getRandomResponse(prompts));
        this.currentContext = 'collecting_details';
    }
    
    offerAlternatives() {
        this.addBotMessage("Te puedo ofrecer estas opciones:", {
            buttons: [
                { text: "Ver otros servicios", action: "services_menu" },
                { text: "Hablar con el abogado", action: "contact" },
                { text: "Información de contacto", action: "contact_info" },
                { text: "Volver al inicio", action: "restart" }
            ]
        });
    }
    
    offerComprehensiveHelp() {
        this.addBotMessage("Estoy aquí para resolver todas tus dudas legales. ¿Sobre qué tema te gustaría saber más?", {
            buttons: [
                { text: "📚 Nuestros servicios", action: "services_menu" },
                { text: "💰 Precios y honorarios", action: "pricing" },
                { text: "📍 Ubicación y horarios", action: "location" },
                { text: "📞 Formas de contacto", action: "contact_info" },
                { text: "⚖️ Proceso legal típico", action: "legal_process" },
                { text: "🔒 Confidencialidad", action: "confidentiality" }
            ]
        });
    }
    
    provideContactOptions() {
        this.addBotMessage("¡Perfecto! Aquí tienes todas las formas de contactar al Abogado Sergio Madriz:");
        
        setTimeout(() => {
            this.addBotMessage(`
📱 WhatsApp: +506 8332-6747
📧 Email: contacto.abogadoslaguacima@gmail.com
📍 Oficina: La Guácima, Alajuela
⏰ Horario: Lunes a Viernes, 8:00 AM - 6:00 PM

¿Prefieres que te conecte por WhatsApp o tienes alguna otra pregunta?`, {
                buttons: [
                    { text: "💬 Abrir WhatsApp", action: "whatsapp" },
                    { text: "📧 Enviar email", action: "email" },
                    { text: "📅 Agendar cita", action: "schedule" },
                    { text: "❓ Tengo otra duda", action: "more_questions" }
                ]
            });
        }, 1000);
    }
    
    detectIntent(message) {
        // Sistema mejorado de detección de intenciones
        
        // Respuestas afirmativas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.affirmative)) {
            return 'affirmative';
        }
        
        // Respuestas negativas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.negative)) {
            return 'negative';
        }
        
        // Solicitudes de reinicio
        if (this.matchesPattern(message, this.knowledgeBase.patterns.restart)) {
            return 'restart';
        }
        
        // Más dudas
        if (this.matchesPattern(message, this.knowledgeBase.patterns.moreDubts)) {
            return 'moreDubts';
        }
        
        // Saludos
        if (this.matchesPattern(message, this.knowledgeBase.patterns.greeting)) {
            return 'greeting';
        }
        
        // Agradecimientos
        if (this.matchesPattern(message, this.knowledgeBase.patterns.thanks)) {
            return 'thanks';
        }
        
        // Solicitudes de consulta
        if (this.matchesPattern(message, this.knowledgeBase.patterns.consultation)) {
            return 'consultation';
        }
        
        // Urgencias
        if (this.matchesPattern(message, this.knowledgeBase.patterns.urgency)) {
            return 'urgent';
        }
        
        // Precios
        if (this.containsAny(message, ['precio', 'costo', 'tarifa', 'cuanto cuesta', 'honorarios', 'cobran', 'vale'])) {
            return 'pricing';
        }
        
        // Contacto
        if (this.containsAny(message, ['contacto', 'teléfono', 'whatsapp', 'email', 'correo', 'llamar', 'escribir'])) {
            return 'contact';
        }
        
        // Ubicación
        if (this.containsAny(message, ['ubicación', 'dirección', 'oficina', 'donde están', 'donde quedan', 'localización'])) {
            return 'location';
        }
        
        // Servicios
        if (this.containsAny(message, Object.keys(this.knowledgeBase.services)) || 
            this.containsAny(message, ['servicios', 'áreas', 'especialidades', 'qué hacen', 'que ofrecen', 'ayudan con'])) {
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
        // Análisis inteligente del mensaje no comprendido
        const analysis = this.analyzeUnknownMessage(message);
        
        if (analysis.containsLegalTerms) {
            this.handleLegalTermsMessage(message, analysis.detectedTerms);
        } else if (analysis.seemsPersonal) {
            this.handlePersonalSituationMessage(message);
        } else if (analysis.isQuestion) {
            this.handleQuestionMessage(message);
        } else {
            this.handleUnknownMessage(message);
        }
    }
    
    analyzeUnknownMessage(message) {
        const legalTerms = ['juicio', 'demanda', 'divorcio', 'pensión', 'alimentaria', 'custodia', 'herencia', 'testamento', 'contrato', 'empresa', 'sociedad', 'denuncia', 'querella', 'proceso', 'tribunal', 'juzgado', 'sentencia', 'apelación', 'recurso', 'audiencia', 'medida', 'cautelar', 'embargo', 'desalojo', 'escritura', 'poder', 'notario', 'protocolizar'];
        
        const personalIndicators = ['mi', 'me', 'tengo', 'estoy', 'mi esposo', 'mi esposa', 'mi hijo', 'mi padre', 'mi madre', 'mi ex', 'necesito', 'quiero', 'debo'];
        
        const questionIndicators = ['qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'cuál', 'quién', '?'];
        
        const detectedTerms = legalTerms.filter(term => message.toLowerCase().includes(term));
        
        return {
            containsLegalTerms: detectedTerms.length > 0,
            detectedTerms: detectedTerms,
            seemsPersonal: personalIndicators.some(indicator => message.toLowerCase().includes(indicator)),
            isQuestion: questionIndicators.some(indicator => message.toLowerCase().includes(indicator)),
            messageLength: message.length
        };
    }
    
    handleLegalTermsMessage(message, detectedTerms) {
        // Si contiene términos legales, responder específicamente
        const emphaticResponse = this.getRandomResponse(this.knowledgeBase.empatheticResponses);
        this.addBotMessage(emphaticResponse);
        
        setTimeout(() => {
            let response = "Veo que mencionas términos como: " + detectedTerms.join(', ') + ". ";
            
            // Sugerir área específica basada en términos detectados
            if (detectedTerms.some(term => ['divorcio', 'pensión', 'alimentaria', 'custodia'].includes(term))) {
                response += "Esto parece relacionado con Derecho de Familia. ";
                this.currentContext = 'derecho familiar';
            } else if (detectedTerms.some(term => ['empresa', 'sociedad', 'contrato'].includes(term))) {
                response += "Esto parece relacionado con Derecho Corporativo. ";
                this.currentContext = 'derecho corporativo';
            } else if (detectedTerms.some(term => ['denuncia', 'querella', 'proceso'].includes(term))) {
                response += "Esto parece relacionado con Derecho Penal. ";
                this.currentContext = 'derecho penal';
            } else if (detectedTerms.some(term => ['escritura', 'poder', 'notario', 'protocolizar'].includes(term))) {
                response += "Esto parece relacionado con Servicios Notariales. ";
                this.currentContext = 'servicios notariales';
            }
            
            response += "El abogado Sergio Madriz puede ayudarte específicamente con este tema.";
            
            this.addBotMessage(response, {
                buttons: [
                    { text: "📞 Contactar ahora", action: "contact" },
                    { text: "📋 Más info del área", action: `service_${this.currentContext}` },
                    { text: "💰 Consultar precios", action: "pricing" },
                    { text: "❓ Otra consulta", action: "restart" }
                ]
            });
        }, 1500);
    }
    
    handlePersonalSituationMessage(message) {
        const emphaticResponse = this.getRandomResponse(this.knowledgeBase.empatheticResponses);
        this.addBotMessage(emphaticResponse);
        
        setTimeout(() => {
            this.addBotMessage("Comprendo que compartes una situación personal. Cada caso es único y requiere atención especializada. El abogado Sergio Madriz podrá evaluar tu situación específica y brindarte la mejor orientación legal.");
            
            setTimeout(() => {
                this.addBotMessage("¿Te gustaría que te conecte directamente para una consulta confidencial?", {
                    buttons: [
                        { text: "📞 Sí, contactar ahora", action: "contact" },
                        { text: "📅 Agendar cita", action: "schedule" },
                        { text: "❓ Tengo más dudas", action: "more_questions" },
                        { text: "📋 Ver servicios", action: "services_menu" }
                    ]
                });
            }, 1200);
        }, 1000);
    }
    
    handleQuestionMessage(message) {
        const clarificationResponse = this.getRandomResponse(this.knowledgeBase.clarificationResponses);
        this.addBotMessage(clarificationResponse);
        
        setTimeout(() => {
            this.addBotMessage("Para poder ayudarte mejor, ¿podrías indicarme sobre cuál de estas áreas es tu pregunta?", {
                buttons: [
                    { text: "⚖️ Proceso legal", action: "legal_process" },
                    { text: "💰 Costos y honorarios", action: "pricing" },
                    { text: "📋 Servicios específicos", action: "services_menu" },
                    { text: "📞 Formas de contacto", action: "contact_info" },
                    { text: "📍 Ubicación y horarios", action: "location" },
                    { text: "🔄 Empezar de nuevo", action: "restart" }
                ]
            });
        }, 1200);
    }
    
    handleUnknownMessage(message) {
        const responses = [
            "Te entiendo, pero para brindarte la orientación más precisa, prefiero conectarte directamente con el abogado Sergio Madriz.",
            "Tu consulta es importante. Para casos específicos como el tuyo, es mejor tener una evaluación personalizada.",
            "Comprendo tu situación. El abogado Sergio puede revisar tu caso en detalle y darte la mejor asesoría."
        ];
        
        this.addBotMessage(this.getRandomResponse(responses));
        
        setTimeout(() => {
            this.addBotMessage("Mientras tanto, ¿te puedo ayudar con alguna de estas opciones?", {
                buttons: [
                    { text: "📞 Contactar al abogado", action: "contact" },
                    { text: "📋 Ver nuestros servicios", action: "services_menu" },
                    { text: "💰 Información de precios", action: "pricing" },
                    { text: "📍 Ubicación y horarios", action: "location" },
                    { text: "🔄 Volver al inicio", action: "restart" }
                ]
            });
        }, 1500);
    }
    
    getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
    
    handleConsultationRequest() {
        this.addBotMessage("¡Excelente! Te ayudo a coordinar una consulta con el abogado Sergio Madriz.");
        
        setTimeout(() => {
            this.addBotMessage("¿Qué tipo de consulta prefieres?", {
                buttons: [
                    { text: "📱 WhatsApp inmediato", action: "whatsapp" },
                    { text: "📞 Llamada telefónica", action: "phone" },
                    { text: "🏢 Cita presencial", action: "in_person" },
                    { text: "📧 Consulta por email", action: "email" }
                ]
            });
        }, 1000);
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
        // Rastrear comportamiento del usuario
        this.trackUserBehavior(action);
        
        try {
            // Manejar acciones específicas del menú
            switch (action) {
                // SERVICIOS PRINCIPALES DEL MENÚ
                case 'service_derecho penal':
                    if (typeof this.handleDerechoPenalComplete === 'function') {
                        this.handleDerechoPenalComplete();
                    } else {
                        this.addBotMessage("⚖️ **DERECHO PENAL**");
                        setTimeout(() => this.showMainMenu(), 1000);
                    }
                    break;
                case 'service_derecho familiar':
                    if (typeof this.handleDerechoFamiliarComplete === 'function') {
                        this.handleDerechoFamiliarComplete();
                    } else {
                        this.addBotMessage("👨‍👩‍👧‍👦 **DERECHO FAMILIAR**");
                        setTimeout(() => this.showMainMenu(), 1000);
                    }
                    break;
                case 'service_servicios notariales':
                    if (typeof this.handleServiciosNotarialesComplete === 'function') {
                        this.handleServiciosNotarialesComplete();
                    } else {
                        this.addBotMessage("📋 **SERVICIOS NOTARIALES**");
                        setTimeout(() => this.showMainMenu(), 1000);
                    }
                    break;
                case 'service_matrimonios civiles':
                    if (typeof this.handleMatrimoniosCivilesComplete === 'function') {
                        this.handleMatrimoniosCivilesComplete();
                    } else {
                        this.addBotMessage("💒 **MATRIMONIOS CIVILES**");
                        setTimeout(() => this.showMainMenu(), 1000);
                    }
                    break;
                case 'service_derecho corporativo':
                    if (typeof this.handleDerechoCorporativoComplete === 'function') {
                        this.handleDerechoCorporativoComplete();
                    } else {
                        this.addBotMessage("🏢 **DERECHO CORPORATIVO**");
                        setTimeout(() => this.showMainMenu(), 1000);
                    }
                    break;
                case 'contact_menu':
                    if (typeof this.handleContactMenuComplete === 'function') {
                        this.handleContactMenuComplete();
                    } else {
                        this.handleContactInquiry();
                    }
                    break;
                
            // SUBMENUES DE DERECHO PENAL
            case 'penal_defensa':
                this.handlePenalDefensa();
                break;
            case 'penal_procesos':
                this.handlePenalProcesos();
                break;
            case 'penal_medidas':
                this.handlePenalMedidas();
                break;
            case 'penal_recursos':
                this.handlePenalRecursos();
                break;
                
            // SUBMENUES DE DERECHO FAMILIAR
            case 'familiar_divorcio':
                this.handleFamiliarDivorcio();
                break;
            case 'familiar_pension':
                this.handleFamiliarPension();
                break;
            case 'familiar_custodia':
                this.handleFamiliarCustodia();
                break;
            case 'familiar_visitas':
                this.handleFamiliarVisitas();
                break;
            case 'familiar_violencia':
                this.handleFamiliarViolencia();
                break;
                
            // SUBMENUES NOTARIALES
            case 'notarial_escrituras':
                this.handleNotarialEscrituras();
                break;
            case 'notarial_poderes':
                this.handleNotarialPoderes();
                break;
            case 'notarial_compraventa':
                this.handleNotarialCompraventa();
                break;
            case 'notarial_certificaciones':
                this.handleNotarialCertificaciones();
                break;
            case 'notarial_empresas':
                this.handleNotarialEmpresas();
                break;
                
            // SUBMENUES MATRIMONIOS
            case 'matrimonio_ceremonia':
                this.handleMatrimonioCeremonia();
                break;
            case 'matrimonio_requisitos':
                this.handleMatrimonioRequisitos();
                break;
            case 'matrimonio_documentos':
                this.handleMatrimonioDocumentos();
                break;
            case 'matrimonio_extranjeros':
                this.handleMatrimonioExtranjeros();
                break;
            case 'matrimonio_agendar':
                this.handleMatrimonioAgendar();
                break;
                
            // SUBMENUES CORPORATIVO
            case 'corporativo_constitucion':
                this.handleCorporativoConstitucion();
                break;
            case 'corporativo_contratos':
                this.handleCorporativoContratos();
                break;
            case 'corporativo_compliance':
                this.handleCorporativoCompliance();
                break;
            case 'corporativo_fusiones':
                this.handleCorporativoFusiones();
                break;
            case 'corporativo_registro':
                this.handleCorporativoRegistro();
                break;
            case 'corporativo_tributario':
                this.handleCorporativoTributario();
                break;
                
            // ACCIONES GENERALES
            case 'services_menu':
            case 'restart':
                this.showMainMenu();
                break;
            case 'contact':
            case 'whatsapp':
                this.handleContactInquiry();
                break;
            case 'pricing':
                this.handlePricingInquiry('precios');
                break;
            case 'location':
                this.handleLocationInquiry();
                break;
            case 'urgent_consultation':
                this.handleUrgentInquiry('consulta urgente');
                break;
            case 'more_questions':
                this.handleMoreDubtsRequest();
                break;
            case 'whatsapp_urgent':
                this.redirectToWhatsApp('🚨 CONSULTA URGENTE: Necesito asesoría legal inmediata');
                break;
            case 'call_now':
                this.handleCallNow();
                break;
            case 'contact_urgent':
                this.handleContactUrgent();
                break;
            case 'whatsapp_penal':
                this.redirectToWhatsApp('Necesito asesoría en Derecho Penal');
                break;
            case 'contact_familiar':
                this.redirectToWhatsApp('Necesito asesoría en Derecho de Familia');
                break;
            case 'pricing_notarial':
                this.handlePricingNotarial();
                break;
            case 'pricing_matrimonio':
                this.handlePricingMatrimonio();
                break;
            case 'end_chat':
                this.handleEndChat();
                break;
            default:
                // Si no es una acción específica, procesarla como mensaje normal
                this.addUserMessage(action);
                setTimeout(() => {
                    this.processMessage(action.toLowerCase());
                }, 500);
                break;
        }
        } catch (error) {
            console.error('Error handling quick action:', error);
            this.addBotMessage("⚠️ Hubo un error procesando tu solicitud. ¿Puedes intentar de nuevo?");
            setTimeout(() => this.showMainMenu(), 1000);
        }
    }
    
    // Métodos temporales básicos para menú principal (serán sobrescritos por prototipos)
    handleDerechoPenalComplete() {
        this.addBotMessage("⚖️ **DERECHO PENAL** - Defensa Legal Especializada");
        setTimeout(() => {
            this.addBotMessage("En Derecho Penal ofrecemos defensa integral en casos criminales. ¿Te puedo ayudar con información específica?", {
                buttons: [
                    { text: "📞 Contactar Ahora", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    handleDerechoFamiliarComplete() {
        this.addBotMessage("👨‍👩‍👧‍👦 **DERECHO DE FAMILIA** - Soluciones Legales Familiares");
        setTimeout(() => {
            this.addBotMessage("En Derecho de Familia manejamos divorcios, pensiones alimentarias, custodia y más. ¿En qué puedo ayudarte?", {
                buttons: [
                    { text: "📞 Contactar Ahora", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    handleServiciosNotarialesComplete() {
        this.addBotMessage("📋 **SERVICIOS NOTARIALES** - Notario Público Certificado");
        setTimeout(() => {
            this.addBotMessage("Como Notario Público, brindo fe pública a todos tus documentos legales. ¿Qué trámite necesitas?", {
                buttons: [
                    { text: "📞 Contactar Ahora", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    handleMatrimoniosCivilesComplete() {
        this.addBotMessage("💒 **MATRIMONIOS CIVILES** - Celebramos tu Momento Especial");
        setTimeout(() => {
            this.addBotMessage("¡Celebramos matrimonios civiles en La Guácima y toda la provincia de Alajuela! ¿Te puedo ayudar con información?", {
                buttons: [
                    { text: "📞 Contactar Ahora", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    handleDerechoCorporativoComplete() {
        this.addBotMessage("🏢 **DERECHO CORPORATIVO** - Asesoría Legal para Empresas");
        setTimeout(() => {
            this.addBotMessage("En Derecho Corporativo asesoramos a empresarios y emprendedores en todos los aspectos legales. ¿En qué puedo ayudarte?", {
                buttons: [
                    { text: "📞 Contactar Ahora", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    handleContactMenuComplete() {
        this.addBotMessage("📞 **CONTACTO DIRECTO** - Todas las formas de comunicarte con nosotros");
        setTimeout(() => {
            this.addBotMessage("**📱 WhatsApp:** +506 8332-6747\n**📧 Email:** contacto.abogadoslaguacima@gmail.com\n**📍 Oficina:** La Guácima, Alajuela", {
                buttons: [
                    { text: "💬 WhatsApp Inmediato", action: "whatsapp" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1000);
    }
    
    showMainMenu() {
        this.addBotMessage("🏠 **MENÚ PRINCIPAL** - ¿En qué área legal puedo ayudarte?", {
            buttons: [
                { text: "⚖️ Derecho Penal", action: "service_derecho penal", description: "Defensa legal, procesos penales" },
                { text: "👨‍👩‍👧‍👦 Derecho Familiar", action: "service_derecho familiar", description: "Divorcios, pensiones, custodia" },
                { text: "📋 Servicios Notariales", action: "service_servicios notariales", description: "Escrituras, poderes, certificaciones" },
                { text: "💒 Matrimonios Civiles", action: "service_matrimonios civiles", description: "Ceremonias civiles completas" },
                { text: "🏢 Derecho Corporativo", action: "service_derecho corporativo", description: "Empresas y negocios" },
                { text: "📞 Contactar Directamente", action: "contact_menu", description: "WhatsApp, teléfono, email" }
            ]
        });
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
        window.legalChatbot = window.chatbot; // Alias para compatibilidad
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

// Extensiones inteligentes del chatbot
LegalChatbot.prototype.setupContextualHelp = function() {
    // Detectar la página actual para ofrecer ayuda contextual
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('areas.html')) {
        this.currentContext = 'services_page';
    } else if (currentPage.includes('contacto.html')) {
        this.currentContext = 'contact_page';
    } else if (currentPage.includes('quien-soy.html')) {
        this.currentContext = 'about_page';
    } else {
        this.currentContext = 'home_page';
    }
};

LegalChatbot.prototype.handlePageSpecificGreeting = function() {
    let greeting = "¡Hola! ";
    
    switch (this.currentContext) {
        case 'services_page':
            greeting += "Veo que estás explorando nuestros servicios legales. ¿Te puedo ayudar con información específica sobre algún área?";
            break;
        case 'contact_page':
            greeting += "¡Perfecto! Estás en la página de contacto. ¿Prefieres que te ayude a contactar directamente o tienes alguna pregunta antes?";
            break;
        case 'about_page':
            greeting += "Veo que quieres conocer más sobre el abogado Sergio Madriz. ¿Te puedo ayudar con alguna consulta específica?";
            break;
        default:
            greeting += "Soy el asistente virtual del despacho de Sergio Madriz. ¿En qué puedo ayudarte hoy?";
    }
    
    return greeting;
};

LegalChatbot.prototype.handleEmergencyKeywords = function(message) {
    const emergencyWords = ['urgente', 'emergencia', 'inmediato', 'crisis', 'ayuda', 'problema grave'];
    
    if (emergencyWords.some(word => message.toLowerCase().includes(word))) {
        this.addBotMessage("⚠️ Entiendo que es una situación urgente. Para emergencias legales, te recomiendo contactar inmediatamente al abogado Sergio Madriz:");
        
        setTimeout(() => {
            this.addBotMessage(`📱 WhatsApp: +506 8332-6747 (Respuesta rápida)
📞 También puedes llamar directamente

¿Quieres que te conecte por WhatsApp ahora mismo?`, {
                buttons: [
                    { text: "🚨 WhatsApp URGENTE", action: "whatsapp_urgent" },
                    { text: "📞 Llamar ahora", action: "call_now" }
                ]
            });
        }, 800);
        
        return true;
    }
    return false;
};

LegalChatbot.prototype.trackUserBehavior = function(action) {
    // Rastrear comportamiento del usuario para mejorar respuestas
    if (!this.userBehavior) {
        this.userBehavior = {
            interactions: 0,
            topicsExplored: [],
            preferredContact: null,
            sessionDuration: Date.now()
        };
    }
    
    this.userBehavior.interactions++;
    
    if (action.startsWith('service_')) {
        const service = action.replace('service_', '');
        if (!this.userBehavior.topicsExplored.includes(service)) {
            this.userBehavior.topicsExplored.push(service);
        }
    }
    
    if (action === 'whatsapp' || action === 'email' || action === 'phone') {
        this.userBehavior.preferredContact = action;
    }
};

LegalChatbot.prototype.handleSentimentAnalysis = function(message) {
    // Análisis básico de sentimientos
    const positiveWords = ['excelente', 'perfecto', 'genial', 'bueno', 'gracias', 'satisfecho', 'contento'];
    const negativeWords = ['problema', 'malo', 'terrible', 'preocupado', 'estresado', 'confundido', 'perdido'];
    const fearWords = ['miedo', 'temor', 'asustado', 'nervioso', 'ansiedad'];
    
    const sentiment = {
        positive: positiveWords.some(word => message.toLowerCase().includes(word)),
        negative: negativeWords.some(word => message.toLowerCase().includes(word)),
        fearful: fearWords.some(word => message.toLowerCase().includes(word))
    };
    
    if (sentiment.fearful) {
        return "Comprendo que puedes sentir incertidumbre sobre temas legales. Es completamente normal. El abogado Sergio Madriz te brindará la tranquilidad y claridad que necesitas. ¿Te gustaría hablar con él?";
    } else if (sentiment.negative) {
        return "Entiendo tu preocupación. Los asuntos legales pueden ser complejos, pero estás en buenas manos. ¿En qué específicamente puedo ayudarte a sentirte más tranquilo/a?";
    } else if (sentiment.positive) {
        return "¡Me alegra tu actitud positiva! Eso facilita mucho el proceso legal. ¿Cómo puedo ayudarte a mantener esa buena energía resolviendo tus necesidades legales?";
    }
    
    return null;
};

// ===== MÉTODOS PRINCIPALES PARA CADA ÁREA LEGAL =====

LegalChatbot.prototype.handleDerechoPenalComplete = function() {
    this.addBotMessage("⚖️ **DERECHO PENAL** - Defensa Legal Especializada");
    
    setTimeout(() => {
        this.addBotMessage(`En **Derecho Penal** ofrecemos defensa integral en casos criminales. Nuestro enfoque es proteger tus derechos fundamentales en cada etapa del proceso.

**🛡️ Servicios que ofrecemos:**
• Defensa en procesos penales
• Representación en audiencias
• Medidas cautelares y libertad provisional
• Recursos de apelación y casación
• Asesoría en investigaciones del OIJ
• Defensa contra delitos económicos
• Casos de violencia doméstica
• Delitos contra la vida e integridad física

**💰 Desde ₡25,000** la consulta inicial
**⏰ Atención de emergencia 24/7**`);
        
        setTimeout(() => {
            this.addBotMessage("¿En qué aspecto específico del derecho penal necesitas ayuda?", {
                buttons: [
                    { text: "🛡️ Defensa Legal", action: "penal_defensa" },
                    { text: "⚖️ Procesos Penales", action: "penal_procesos" },
                    { text: "🔒 Medidas Cautelares", action: "penal_medidas" },
                    { text: "📋 Recursos Legales", action: "penal_recursos" },
                    { text: "🚨 Consulta Urgente", action: "whatsapp_penal" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1500);
    }, 1000);
};

LegalChatbot.prototype.handleDerechoFamiliarComplete = function() {
    this.addBotMessage("👨‍👩‍👧‍👦 **DERECHO DE FAMILIA** - Soluciones con Sensibilidad y Profesionalismo");
    
    setTimeout(() => {
        this.addBotMessage(`En **Derecho de Familia** manejamos los asuntos más delicados con el cuidado y la experiencia que tu familia merece.

**💕 Servicios especializados:**
• Divorcios y separaciones
• Pensiones alimentarias
• Guarda y custodia de menores
• Régimen de visitas
• Reconocimiento de paternidad
• Adopciones
• Violencia doméstica e intrafamiliar
• Liquidación de patrimonio familiar
• Uniones de hecho

**💰 Desde ₡20,000** la consulta inicial
**🤝 Mediación familiar disponible**`);
        
        setTimeout(() => {
            this.addBotMessage("¿Qué situación familiar necesitas resolver?", {
                buttons: [
                    { text: "💔 Divorcios", action: "familiar_divorcio" },
                    { text: "👶 Pensiones Alimentarias", action: "familiar_pension" },
                    { text: "🏠 Custodia y Guarda", action: "familiar_custodia" },
                    { text: "👨‍👧‍👦 Régimen de Visitas", action: "familiar_visitas" },
                    { text: "🔒 Violencia Doméstica", action: "familiar_violencia" },
                    { text: "📞 Consulta Confidencial", action: "contact_familiar" }
                ]
            });
        }, 1500);
    }, 1000);
};

LegalChatbot.prototype.handleServiciosNotarialesComplete = function() {
    this.addBotMessage("📋 **SERVICIOS NOTARIALES** - Notario Público Certificado en La Guácima");
    
    setTimeout(() => {
        this.addBotMessage(`Como **Notario Público**, brindo fe pública a todos tus documentos y trámites legales con total seguridad jurídica.

**📜 Servicios notariales:**
• Escrituras públicas
• Poderes especiales y generales
• Compraventas de propiedades
• Hipotecas y garantías
• Certificaciones y autenticaciones
• Constitución de sociedades
• Declaratorias de herederos
• Testamentos y donaciones
• Protocolización de documentos

**💰 Desde ₡15,000** según el trámite
**📍 Oficina en La Guácima, Alajuela**`);
        
        setTimeout(() => {
            this.addBotMessage("¿Qué documento o trámite notarial necesitas?", {
                buttons: [
                    { text: "📋 Escrituras Públicas", action: "notarial_escrituras" },
                    { text: "✍️ Poderes Especiales", action: "notarial_poderes" },
                    { text: "🏠 Compraventas", action: "notarial_compraventa" },
                    { text: "📜 Certificaciones", action: "notarial_certificaciones" },
                    { text: "🏢 Constitución Empresas", action: "notarial_empresas" },
                    { text: "💰 Consultar Precios", action: "pricing_notarial" }
                ]
            });
        }, 1500);
    }, 1000);
};

LegalChatbot.prototype.handleMatrimoniosCivilesComplete = function() {
    this.addBotMessage("💒 **MATRIMONIOS CIVILES** - Celebramos tu Momento Especial");
    
    setTimeout(() => {
        this.addBotMessage(`¡Celebramos **matrimonios civiles** en La Guácima y toda la provincia de Alajuela! Nos encargamos de todos los aspectos legales para que solo te preocupes por disfrutar tu día especial.

**💐 Servicios incluidos:**
• Ceremonia civil completa
• Revisión de requisitos legales
• Tramitación de documentos
• Atención a extranjeros
• Asesoría sobre régimen económico
• Acta de matrimonio
• Certificaciones posteriores
• Coordinación con registro civil

**💰 Desde ₡50,000** ceremonia completa
**🌍 Especializados en matrimonios de extranjeros**`);
        
        setTimeout(() => {
            this.addBotMessage("¿En qué aspecto de tu matrimonio civil te puedo ayudar?", {
                buttons: [
                    { text: "💒 Ceremonia Completa", action: "matrimonio_ceremonia" },
                    { text: "📋 Requisitos Legales", action: "matrimonio_requisitos" },
                    { text: "📜 Documentación", action: "matrimonio_documentos" },
                    { text: "🌍 Soy Extranjero/a", action: "matrimonio_extranjeros" },
                    { text: "📅 Agendar Fecha", action: "matrimonio_agendar" },
                    { text: "💰 Precios y Paquetes", action: "pricing_matrimonio" }
                ]
            });
        }, 1500);
    }, 1000);
};

LegalChatbot.prototype.handleDerechoCorporativoComplete = function() {
    this.addBotMessage("🏢 **DERECHO CORPORATIVO** - Asesoría Legal Integral para Empresas");
    
    setTimeout(() => {
        this.addBotMessage(`En **Derecho Corporativo** asesoramos a empresarios y emprendedores en todos los aspectos legales del mundo empresarial.

**💼 Servicios empresariales:**
• Constitución de sociedades (SRL, SA)
• Contratos comerciales
• Fusiones y adquisiciones
• Compliance y cumplimiento normativo
• Registro mercantil
• Asesoría tributaria empresarial
• Contratos laborales
• Marcas y propiedad intelectual
• Liquidación de empresas
• Representación ante instituciones

**💰 Desde ₡30,000** la consulta inicial
**📊 Planes corporativos anuales disponibles**`);
        
        setTimeout(() => {
            this.addBotMessage("¿En qué aspecto empresarial necesitas asesoría?", {
                buttons: [
                    { text: "🏢 Constitución Empresas", action: "corporativo_constitucion" },
                    { text: "📋 Contratos Comerciales", action: "corporativo_contratos" },
                    { text: "⚖️ Compliance Legal", action: "corporativo_compliance" },
                    { text: "🤝 Fusiones y Adquisiciones", action: "corporativo_fusiones" },
                    { text: "💼 Registro Mercantil", action: "corporativo_registro" },
                    { text: "💰 Asesoría Tributaria", action: "corporativo_tributario" }
                ]
            });
        }, 1500);
    }, 1000);
};

LegalChatbot.prototype.handleContactMenuComplete = function() {
    this.addBotMessage("📞 **CONTACTO DIRECTO** - Todas las formas de comunicarte con nosotros");
    
    setTimeout(() => {
        this.addBotMessage(`¡Excelente! Aquí tienes todas las formas de contactar al **Abogado Sergio Madriz**:

**📱 WhatsApp:** +506 8332-6747
• Respuesta rápida en horario laboral
• Consultas urgentes las 24 horas
• Envío de documentos

**📧 Email:** contacto.abogadoslaguacima@gmail.com
• Consultas detalladas
• Envío de documentación
• Cotizaciones

**📍 Oficina:** La Guácima, Alajuela
**⏰ Horario:** Lunes a Viernes, 8:00 AM - 6:00 PM

**🚨 Para emergencias legales:** WhatsApp disponible 24/7`);
        
        setTimeout(() => {
            this.addBotMessage("¿Cómo prefieres contactarnos?", {
                buttons: [
                    { text: "💬 WhatsApp Inmediato", action: "whatsapp" },
                    { text: "📧 Enviar Email", action: "email" },
                    { text: "📅 Agendar Cita Presencial", action: "schedule" },
                    { text: "🚨 Consulta Urgente", action: "urgent_consultation" },
                    { text: "📍 Ver Ubicación", action: "location" },
                    { text: "🔄 Volver al menú", action: "services_menu" }
                ]
            });
        }, 1500);
    }, 1000);
};

// ===== MÉTODOS AUXILIARES =====

LegalChatbot.prototype.showMainMenu = function() {
    this.addBotMessage("🏠 **MENÚ PRINCIPAL** - ¿En qué área legal puedo ayudarte?", {
        buttons: [
            { text: "⚖️ Derecho Penal", action: "service_derecho penal", description: "Defensa legal, procesos penales" },
            { text: "👨‍👩‍👧‍👦 Derecho Familiar", action: "service_derecho familiar", description: "Divorcios, pensiones, custodia" },
            { text: "📋 Servicios Notariales", action: "service_servicios notariales", description: "Escrituras, poderes, certificaciones" },
            { text: "💒 Matrimonios Civiles", action: "service_matrimonios civiles", description: "Ceremonias civiles completas" },
            { text: "🏢 Derecho Corporativo", action: "service_derecho corporativo", description: "Empresas y negocios" },
            { text: "📞 Contactar Directamente", action: "contact_menu", description: "WhatsApp, teléfono, email" }
        ]
    });
    
    // Agregar botón permanente de WhatsApp
    setTimeout(() => {
        this.addPermanentWhatsAppButton();
    }, 500);
};
