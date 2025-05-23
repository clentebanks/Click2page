const faq = [
  { q: /what.*templates/i, a: "Click2Page offers responsive HTML, CSS, Bootstrap, and JavaScript templates optimized for landing pages, portfolios, and small business websites." },
  { q: /customize.*templates?/i, a: "Yes! All templates are fully editable using the integrated Google Sheet or by editing the HTML/CSS directly." },
  { q: /how.*one.?click.*work/i, a: "Just click the integration button to automatically generate a linked Google Sheet that controls your website content." },
  { q: /need.*google.*account/i, a: "Yes, a Google account is needed to create and edit your site's content from the sheet." },
  { q: /edit.*content.*sheet/i, a: "You can modify text, images, buttons, colors, and even full sections like testimonials or pricing—all from the sheet." },
  { q: /collaborat.*team/i, a: "Yes, you can share the sheet and work with others in real-time. Everyone sees updates instantly." },
  { q: /download.*template/i, a: "Absolutely! You can download any template in a ZIP file to host or modify it as you wish." },
  { q: /need.*coding.*custom/i, a: "No coding is needed if you use the Google Sheet integration. But advanced users can edit the code too." },
  { q: /need.*help|support/i, a: "No worries! I'm here to help. Just ask a question, and I’ll guide you through setting things up." },
  { q: /non.*tech|beginner|no.*code/i, a: "Yes! Click2Page is made for non-tech users who want a professional site with zero coding." }
];

const chatbotArea = document.getElementById('chatbot-area');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotButton = document.getElementById('chatbot-button');
let isOpen = false;
let timeout;

// Hover (desktop)
chatbotArea.addEventListener('mouseenter', () => {
  clearTimeout(timeout);
  chatbotWindow.style.display = 'flex';
  isOpen = true;
});

chatbotArea.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    chatbotWindow.style.display = 'none';
    isOpen = false;
  }, 500);
});

// Touch (mobile)
chatbotButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isOpen = !isOpen;
  chatbotWindow.style.display = isOpen ? 'flex' : 'none';
});

// "Chat Now" external button trigger
function openChat() {
  chatbotWindow.style.display = 'flex';
  chatbotWindow.scrollIntoView({ behavior: 'smooth' });
  isOpen = true;
}

// Close button
function closeChat() {
  chatbotWindow.style.display = 'none';
  isOpen = false;
}

// Handle input and match questions
function checkInput(event) {
  if (event.key === 'Enter' && event.target.value.trim() !== '') {
    sendChatMessage(event.target.value.trim());
  }
}
function sendChatMessage(message) {
  const chatContent = document.getElementById('chatbot-content');
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // User bubble
  chatContent.innerHTML += `
    <div class="chat-message user-message">
      <div class="bubble">${escapeHTML(message)}</div>
      <small class="timestamp">${time}</small>
    </div>`;
  chatContent.scrollTop = chatContent.scrollHeight;

  // Typing animation bubble
  const typingEl = document.createElement("div");
  typingEl.className = "chat-message ai-message";
  typingEl.innerHTML = `
    <div class="bubble typing-dots">
      <span></span><span></span><span></span>
    </div>`;
  chatContent.appendChild(typingEl);
  chatContent.scrollTop = chatContent.scrollHeight;

  const match = faq.find(f => f.q.test(message));
  const reply = match ? match.a : "🤖 I'm not sure about that yet, but you can ask me about templates, setup, or editing tips!";

  setTimeout(() => {
    typingEl.remove();
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // AI reply bubble
    chatContent.innerHTML += `
      <div class="chat-message ai-message">
        <div class="bubble">${reply}</div>
        <small class="timestamp">${replyTime}</small>
      </div>`;
    document.getElementById('chat-input').value = '';
    chatContent.scrollTop = chatContent.scrollHeight;
  }, 1000);
}


// Basic HTML escape to prevent XSS (optional safety)
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#039;'
  }[tag]));
}

