let rootEl__ai = null;
let messagesEl = null;
let inputEl = null;
let sendBtn = null;
let isThinking = false;
const QUICK_SUGGESTIONS = [
  'Checklist وردية صباحية',
  'بقع مياه على الأطباق',
  'دهون محروقة على الجريلة',
  'الفرق بين التنظيف والتطهير',
  'ماكينة الأطباق مش بتنضف كويس'
];
function init__ai() {
  rootEl__ai = document.querySelector('[data-view="ai"]');
  if (!rootEl__ai || rootEl__ai.dataset.initialized === 'true') return;
  rootEl__ai.dataset.initialized = 'true';
  rootEl__ai.innerHTML = '';
  rootEl__ai.appendChild(createElement('h1', { class: 'u-visually-hidden' }, ['مساعد الاستيوارد']));
  rootEl__ai.appendChild(buildChatShell());
  messagesEl = rootEl__ai.querySelector('#aiMessages');
  inputEl = rootEl__ai.querySelector('#aiInput');
  sendBtn = rootEl__ai.querySelector('#aiSendBtn');
  renderWelcomeOrHistory();
  bindEvents();
}
function buildChatShell() {
  const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  return createElement('div', { class: 'ai-view' }, [
    createElement('div', { class: 'ai-messages', id: 'aiMessages', role: 'log', 'aria-live': 'polite' }),
    createElement('div', { class: 'ai-input-bar' }, [
      createElement('div', { class: 'field ai-input-bar__field' }, [
        createElement('textarea', {
          class: 'field__textarea',
          id: 'aiInput',
          rows: '1',
          placeholder: 'اكتب سؤالك... مثال: بقع مياه على الأطباق',
          'aria-label': 'اكتب رسالتك للمساعد'
        })
      ]),
      hasSpeechRecognition
        ? createElement(
            'button',
            { class: 'btn btn--icon btn--ghost ai-input-bar__mic', type: 'button', id: 'aiMicBtn', 'aria-label': 'إدخال صوتي' },
            ['🎤']
          )
        : '',
      createElement(
        'button',
        { class: 'btn btn--icon btn--primary', type: 'button', id: 'aiSendBtn', 'aria-label': 'إرسال' },
        ['↑']
      )
    ].filter(Boolean))
  ]);
}
function renderWelcomeOrHistory() {
  const history = getState('chatHistory');
  messagesEl.innerHTML = '';
  if (history.length === 0) {
    messagesEl.appendChild(buildWelcomeCard());
    return;
  }
  history.forEach((msg) => {
    messagesEl.appendChild(buildMessageBubble(msg.role, msg.content));
  });
  scrollToBottom();
}
function buildWelcomeCard() {
  return createElement('div', { class: 'ai-welcome' }, [
    createElement('div', { class: 'ai-welcome__title' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['🤖']),
      'مساعد الاستيوارد'
    ]),
    createElement('div', { class: 'ai-welcome__desc' }, [
      'إجابات جاهزة من قاعدة معرفة القسم عن المواد الكيميائية ومشاكل تشغيلية شائعة وإجراءات السلامة. الأسئلة خارج هذه الموضوعات لا أستطيع الإجابة عنها.'
    ]),
    createElement('div', { class: 'ai-context-badge' }, [
      createElement('span', { 'aria-hidden': 'true' }, ['📡']),
      'يعمل بالكامل بدون إنترنت'
    ]),
    createElement(
      'div',
      { class: 'ai-suggestions-row' },
      QUICK_SUGGESTIONS.map((s) =>
        createElement('button', { class: 'chip', type: 'button', 'data-suggestion': s }, [s])
      )
    )
  ]);
}
function buildMessageBubble(role, content) {
  const isUser = role === 'user';
  const bubble = createElement('div', { class: 'ai-message__bubble' });
  bubble.innerHTML = renderSimpleMarkdown(content);
  const children = [
    createElement('div', { class: 'ai-message__avatar', 'aria-hidden': 'true' }, [isUser ? '👤' : '🤖']),
    bubble
  ];
  const wrapper = createElement('div', { class: `ai-message ai-message--${isUser ? 'user' : 'assistant'}` }, isUser ? children : [children[1], children[0]].reverse());
  if (!isUser) {
    const actions = createElement('div', { class: 'ai-message__actions' }, [
      createElement('button', { class: 'btn btn--sm btn--ghost', type: 'button', 'data-action': 'copy-message' }, ['📋 نسخ']),
      createElement('button', { class: 'btn btn--sm btn--ghost', type: 'button', 'data-action': 'regenerate' }, ['🔄 إعادة توليد'])
    ]);
    bubble.dataset.rawContent = content;
    wrapper.querySelector('.ai-message__avatar').insertAdjacentElement('afterend', actions);
  }
  return wrapper;
}
function showTypingIndicator() {
  const wrapper = createElement('div', { class: 'ai-message ai-message--assistant', id: 'aiTypingIndicator' }, [
    createElement('div', { class: 'ai-message__avatar', 'aria-hidden': 'true' }, ['🤖']),
    createElement('div', { class: 'ai-typing' }, [
      createElement('span', { class: 'ai-typing__dot' }),
      createElement('span', { class: 'ai-typing__dot' }),
      createElement('span', { class: 'ai-typing__dot' })
    ])
  ]);
  messagesEl.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}
