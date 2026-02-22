// ========================================
// CHATBOT VOICEFLOW - CONFIGURACIÓN
// ========================================

(function(d, t) {
    'use strict';
    
    var v = d.createElement(t), 
        s = d.getElementsByTagName(t)[0];
    
    v.onload = function() {
        console.log('✅ Chatbot de KORA cargado correctamente');
        
        // Configuración del chatbot
        window.voiceflow.chat.load({
            verify: { 
                projectID: '699b47fad96c5bc64fd64282' 
            },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
                url: "https://runtime-api.voiceflow.com"
            }
        }).then(() => {
            console.log('✅ Chatbot de KORA inicializado');
            
            // Opcional: personalizar mensaje de bienvenida
            setTimeout(() => {
                if (window.voiceflow && window.voiceflow.chat) {
                    // Puedes enviar un mensaje de inicio personalizado si lo deseas
                    // window.voiceflow.chat.sendText('Hola');
                }
            }, 1000);
        }).catch(error => {
            console.error('❌ Error al cargar el chatbot:', error);
        });
    };
    
    v.onerror = function() {
        console.error('❌ Error al cargar el script del chatbot');
    };
    
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
    v.type = "text/javascript"; 
    s.parentNode.insertBefore(v, s);
    
})(document, 'script');

// ========================================
// FUNCIONES ADICIONALES PARA EL CHATBOT
// ========================================

// Función para mostrar/ocultar el chatbot manualmente (opcional)
function toggleChatbot() {
    if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.toggle();
    }
}

// Función para cerrar el chatbot
function closeChatbot() {
    if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.close();
    }
}

// Función para abrir el chatbot
function openChatbot() {
    if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.open();
    }
}

// Función para enviar un mensaje específico
function sendToChatbot(message) {
    if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.sendText(message);
    }
}

// Exportar funciones al ámbito global para poder usarlas desde la consola o eventos HTML
window.KoraChat = {
    toggle: toggleChatbot,
    open: openChatbot,
    close: closeChatbot,
    send: sendToChatbot
};

console.log(' Funciones del chatbot disponibles: window.KoraChat');