// function sendChatMessage(message) {
//   const chatContent = document.getElementById('chatbot-content');
//   chatContent.innerHTML += `<div class="user mb-2"><strong>You:</strong> ${message}</div>`;
//   const match = faq.find(f => f.q.test(message));
//   const reply = match ? match.a : "I'm not sure about that yet, but you can ask me about templates, setup, or editing tips!";
//   setTimeout(() => {
//     chatContent.innerHTML += `<div class="ai mb-3"><strong>AI:</strong> ${reply}</div>`;
//     document.getElementById('chat-input').value = '';
//     chatContent.scrollTop = chatContent.scrollHeight;
//   }, 600);
// }

// Show or hide the "Return to Top" button based on scroll position
const returnToTopBtn = document.getElementById('returnToTopBtn');

window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    returnToTopBtn.classList.remove('d-none');
    returnToTopBtn.style.opacity = '1';
  } else {
    returnToTopBtn.style.opacity = '0';
    setTimeout(() => {
      returnToTopBtn.classList.add('d-none');
    }, 400); // Wait for fade-out before hiding
  }
};

returnToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


/*language IDs and text keys*/
const translations = {
  en: {
    heroTitle: `Build Smarter Sites with <span class="highlight-text">Click2Page</span>`,
    heroSubtitle: "Instantly launch an editable website using Google Sheets — no code, no stress.",
    btnStart: "Create Your Sheet",
    herolinkExample:"Browse Examples ↓",

    howItWorksTitle: "How It Works in 3 Easy Steps",
    step1Title: "1. Choose a Template",
    step1Desc: "Pick from modern templates (HTML + CSS + JS).",
    step2Title: "2. Click the Magic Button",
    step2Desc: "We'll create a Google Sheet linked to your content.",
    step3Title: "3. Edit Content from Google Sheets",
    step3Desc: "Change texts, images & styles in seconds — no code needed.",

    featuresTitle: "Turn Your Website Into a No-Code CRM with One Click.",
    feature1Title: "Easy Editing",
    feature1Desc: "Change anything using a Google Sheet.",
    feature2Title: "No Developer Needed",
    feature2Desc: "Clients or team members can manage content directly.",
    feature3Title: "Real-Time Updates",
    feature3Desc: "Instantly see changes on your live site.",


    gallaryTlttle:"Ready-to-Use Landing Templates",
    gallary1:"Restaurant",
    gallary2:"Freelancer",
    gallary3:"Real Estate",


    //Why Click2Page Section
    WhyTittle:"Why Choose Click2Page for Your Landing Pages?",
    Why1:`<li id="Why1" ><i class="bi bi-check-circle-fill me-2 text-white"></i>Built for landing pages</li>`,
    Why2:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Launch in under 2 minutes`,
    Why3:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Edit everything from Google Sheets`,
    Why4:`<i class="bi bi-check-circle-fill me-2 text-white"></i>No login, no account, just one-click setup`,
    Why5:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Pro access with a single payment — subscription optional`,

    //Why Traditional Site Builders
    WhyTittle:"Traditional Site Builders",
    whyNotTraditionaltitlle1:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Too complex for simple landing pages`,
    whyNotTraditionaltitlle2:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Require accounts, logins, and hosting`,
    whyNotTraditionaltitlle3:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Monthly fees add up quickly`,
    whyNotTraditionaltitlle4:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Not beginner-friendly`,
    whyNotTraditionaltitlle5:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Overwhelming features you won’t use`,

    //Live Demo / Video Walkthrough Section
    demoTittle:`🚀 See Click2Page in Action`,
    demoDescription:`Watch how you can launch a modern website in 60 seconds — powered by Google Sheets and AI, no code needed.`,
    demobtn:`🎯 Try Live Demo Now`,


    //Pricing Section
    priciingTittle:"Precios simples y honestos",
    //Starter
    pricingStartertittle:"Starter",
    starterPrice:"$0",
    starterDuration:"Free forever",
    starter1:"✅ 1 Landing Page",
    starter2:"✅ Click2Page branding",
    starter3:"✅ 3 templates",
    starteBtn:"Start Free",
      //PRO
    pricingProtittle:"PRO",
    proPrice:"$19",
    proDuration:"One-time payment",
    pro1:"✅ Unlimited edits",
    pro2:"✅ Remove branding",
    pro3:"✅ All templates included",
    proBtn:"Get Pro",

      //Business
    pricingProtittle:"Business",
    proPrice:"$9",
    proDuration:"Per month",
    pro1:"✅ Custom domain",
    pro2:"✅ Analytics",
    pro3:"✅ Priority support",
    proBtn:"Subscribe",

    //Customer Logos Section
    logosTittle:"Trusted by Small Businesses Everywhere",
    logosDescription:`<p id="logosDescription" class="mb-5 text-muted">Join hundreds of entrepreneurs using <strong>Click2Page</strong> to simplify their web presence.</p>`,

    //Testimonials Section
    testimonialsTittle:"What Our Users Are Saying",
    testimonialsText:`<p id="testimonialsText" class="card-text fs-5">“<strong>Click2Page</strong> saved me hours. My site was live in minutes!”</p>`,
    testimonialsFooter:`<footer id="testimonialsFooter" class="blockquote-footer mt-3 text-muted">Ana M., <cite title="Source Title">Boutique Owner</cite></footer>`,
    testimonialsText2:` <p id="testimonialsText2 class="card-text fs-5">“Perfect for non-tech folks like me. It just works.”</p>`,
    testimonialsFooter2:`<footer id="testimonialsFooter2" class=" mt-3 text-muted">Luis T., <cite title="Source Title">Freelancer</cite></footer>`,
    testimonialsText3:`<p id="testimonialsText3"  class="card-text fs-5">“The AI features blew my mind — instant landing pages!”</p>`,
    testimonialsFooter3:`<footer id="testimonialsFooter3" class=" mt-3 text-muted">Sara G., <cite title="Source Title">Digital Marketer</cite></footer>`,

    //FAQ Section
    faqTittle:`<h2 id="faqTittle" class="text-center mb-3 fw-bold text-primary display-6">🙋‍♂️ Frequently Asked Questions</h2>`,
    faqDescription:"Got doubts? We've got you covered — no jargon, no fluff.",

    faq1heading:`<h2 class="accordion-header" id="faq1heading">
              <button class="accordion-button fw-semibold" type="button"
                data-bs-toggle="collapse" data-bs-target="#faq1"
                aria-expanded="true" aria-controls="faq1">
                <i class="fa-solid fa-code me-2 text-primary"></i>Do I need to know how to code?
              </button>
            </h2>`,
    faq1:`<div id="faq1" class="accordion-collapse collapse show"
              aria-labelledby="faq1heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                Not at all! Just fill out a Google Sheet and
                <strong>Click2Page</strong> automatically builds your site. No
                coding, no hassle.
              </div>
            </div>`,        
  faq2heading:`<h2 class="accordion-header" id="faq2heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq2"
                aria-expanded="false" aria-controls="faq2">
                <i class="fa-solid fa-table me-2 text-primary"></i> How do I
                create my Google Sheet?
              </button>
            </h2>`,
  faq2:`<div id="faq2" class="accordion-collapse collapse"
              aria-labelledby="faq2heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                Just click the <strong>"Launch Auto-Generator"</strong> button and
                we’ll automatically create a pre-filled sheet with all your
                editable content. You can start editing right away.
              </div>
            </div>`,

    faq3heading:`<h2 class="accordion-header" id="faq3heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq3"
                aria-expanded="false" aria-controls="faq3">
                <i class="fa-solid fa-link me-2 text-primary"></i> How does the
                sheet connect to my site?
              </button>
            </h2>`,
    faq3:`<div id="faq3" class="accordion-collapse collapse"
              aria-labelledby="faq3heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                You don’t need to set anything up. Click2Page links your sheet
                in the background. Every time you save changes, your site
                updates instantly.
              </div>
            </div>`,
    faq4heading:`<h2 class="accordion-header" id="faq4heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq4"
                aria-expanded="false" aria-controls="faq4">
                <i
                  class="fa-solid fa-wand-magic-sparkles me-2 text-primary"></i>
                What can I edit from the sheet?
              </button>
            </h2>`,
    faq4:`<div id="faq4" class="accordion-collapse collapse"
              aria-labelledby="faq4heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                You can update text, images, colors, links, buttons and more —
                all from the Google Sheet interface, no coding required.
              </div>
            </div>`,
    faq5heading:`<h2 class="accordion-header" id="faq5heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq5"
                aria-expanded="false" aria-controls="faq5">
                <i class="fa-solid fa-rotate me-2 text-primary"></i> How do
                updates work?
              </button>
            </h2>`,
    faq5:` <div id="faq5" class="accordion-collapse collapse"
              aria-labelledby="faq5heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                Whenever you make changes to your Google Sheet, simply refresh
                the page to see the updated content. Your edits are applied
                instantly—just hit refresh!.
              </div>
            </div>`,     
            
    faq6heading:`<h2 class="accordion-header" id="faq6heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq6"
                aria-expanded="false" aria-controls="faq6">
                <i class="fa-solid fa-user-group me-2 text-primary"></i> Can I
                collaborate with others or back up my content?
              </button>
            </h2>`,
    faq6:`<div id="faq6" class="accordion-collapse collapse"
              aria-labelledby="faq6heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                Yes! Since your content lives in Google Sheets, you can easily
                share it with your team and make backups using Google Drive. All
                changes are auto-saved and versioned.
              </div>
            </div>`,

    //Smart Assistant FAQ   
    botquestion:`<p id="botquestion" class="fw-semibold text-dark mb-2 fs-5"><i
                  class="fa-regular fa-comments me-2"></i>Still have
                questions?</p>`,
    bottext:` <p id="bottext" class="text-muted mb-3">Ask our smart assistant — it's always
                ready to help!</p>`,
    botopen:`Chat Now`,     




    ctaText: "Ready to launch your site?",
    ctaButton: "Start for Free",

    
  },
  es: {
    heroTitle: `Crea Sitios Inteligentes con <span class="highlight-text">Click2Page`,
    heroSubtitle: "Lanza al instante un sitio web editable con Hojas de cálculo de Google: sin código, sin estrés",
    btnStart: "Crea tu hoja",
    herolinkExample:"Explorar ejemplos ↓",

    howItWorksTitle: "Cómo Funciona en 3 Pasos Simples",
    step1Title: "1. Elige una Plantilla",
    step1Desc: "Elige entre plantillas modernas (HTML + CSS + JS).",
    step2Title: "2. Cómo funciona",
    step2Desc: "Creamos una hoja de Google conectada a tu contenido.",
    step3Title: "3. Edita el Contenido desde Google Sheets",
    step3Desc: "Cambia textos, imágenes y estilos en segundos — sin código.",

    featuresTitle: "Convierte tu Sitio en un CRM sin Código con un Clic.",
    feature1Title: "Edición Fácil",
    feature1Desc: "Cambia lo que quieras usando una hoja de Google.",
    feature2Title: "Sin Necesidad de un Desarrollador",
    feature2Desc: "Clientes o colaboradores pueden editar directamente el contenido.",
    feature3Title: "Actualizaciones en Tiempo Real",
    feature3Desc: "Ve los cambios al instante en tu sitio en línea.",

    gallaryTlttle:"Plantillas de aterrizaje listas para usar",
    gallary1:"Restaurante",
    gallary2:"Freelancer",
    gallary3:"Bienes raíces",


    //Why Click2Page Section
    WhyTittle:"¿Por qué elegir Click2Page para sus páginas de destino?",
    Why1:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Creado para páginas de destino`,
    Why2:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Lanzamiento en menos de 2 minutos`,
    Why3:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Editar todo desde Hojas de cálculo de Google`,
    Why4:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Sin inicio de sesión, sin cuenta, solo configuración con un clic`,
    Why5:`<i class="bi bi-check-circle-fill me-2 text-white"></i>Acceso Pro con un único pago (suscripción opcional)`,

//Why Traditional Site Builders
    WhyTittle:"Constructores de sitios tradicionales",
    whyNotTraditionaltitlle1:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Demasiado compleja para páginas de destino simples`  ,
    whyNotTraditionaltitlle2:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Requiere cuentas, inicios de sesión y alojamiento`,
    whyNotTraditionaltitlle3:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Las tarifas mensuales se acumulan rápidamente`,
    whyNotTraditionaltitlle4:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>No es apto para principiantes`,
    whyNotTraditionaltitlle5:`<i class="bi bi-x-circle-fill me-2 text-danger"></i>Funciones abrumadoras que no usarás`,

    demoTittle:`🚀 Vea Click2Page en acción `,
    demoDescription:`Mira cómo puedes lanzar un sitio web moderno en 60 segundos, con tecnología de Hojas de cálculo de Google e IA, sin necesidad de código. `,
    demobtn:`🎯 Pruebe la demostración en vivo ahora`,

    //Pricing Section
    priciingTittle:"Precios simples y honestos",
    //Starter
    pricingStartertittle:"Starter",
    starterPrice:"$0",
    starterDuration:"Gratís para siempre",
    starter1:"✅ 1 Landing Page",
    starter2:"✅ Marca Click2Page",
    starter3:"✅ 3 plantillas",
    starteBtn:"Empieza gratis",

     //PRO
    pricingProtittle:"PRO",
    proPrice:"$19",
    proDuration:"Pago único",
    pro1:"✅ Ediciones ilimitadas",
    pro2:"✅ Eliminar la marca",
    pro3:"✅ Todas las plantillas incluidas",
    proBtn:"Obtener Pro",


    //Business
    pricingbusinesstittle:"Business",
    businessPrice:"$9",
    businessDuration:"Por mes",
    business1:"✅ Dominio personalizado",
    business2:"✅ Analítica",
    business3:"✅ Soporte prioritario",
    businessBtn:"Suscribir",

      //Customer Logos Section
    logosTittle:"Con la confianza de las pequeñas empresas de todo el mundo",
    logosDescription:`<p id="logosDescription" class="mb-5 text-muted">Únase a cientos de emprendedores que utilizan <strong>Click2Page</strong> para simplificar su presencia en la web.</p>`,

    //Testimonials Section
    testimonialsTittle:"Lo que nuestras usuarias están diciendo",
    testimonialsText:`<p id="testimonialsText" class="card-text fs-5">“Click2Page me ahorró horas. ¡Mi sitio web estuvo activo en minutos!”</p>`,
    testimonialsFooter:` <footer id="testimonialsFooter" class="blockquote-footer mt-3 text-muted">Ana M., <cite title="Source Title">propietaria de una boutique</cite></footer>`,

    testimonialsText2:`<p id="testimonialsText2 class="card-text fs-5">“Perfecto para quienes no son expertos en tecnología, como yo. Simplemente funciona.”</p>`,
    testimonialsFooter2:`<footer id="testimonialsFooter2" class=" mt-3 text-muted">Luis T., <cite title="Source Title">Freelancer</cite></footer>`,
    
    testimonialsText3:`<p id="testimonialsText3"  class="card-text fs-5">“Las funciones de IA me dejaron atónito: páginas de destino instantáneas!”</p>`,
    testimonialsFooter3:`<footer id="testimonialsFooter3" class=" mt-3 text-muted">Sara G., <cite title="Source Title">Comercializador digital</cite></footer>`,

    //FAQ Section
    faqTittle:`<h2 id="faqTittle" class="text-center mb-3 fw-bold text-primary display-6">🙋‍♂️ Preguntas frecuentes</h2>`,
    faqDescription:"¿Tienes dudas? Te lo explicamos todo: sin tecnicismos ni tonterías.",
   
   faq1heading:`<h2 class="accordion-header" id="faq1heading">
              <button class="accordion-button fw-semibold" type="button"
                data-bs-toggle="collapse" data-bs-target="#faq1"
                aria-expanded="true" aria-controls="faq1">
                <i class="fa-solid fa-code me-2 text-primary"></i>¿Necesito saber programar?
              </button>
            </h2>`,
    faq1:`<div id="faq1" class="accordion-collapse collapse show"
              aria-labelledby="faq1heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                ¡Para nada! Solo rellena una hoja de Google y <strong>Click2Page</strong> construirá tu sitio automáticamente. Sin código, sin complicaciones.
              </div>
            </div>`,     
    faq2heading:`<h2 class="accordion-header" id="faq2heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq2"
                aria-expanded="false" aria-controls="faq2">
                <i class="fa-solid fa-table me-2 text-primary"></i> ¿Cómo creo mi hoja de Google?
              </button>
            </h2>`,
  faq2:`<div id="faq2" class="accordion-collapse collapse"
              aria-labelledby="faq2heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                Just click the <strong>"Solo haz clic en el botón <strong>"Iniciar generador automático"</strong> y
            crearemos automáticamente una hoja prellenada con todo tu contenido editable. Puedes empezar a editar de inmediato.
              </div>
            </div>`,
    faq3heading:`<h2 class="accordion-header" id="faq3heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq3"
                aria-expanded="false" aria-controls="faq3">
                <i class="fa-solid fa-link me-2 text-primary"></i>¿Cómo se conecta la hoja con mi sitio?
              </button>
            </h2>`,
    faq3:`<div id="faq3" class="accordion-collapse collapse"
              aria-labelledby="faq3heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                No necesitas configurar nada. Click2Page enlaza tu hoja en segundo plano.
            Cada vez que guardes cambios, tu sitio se actualiza al instante.
              </div>
            </div>`,

    faq4heading:`<h2 class="accordion-header" id="faq4heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq4"
                aria-expanded="false" aria-controls="faq4">
                <i
                  class="fa-solid fa-wand-magic-sparkles me-2 text-primary"></i>
                ¿Qué puedo editar desde la hoja?
              </button>
            </h2>`,
    faq4:`<div id="faq4" class="accordion-collapse collapse"
              aria-labelledby="faq4heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
              Puedes actualizar textos, imágenes, colores, enlaces, botones y más —
              todo desde la hoja de Google, sin necesidad de programar.
              </div>
            </div>`,
     faq5heading:`<h2 class="accordion-header" id="faq5heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq5"
                aria-expanded="false" aria-controls="faq5">
                <i class="fa-solid fa-rotate me-2 text-primary"></i> ¿Cómo funcionan las actualizaciones?
              </button>
            </h2>`,
    faq5:` <div id="faq5" class="accordion-collapse collapse"
              aria-labelledby="faq5heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
                 Cada vez que hagas cambios en tu hoja de Google, simplemente recarga
            la página para ver el contenido actualizado. Tus ediciones se aplican al instante — ¡solo recarga!
              </div>
            </div>`,  

    faq6heading:`<h2 class="accordion-header" id="faq6heading">
              <button class="accordion-button collapsed fw-semibold"
                type="button" data-bs-toggle="collapse" data-bs-target="#faq6"
                aria-expanded="false" aria-controls="faq6">
                <i class="fa-solid fa-user-group me-2 text-primary"></i> ¿Puedo colaborar con otros o hacer copias de seguridad?
              </button>
            </h2>`,
    faq6:`<div id="faq6" class="accordion-collapse collapse"
              aria-labelledby="faq6heading" data-bs-parent="#faqAccordion">
              <div class="accordion-body fs-6 text-secondary">
              ¡Sí! Como tu contenido vive en Google Sheets, puedes compartirlo fácilmente
              con tu equipo y hacer copias de seguridad usando Google Drive. Todos los cambios se guardan automáticamente y tienen historial de versiones.
            </div>
          </div>`,

       //Smart Assistant FAQ   
    botquestion:`<p id="botquestion" class="fw-semibold text-dark mb-2 fs-5"><i
                  class="fa-regular fa-comments me-2"></i>¿Aún tienes preguntas?</p>`,
    bottext:` <p id="bottext" class="text-muted mb-3">Pregunta a nuestro asistente inteligente — ¡siempre está    listo para ayudarte!</p>`,
    botopen:`Chatea ahora`,      

    ctaText: "¿Listo para lanzar tu sitio?",
    ctaButton: "Empieza Gratis"
  }
};

  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
  }

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    for (const key in t) {
      const element = document.getElementById(key);
      if (element) element.innerHTML = t[key]; // ← changed from textContent to innerHTML
    }
    // for (const key in t) {
    //   const element = document.getElementById(key);
    //   if (element) element.textContent = t[key];
    // }

    // Highlight selected language
    document.getElementById('lang-en').classList.toggle('fw-bold', lang === 'en');
    document.getElementById('lang-es').classList.toggle('fw-bold', lang === 'es');
  }

  // Load saved language on page load
  document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem('language') || 'en';
    applyTranslations(lang);
  });