function scrollToBottom() {
  messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
}
function findChemicalFromText(text) {
  const normalized = normalizeText(text);
  return chemicals.find(
    (c) =>
      normalized.includes(normalizeText(c.nameAr)) ||
      normalized.includes(normalizeText(c.nameEn)) ||
      normalizeText(c.nameEn)
        .split(' ')
        .some((part) => part.length > 3 && normalized.includes(part.toLowerCase()))
  );
}
function buildChecklist(type) {
  if (type === 'morning') {
    return `**Checklist وردية صباحية:**
1) تفقد الـ PPE واللوحات التحذيرية.
2) تجهيز أحواض الغسيل والتطهير بالتراكيز المذكورة على ملصق كل منتج وخطة المنشأة.
3) تنظيف أولي للأسطح والأرضيات قبل بدء التشغيل.
4) فحص ماكينة الأطباق ودرجات الحرارة.
5) التأكد من توافر الصابون والمطهرات والورق.
6) تسجيل أي نقص أو تسريب وإبلاغ المشرف.`;
  }
  if (type === 'deep') {
    return `**Checklist نظافة عميقة:**
1) وقف التشغيل تماماً.
2) فصل الكهرباء والغاز.
3) فك الأجزاء القابلة للفك.
4) تنظيف مبدئي ثم منظف مناسب ثم شطف ثم تطهير ثم تجفيف.
5) تنظيف الأهواد والفلاتر والبالوعات والزوايا المخفية.
6) توقيع المسؤول بعد الفحص النهائي.`;
  }
  return `**Checklist سريعة:**
1) تنظيف مبدئي.
2) اختيار المادة الصحيحة.
3) الالتزام بالتخفيف المذكور على ملصق المنتج.
4) ارتداء الـ PPE.
5) شطف/تطهير حسب الحالة.
6) تجفيف وتسجيل الملاحظات.`;
}
function answerFromKnowledge(text) {
  const normalized = normalizeText(text);
  const matchedChemical = findChemicalFromText(text);
  if (/checklist|جدول|قائمه|تشك ليست/.test(normalized)) {
    if (/صباح|morning/.test(normalized)) return buildChecklist('morning');
    if (/عميق|شهري|اسبوعي|deep/.test(normalized)) return buildChecklist('deep');
    return buildChecklist('general');
  }
  if (/بقع|مياه|water spot|spot/.test(normalized)) {
    return `لو الأطباق بتطلع عليها بقع مياه:
1) راجع مادة الشطف/التجفيف مثل **SOLID BRILLIANCE** أو **RINSE DRY**.
2) تأكد إن الشطف النهائي ضمن المدى في تعليمات الجهاز وخطة المنشأة المعتمدة.
3) لو الحرارة خارج المدى ممكن تبقى بقايا مادة التجفيف أو تضعف النتيجة، بلّغ المشرف.
4) افحص عسر المياه وتراكم الأملاح واستخدم مزيل أملاح عند الحاجة.`;
  }
  if (/جريله|grill|دهون|محروق|burn/.test(normalized)) {
    return `للدهون المحروقة على الجريلة:
1) افصل المصدر الكهربائي أو الغاز.
2) اعمل تنظيف مبدئي بالمقطع والفرشاة.
3) استخدم **GREASESTRIP PLUS** بالتخفيف ودرجة الحرارة والمدة المذكورة على ملصق المنتج.
4) اشطف ثم لو فيه ترسبات استخدم مزيل أملاح مناسب.
5) ارتدِ قفازات سميكة + نظارة + تهوية جيدة.`;
  }
  if (/p\s*h|ph|حموض|قلوي|حمضي/.test(normalized)) {
    return `اختيار المادة حسب pH:
- **الحمضي:** لإزالة الأملاح والترسبات.
- **المحايد:** آمن ولطيف مثل بعض أنواع صابون اليد.
- **القلوي:** أفضل لإزالة الدهون والزيوت.
ممنوع خلط المواد المختلفة خصوصاً الحمضي مع الكلور.`;
  }
  if (/تعقيم|تطهير|تنظيف/.test(normalized) && /فرق|ايه/.test(normalized)) {
    return `الفرق باختصار:
- **التنظيف:** إزالة الأوساخ المرئية وغير المرئية.
- **التطهير:** تنظيف + تقليل البكتيريا للحد الآمن.
- **التعقيم:** أعلى مستوى ويستهدف القضاء الكامل على الميكروبات.`;
  }
  if (/ماكينه|غساله|غسيل الاطباق/.test(normalized) && /مش بتنضف|ضعيف|ضعيفه|ليه/.test(normalized)) {
    return `لو ماكينة الأطباق مش بتنظف كويس:
1) راجع التنظيف المبدئي قبل دخول الأطباق.
2) تأكد من مادة الغسيل ومادة الشطف.
3) افحص درجات حرارة الغسيل والشطف مقابل تعليمات الجهاز وخطة المنشأة المعتمدة.
4) افحص الذراع الرشاش والفلاتر وترسبات الأملاح.
5) تأكد إن الجرعات تلقائية ومفيش انسداد في خطوط الضخ.`;
  }
  if (/طوارئ|عين|جلد|ابتلاع|استنشاق/.test(normalized)) {
    return `إسعافات أولية سريعة:
- **العين:** شطف بالماء الجاري فوراً ولفترة طويلة حسب صحيفة بيانات المنتج.
- **الجلد:** إزالة التلوث وغسل جيد بالماء والصابون.
- **الابتلاع:** لا تستفز القيء واطلب الطوارئ.
- **الاستنشاق:** هواء نقي فوراً ومساعدة طبية.
مع أي حادث لازم تبلغ المشرف فوراً.`;
  }
  if (matchedChemical) {
    return `**${matchedChemical.nameAr} / ${matchedChemical.nameEn}**
الاستخدام: ${matchedChemical.usage}
التخفيف: ${matchedChemical.dilution}
الخطورة: ${getDangerLabel(matchedChemical.danger)}
التحذير: ${matchedChemical.hazard}
التخزين: ${matchedChemical.storage}`;
  }
  const firstWord = normalized.split(' ')[0] || '';
  const topMatches = chemicals
    .filter((c) => normalizeText([c.nameAr, c.nameEn, c.desc, c.usage, c.hazard].join(' ')).includes(firstWord))
    .slice(0, 3);
  return 'هذا السؤال خارج نطاقي. أنا مساعد بإجابات جاهزة عن موضوعات محددة: المواد الكيميائية في الدليل، مشاكل تشغيلية شائعة (بقع مياه، دهون محروقة، ماكينة الأطباق)، إجراءات السلامة والطوارئ، وقوائم الورديات. جرّب سؤالاً ضمن هذه الموضوعات، وللحالات الأخرى راجع مشرفك.';
  return 'ممكن أوضحها لك فوراً. اكتب اسم المادة أو المشكلة التشغيلية نفسها، مثلاً: بقع مياه، دهون محروقة، نظافة وردية صباحية، أو اسم المادة الكيميائية.';
}
async function sendMessage() {
  if (isThinking) return;
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  inputEl.style.height = 'auto';
  setThinking(true);
  messagesEl.querySelector('.ai-welcome')?.remove();
  appendChatMessage('user', text);
  messagesEl.appendChild(buildMessageBubble('user', text));
  scrollToBottom();
  showTypingIndicator();
  await new Promise((resolve) => setTimeout(resolve, 550));
  document.getElementById('aiTypingIndicator')?.remove();
  const reply = answerFromKnowledge(text);
  appendChatMessage('assistant', reply);
  messagesEl.appendChild(buildMessageBubble('assistant', reply));
  scrollToBottom();
  setThinking(false);
}
function regenerateLastResponse() {
  const history = getState('chatHistory');
  const lastUserMessage = [...history].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) return;
  const reply = answerFromKnowledge(lastUserMessage.content);
  appendChatMessage('assistant', reply);
  messagesEl.appendChild(buildMessageBubble('assistant', reply));
  scrollToBottom();
  showToast('تم إعادة توليد الرد', 'success');
}
function setThinking(thinking) {
  isThinking = thinking;
  sendBtn.disabled = thinking;
}
function handleClearChat() {
  clearChatHistory();
  renderWelcomeOrHistory();
  showToast('تم مسح المحادثة');
}
function bindEvents() {
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = `${inputEl.scrollHeight}px`;
  });
  rootEl__ai.addEventListener('click', (e) => {
    const suggestionChip = e.target.closest('[data-suggestion]');
    if (suggestionChip) {
      inputEl.value = suggestionChip.dataset.suggestion;
      sendMessage();
      return;
    }
    if (e.target.closest('[data-action="copy-message"]')) {
      const bubble = e.target.closest('.ai-message').querySelector('.ai-message__bubble');
      copyToClipboard(bubble.dataset.rawContent).then((success) => {
        showToast(success ? 'تم نسخ الرد' : 'تعذّر النسخ', success ? 'success' : 'error');
      });
      return;
    }
    if (e.target.closest('[data-action="regenerate"]')) {
      regenerateLastResponse();
      return;
    }
    if (e.target.closest('#aiMicBtn')) {
      startVoiceInput();
    }
  });
}
function startVoiceInput() {
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionCtor) return;
  const recognition = new SpeechRecognitionCtor();
  recognition.lang = 'ar-EG';
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    inputEl.value = transcript;
    inputEl.dispatchEvent(new Event('input'));
  };
  recognition.onerror = () => showToast('تعذّر التعرّف على الصوت', 'error');
  recognition.start();
  showToast('استمع الآن... تحدّث بوضوح', 'default', 2000);
}
registerView('ai', {
  onEnter: () => init__ai()
});


