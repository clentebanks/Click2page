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
let isThinking = false;
let timeout;

// Hover (desktop)
chatbotArea.addEventListener('mouseenter', () => {
  clearTimeout(timeout);
  chatbotWindow.style.display = 'flex';
  isOpen = true;
});
chatbotArea.addEventListener('mouseleave', () => {
  timeout = setTimeout(() => {
    if (!isThinking) {
      chatbotWindow.style.display = 'none';
      isOpen = false;
    }
  }, 500);
});

// Touch (mobile)
chatbotButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isOpen = !isOpen;
  chatbotWindow.style.display = isOpen ? 'flex' : 'none';
});

// External open trigger
function openChat() {
  chatbotWindow.style.display = 'flex';
  chatbotWindow.scrollIntoView({ behavior: 'smooth' });
  isOpen = true;
}

// Close chat manually
function closeChat() {
  chatbotWindow.style.display = 'none';
  isOpen = false;
}

// Input handler
function checkInput(event) {
  if (event.key === 'Enter' && event.target.value.trim() !== '') {
    sendChatMessage(event.target.value.trim());
  }
}

// Escape HTML
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#039;'
  }[tag]));
}

// Send message
function sendChatMessage(message) {
  const chatContent = document.getElementById('chatbot-content');
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  chatContent.innerHTML += `
    <div class="chat-message user-message">
      <div class="bubble">${escapeHTML(message)}</div>
      <small class="timestamp">${time}</small>
    </div>`;
  chatContent.scrollTop = chatContent.scrollHeight;

  const typingEl = document.createElement("div");
  typingEl.className = "chat-message ai-message";
  typingEl.innerHTML = `
    <div class="bubble typing-dots">
      <span></span><span></span><span></span>
    </div>`;
  chatContent.appendChild(typingEl);
  chatContent.scrollTop = chatContent.scrollHeight;

  isThinking = true;

  const match = faq.find(f => f.q.test(message));
  const reply = match ? match.a : "🤖 I'm not sure about that yet, but you can ask me about templates, setup, or editing tips!";

  setTimeout(() => {
    typingEl.remove();
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chatContent.innerHTML += `
      <div class="chat-message ai-message">
        <div class="bubble">${reply}</div>
        <small class="timestamp">${replyTime}</small>
      </div>`;
    document.getElementById('chat-input').value = '';
    chatContent.scrollTop = chatContent.scrollHeight;

    isThinking = false;
  }, 1000);
}

// Basic HTML escape to prevent XSS (optional safety)
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#039;'
  }[tag]));
}