function applyStoredPreferences() {
  applyTheme(getState('theme'));
  applyFontSize(getState('fontSize'));
  if (getState('reducedMotion')) {
    document.documentElement.style.setProperty('--duration-base', '0.01ms');
  }
}
function bindBottomNav() {
  document.querySelectorAll('.bottom-nav__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      location.hash = btn.dataset.navTarget;
    });
  });
}
function bindOfflineIndicator() {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;
  const updateBannerVisibility = () => {
    banner.classList.toggle('offline-banner--visible', isOffline());
  };
  window.addEventListener('online', updateBannerVisibility);
  window.addEventListener('offline', updateBannerVisibility);
  updateBannerVisibility();
}
function hideSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;
  const MIN_SPLASH_DURATION_MS = 500;
  setTimeout(() => {
    splash.classList.add('splash-screen--hidden');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  }, MIN_SPLASH_DURATION_MS);
}
function registerServiceWorker() {
}
function bindInstallPrompt() {
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (getState('installPromptDismissed')) return;
    showToast('يمكنك تثبيت التطبيق على شاشتك الرئيسية من قائمة المتصفح 📲', 'default', 4000);
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    showToast('تم تثبيت التطبيق بنجاح 🎉', 'success');
  });
}
function bootstrap() {
  applyStoredPreferences();
  bindBottomNav();
  bindOfflineIndicator();
  bindInstallPrompt();
  initRouter();
  registerServiceWorker();
  hideSplashScreen();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
/* === Preview patch: device-independent inline SVG icons (replaces UI emoji) === */
(function () {
  var ICONS = {"🏠": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M3 10.5 12 3l9 7.5'/><path d='M5 9.5V21h14V9.5'/><path d='M9 21v-6h6v6'/></svg>", "🧪": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M9 3h6'/><path d='M10 3v5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V3'/><path d='M7.5 14h9'/></svg>", "⚗": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M9 3h6'/><path d='M10 3v5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V3'/><path d='M7.5 14h9'/></svg>", "📚": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 1-2 2z'/><path d='M4 19a2 2 0 0 1 2-2h14'/></svg>", "🚨": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 3 2 21h20Z'/><path d='M12 10v5'/><path d='M12 18.5h.01'/></svg>", "⚠": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 3 2 21h20Z'/><path d='M12 10v5'/><path d='M12 18.5h.01'/></svg>", "🤖": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='5' y='8' width='14' height='11' rx='2'/><path d='M12 8V4'/><path d='M10 4h4'/><path d='M9 13h.01M15 13h.01'/><path d='M9 16.5h6'/></svg>", "⚙": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M3 6h9'/><path d='M17.5 6H21'/><circle cx='14.5' cy='6' r='2'/><path d='M3 12h2.5'/><path d='M10.5 12H21'/><circle cx='8' cy='12' r='2'/><path d='M3 18h10.5'/><path d='M18.5 18H21'/><circle cx='16' cy='18' r='2'/></svg>", "📡": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M5 12a10 10 0 0 1 14 0'/><path d='M8.5 15.5a5 5 0 0 1 7 0'/><path d='M12 19h.01'/><path d='M3 3l18 18'/></svg>", "👤": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5'/></svg>", "🎤": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='9' y='3' width='6' height='11' rx='3'/><path d='M5 11a7 7 0 0 0 14 0'/><path d='M12 18v3'/></svg>", "↑": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 20V4'/><path d='m6 10 6-6 6 6'/></svg>", "⬆": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 20V4'/><path d='m6 10 6-6 6 6'/></svg>", "⬇": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 4v16'/><path d='m6 14 6 6 6-6'/></svg>", "📋": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='6' y='4' width='12' height='17' rx='2'/><path d='M9 4a3 3 0 0 1 6 0'/><path d='M9 10h6M9 14h6'/></svg>", "🔄": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M21 12a9 9 0 1 1-2.6-6.3'/><path d='M21 3v6h-6'/></svg>", "📲": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='7' y='2.5' width='10' height='19' rx='2'/><path d='M11 18.5h2'/></svg>", "🎉": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='9' r='5'/><path d='m9 13-2 8 5-3 5 3-2-8'/></svg>", "🏆": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='9' r='5'/><path d='m9 13-2 8 5-3 5 3-2-8'/></svg>", "🔍": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='11' cy='11' r='7'/><path d='m20.5 20.5-4.6-4.6'/></svg>", "★": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" aria-hidden=\"true\"><path d=\"M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z\"/></svg>", "⭐": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" aria-hidden=\"true\"><path d=\"M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z\"/></svg>", "☆": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z'/></svg>", "👁": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z'/><circle cx='12' cy='12' r='3'/></svg>", "👓": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='6' cy='14' r='3.5'/><circle cx='18' cy='14' r='3.5'/><path d='M9.5 14h5M2.5 14 4 6h3M21.5 14 20 6h-3'/></svg>", "💨": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M3 8h9a3 3 0 1 0-3-3'/><path d='M3 12h13a3 3 0 1 1-3 3'/><path d='M3 16h5'/></svg>", "😮": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='M12 8v5'/><path d='M12 16.5h.01'/></svg>", "⛔": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='M5.5 5.5l13 13'/></svg>", "🚫": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='M5.5 5.5l13 13'/></svg>", "👕": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M8 4 3 8l2.5 2.5L8 8v12h8V8l2.5 2.5L21 8l-5-4a3 3 0 0 1-8 0z'/></svg>", "✅": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='m8 12.5 2.5 2.5L16 9.5'/></svg>", "✔": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='m4 12.5 5 5L20 6.5'/></svg>", "🌡": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M10 4a2 2 0 0 1 4 0v9.5a4.5 4.5 0 1 1-4 0z'/><path d='M12 10v7'/></svg>", "←": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M4 12h16'/><path d='m10 6-6 6 6 6'/></svg>", "→": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M20 12H4'/><path d='m14 6 6 6-6 6'/></svg>", "🚿": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M4 4l3 3'/><path d='M6 3.5A4 4 0 0 1 12 7l-5.5 5.5A4 4 0 0 1 3 8z'/><path d='M13 13h.01M16 16h.01M13 17h.01M17 12h.01M19 15h.01'/></svg>", "🔥": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 3c1 3-2 4.5-2 7a4.5 4.5 0 0 0 9 .5C19 7 14 6 12 3z'/><path d='M10 16a2.5 2.5 0 0 0 5 0c0-2-2.5-2.5-2.5-5 0 0-2.5 1.5-2.5 5z'/></svg>", "🥩": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='14' cy='9' r='6'/><path d='M9.5 14.5 4 20'/><path d='M2.5 17.5a2 2 0 1 0 4 0'/></svg>", "🧊": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 2v20M4 6l16 12M20 6 4 18M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2'/></svg>", "❄": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 2v20M4 6l16 12M20 6 4 18M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2'/></svg>", "🔬": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M6 21h12'/><path d='M9 21v-4'/><path d='M9 8a6 6 0 0 0 6 6'/><path d='M9 3h6v5H9z'/></svg>", "🦠": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='6'/><path d='M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2'/><path d='M10 11h.01M14 13h.01'/></svg>", "🧴": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M10 2h4v3h-4z'/><path d='M9 5h6l1 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8z'/></svg>", "🧽": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='4' y='8' width='16' height='10' rx='2'/><path d='M8 12h.01M12 14h.01M16 12h.01'/></svg>", "📅": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='4' y='5' width='16' height='16' rx='2'/><path d='M4 10h16M8 3v4M16 3v4'/></svg>", "🧢": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M4 15a8 8 0 0 1 16 0z'/><path d='M2 15h20'/><path d='M12 7V5'/></svg>", "📏": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='3' y='9' width='18' height='6' rx='1'/><path d='M7 9v3M11 9v3M15 9v3'/></svg>", "🥜": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='M12 12h.01'/></svg>", "💡": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M9 18h6'/><path d='M10 21h4'/><path d='M12 3a6 6 0 0 1 4 10.5c-.8.8-1 1.5-1 2.5h-6c0-1-.2-1.7-1-2.5A6 6 0 0 1 12 3z'/></svg>", "📌": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z'/><circle cx='12' cy='10' r='2.5'/></svg>", "🛡": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'/></svg>", "🦺": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'/></svg>", "🎯": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><circle cx='12' cy='12' r='5'/><circle cx='12' cy='12' r='1'/></svg>", "🌙": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M20 13A8 8 0 1 1 11 4a6.5 6.5 0 0 0 9 9z'/></svg>", "☀": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4'/></svg>", "🗑": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M4 7h16'/><path d='M9 7V4h6v3'/><path d='M6 7l1 14h10l1-14'/></svg>", "❌": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx='12' cy='12' r='9'/><path d='m9 9 6 6M15 9l-6 6'/></svg>", "⚡": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M13 2 4 14h6l-1 8 9-12h-6z'/></svg>", "🚑": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='4' y='4' width='16' height='16' rx='3'/><path d='M12 8v8M8 12h8'/></svg>", "💬": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z'/></svg>", "🪲": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x='8' y='7' width='8' height='12' rx='4'/><path d='M12 7V4M8 10H4M8 15H4M20 10h-4M20 15h-4M8 20l-2 2M16 20l2 2'/></svg>", "🧤": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V6a1.5 1.5 0 0 1 3 0v5'/><path d='M7 11c-1.5-1-3 .5-2 2l3 5a6 6 0 0 0 6 3h1a6 6 0 0 0 6-6v-4a1.5 1.5 0 0 0-3 0'/></svg>", "🖐": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d='M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V6a1.5 1.5 0 0 1 3 0v5'/><path d='M7 11c-1.5-1-3 .5-2 2l3 5a6 6 0 0 0 6 3h1a6 6 0 0 0 6-6v-4a1.5 1.5 0 0 0-3 0'/></svg>"};
  var DOTS = {"🔴": "svg-dot svg-dot--r", "🟣": "svg-dot svg-dot--p"};
  var keys = Object.keys(ICONS).concat(Object.keys(DOTS)).sort(function (a, b) { return b.length - a.length; });
  var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  var RE = new RegExp(keys.map(esc).join('|'), 'g');
  function makeIcon(ch) {
    var span = document.createElement('span');
    if (DOTS[ch]) { span.className = DOTS[ch]; span.setAttribute('aria-hidden', 'true'); return span; }
    span.className = 'svg-icon';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = ICONS[ch];
    return span;
  }
  function processNode(node) {
    if (node.nodeType === 3) {
      var t = node.nodeValue.replace(/\uFE0F/g, '');
      RE.lastIndex = 0;
      if (!RE.test(t)) return;
      RE.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = RE.exec(t))) {
        if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
        frag.appendChild(makeIcon(m[0]));
        last = m.index + m[0].length;
      }
      if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
      node.parentNode.replaceChild(frag, node);
      return;
    }
    if (node.nodeType !== 1) return;
    var tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') return;
    if (node.classList && (node.classList.contains('svg-icon') || node.classList.contains('svg-dot'))) return;
    Array.prototype.slice.call(node.childNodes).forEach(processNode);
  }
  function boot() {
    processNode(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (mu) {
        Array.prototype.forEach.call(mu.addedNodes, processNode);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
